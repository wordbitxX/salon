"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { getCurrentUser, logActivity } from "@/lib/auth";
import { hashPassword, passwordProblem, verifyPassword } from "@/lib/passwords";

export type AccountResult = { ok: boolean; message: string };

export async function updateOwnProfile(formData: FormData): Promise<AccountResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Your session has expired. Please sign in again." };

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (name.length < 2) return { ok: false, message: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, message: "Enter a valid email address." };

  try {
    const [existing] = await db.select({ id: adminUsers.id }).from(adminUsers).where(eq(adminUsers.email, email)).limit(1);
    if (existing && existing.id !== user.id) return { ok: false, message: "Another login already uses that email." };

    await db.update(adminUsers).set({ name, email }).where(eq(adminUsers.id, user.id));
    await logActivity({
      actorId: user.id,
      actorName: name,
      actorRole: user.role,
      action: "profile_updated",
      detail: `Profile updated to ${name} (${email})`,
    });
    revalidatePath("/admin");
    revalidatePath("/admin/account");
    return { ok: true, message: "Profile saved." };
  } catch {
    return { ok: false, message: "Could not save your profile." };
  }
}

export async function changeOwnPassword(formData: FormData): Promise<AccountResult> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, message: "Your session has expired. Please sign in again." };

  const current = String(formData.get("current") || "");
  const next = String(formData.get("next") || "");
  const confirm = String(formData.get("confirm") || "");

  if (next !== confirm) return { ok: false, message: "The new passwords do not match." };
  const problem = passwordProblem(next);
  if (problem) return { ok: false, message: problem };

  try {
    const [row] = await db.select().from(adminUsers).where(eq(adminUsers.id, user.id)).limit(1);
    if (!row || !verifyPassword(current, row.passwordHash)) return { ok: false, message: "Your current password is incorrect." };

    const passwordHash = hashPassword(next);
    await db.update(adminUsers).set({ passwordHash, mustChangePassword: false }).where(eq(adminUsers.id, user.id));

    await logActivity({
      actorId: user.id,
      actorName: row.name,
      actorRole: user.role,
      action: "password_changed",
      detail: "Changed their own password",
    });
    revalidatePath("/admin");
    revalidatePath("/admin/account");
    return { ok: true, message: "Password changed. Use the new password next time you sign in." };
  } catch {
    return { ok: false, message: "Could not change the password." };
  }
}
