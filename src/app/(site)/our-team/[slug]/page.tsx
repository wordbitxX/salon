import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { staff, getStaff } from "@/lib/staff";
import { services } from "@/lib/services";
import { waLink, waMessages, SITE_URL } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Stars from "@/components/ui/Stars";
import ServiceCard from "@/components/ServiceCard";
import InitialsAvatar from "@/components/ui/InitialsAvatar";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon, InstagramIcon } from "@/components/Icons";
export function generateStaticParams() { return staff.map((s) => ({ slug: s.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const m = getStaff(slug); if (!m) return {};
  return buildMetadata({ title: `${m.name} — ${m.role} in Lahore`, description: `${m.bio} Book ${m.name.split(" ")[0]} at ÉLAN Beauty Studio, Gulberg Lahore. Rated ${m.rating}/5 from ${m.reviews} reviews.`, path: `/our-team/${m.slug}`, image: m.image || "/images/interior.jpg" });
}
export default async function StaffPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const m = getStaff(slug); if (!m) notFound();
  const mine = services.filter((s) => s.staff.includes(m.slug));
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: m.name, jobTitle: m.role, image: m.image || undefined, url: `${SITE_URL}/our-team/${m.slug}`, worksFor: { "@id": `${SITE_URL}/#salon` }, sameAs: [m.instagram] }} />
      <section className="bg-cream"><div className="container-x grid gap-10 py-10 sm:py-14 lg:grid-cols-5 lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] lg:col-span-2">{m.image ? <Image src={m.image} alt={m.alt} fill priority sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" /> : <InitialsAvatar name={m.name} decorative textClassName="text-[7rem]" className="absolute inset-0" />}</div>
        <div className="lg:col-span-3">
          <Breadcrumbs items={[{ name: "Our Team", href: "/our-team" }, { name: m.name, href: `/our-team/${m.slug}` }]} />
          <p className="eyebrow mt-6">{m.role}</p><h1 className="h-display mt-3">{m.name}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm"><span className="inline-flex items-center gap-2"><Stars rating={m.rating} /><strong>{m.rating.toFixed(1)}</strong> <span className="text-ink-soft">({m.reviews} reviews)</span></span><span className="text-ink-soft">{m.experience}+ years experience</span></div>
          <p className="lead mt-5">{m.bio}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Specialties</p><ul className="mt-2 flex flex-wrap gap-1.5">{m.specialties.map((s) => (<li key={s} className="rounded-full bg-cream px-2.5 py-1 text-xs">{s}</li>))}</ul></div><div className="card p-4"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Available days</p><ul className="mt-2 flex flex-wrap gap-1.5">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (<li key={d} className={`rounded-full px-2.5 py-1 text-xs ${m.days.includes(d) ? "bg-ink text-ivory" : "bg-cream text-ink/30 line-through"}`}>{d}</li>))}</ul></div></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/booking?staff=${m.slug}`} className="btn-primary !px-8 !py-4">Book with {m.name.split(" ")[0]}</Link><a href={waLink(waMessages.staff(m.name))} target="_blank" rel="noopener noreferrer" className="btn-outline !px-6 !py-4"><WhatsAppIcon className="text-[#25D366]" /> WhatsApp</a><a href={m.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on Instagram`} className="btn-outline !px-4 !py-4"><InstagramIcon /></a></div>
        </div>
      </div></section>
      <section className="container-x py-16"><p className="eyebrow">Services by {m.name.split(" ")[0]}</p><h2 className="h-section mt-3">Book one of {m.name.split(" ")[0]}'s treatments</h2><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{mine.map((s) => (<ServiceCard key={s.slug} s={s} />))}</div></section>
    </>
  );
}
