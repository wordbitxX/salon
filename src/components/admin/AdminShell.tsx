"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MenuIcon, XIcon } from "../Icons";
import { wordbitx } from "@/lib/site";
import { navFor, roleMeta, type Role } from "@/lib/rbac";
import { logoutAction } from "@/app/login/actions";

export type ShellUser = { id: number; name: string; email: string; role: Role };

const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

export default function AdminShell({ children, user }: { children: ReactNode; user: ShellUser }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const nav = navFor(user.role);
  const meta = roleMeta[user.role];

  const Side = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-serif text-lg text-white">É</span>
        <div>
          <p className="font-serif text-lg leading-none tracking-[0.15em] text-ivory">ÉLAN</p>
          <p className="text-[9px] uppercase tracking-[0.25em] text-ivory/60">Salon Manager</p>
        </div>
      </div>

      <div className="mx-3 mb-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold/90 font-serif text-xs text-white">{initials(user.name)}</span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-ivory">{user.name}</p>
            <p className="truncate text-[10px] uppercase tracking-wider text-ivory/50">{meta.short}</p>
          </div>
        </div>
        <p className="mt-2 truncate text-[10px] text-ivory/40">{user.email}</p>
      </div>

      <ul className="flex-1 space-y-0.5 overflow-y-auto px-3">
        {nav.map((item) => {
          const active = item.href === "/admin" ? path === item.href : path.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm transition ${active ? "bg-white/10 font-semibold text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory"}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-white/10 p-4 text-[11px] text-ivory/60">
        <Link href="/admin/account" onClick={() => setOpen(false)} className="block text-ivory/80 hover:text-gold">My account</Link>
        <Link href="/" className="block text-ivory/80 hover:text-gold">← View website</Link>
        <form action={logoutAction}>
          <button type="submit" className="mt-1 w-full rounded-lg border border-white/15 px-3 py-1.5 text-left text-ivory/80 transition hover:border-gold hover:text-gold">
            Sign out
          </button>
        </form>
        <p className="pt-2">Salon Management Software by <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ivory hover:text-gold">WordbitX</a></p>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-[#f6f3ee] text-ink">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 bg-ink lg:block">{Side}</aside>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
        <div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/50 transition ${open ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute inset-y-0 left-0 w-64 bg-ink transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>{Side}</aside>
      </div>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-ink/5 bg-white/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(!open)} aria-label="Toggle admin menu" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-cream lg:hidden">
              {open ? <XIcon /> : <MenuIcon />}
            </button>
            <p className="text-sm font-medium">ÉLAN Beauty Studio · Gulberg</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`hidden rounded-full px-2.5 py-1 text-[11px] font-semibold sm:inline ${meta.badge}`}>{meta.label}</span>
            <span className="hidden text-right sm:block">
              <span className="block text-xs font-semibold leading-tight">{user.name}</span>
              <span className="block text-[10px] text-ink-soft">{meta.short} login</span>
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-xs font-semibold">{initials(user.name)}</span>
            <form action={logoutAction} className="hidden sm:block">
              <button type="submit" className="rounded-full border border-ink/15 px-3 py-1.5 text-[11px] font-semibold text-ink-soft transition hover:border-ink hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </header>
        <main id="main" className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
