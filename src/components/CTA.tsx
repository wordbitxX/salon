import Link from "next/link";
import Image from "next/image";
import { waLink, waMessages, wordbitx, wordbitxWaLink, wordbitxMessages } from "@/lib/site";
import { WhatsAppIcon, ArrowIcon, PhoneIcon } from "./Icons";
import Reveal from "./Reveal";

export function BookingCTA({ title = "Ready to feel your best?", text = "Book online in under a minute, or message us on WhatsApp and we'll find the perfect slot for you.", service }: { title?: string; text?: string; service?: string }) {
  return (
    <section className="container-x py-16 sm:py-20" aria-labelledby="cta-heading">
      <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-ivory sm:px-12 sm:py-20">
        <Image src="/images/interior.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" aria-hidden />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-ink via-ink/90 to-gold-deep/60" />
        <div className="relative">
          <p className="eyebrow !text-gold">Book Your Appointment</p>
          <h2 id="cta-heading" className="mx-auto mt-3 max-w-2xl font-serif text-3xl sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/75">{text}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={service ? `/booking?service=${service}` : "/booking"} className="btn-gold">Book an Appointment <ArrowIcon width={16} height={16} /></Link>
            <a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsAppIcon className="text-[#25D366]" /> Chat on WhatsApp</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function WordbitXShowcase() {
  return (
    <section className="border-y border-ink/5 bg-white" aria-labelledby="wbx-heading">
      <div className="container-x grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Solution by WordbitX</p>
          <h2 id="wbx-heading" className="h-section mt-3">Powering Modern Beauty Businesses</h2>
          <p className="lead mt-4">From beautiful websites to online bookings and customer management, WordbitX builds digital solutions that help businesses grow. This salon website, its online appointment booking system and its admin dashboard were designed and developed by WordbitX as a complete beauty business solution.</p>
          <ul className="mt-6 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            {["Salon Website Development", "Online Appointment Booking System", "Salon Management Software", "Beauty Salon CRM & Leads", "Local SEO for Salons", "WhatsApp & Social Integration"].map((f) => (<li key={f} className="flex items-center gap-2"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold" />{f}</li>))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="btn-primary">Build Your Business With WordbitX <ArrowIcon width={16} height={16} /></a>
            <Link href="/admin" className="btn-outline">View Admin Demo</Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 pt-5 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">Talk to WordbitX</span>
            <a href={wordbitx.phoneHref} className="inline-flex items-center gap-2 font-semibold text-ink transition hover:text-gold"><PhoneIcon width={15} height={15} className="text-gold" /> {wordbitx.phone}</a>
            <a href={wordbitxWaLink(wordbitxMessages.quote)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-ink-soft transition hover:text-gold"><WhatsAppIcon width={15} height={15} className="text-[#22a75b]" /> WhatsApp WordbitX</a>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="card overflow-hidden p-2">
            <div className="rounded-xl bg-cream p-5">
              <div className="flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Salon Dashboard</p><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Live demo</span></div>
              <div className="mt-4 grid grid-cols-3 gap-3">{[["Today", "14"], ["Revenue", "Rs 186k"], ["New clients", "+23"]].map(([l, v]) => (<div key={l} className="rounded-lg bg-white p-3"><p className="text-[10px] text-ink-soft">{l}</p><p className="font-serif text-xl text-ink">{v}</p></div>))}</div>
              <div className="mt-3 flex h-28 items-end gap-1.5 rounded-lg bg-white p-3" aria-hidden>{[40, 55, 48, 70, 62, 85, 78, 92, 74, 88, 95, 90].map((h, i) => (<span key={i} className="flex-1 rounded-t bg-gold/80" style={{ height: `${h}%` }} />))}</div>
              <div className="mt-3 space-y-2">{[["Amna R.", "Bridal Trial", "11:00"], ["Sana T.", "Balayage", "12:30"], ["Hina J.", "HydraFacial", "2:00"]].map(([n, s, t]) => (<div key={n} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs"><span className="font-medium">{n}</span><span className="text-ink-soft">{s}</span><span className="rounded-full bg-cream px-2 py-0.5">{t}</span></div>))}</div>
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-ink-soft">Website + Local SEO + Online Booking + WhatsApp Leads + Salon CRM — <a href={wordbitxWaLink()} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-gold">Request a Demo</a></p>
        </Reveal>
      </div>
    </section>
  );
}
