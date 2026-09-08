import Image from "next/image";
import Link from "next/link";
import { buildMetadata, productSchema } from "@/lib/seo";
import { packages } from "@/lib/content";
import { fmtPKR, fmtDuration, waLink, waMessages } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { BookingCTA } from "@/components/CTA";
import { CheckIcon, WhatsAppIcon, ClockIcon } from "@/components/Icons";
export const metadata = buildMetadata({ title: "Salon Packages in Lahore — Glow, Bridal Glow, Self Care & Spa Day", description: "Save with ÉLAN's curated salon packages in Lahore: Glow Package (hair + facial + manicure), Bridal Glow, Self Care, Colour Refresh, Complete Bridal and Spa Day. Transparent pricing.", path: "/packages" });
export default function PackagesPage() {
  return (
    <>
      <JsonLd data={packages.map(productSchema)} />
      <PageHero eyebrow="Packages" title="Curated packages, genuine savings" description="Thoughtfully bundled treatments delivered in one relaxed visit — priced lower than booking separately." crumbs={[{ name: "Packages", href: "/packages" }]} />
      <section className="container-x py-12 sm:py-16"><div className="grid gap-6 md:grid-cols-2">
        {packages.map((p, i) => (<Reveal key={p.slug} delay={(i % 2) * 80} as="article" className="card card-hover overflow-hidden scroll-mt-28" ><div id={p.slug} className="grid sm:grid-cols-5"><div className="relative aspect-[4/3] sm:col-span-2 sm:aspect-auto"><Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw, 30vw" loading={i < 2 ? "eager" : "lazy"} className="object-cover" />{p.badge && <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{p.badge}</span>}</div><div className="p-6 sm:col-span-3"><h2 className="font-serif text-2xl text-ink">{p.name}</h2><p className="text-sm text-ink-soft">{p.tagline}</p><ul className="mt-4 space-y-1.5">{p.includes.map((x) => (<li key={x} className="flex gap-2 text-sm text-ink-soft"><CheckIcon width={14} height={14} className="mt-1 shrink-0 text-gold" />{x}</li>))}</ul><p className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-soft"><ClockIcon width={13} height={13} className="text-gold" />Approx. {fmtDuration(p.duration)}</p><div className="mt-4 flex items-end justify-between border-t border-ink/5 pt-4"><div><p className="text-xs text-ink-soft"><span className="line-through">{fmtPKR(p.original)}</span> original</p><p className="font-serif text-3xl text-ink">{fmtPKR(p.price)}</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Save {fmtPKR(p.original - p.price)} ({Math.round(((p.original - p.price) / p.original) * 100)}%)</span></div><div className="mt-4 flex gap-2"><Link href={`/booking?package=${p.slug}`} className="btn-primary flex-1 !py-2.5 text-xs">Book Package</Link><a href={waLink(waMessages.pkg(p.name))} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${p.name} on WhatsApp`} className="btn-whatsapp !px-3 !py-2.5"><WhatsAppIcon width={16} height={16} /></a></div></div></div></Reveal>))}
      </div><p className="mt-8 text-center text-xs text-ink-soft">Packages can be used in one visit or split across two visits within 30 days. Not combinable with other offers. See <Link href="/offers" className="underline">current offers</Link>.</p></section>
      <BookingCTA />
    </>
  );
}
