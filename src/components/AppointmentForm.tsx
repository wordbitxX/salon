"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/lib/services";
import { waLink, waMessages, site } from "@/lib/site";
import { WhatsAppIcon, CheckIcon, PhoneIcon } from "./Icons";
const times = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"];
const empty = { name: "", phone: "", whatsapp: "", service: "", date: "", time: "", message: "" };
export default function AppointmentForm({ compact = false, defaultService = "" }: { compact?: boolean; defaultService?: string }) {
  const [f, setF] = useState({ ...empty, service: defaultService });
  const [state, setState] = useState<{ s: "idle" | "loading" | "ok" | "err"; msg?: string; ref?: string }>({ s: "idle" });
  const today = new Date().toISOString().slice(0, 10);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setState({ s: "loading" });
    try { const r = await fetch("/api/appointment-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) }); const d = await r.json(); if (!r.ok) throw new Error(d.error); setState({ s: "ok", ref: d.reference }); }
    catch (err) { setState({ s: "err", msg: err instanceof Error ? err.message : "Something went wrong. Please try WhatsApp." }); }
  }
  if (state.s === "ok") {
    const msg = waMessages.request({ name: f.name, service: f.service || "an appointment", date: f.date || "a suitable date", time: f.time || "a suitable time" }) + (state.ref ? ` (Request ${state.ref})` : "");
    return (<div role="status" className="card p-8 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-600"><CheckIcon width={26} height={26} /></div><p className="mt-4 font-serif text-2xl text-ink">Request received, {f.name.split(" ")[0]}!</p><p className="mt-2 text-sm text-ink-soft">Our team will confirm your {f.service || "appointment"}{f.date && ` for ${f.date}`} within minutes during salon hours. For instant confirmation, continue on WhatsApp.</p>{state.ref && <p className="mt-3 font-mono text-xs text-ink-soft">Reference: {state.ref}</p>}<div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row"><a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Confirm on WhatsApp</a><Link href="/booking" className="btn-outline">Pick an exact slot online</Link></div><button onClick={() => { setState({ s: "idle" }); setF({ ...empty, service: defaultService }); }} className="mt-4 text-xs text-ink-soft underline-offset-4 hover:underline">Send another request</button></div>);
  }
  return (
    <form onSubmit={submit} className={`card ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8"}`} noValidate aria-label="Appointment request form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="a-name" className="label">Name *</label><input id="a-name" required autoComplete="name" className="input" value={f.name} onChange={set("name")} placeholder="Your full name" /></div>
        <div><label htmlFor="a-phone" className="label">Phone *</label><input id="a-phone" required type="tel" inputMode="tel" autoComplete="tel" className="input" value={f.phone} onChange={set("phone")} placeholder="+92 3xx xxxxxxx" /></div>
        <div><label htmlFor="a-wa" className="label">WhatsApp number</label><input id="a-wa" type="tel" inputMode="tel" className="input" value={f.whatsapp} onChange={set("whatsapp")} placeholder="Same as phone if blank" /></div>
        <div><label htmlFor="a-service" className="label">Service *</label><select id="a-service" required className="input" value={f.service} onChange={set("service")}><option value="">Select a service</option>{services.map((s) => (<option key={s.slug} value={s.name}>{s.name}</option>))}<option>Bridal Consultation</option><option>Package Enquiry</option></select></div>
        <div><label htmlFor="a-date" className="label">Preferred date *</label><input id="a-date" required type="date" min={today} className="input" value={f.date} onChange={set("date")} /></div>
        <div><label htmlFor="a-time" className="label">Preferred time *</label><select id="a-time" required className="input" value={f.time} onChange={set("time")}><option value="">Select a time</option>{times.map((t) => (<option key={t}>{t}</option>))}</select></div>
        <div className="sm:col-span-2"><label htmlFor="a-msg" className="label">Message</label><textarea id="a-msg" rows={compact ? 2 : 3} className="input" value={f.message} onChange={set("message")} placeholder="Occasion, preferred specialist, questions…" /></div>
      </div>
      {state.s === "err" && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{state.msg}</p>}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={state.s === "loading"} className="btn-primary flex-1 sm:flex-none">{state.s === "loading" ? "Sending…" : "Request Appointment"}</button>
        <a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 sm:flex-none"><WhatsAppIcon /> Book on WhatsApp</a>
        <a href={site.phoneHref} className="btn-outline flex-1 sm:flex-none"><PhoneIcon /> Call Now</a>
      </div>
      <p className="mt-3 text-[11px] text-ink-soft">We confirm every request personally on WhatsApp or by phone. Prefer to see live availability? <Link href="/booking" className="underline">Book an exact slot online</Link>.</p>
    </form>
  );
}
