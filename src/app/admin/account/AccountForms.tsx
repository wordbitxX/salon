"use client";

import { useState, useTransition } from "react";
import { changeOwnPassword, updateOwnProfile, type AccountResult } from "./actions";

function Note({ result }: { result: AccountResult | null }) {
  if (!result) return null;
  return (
    <p
      role="status"
      className={`rounded-xl border px-3 py-2 text-xs font-medium ${result.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}
    >
      {result.message}
    </p>
  );
}

export default function AccountForms({ name, email }: { name: string; email: string }) {
  const [pending, start] = useTransition();
  const [profile, setProfile] = useState<AccountResult | null>(null);
  const [password, setPassword] = useState<AccountResult | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">My profile</h2>
        <form
          className="mt-4 space-y-3"
          action={(formData) => start(async () => setProfile(await updateOwnProfile(formData)))}
        >
          <div>
            <label className="label" htmlFor="account-name">Name</label>
            <input id="account-name" name="name" defaultValue={name} className="input" required />
          </div>
          <div>
            <label className="label" htmlFor="account-email">Email (used to sign in)</label>
            <input id="account-email" name="email" type="email" defaultValue={email} className="input" required />
          </div>
          <Note result={profile} />
          <button type="submit" disabled={pending} className="btn-primary !py-2.5 text-xs">Save profile</button>
        </form>
      </section>

      <section className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Change password</h2>
        <form
          className="mt-4 space-y-3"
          action={(formData) => start(async () => setPassword(await changeOwnPassword(formData)))}
        >
          <div>
            <label className="label" htmlFor="account-current">Current password</label>
            <input id="account-current" name="current" type="password" autoComplete="current-password" className="input" required />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="account-new">New password</label>
              <input id="account-new" name="next" type="password" autoComplete="new-password" minLength={8} className="input" required />
            </div>
            <div>
              <label className="label" htmlFor="account-confirm">Confirm new password</label>
              <input id="account-confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} className="input" required />
            </div>
          </div>
          <Note result={password} />
          <button type="submit" disabled={pending} className="btn-primary !py-2.5 text-xs">Update password</button>
        </form>
      </section>
    </div>
  );
}
