"use client";

import { useActionState, useState } from "react";
import { loginAction, type LoginState } from "./actions";
import type { DemoAccount } from "@/lib/demo-accounts";
import { roleMeta } from "@/lib/rbac";

export default function LoginForm({
  demo,
  showDemo,
  next,
}: {
  demo: DemoAccount[];
  showDemo: boolean;
  next: string;
}) {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reveal, setReveal] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  function fillAccount(account: DemoAccount) {
    setEmail(account.email);
    setPassword(account.password);
    setActive(account.email);
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 lg:hidden">
        <p className="font-serif text-3xl tracking-[0.15em] text-ink">ÉLAN</p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Salon Manager</p>
      </div>

      <h1 className="font-serif text-4xl text-ink">Sign in</h1>
      <p className="mt-2 text-sm text-ink-soft">
        Dashboard access for the owner, manager and reception team at ÉLAN Beauty Studio.
      </p>

      <form action={formAction} className="mt-7 space-y-4">
        <input type="hidden" name="next" value={next} />
        <div>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setActive(null);
            }}
            className="input"
            placeholder="you@elanbeauty.pk"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={reveal ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setActive(null);
              }}
              className="input pr-16"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setReveal((value) => !value)}
              className="absolute inset-y-0 right-3 text-[11px] font-semibold uppercase tracking-wider text-ink-soft hover:text-ink"
            >
              {reveal ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {state.error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-700">
            {state.error}
          </p>
        )}

        <button type="submit" disabled={pending} className="btn-primary w-full">
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {showDemo && demo.length > 0 && (
        <div className="mt-8 rounded-2xl border border-ink/10 bg-cream/60 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">Demo logins</p>
          <p className="mt-1 text-[11px] leading-relaxed text-ink-soft">
            Tap a role to fill the form. The owner can change every password (and switch logins off) in
            Dashboard → Team &amp; access.
          </p>
          <ul className="mt-3 space-y-2">
            {demo.map((account) => {
              const isActive = active === account.email;
              return (
                <li key={account.email}>
                  <button
                    type="button"
                    onClick={() => fillAccount(account)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition ${
                      isActive ? "border-gold bg-white shadow-card" : "border-ink/10 bg-white/70 hover:border-gold/60 hover:bg-white"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-ink">{roleMeta[account.role].label}</span>
                      <span className="block truncate text-[11px] text-ink-soft">{account.email} · {account.password}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold text-ink-soft">
                      {isActive ? "Filled" : "Use"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="mt-3 text-[10px] leading-relaxed text-ink-soft">
            Change these before handing the dashboard to the salon.
          </p>
        </div>
      )}

      <p className="mt-6 text-[11px] text-ink-soft">
        Forgot the password? The owner can reset any login from Team &amp; access. If the owner is locked out, set{" "}
        <code className="rounded bg-cream px-1 py-0.5">ADMIN_EMAIL</code> /{" "}
        <code className="rounded bg-cream px-1 py-0.5">ADMIN_PASSWORD</code> before the first launch.
      </p>
    </div>
  );
}
