import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { offers, packages } from "@/lib/content";
import { fmtPKR, waLink, waMessages } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import { BookingCTA } from "@/components/CTA";
import { WhatsAppIcon, ArrowIcon } from "@/components/Icons";
export const metadata = buildMetadata({ title: "Salon Offers & Deals in Lahore — First Visit 20% Off, Midweek Facials", description: "Current offers at ÉLAN Beauty Studio Lahore: 20% off your first visit, 15% off midweek facials, bring-a-friend upgrades and bridal season bonuses. Terms apply.", path: "/offers" });
export default function OffersPage() {
  return (
    <>
      <PageHero eyebrow="Offers" title="Current offers at ÉLAN" description="A few thoughtful ways to save — no gimmicks, clearly stated terms." crumbs={[{ name: "Offers", href: "/offers" }]} />
      <section className="container-x py-12 sm:py-16"><div className="grid gap-5 md:grid-cols-2">{offers.map((o, i) => (<Reveal key={o.code} delay={(i % 2) * 80} as="article" className="card card-hover relative overflow-hidden p-7"><div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blush/40 blur-2xl" /><div className="relative"><span className="inline-block rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ivory">{o.discount}</span><h2 className="mt-4 font-serif text-2xl text-ink">{o.title}</h2><p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.desc}</p><dl className="mt-5 grid grid-cols-2 gap-4 text-xs"><div><dt className="uppercase tracking-wider text-ink-soft">Code</dt><dd className="mt-1 font-mono text-sm font-semibold text-ink">{o.code}</dd></div><div><dt className="uppercase tracking-wider text-ink-soft">Valid</dt><dd className="mt-1 text-sm text-ink">{o.validity}</dd></div></dl><p className="mt-4 text-[11px] text-ink-soft">Terms: {o.terms}</p><div className="mt-5 flex gap-2"><Link href="/booking" className="btn-primary !py-2.5 text-xs">Book & Redeem <ArrowIcon width={14} height={14} /></Link><a href={waLink(waMessages.offers)} target="_blank" rel="noopener noreferrer" className="btn-outline !py-2.5 text-xs"><WhatsAppIcon width={14} height={14} className="text-[#25D366]" /> Ask</a></div></div></Reveal>))}</div>
        <div className="mt-16"><Reveal><p className="eyebrow">Also save with</p><h2 className="h-section mt-3">Packages</h2></Reveal><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{packages.slice(0, 3).map((p) => (<Link key={p.slug} href={`/packages#${p.slug}`} className="card card-hover flex items-center justify-between p-5"><div><p className="font-serif text-lg text-ink">{p.name}</p><p className="text-xs text-ink-soft">{p.tagline}</p></div><div className="text-right"><p className="text-xs text-ink-soft line-through">{fmtPKR(p.original)}</p><p className="font-semibold">{fmtPKR(p.price)}</p></div></Link>))}</div></div>
      </section>
      <BookingCTA />
    </>
  );
}
