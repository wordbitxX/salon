import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { locations, getLocation } from "@/lib/locations";
import { getService } from "@/lib/services";
import { testimonials } from "@/lib/content";
import { site, SITE_URL, waLink, waMessages } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import ServiceCard from "@/components/ServiceCard";
import FAQ from "@/components/ui/FAQ";
import Reveal from "@/components/Reveal";
import Stars from "@/components/ui/Stars";
import JsonLd from "@/components/JsonLd";
import { BookingCTA } from "@/components/CTA";
import { CheckIcon, PinIcon, ClockIcon, WhatsAppIcon, ArrowIcon } from "@/components/Icons";
export function generateStaticParams() { return locations.map((l) => ({ slug: l.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const l = getLocation(slug); if (!l) return {};
  return buildMetadata({ title: l.title, description: l.description, path: `/locations/${l.slug}` });
}
export default async function LocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const l = getLocation(slug); if (!l) notFound();
  const svcs = l.services.map(getService).filter(Boolean);
  const others = locations.filter((x) => x.slug !== l.slug);
  const revs = testimonials.slice(0, 3);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BeautySalon", "@id": `${SITE_URL}/#salon`, name: site.name, url: `${SITE_URL}/locations/${l.slug}`, areaServed: { "@type": "Place", name: `${l.name}, Lahore` }, address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" }, telephone: site.phone }} />
      <PageHero eyebrow={l.kind === "studio" ? `Our Studio · ${l.name}` : `Service Area · ${l.name}`} title={l.h1} description={l.travel} crumbs={[{ name: "Locations", href: "/locations/lahore" }, { name: l.name, href: `/locations/${l.slug}` }]}><div className="flex flex-col gap-3 sm:flex-row"><Link href="/booking" className="btn-primary">Book an Appointment <ArrowIcon width={16} height={16} /></Link><a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Book via WhatsApp</a><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-outline">Get Directions</a></div>{l.kind === "service-area" && <p className="mt-4 text-xs text-ink-soft">ÉLAN has one studio, in Gulberg III. {l.name} is a service area we welcome clients from and cover with on-location bridal &amp; party makeup.</p>}</PageHero>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-2 lg:items-center"><Reveal className="prose-elan">{l.intro.map((p) => (<p key={p.slice(0, 20)}>{p}</p>))}</Reveal><Reveal delay={100}><div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src="/images/interior.jpg" alt={`ÉLAN Beauty Studio, beauty salon serving ${l.name}, Lahore`} fill sizes="(max-width:1024px) 100vw, 50vw" loading="lazy" className="object-cover" /></div></Reveal></section>
      <section className="bg-white"><div className="container-x py-16"><Reveal><p className="eyebrow">Popular with {l.name} clients</p><h2 className="h-section mt-3">Services our {l.name} clients book most</h2></Reveal><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{svcs.map((s, i) => (<Reveal key={s!.slug} delay={(i % 3) * 60}><ServiceCard s={s!} /></Reveal>))}</div></div></section>
      <section className="container-x grid gap-10 py-16 lg:grid-cols-3">
        <Reveal><p className="eyebrow">Why choose ÉLAN</p><h2 className="h-section mt-3">For {l.name}</h2><ul className="mt-6 space-y-3">{l.why.map((w) => (<li key={w} className="flex gap-2.5 text-sm text-ink"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" />{w}</li>))}</ul></Reveal>
        <Reveal delay={80} className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Visit us</p><address className="mt-3 not-italic text-sm text-ink-soft"><p className="flex gap-2"><PinIcon className="shrink-0 text-gold" />{site.address.street}, Lahore</p><p className="mt-2 text-xs">{l.landmark}</p></address><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">Opening hours</p><ul className="mt-2 space-y-1 text-sm text-ink-soft">{site.hours.map((h) => (<li key={h.days} className="flex gap-2"><ClockIcon width={16} height={16} className="shrink-0 text-gold" />{h.days}: {h.open} – {h.close}</li>))}</ul><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-ink-soft">Nearby areas we serve</p><ul className="mt-2 flex flex-wrap gap-1.5">{l.nearby.map((n) => (<li key={n} className="rounded-full bg-cream px-2.5 py-1 text-[11px] text-ink-soft">{n}</li>))}</ul></Reveal>
        <Reveal delay={160} className="overflow-hidden rounded-2xl border border-ink/5 bg-white"><div className="flex items-center justify-between gap-3 border-b border-ink/5 px-4 py-3"><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Our Studio</p><p className="truncate text-sm font-medium text-ink">{site.address.street}, Gulberg III</p></div><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs font-semibold text-gold-deep hover:text-gold">Directions →</a></div><iframe title={`Map to ÉLAN Beauty Studio, Gulberg III — serving ${l.name}, Lahore`} src={site.mapsEmbed} className="h-64 w-full sm:h-72" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></Reveal>
      </section>
      <section className="bg-cream"><div className="container-x grid gap-12 py-16 lg:grid-cols-2">
        <Reveal><p className="eyebrow">Reviews</p><h2 className="h-section mt-3">What clients say</h2><div className="mt-6 space-y-4">{revs.map((t) => (<blockquote key={t.name} className="card p-5"><Stars rating={t.rating} /><p className="mt-2 text-sm text-ink-soft">“{t.review}”</p><footer className="mt-3 text-xs text-ink-soft"><strong className="text-ink">{t.name}</strong> · {t.service} · {t.area}</footer></blockquote>))}</div></Reveal>
        <Reveal delay={100}><p className="eyebrow">FAQs</p><h2 className="h-section mt-3">{l.name} questions</h2><div className="mt-6"><FAQ items={l.faqs} /></div><p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft">Other areas</p><ul className="mt-2 flex flex-wrap gap-2">{others.map((o) => (<li key={o.slug}><Link href={`/locations/${o.slug}`} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-medium hover:border-gold hover:text-gold">Salon near {o.name}</Link></li>))}</ul></Reveal>
      </div></section>
      <BookingCTA title={`Book your visit from ${l.name}`} />
    </>
  );
}
