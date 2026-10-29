"use server";

import { revalidatePath } from "next/cache";
import { and, eq, ne, sql } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { assertPermission, logActivity, revokeSessions } from "@/lib/auth";
import { hashPassword, passwordProblem } from "@/lib/passwords";
import { isRole, roleMeta } from "@/lib/rbac";

export type ActionResult = { ok: boolean; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function assertOwner() {
  return assertPermission("users:manage");
}

async function activeOwners(excludeId?: number): Promise<number> {
  const [row] = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(adminUsers)
    .where(and(eq(adminUsers.role, "owner"), eq(adminUsers.active, true), excludeId ? ne(adminUsers.id, excludeId) : undefined));
  return Number(row?.n ?? 0);
}

function refresh() {
  revalidatePath("/admin/team-access");
  revalidatePath("/admin");
  revalidatePath("/admin/account");
}

export async function createTeamUser(formData: FormData): Promise<ActionResult> {
  try {
    const actor = await assertOwner();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const role = String(formData.get("role") || "");
    const password = String(formData.get("password") || "");

    if (name.length < 2) return { ok: false, message: "Enter the team member's name." };
    if (!EMAIL_RE.test(email)) return { ok: false, message: "Enter a valid email address." };
    if (!isRole(role)) return { ok: false, message: "Choose a role." };
    const problem = passwordProblem(password);
    if (problem) return { ok: false, message: problem };

    const [existing] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    if (existing) return { ok: false, message: "A login with this email already exists." };

    await db.insert(adminUsers).values({
      name,
      email,
      role,
      passwordHash: hashPassword(password),
      active: true,
      mustChangePassword: true,
    });

    await logActivity({
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: "login_created",
      detail: `Created ${roleMeta[role].label} login for ${name} (${email})`,
    });
    refresh();
    return { ok: true, message: `${name} can now sign in as ${roleMeta[role].label}. Share the password securely.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not create the login." };
  }
}

export async function setUserRole(userId: number, role: string): Promise<ActionResult> {
  try {
    const actor = await assertOwner();
    if (!isRole(role)) return { ok: false, message: "Unknown role." };
    if (userId === actor.id) return { ok: false, message: "You cannot change your own role." };

    const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
    if (!target) return { ok: false, message: "That login no longer exists." };
    if (target.role === "owner" && role !== "owner" && !(await activeOwners(userId))) {
      return { ok: false, message: "There must always be at least one active owner login." };
    }

    await db.update(adminUsers).set({ role }).where(eq(adminUsers.id, userId));
    await logActivity({
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: "login_role_changed",
      detail: `${target.name} moved from ${roleMeta[isRole(target.role) ? target.role : "receptionist"].label} to ${roleMeta[role].label}`,
    });
    refresh();
    return { ok: true, message: `${target.name} is now ${roleMeta[role].label}.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not update the role." };
  }
}

export async function setUserActive(userId: number, active: boolean): Promise<ActionResult> {
  try {
    const actor = await assertOwner();
    if (userId === actor.id) return { ok: false, message: "You cannot switch off your own login." };

    const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
    if (!target) return { ok: false, message: "That login no longer exists." };
    if (!active && target.role === "owner" && !(await activeOwners(userId))) {
      return { ok: false, message: "There must always be at least one active owner login." };
    }

    await db.update(adminUsers).set({ active }).where(eq(adminUsers.id, userId));
    if (!active) await revokeSessions(userId);

    await logActivity({
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: active ? "login_enabled" : "login_disabled",
      detail: `${target.name} (${target.email}) ${active ? "can sign in again" : "can no longer sign in"}`,
    });
    refresh();
    return { ok: true, message: `${target.name}'s login is now ${active ? "active" : "switched off"}.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not update the login." };
  }
}

export async function resetUserPassword(userId: number, password: string): Promise<ActionResult> {
  try {
    const actor = await assertOwner();
    const problem = passwordProblem(password);
    if (problem) return { ok: false, message: problem };

    const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
    if (!target) return { ok: false, message: "That login no longer exists." };

    await db.update(adminUsers).set({ passwordHash: hashPassword(password), mustChangePassword: true }).where(eq(adminUsers.id, userId));
    // Existing sessions stay valid for the owner, everyone else is signed out.
    if (userId !== actor.id) await revokeSessions(userId);

    await logActivity({
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: "password_reset",
      detail: `Password reset for ${target.name} (${target.email})`,
    });
    refresh();
    return { ok: true, message: `Password updated for ${target.name}.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not reset the password." };
  }
}

export async function deleteTeamUser(userId: number): Promise<ActionResult> {
  try {
    const actor = await assertOwner();
    if (userId === actor.id) return { ok: false, message: "You cannot delete your own login." };

    const [target] = await db.select().from(adminUsers).where(eq(adminUsers.id, userId)).limit(1);
    if (!target) return { ok: false, message: "That login no longer exists." };
    if (target.role === "owner" && !(await activeOwners(userId))) {
      return { ok: false, message: "There must always be at least one active owner login." };
    }

    await revokeSessions(userId);
    await db.delete(adminUsers).where(eq(adminUsers.id, userId));
    await logActivity({
      actorId: actor.id,
      actorName: actor.name,
      actorRole: actor.role,
      action: "login_deleted",
      detail: `Removed ${target.name} (${target.email})`,
    });
    refresh();
    return { ok: true, message: `${target.name}'s login has been removed.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Could not delete the login." };
  }
}
