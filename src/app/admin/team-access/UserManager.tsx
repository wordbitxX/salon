"use client";

import { useState, useTransition } from "react";
import { ROLES, roleMeta, type Role } from "@/lib/rbac";
import { createTeamUser, deleteTeamUser, resetUserPassword, setUserActive, setUserRole, type ActionResult } from "./actions";

export type TeamRow = {
  id: number;
  name: string;
  email: string;
  role: Role;
  active: boolean;
  mustChangePassword: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

const randomPassword = () => {
  const words = ["Elan", "Glow", "Rose", "Gold", "Silk", "Pearl"];
  const word = words[Math.floor(Math.random() * words.length)];
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `${word}@${digits}`;
};

const fmt = (value: string | null) =>
  value ? new Date(value).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "Never";

export default function UserManager({ users, currentUserId }: { users: TeamRow[]; currentUserId: number }) {
  const [pending, start] = useTransition();
  const [result, setResult] = useState<ActionResult | null>(null);
  const [draftPassword, setDraftPassword] = useState("");
  const [resetFor, setResetFor] = useState<number | null>(null);
  const [resetPassword, setResetPassword] = useState("");

  function run(task: () => Promise<ActionResult>) {
    start(async () => {
      const outcome = await task();
      setResult(outcome);
      if (outcome.ok) {
        setDraftPassword("");
        setResetFor(null);
        setResetPassword("");
      }
    });
  }

  return (
    <div className="space-y-4">
      {result && (
        <p
          role="status"
          className={`rounded-xl border px-4 py-3 text-xs font-medium ${result.ok ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-red-200 bg-red-50 text-red-700"}`}
        >
          {result.message}
        </p>
      )}

      <section className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Give someone access</h2>
        <p className="mt-1 text-xs text-ink-soft">
          Create a login for a manager or receptionist. They can only open what their role allows, and you can change the
          password, switch the login off or remove it at any time.
        </p>
        <form
          action={(formData) => run(() => createTeamUser(formData))}
          className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div className="lg:col-span-1">
            <label className="label" htmlFor="new-name">Name</label>
            <input id="new-name" name="name" required className="input" placeholder="Sana Iqbal" />
          </div>
          <div className="lg:col-span-1">
            <label className="label" htmlFor="new-email">Email</label>
            <input id="new-email" name="email" type="email" required className="input" placeholder="sana@elanbeauty.pk" />
          </div>
          <div>
            <label className="label" htmlFor="new-role">Role</label>
            <select id="new-role" name="role" className="input" defaultValue="receptionist">
              {ROLES.map((role) => (
                <option key={role} value={role}>{roleMeta[role].label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label" htmlFor="new-password">Temporary password</label>
            <div className="flex gap-1">
              <input
                id="new-password"
                name="password"
                required
                minLength={8}
                value={draftPassword}
                onChange={(event) => setDraftPassword(event.target.value)}
                className="input"
                placeholder="Min 8 characters"
              />
              <button
                type="button"
                onClick={() => setDraftPassword(randomPassword())}
                className="shrink-0 rounded-lg border border-ink/15 px-2 text-[11px] font-semibold text-ink-soft transition hover:border-ink hover:text-ink"
                title="Suggest a password"
              >
                Auto
              </button>
            </div>
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={pending} className="btn-primary w-full !py-2.5 text-xs">
              {pending ? "Saving…" : "Create login"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-ink/5 bg-white p-5 shadow-card">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-ink-soft">Logins ({users.length})</h2>
        <ul className="mt-4 space-y-3">
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            return (
              <li key={user.id} className="rounded-xl border border-ink/10 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                      {user.name}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${roleMeta[user.role].badge}`}>{roleMeta[user.role].label}</span>
                      {isSelf && <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-soft">You</span>}
                      {!user.active && <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">Switched off</span>}
                      {user.mustChangePassword && <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Demo password</span>}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-ink-soft">{user.email}</p>
                    <p className="mt-1 text-[11px] text-ink-soft">
                      Last sign-in: {fmt(user.lastLoginAt)} · Added {fmt(user.createdAt)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <select
                      aria-label={`Role for ${user.name}`}
                      defaultValue={user.role}
                      disabled={pending || isSelf}
                      onChange={(event) => run(() => setUserRole(user.id, event.target.value))}
                      className="rounded-md border border-ink/15 bg-white px-2 py-1 text-[11px] font-semibold disabled:opacity-50"
                    >
                      {ROLES.map((role) => (
                        <option key={role} value={role}>{roleMeta[role].label}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => setResetFor(resetFor === user.id ? null : user.id)}
                      className="rounded-md bg-cream px-2 py-1 text-[11px] font-semibold text-ink transition hover:bg-sand disabled:opacity-50"
                    >
                      Reset password
                    </button>
                    <button
                      type="button"
                      disabled={pending || isSelf}
                      onClick={() => run(() => setUserActive(user.id, !user.active))}
                      className="rounded-md bg-cream px-2 py-1 text-[11px] font-semibold text-ink transition hover:bg-sand disabled:opacity-50"
                    >
                      {user.active ? "Switch off" : "Switch on"}
                    </button>
                    <button
                      type="button"
                      disabled={pending || isSelf}
                      onClick={() => {
                        if (window.confirm(`Remove ${user.name}'s login? They will be signed out immediately.`)) {
                          run(() => deleteTeamUser(user.id));
                        }
                      }}
                      className="rounded-md bg-red-50 px-2 py-1 text-[11px] font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {resetFor === user.id && (
                  <form
                    action={() => run(() => resetUserPassword(user.id, resetPassword))}
                    className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-cream/60 p-2.5"
                  >
                    <input
                      value={resetPassword}
                      onChange={(event) => setResetPassword(event.target.value)}
                      minLength={8}
                      required
                      placeholder="New password (min 8 characters)"
                      className="input !w-auto flex-1 !py-2 text-xs"
                      aria-label={`New password for ${user.name}`}
                    />
                    <button type="button" onClick={() => setResetPassword(randomPassword())} className="rounded-md bg-white px-2 py-1.5 text-[11px] font-semibold text-ink-soft">
                      Auto
                    </button>
                    <button type="submit" disabled={pending} className="rounded-md bg-ink px-3 py-1.5 text-[11px] font-semibold text-ivory disabled:opacity-50">
                      Save password
                    </button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-[11px] text-ink-soft">
          Deleting a login is permanent — switch it off instead if the person may come back. Sessions end immediately when a
          login is switched off, deleted or given a new password.
        </p>
      </section>
    </div>
  );
}
