import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { categories, servicesByCategory } from "@/lib/services";
import { packages } from "@/lib/content";
import { fmtPKR, fmtDuration } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import { BookingCTA } from "@/components/CTA";
import { ArrowIcon, ClockIcon } from "@/components/Icons";

export const metadata = buildMetadata({ title: "Salon Services & Prices in Lahore — Hair, Facials, Makeup, Nails & Spa", description: "Browse ÉLAN's full service menu with transparent prices: haircuts, hair colour, keratin, facials, HydraFacial, party & bridal makeup, manicure, lashes, brows and spa in Lahore.", path: "/services" });

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Service Menu" title="Beauty services in Lahore, with prices you can see" description="Every treatment is delivered by a dedicated specialist and priced transparently. Choose a category to explore, or book directly." crumbs={[{ name: "Services", href: "/services" }]}>
        <ul className="flex flex-wrap gap-2">{categories.map((c) => (<li key={c.slug}><a href={`#${c.slug}`} className="inline-block rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-medium text-ink transition hover:border-gold hover:bg-gold hover:text-white">{c.name}</a></li>))}</ul>
      </PageHero>
      <div className="container-x py-12 sm:py-16">
        {categories.map((c, ci) => {
          const list = c.slug === "packages" ? [] : servicesByCategory(c.slug);
          return (
            <section key={c.slug} id={c.slug} className="scroll-mt-24 border-b border-ink/5 py-12 last:border-0" aria-labelledby={`${c.slug}-h`}>
              <div className="grid gap-8 lg:grid-cols-12">
                <Reveal className="lg:col-span-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:sticky lg:top-28"><Image src={c.image} alt={`${c.name} services at ÉLAN, ${c.keyword}`} fill sizes="(max-width:1024px) 100vw, 33vw" loading={ci === 0 ? "eager" : "lazy"} className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" /><div className="absolute bottom-0 p-6 text-ivory"><p className="eyebrow !text-gold">{c.tagline}</p><h2 id={`${c.slug}-h`} className="mt-1 font-serif text-3xl">{c.name}</h2></div></div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                  {c.slug === "bridal" && <Link href="/bridal" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep hover:text-gold">Explore the bridal experience <ArrowIcon width={14} height={14} /></Link>}
                </Reveal>
                <div className="lg:col-span-8">
                  {c.slug === "packages" ? (
                    <div className="grid gap-4 sm:grid-cols-2">{packages.map((p) => (<Reveal key={p.slug} className="card p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-xl text-ink">{p.name}</h3><p className="text-xs text-ink-soft">{p.tagline}</p></div><div className="text-right"><p className="text-xs text-ink-soft line-through">{fmtPKR(p.original)}</p><p className="font-semibold text-ink">{fmtPKR(p.price)}</p></div></div><Link href={`/packages#${p.slug}`} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep hover:text-gold">View package <ArrowIcon width={14} height={14} /></Link></Reveal>))}</div>
                  ) : (
                    <ul className="divide-y divide-ink/5 rounded-2xl border border-ink/5 bg-white">
                      {list.map((s, i) => (
                        <Reveal key={s.slug} as="li" delay={i * 40} className="group grid grid-cols-[72px_1fr] items-center gap-4 p-4 sm:grid-cols-[96px_1fr_auto] sm:p-5">
                          <Link href={`/services/${s.slug}`} className="relative block aspect-square overflow-hidden rounded-xl" aria-label={`${s.name} — view details`}><Image src={s.image} alt={s.alt} fill sizes="(max-width: 640px) 72px, 96px" loading="lazy" className="object-cover transition duration-500 group-hover:scale-105" /></Link>
                          <div><h3 className="font-serif text-xl text-ink"><Link href={`/services/${s.slug}`} className="hover:text-gold">{s.name}</Link>{s.popular && <span className="ml-2 rounded-full bg-cream px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-gold-deep">Popular</span>}</h3><p className="mt-1 text-sm text-ink-soft">{s.short}</p><p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-soft"><ClockIcon width={13} height={13} className="text-gold" />{fmtDuration(s.duration)}</p></div>
                          <div className="col-span-2 flex items-center justify-between gap-4 border-t border-ink/5 pt-3 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0"><p className="font-semibold text-ink">{fmtPKR(s.price)}</p><Link href={`/booking?service=${s.slug}`} className="btn-primary !px-4 !py-2 text-xs">Book</Link></div>
                        </Reveal>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <BookingCTA />
    </>
  );
}
