import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { landings, getLanding } from "@/lib/landing";
import { getService } from "@/lib/services";
import { testimonials } from "@/lib/content";
import { site, waLink } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import ServiceCard from "@/components/ServiceCard";
import FAQ from "@/components/ui/FAQ";
import Reveal from "@/components/Reveal";
import Stars from "@/components/ui/Stars";
import AppointmentForm from "@/components/AppointmentForm";
import { BookingCTA } from "@/components/CTA";
import { WhatsAppIcon, ArrowIcon, PinIcon, ClockIcon, PhoneIcon, CheckIcon } from "@/components/Icons";

export const dynamicParams = false;
export function generateStaticParams() { return landings.map((l) => ({ landing: l.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ landing: string }> }): Promise<Metadata> {
  const { landing } = await params; const l = getLanding(landing); if (!l) return {};
  return buildMetadata({ title: l.title, description: l.description, path: `/${l.slug}`, image: l.image });
}
export default async function LandingPage({ params }: { params: Promise<{ landing: string }> }) {
  const { landing } = await params; const l = getLanding(landing); if (!l) notFound();
  const svcs = l.services.map(getService).filter(Boolean);
  const revs = testimonials.filter((t) => svcs.some((s) => t.service.toLowerCase().includes(s!.name.split(" ")[0].toLowerCase()))).slice(0, 3);
  const reviews = revs.length >= 2 ? revs : testimonials.slice(0, 3);
  return (
    <>
      <section className="bg-cream"><div className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Breadcrumbs items={[{ name: l.eyebrow, href: `/${l.slug}` }]} />
          <p className="eyebrow mt-6">{l.eyebrow} · Gulberg, Lahore</p>
          <h1 className="h-display mt-3">{l.h1}</h1>
          <p className="lead mt-5">{l.intro[0]}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={l.bookingHref} className="btn-primary !px-8 !py-4">{l.cta} <ArrowIcon width={16} height={16} /></Link><a href={waLink(l.wa)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-8 !py-4"><WhatsAppIcon /> Book on WhatsApp</a></div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">{["4.9/5 client rating", "Women-only studio", "Free parking · Gulberg III"].map((t) => (<li key={t} className="flex items-center gap-1.5"><CheckIcon width={14} height={14} className="text-gold" />{t}</li>))}</ul>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]"><Image src={l.image} alt={`${l.h1} — ÉLAN Beauty Studio`} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
      </div></section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-3">
        <div className="prose-elan lg:col-span-2"><p>{l.intro[1]}</p>{l.sections.map((sec) => (<div key={sec.h2}><h2>{sec.h2}</h2><p>{sec.body}</p></div>))}</div>
        <aside className="space-y-5">
          <div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">ÉLAN Beauty Studio</p><address className="mt-3 space-y-2 not-italic text-sm text-ink-soft"><p className="flex gap-2"><PinIcon className="shrink-0 text-gold" />{site.address.street}, Lahore</p><p className="flex gap-2"><ClockIcon className="shrink-0 text-gold" />Mon–Sat 10–9 · Sun 12–8</p><p className="flex gap-2"><PhoneIcon className="shrink-0 text-gold" /><a href={site.phoneHref} className="hover:text-ink">{site.phone}</a></p></address><div className="mt-4 flex flex-col gap-2"><Link href={l.bookingHref} className="btn-primary !py-2.5 text-xs">{l.cta}</Link><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 text-xs">Get Directions</a></div></div>
          <div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Related</p><ul className="mt-3 space-y-2">{l.related.map((r) => (<li key={r.href}><Link href={r.href} className="flex items-center justify-between text-sm font-medium text-ink hover:text-gold">{r.label} <ArrowIcon width={14} height={14} /></Link></li>))}</ul></div>
        </aside>
      </section>
      <section className="bg-white"><div className="container-x py-16"><Reveal><p className="eyebrow">Services</p><h2 className="h-section mt-3">Book these at ÉLAN</h2></Reveal><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{svcs.map((s, i) => (<Reveal key={s!.slug} delay={(i % 3) * 60}><ServiceCard s={s!} /></Reveal>))}</div></div></section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <Reveal><p className="eyebrow">Reviews</p><h2 className="h-section mt-3">Clients on {l.eyebrow.replace(" Lahore", "").toLowerCase()}</h2><div className="mt-6 space-y-4">{reviews.map((t) => (<blockquote key={t.name} className="card p-5"><Stars rating={t.rating} /><p className="mt-2 text-sm text-ink-soft">“{t.review}”</p><footer className="mt-3 text-xs text-ink-soft"><strong className="text-ink">{t.name}</strong> · {t.service} · {t.area}</footer></blockquote>))}</div></Reveal>
        <Reveal delay={100}><p className="eyebrow">FAQs</p><h2 className="h-section mt-3">Common questions</h2><div className="mt-6"><FAQ items={l.faqs} /></div></Reveal>
      </section>
      <section className="bg-cream"><div className="container-x grid gap-10 py-16 lg:grid-cols-5 lg:items-start"><Reveal className="lg:col-span-2"><p className="eyebrow">Request an appointment</p><h2 className="h-section mt-3">Ready when you are</h2><p className="lead mt-4">Send your preferred date and time — we'll confirm on WhatsApp within minutes during salon hours.</p></Reveal><Reveal delay={100} className="lg:col-span-3"><AppointmentForm compact defaultService={svcs[0]?.name || ""} /></Reveal></div></section>
      <BookingCTA service={l.services[0]} />
    </>
  );
}
