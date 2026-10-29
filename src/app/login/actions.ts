"use server";

import { redirect } from "next/navigation";
import { safeNextPath, signIn, signOut } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, fd: FormData): Promise<LoginState> {
  const email = String(fd.get("email") || "");
  const password = String(fd.get("password") || "");
  const next = safeNextPath(fd.get("next"));

  if (!email.trim() || !password) return { error: "Enter your email and password." };

  try {
    const result = await signIn(email, password);
    if (!result.ok) return { error: result.error };
  } catch (error) {
    console.error("sign-in failed", error);
    return {
      error:
        "Could not reach the salon database. Check that DATABASE_URL is set (Supabase → Settings → Database → Connection string) and that the database is reachable.",
    };
  }

  redirect(next);
}

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/login");
}
