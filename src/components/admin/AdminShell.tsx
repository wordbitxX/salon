"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { MenuIcon, XIcon } from "../Icons";
import { wordbitx } from "@/lib/site";
const nav = [["Overview", "/admin"], ["Appointments", "/admin/appointments"], ["Customers", "/admin/customers"], ["Services", "/admin/services"], ["Staff", "/admin/staff"], ["Packages", "/admin/packages"], ["Offers", "/admin/offers"], ["Gallery", "/admin/gallery"], ["Reviews", "/admin/reviews"], ["Blog", "/admin/blog"], ["Leads", "/admin/leads"], ["Messages & WhatsApp", "/admin/messages"], ["Reports", "/admin/reports"], ["Settings", "/admin/settings"]];
export default function AdminShell({ children }: { children: ReactNode }) {
  const path = usePathname(); const [open, setOpen] = useState(false);
  const Side = (
    <nav aria-label="Admin" className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-gold font-serif text-lg text-white">É</span><div><p className="font-serif text-lg leading-none tracking-[0.15em] text-ivory">ÉLAN</p><p className="text-[9px] uppercase tracking-[0.25em] text-ivory/60">Salon Manager</p></div></div>
      <ul className="flex-1 space-y-0.5 overflow-y-auto px-3">{nav.map(([l, h]) => { const active = h === "/admin" ? path === h : path.startsWith(h); return (<li key={h}><Link href={h} onClick={() => setOpen(false)} aria-current={active ? "page" : undefined} className={`block rounded-lg px-3 py-2 text-sm transition ${active ? "bg-white/10 font-semibold text-ivory" : "text-ivory/70 hover:bg-white/5 hover:text-ivory"}`}>{l}</Link></li>); })}</ul>
      <div className="border-t border-white/10 p-4 text-[11px] text-ivory/60"><Link href="/" className="block text-ivory/80 hover:text-gold">← View website</Link><p className="mt-3">Salon Management Software by <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ivory hover:text-gold">WordbitX</a></p><a href={wordbitx.phoneHref} className="mt-1.5 block text-ivory/70 hover:text-gold">{wordbitx.phone}</a></div>
    </nav>
  );
  return (
    <div className="flex min-h-screen bg-[#f6f3ee] text-ink">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 bg-ink lg:block">{Side}</aside>
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}><div onClick={() => setOpen(false)} className={`absolute inset-0 bg-ink/50 transition ${open ? "opacity-100" : "opacity-0"}`} /><aside className={`absolute inset-y-0 left-0 w-64 bg-ink transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>{Side}</aside></div>
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-ink/5 bg-white/80 px-4 backdrop-blur sm:px-6"><div className="flex items-center gap-3"><button onClick={() => setOpen(!open)} aria-label="Toggle admin menu" className="grid h-10 w-10 place-items-center rounded-lg hover:bg-cream lg:hidden">{open ? <XIcon /> : <MenuIcon />}</button><p className="text-sm font-medium">ÉLAN Beauty Studio · Gulberg</p></div><div className="flex items-center gap-3"><span className="hidden rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 sm:inline">Demo Mode</span><span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-xs font-semibold">SM</span></div></header>
        <main id="main" className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
