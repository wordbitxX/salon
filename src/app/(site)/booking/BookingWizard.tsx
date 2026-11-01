"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { services, categories } from "@/lib/services";
import { staff } from "@/lib/staff";
import { packages } from "@/lib/content";
import { fmtPKR, fmtDuration, waLink, site } from "@/lib/site";
import { fmtTime, SLOT_TIMES, SUNDAY_TIMES, toMin } from "@/lib/booking";
import Stars from "@/components/ui/Stars";
import { CheckIcon, ArrowIcon, WhatsAppIcon, CalendarIcon, ClockIcon, UserIcon, SparkIcon } from "@/components/Icons";

const steps = ["Service", "Specialist", "Date", "Time", "Details", "Confirm"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export default function BookingWizard({ initialService, initialStaff, initialPackage }: { initialService?: string; initialStaff?: string; initialPackage?: string }) {
  const pkg = packages.find((p) => p.slug === initialPackage);
  const [step, setStep] = useState(initialService ? (initialStaff ? 2 : 1) : initialStaff ? 0 : 0);
  const [cat, setCat] = useState<string>(initialService ? services.find((s) => s.slug === initialService)?.category || "hair" : pkg?.bridal ? "bridal" : "hair");
  const [serviceSlug, setServiceSlug] = useState<string | undefined>(initialService || (pkg ? (pkg.bridal ? "bridal-makeup" : "signature-facial") : undefined));
  const [staffSlug, setStaffSlug] = useState<string | undefined>(initialStaff);
  const [monthOffset, setMonthOffset] = useState(0);
  const [date, setDate] = useState<string | undefined>();
  const [time, setTime] = useState<string | undefined>();
  const [form, setForm] = useState({ name: "", phone: "", email: "", notes: pkg ? `Package: ${pkg.name}` : "" });

  const service = services.find((s) => s.slug === serviceSlug);
  const eligible = useMemo(() => (service ? staff.filter((m) => service.staff.includes(m.slug)) : staff), [service]);
  const specialist = staff.find((m) => m.slug === staffSlug);
  // These are preferred times, not live availability. The salon confirms on WhatsApp.
  const slots = useMemo(() => {
    if (!date || !service) return [];
    const day = new Date(date + "T00:00:00").getDay();
    const close = day === 0 ? 20 * 60 : 21 * 60;
    return (day === 0 ? SUNDAY_TIMES : SLOT_TIMES)
      .filter((t) => toMin(t) + service.duration <= close)
      .map((t) => ({ time: t, available: true }));
  }, [date, service]);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const viewMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const days: (Date | null)[] = []; for (let i = 0; i < viewMonth.getDay(); i++) days.push(null);
  for (let d = 1; d <= new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate(); d++) days.push(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), d));
  const maxDate = new Date(today); maxDate.setDate(maxDate.getDate() + 60);

  const canNext = [!!service, !!specialist, !!date, !!time, form.name.trim().length > 1 && form.phone.replace(/\D/g, "").length >= 10, true][step];
  const go = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const dateLabel = date ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }) : "";

  if (step === 5 && service && specialist && date && time) {
    const msg = `Hi ÉLAN! I'd like to request an appointment.\nName: ${form.name}\nPhone: ${form.phone}\nService: ${service.name}\nSpecialist: ${specialist.name}\nPreferred date: ${dateLabel}\nPreferred time: ${fmtTime(time)}${pkg ? `\nPackage: ${pkg.name}` : ""}${form.email ? `\nEmail: ${form.email}` : ""}${form.notes ? `\nNotes: ${form.notes}` : ""}\nPlease confirm availability.`;
    return (
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-50 text-emerald-600"><WhatsAppIcon width={36} height={36} /></div>
        <p className="eyebrow mt-6">One last step</p>
        <h2 className="h-section mt-3">Send your request on WhatsApp</h2>
        <p className="lead mt-3">Your appointment is not confirmed yet. Send your details on WhatsApp and our team will confirm availability with you.</p>
        <div className="card mt-8 p-6 text-left text-sm">
          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs text-ink-soft">Service</dt><dd className="font-medium">{service.name}</dd></div>
            <div><dt className="text-xs text-ink-soft">Specialist</dt><dd className="font-medium">{specialist.name}</dd></div>
            <div><dt className="text-xs text-ink-soft">Preferred date &amp; time</dt><dd className="font-medium">{dateLabel}, {fmtTime(time)}</dd></div>
            <div><dt className="text-xs text-ink-soft">Name</dt><dd className="font-medium">{form.name}</dd></div>
          </dl>
        </div>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row"><a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Send request on WhatsApp</a><button type="button" onClick={() => go(4)} className="btn-outline">Edit details</button></div>
        <p className="mt-6 text-xs text-ink-soft">You can also call {site.phone} to arrange your appointment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <ol className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none" aria-label="Booking steps">{steps.map((s, i) => (<li key={s} className="flex items-center gap-1"><button type="button" onClick={() => i < step && go(i)} disabled={i > step} className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${i === step ? "bg-ink text-ivory" : i < step ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-cream text-ink/40"}`} aria-current={i === step ? "step" : undefined}><span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-[10px]">{i < step ? "✓" : i + 1}</span>{s}</button>{i < steps.length - 1 && <span aria-hidden className="h-px w-3 bg-ink/15" />}</li>))}</ol>

        <div className="card mt-6 p-5 sm:p-8">
          {step === 0 && (<div>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Select a service</h2><p className="mt-1 text-sm text-ink-soft">Choose the treatment you'd like to book.{pkg && <> Booking the <strong className="text-ink">{pkg.name}</strong> package — pick the first treatment; we'll schedule the rest with you.</>}</p>
            <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist">{categories.filter((c) => c.slug !== "packages").map((c) => (<button key={c.slug} role="tab" aria-selected={cat === c.slug} onClick={() => setCat(c.slug)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${cat === c.slug ? "bg-ink text-ivory" : "border border-ink/10 hover:border-gold"}`}>{c.name}</button>))}</div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">{services.filter((s) => s.category === cat).map((s) => (<li key={s.slug}><button type="button" onClick={() => { setServiceSlug(s.slug); setStaffSlug(undefined); setDate(undefined); setTime(undefined); }} aria-pressed={serviceSlug === s.slug} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${serviceSlug === s.slug ? "border-gold bg-gold/5 ring-2 ring-gold/30" : "border-ink/10 hover:border-gold/50"}`}><Image src={s.image} alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-lg object-cover" /><span className="min-w-0 flex-1"><span className="block font-medium text-ink">{s.name}</span><span className="block text-xs text-ink-soft">{fmtDuration(s.duration)} · from {fmtPKR(s.price)}</span></span>{serviceSlug === s.slug && <CheckIcon className="shrink-0 text-gold" />}</button></li>))}</ul>
          </div>)}
          {step === 1 && (<div>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Select your beauty specialist</h2><p className="mt-1 text-sm text-ink-soft">Specialists trained for {service?.name}.</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">{eligible.map((m) => (<li key={m.slug}><button type="button" onClick={() => { setStaffSlug(m.slug); setDate(undefined); setTime(undefined); }} aria-pressed={staffSlug === m.slug} className={`flex w-full items-center gap-4 rounded-xl border p-3 text-left transition ${staffSlug === m.slug ? "border-gold bg-gold/5 ring-2 ring-gold/30" : "border-ink/10 hover:border-gold/50"}`}><Image src={m.image} alt={m.alt} width={64} height={64} className="h-16 w-16 shrink-0 rounded-full object-cover object-top" /><span className="min-w-0 flex-1"><span className="block font-medium text-ink">{m.name}</span><span className="block text-xs text-ink-soft">{m.role}</span><span className="mt-1 flex items-center gap-1.5 text-xs"><Stars rating={m.rating} size={11} />{m.rating.toFixed(1)} · {m.experience}+ yrs</span><span className="mt-1 block text-[11px] text-ink-soft">{m.days.join(" · ")}</span></span>{staffSlug === m.slug && <CheckIcon className="shrink-0 text-gold" />}</button></li>))}</ul>
          </div>)}
          {step === 2 && (<div>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Select a date</h2><p className="mt-1 text-sm text-ink-soft">{specialist?.name} works {specialist?.days.join(", ")}. Book up to 60 days ahead.</p>
            <div className="mt-5 flex items-center justify-between"><button type="button" onClick={() => setMonthOffset((m) => Math.max(0, m - 1))} disabled={monthOffset === 0} className="btn-outline !px-3 !py-2 text-xs" aria-label="Previous month">←</button><p className="font-serif text-xl">{viewMonth.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p><button type="button" onClick={() => setMonthOffset((m) => Math.min(2, m + 1))} disabled={monthOffset === 2} className="btn-outline !px-3 !py-2 text-xs" aria-label="Next month">→</button></div>
            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-soft">{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (<span key={d}>{d}</span>))}</div>
            <div className="mt-1 grid grid-cols-7 gap-1">{days.map((d, i) => { if (!d) return <span key={`e${i}`} />; const id = iso(d); const off = !specialist?.workingDays.includes(d.getDay()); const disabled = d < today || d > maxDate || off; const sel = date === id; return (<button key={id} type="button" disabled={disabled} onClick={() => { setDate(id); setTime(undefined); }} aria-pressed={sel} aria-label={d.toDateString()} className={`aspect-square rounded-lg text-sm transition ${sel ? "bg-ink text-ivory" : disabled ? "text-ink/25" : "bg-cream text-ink hover:bg-gold hover:text-white"} ${id === iso(today) && !sel ? "ring-1 ring-gold" : ""}`}>{d.getDate()}</button>); })}</div>
            <p className="mt-3 text-[11px] text-ink-soft">Greyed dates are outside {specialist?.name.split(" ")[0]}'s working days or the booking window.</p>
          </div>)}
          {step === 3 && (<div>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Select a preferred time</h2><p className="mt-1 text-sm text-ink-soft">{dateLabel} · {service && fmtDuration(service.duration)} with {specialist?.name}</p>
            <p className="mt-3 text-xs text-ink-soft">Times are preferences; availability will be confirmed on WhatsApp.</p>
            <>
              <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5" role="radiogroup" aria-label="Preferred times">{slots.map((s) => (<button key={s.time} type="button" role="radio" aria-checked={time === s.time} disabled={!s.available} onClick={() => setTime(s.time)} className={`h-11 rounded-lg text-sm font-medium transition ${time === s.time ? "bg-ink text-ivory" : s.available ? "border border-ink/10 bg-white hover:border-gold hover:text-gold" : "cursor-not-allowed bg-cream text-ink/30 line-through"}`}>{fmtTime(s.time)}</button>))}</div>

              {slots.length === 0 && <p className="mt-4 text-sm text-ink-soft">No slots left on this day — try another date or <a className="underline" href={waLink("Hi ÉLAN! I couldn't find a slot online. Could you help me book?")} target="_blank" rel="noopener noreferrer">ask on WhatsApp</a>.</p>}
            </>
          </div>)}
          {step === 4 && (<form onSubmit={(e) => { e.preventDefault(); if (canNext) go(5); }} noValidate>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">Your details</h2><p className="mt-1 text-sm text-ink-soft">We'll prepare your appointment request for WhatsApp.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><label htmlFor="b-name" className="label">Full name *</label><input id="b-name" required autoComplete="name" className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Amna Rehman" /></div>
              <div><label htmlFor="b-phone" className="label">Phone (WhatsApp) *</label><input id="b-phone" required type="tel" inputMode="tel" autoComplete="tel" className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+92 3xx xxxxxxx" /></div>
              <div className="sm:col-span-2"><label htmlFor="b-email" className="label">Email (optional)</label><input id="b-email" type="email" autoComplete="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></div>
              <div className="sm:col-span-2"><label htmlFor="b-notes" className="label">Notes (optional)</label><textarea id="b-notes" rows={3} className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Allergies, preferences, occasion…" /></div>
            </div>
            <p className="mt-4 text-[11px] text-ink-soft">By booking you agree to our <Link href="/terms" className="underline">terms</Link> and <Link href="/privacy-policy" className="underline">privacy policy</Link>.</p>
          </form>)}
          <div className="mt-8 flex items-center justify-between border-t border-ink/5 pt-5">
            <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn-outline !px-5 !py-2.5 text-xs">Back</button>
            {step < 4 ? <button type="button" onClick={() => go(step + 1)} disabled={!canNext} className="btn-primary !px-6 !py-2.5 text-xs">Continue <ArrowIcon width={14} height={14} /></button> : <button type="button" onClick={() => go(5)} disabled={!canNext} className="btn-gold !px-6 !py-2.5 text-xs">Continue to WhatsApp <ArrowIcon width={14} height={14} /></button>}
          </div>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Booking summary</p>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3"><SparkIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs text-ink-soft">Service</p><p className="font-medium">{service?.name || "Not selected"}</p>{service && <p className="text-xs text-ink-soft">{fmtDuration(service.duration)} · {fmtPKR(service.price)}</p>}</div></li>
            <li className="flex gap-3"><UserIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs text-ink-soft">Specialist</p><p className="font-medium">{specialist?.name || "Not selected"}</p>{specialist && <p className="text-xs text-ink-soft">{specialist.role}</p>}</div></li>
            <li className="flex gap-3"><CalendarIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs text-ink-soft">Date</p><p className="font-medium">{dateLabel || "Not selected"}</p></div></li>
            <li className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs text-ink-soft">Time</p><p className="font-medium">{time ? fmtTime(time) : "Not selected"}</p></div></li>
          </ul>
          {service && <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-4"><span className="text-sm text-ink-soft">Estimated total</span><span className="font-serif text-2xl text-ink">{fmtPKR(service.price)}</span></div>}
          {pkg && <p className="mt-3 rounded-lg bg-cream p-3 text-xs text-ink-soft">Package <strong className="text-ink">{pkg.name}</strong> — {fmtPKR(pkg.price)} total. Our team will schedule the remaining treatments with you.</p>}
          <p className="mt-4 text-[11px] text-ink-soft">Pay at the salon. Free cancellation up to 12 hours before.</p>
        </div>
        <a href={waLink("Hi ÉLAN! I need help booking an appointment online.")} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-3 w-full !py-2.5 text-xs"><WhatsAppIcon width={16} height={16} /> Need help? WhatsApp us</a>
      </aside>
    </div>
  );
}
