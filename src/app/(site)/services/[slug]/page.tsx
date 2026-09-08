import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, serviceSchema } from "@/lib/seo";
import { services, getService, getCategory, servicesByCategory } from "@/lib/services";
import { getStaff } from "@/lib/staff";
import { posts } from "@/lib/blog";
import { fmtPKR, fmtDuration, waLink, waMessages } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import FAQ from "@/components/ui/FAQ";
import Stars from "@/components/ui/Stars";
import { CheckIcon, ClockIcon, WhatsAppIcon, ArrowIcon } from "@/components/Icons";

export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const s = getService(slug); if (!s) return {};
  return buildMetadata({ title: `${s.name} in Lahore — Price, Duration & What's Included`, description: `${s.short} ${s.name} at ÉLAN Beauty Studio, Gulberg Lahore from ${fmtPKR(s.price)} (${fmtDuration(s.duration)}). Book online.`, path: `/services/${s.slug}`, image: s.image });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const s = getService(slug); if (!s) notFound();
  const cat = getCategory(s.category)!; const team = s.staff.map(getStaff).filter(Boolean);
  const related = servicesByCategory(s.category).filter((x) => x.slug !== s.slug).slice(0, 3);
  const relPosts = posts.filter((p) => p.related.includes(s.slug)).slice(0, 2);
  const faqs = [
    { q: `How much does ${s.name.toLowerCase()} cost in Lahore?`, a: `At ÉLAN Beauty Studio, ${s.name} starts from ${fmtPKR(s.price)}. The final price is confirmed at consultation depending on hair length, skin needs or add-ons.` },
    { q: `How long does the ${s.name.toLowerCase()} appointment take?`, a: `Please allow around ${fmtDuration(s.duration)}, including consultation. We'll confirm timing when you book.` },
    { q: `Who will perform my ${s.name.toLowerCase()}?`, a: `${team.map((t) => t!.name).join(" or ")} — ${team.length > 1 ? "both are" : "a"} dedicated ${cat.name.toLowerCase()} specialist${team.length > 1 ? "s" : ""}. You can choose your specialist when booking online.` },
  ];
  return (
    <>
      <JsonLd data={serviceSchema(s)} />
      <section className="bg-cream"><div className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:items-center">
        <div>
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: cat.name, href: `/services#${cat.slug}` }, { name: s.name, href: `/services/${s.slug}` }]} />
          <p className="eyebrow mt-6">{cat.name} · {cat.keyword}</p>
          <h1 className="h-display mt-3">{s.name}</h1>
          <p className="lead mt-5">{s.short}</p>
          <dl className="mt-6 flex flex-wrap gap-6 text-sm"><div><dt className="text-xs uppercase tracking-wider text-ink-soft">Starting price</dt><dd className="font-serif text-3xl text-ink">{fmtPKR(s.price)}</dd></div><div><dt className="text-xs uppercase tracking-wider text-ink-soft">Duration</dt><dd className="mt-1 inline-flex items-center gap-1.5 font-serif text-3xl text-ink"><ClockIcon className="text-gold" />{fmtDuration(s.duration)}</dd></div><div><dt className="text-xs uppercase tracking-wider text-ink-soft">Rating</dt><dd className="mt-2 flex items-center gap-2"><Stars rating={4.9} /><span className="font-semibold">4.9</span></dd></div></dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/booking?service=${s.slug}`} className="btn-primary !px-8 !py-4">Book Appointment <ArrowIcon width={16} height={16} /></Link><a href={waLink(waMessages.service(s.name))} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-8 !py-4"><WhatsAppIcon /> Book via WhatsApp</a></div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/4] lg:aspect-[4/5]"><Image src={s.image} alt={s.alt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div>
      </div></section>
      <section className="container-x grid gap-12 py-16 lg:grid-cols-3">
        <div className="prose-elan lg:col-span-2">
          <h2 className="!mt-0">About this treatment</h2><p>{s.description}</p>
          <div className="grid gap-6 sm:grid-cols-2 not-prose">
            <div className="card p-6"><h3 className="font-serif text-xl text-ink">Benefits</h3><ul className="mt-3 space-y-2">{s.benefits.map((b) => (<li key={b} className="flex gap-2 text-sm text-ink-soft"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" />{b}</li>))}</ul></div>
            <div className="card p-6"><h3 className="font-serif text-xl text-ink">What's included</h3><ul className="mt-3 space-y-2">{s.included.map((b) => (<li key={b} className="flex gap-2 text-sm text-ink-soft"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" />{b}</li>))}</ul></div>
          </div>
          <h2>Your specialists</h2>
          <div className="not-prose grid gap-4 sm:grid-cols-2">{team.map((t) => (<Link key={t!.slug} href={`/our-team/${t!.slug}`} className="card card-hover flex items-center gap-4 p-4"><Image src={t!.image} alt={t!.alt} width={64} height={64} className="h-16 w-16 rounded-full object-cover" /><div><p className="font-serif text-lg text-ink">{t!.name}</p><p className="text-xs text-ink-soft">{t!.role} · {t!.experience}+ yrs</p><Stars rating={t!.rating} className="mt-1" size={12} /></div></Link>))}</div>
          <h2>Frequently asked</h2><div className="not-prose"><FAQ items={faqs} /></div>
        </div>
        <aside className="space-y-6">
          <div className="card sticky top-28 p-6"><p className="eyebrow">Book {s.name}</p><p className="mt-2 font-serif text-3xl text-ink">{fmtPKR(s.price)}</p><p className="text-xs text-ink-soft">{fmtDuration(s.duration)} · {cat.name}</p><Link href={`/booking?service=${s.slug}`} className="btn-primary mt-5 w-full">Choose date & time</Link><a href={waLink(waMessages.service(s.name))} target="_blank" rel="noopener noreferrer" className="btn-outline mt-2 w-full"><WhatsAppIcon className="text-[#25D366]" /> Ask on WhatsApp</a><p className="mt-4 text-[11px] leading-relaxed text-ink-soft">First visit? Use code <strong className="text-ink">WELCOME20</strong> for 20% off. See <Link href="/offers" className="underline">offers</Link>.</p>
            {relPosts.length > 0 && <div className="mt-6 border-t border-ink/5 pt-4"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Read more</p><ul className="mt-2 space-y-2">{relPosts.map((p) => (<li key={p.slug}><Link href={`/blog/${p.slug}`} className="text-sm font-medium text-ink hover:text-gold">{p.title}</Link></li>))}</ul></div>}
          </div>
        </aside>
      </section>
      {related.length > 0 && <section className="bg-white"><div className="container-x py-16"><Reveal><p className="eyebrow">You may also like</p><h2 className="h-section mt-3">More {cat.name.toLowerCase()} services</h2></Reveal><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r, i) => (<Reveal key={r.slug} delay={i * 70}><ServiceCard s={r} /></Reveal>))}</div></div></section>}
    </>
  );
}
