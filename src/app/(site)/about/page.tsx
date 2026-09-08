import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { BookingCTA } from "@/components/CTA";
import { stats } from "@/lib/content";
import { staff } from "@/lib/staff";
import StaffCard from "@/components/StaffCard";

export const metadata = buildMetadata({ title: "About ÉLAN Beauty Studio — Premium Ladies Salon in Gulberg, Lahore", description: "Founded in 2015, ÉLAN Beauty Studio is a specialist-led, women-only beauty salon in Gulberg, Lahore. Learn about our story, standards and the team behind 5,000+ happy clients.", path: "/about", image: "/images/interior.jpg" });

const values = [
  { t: "Specialists, not generalists", d: "Every ÉLAN professional focuses on one craft — hair, skin, makeup, nails or lashes — and trains continuously in it." },
  { t: "Hygiene you can see", d: "Autoclave-sterilised tools opened in front of you, single-use files and fresh linens for every client. No exceptions." },
  { t: "Honest advice", d: "If a treatment won't suit your hair or skin, we'll tell you — even if it means a smaller bill today." },
  { t: "A calm, private space", d: "Women-only, private treatment rooms, soft light and no rush. Your appointment is your time." },
];
const timeline = [["2015", "Mahnoor Elahi opens ÉLAN on Main Boulevard, Gulberg III with a team of four."], ["2017", "Hair floor expands; Sofia Khan joins as senior stylist."], ["2019", "Bridal studio launches; Ayesha Malik joins as lead artist."], ["2021", "Skin clinic and HydraFacial suite added under Maya Ahmed."], ["2023", "Private spa suites open; 4,000th client welcomed."], ["2025", "New digital experience — online booking, CRM and client app — designed by WordbitX."]];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our Story" title="A premium beauty salon in Lahore, built on trust" description="Since 2015, ÉLAN has been the ladies salon Lahore women recommend to their sisters, friends and daughters — because we listen first, and we never cut corners." crumbs={[{ name: "About", href: "/about" }]} />
      <section className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <Reveal><div className="relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src="/images/interior.jpg" alt="Interior of ÉLAN Beauty Studio, a premium ladies salon in Gulberg Lahore" fill sizes="(max-width:1024px) 100vw, 50vw" priority className="object-cover" /></div></Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Why ÉLAN exists</p>
          <h2 className="h-section mt-3">We started with a frustration every woman in Lahore knows</h2>
          <div className="prose-elan mt-5"><p>Salons that looked beautiful on Instagram but rushed you through the chair. Colourists who didn't ask questions. Facials that broke you out. Bridal artists who disappeared after the deposit.</p><p>ÉLAN was founded to be the opposite: a place where the consultation matters as much as the service, where prices are published, where tools are sterilised in front of you, and where the person doing your hair does hair — and only hair — every single day.</p><p>Ten years and more than five thousand clients later, that's still the whole idea.</p></div>
          <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">{stats.map((s) => (<div key={s.label}><dd className="font-serif text-3xl text-ink">{s.value}</dd><dt className="text-xs text-ink-soft">{s.label}</dt></div>))}</dl>
        </Reveal>
      </section>
      <section className="bg-white"><div className="container-x py-16 sm:py-24">
        <Reveal><SectionHeading eyebrow="Our Standards" title="What you can always expect" /></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{values.map((v, i) => (<Reveal key={v.t} delay={i * 70} className="card p-6"><span className="font-serif text-4xl text-gold">0{i + 1}</span><h3 className="mt-3 font-serif text-xl text-ink">{v.t}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.d}</p></Reveal>))}</div>
      </div></section>
      <section className="container-x py-16 sm:py-24"><div className="grid gap-12 lg:grid-cols-2">
        <Reveal><p className="eyebrow">Milestones</p><h2 className="h-section mt-3">A decade of growing with Lahore</h2><ol className="mt-8 space-y-6 border-l border-gold/40 pl-6">{timeline.map(([y, t]) => (<li key={y} className="relative"><span aria-hidden className="absolute -left-[1.85rem] top-1.5 h-3 w-3 rounded-full border-2 border-gold bg-ivory" /><p className="font-serif text-2xl text-gold-deep">{y}</p><p className="text-sm text-ink-soft">{t}</p></li>))}</ol></Reveal>
        <Reveal delay={100} className="card p-8"><p className="eyebrow">Our promise</p><blockquote className="mt-4 font-serif text-2xl leading-snug text-ink sm:text-3xl">“You should leave ÉLAN feeling like the best version of yourself — not a version of someone else.”</blockquote><p className="mt-4 text-sm text-ink-soft">— The ÉLAN team</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/booking" className="btn-primary">Book an Appointment</Link><Link href="/gallery" className="btn-outline">See Our Work</Link></div></Reveal>
      </div></section>
      <section className="bg-cream"><div className="container-x py-16 sm:py-24"><Reveal><SectionHeading eyebrow="The Team" title="Led by specialists you'll come back to" /></Reveal><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{staff.slice(0, 3).map((m, i) => (<Reveal key={m.slug} delay={i * 70}><StaffCard m={m} /></Reveal>))}</div><div className="mt-10 text-center"><Link href="/our-team" className="btn-outline">Meet Everyone</Link></div></div></section>
      <BookingCTA />
    </>
  );
}
