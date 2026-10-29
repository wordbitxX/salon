import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { and, eq, gt, lt, sql } from "drizzle-orm";
import { createHash, randomBytes } from "node:crypto";
import { db } from "@/db";
import { activityLog, adminSessions, adminUsers } from "@/db/schema";
import { ensureSchema } from "./schema-init";
import { hashPassword, verifyPassword } from "./passwords";
import { DEFAULT_OWNER, DEFAULT_TEAM, seedDemoTeam } from "./demo-accounts";
import { can, isRole, roleMeta, type Permission, type Role } from "./rbac";

export const SESSION_COOKIE = "elan_admin_session";
const SESSION_DAYS = 7;

export type SessionUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  mustChangePassword: boolean;
  sessionId: string;
};

const hashToken = (token: string) => createHash("sha256").update(token).digest("hex");

/* ------------------------------------------------------------------ *
 * Seeding the first logins
 * ------------------------------------------------------------------ */

let usersSeeded = false;

export async function ensureDefaultUsers(): Promise<void> {
  if (usersSeeded) return;
  await ensureSchema();
  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(adminUsers);
  if (Number(n) > 0) {
    usersSeeded = true;
    return;
  }
  const rows = [DEFAULT_OWNER, ...(seedDemoTeam ? DEFAULT_TEAM : [])].map((account) => ({
    name: account.name,
    email: account.email.toLowerCase(),
    passwordHash: hashPassword(account.password),
    role: account.role,
    active: true,
    mustChangePassword: account.role !== "owner",
  }));
  await db.insert(adminUsers).values(rows).onConflictDoNothing();
  usersSeeded = true;
}

/* ------------------------------------------------------------------ *
 * Activity log
 * ------------------------------------------------------------------ */

export async function logActivity(input: {
  actorId?: number | null;
  actorName: string;
  actorRole: string;
  action: string;
  detail?: string | null;
}): Promise<void> {
  try {
    await ensureSchema();
    await db.insert(activityLog).values({
      actorId: input.actorId ?? null,
      actorName: input.actorName,
      actorRole: input.actorRole,
      action: input.action,
      detail: input.detail ?? null,
    });
  } catch {
    // Never let an audit-log failure break a real action.
  }
}

/* ------------------------------------------------------------------ *
 * Session helpers
 * ------------------------------------------------------------------ */

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    await ensureSchema();
    const rows = await db
      .select({
        id: adminUsers.id,
        name: adminUsers.name,
        email: adminUsers.email,
        role: adminUsers.role,
        active: adminUsers.active,
        mustChangePassword: adminUsers.mustChangePassword,
        sessionId: adminSessions.id,
      })
      .from(adminSessions)
      .innerJoin(adminUsers, eq(adminUsers.id, adminSessions.userId))
      .where(and(eq(adminSessions.id, hashToken(token)), gt(adminSessions.expiresAt, new Date()), eq(adminUsers.active, true)))
      .limit(1);
    const row = rows[0];
    if (!row || !isRole(row.role)) return null;
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
      mustChangePassword: row.mustChangePassword,
      sessionId: row.sessionId,
    };
  } catch {
    return null;
  }
});

export async function requireUser(nextPath?: string): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    const target = nextPath ? `/login?next=${encodeURIComponent(nextPath)}` : "/login";
    redirect(target);
  }
  return user;
}

export async function requirePermission(permission: Permission): Promise<SessionUser> {
  const user = await requireUser();
  if (!can(user.role, permission)) redirect(`/admin?denied=${encodeURIComponent(permission)}`);
  return user;
}

/** Server-action guard: throws instead of redirecting. */
export async function assertPermission(permission: Permission): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Your session has expired. Please sign in again.");
  if (!can(user.role, permission)) {
    throw new Error(`Your ${roleMeta[user.role].short.toLowerCase()} login is not allowed to do this.`);
  }
  return user;
}

/** Deletions & destructive changes are reserved for the owner login. */
export async function assertOwner(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Your session has expired. Please sign in again.");
  if (user.role !== "owner") throw new Error("Only the salon owner can delete records.");
  return user;
}

/* ------------------------------------------------------------------ *
 * Sign in / sign out
 * ------------------------------------------------------------------ */

export type SignInResult = { ok: true; role: Role } | { ok: false; error: string };

export async function signIn(emailInput: string, password: string): Promise<SignInResult> {
  await ensureDefaultUsers();
  const email = emailInput.trim().toLowerCase();
  const generic = "Email or password is incorrect.";
  if (!email || !password) return { ok: false, error: "Enter your email and password." };

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, email)).limit(1);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    await logActivity({
      actorName: user?.name ?? email,
      actorRole: user?.role ?? "unknown",
      action: "login_failed",
      detail: `Failed sign-in for ${email}`,
    });
    return { ok: false, error: generic };
  }

  if (!user.active) {
    return { ok: false, error: "This login has been switched off by the owner. Ask for access to be restored." };
  }

  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(adminSessions).values({ id: hashToken(token), userId: user.id, expiresAt });
  await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));
  await db.delete(adminSessions).where(lt(adminSessions.expiresAt, new Date())).catch(() => undefined);

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });

  await logActivity({
    actorId: user.id,
    actorName: user.name,
    actorRole: user.role,
    action: "signed_in",
    detail: `Signed in as ${roleMeta[isRole(user.role) ? user.role : "receptionist"].label}`,
  });

  return { ok: true, role: isRole(user.role) ? user.role : "receptionist" };
}

export async function signOut(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  const user = await getCurrentUser();
  if (token) {
    await db.delete(adminSessions).where(eq(adminSessions.id, hashToken(token))).catch(() => undefined);
  }
  jar.delete(SESSION_COOKIE);
  if (user) {
    await logActivity({
      actorId: user.id,
      actorName: user.name,
      actorRole: user.role,
      action: "signed_out",
      detail: "Signed out",
    });
  }
}

/** Revoke every session for a user (used when a login is disabled or deleted). */
export async function revokeSessions(userId: number): Promise<void> {
  await db.delete(adminSessions).where(eq(adminSessions.userId, userId));
}

export function safeNextPath(value: unknown): string {
  const raw = typeof value === "string" ? value : "";
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/admin";
  return raw;
}
