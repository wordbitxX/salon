import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { servicesByCategory, getService } from "@/lib/services";
import { packages, testimonials } from "@/lib/content";
import { getStaff } from "@/lib/staff";
import { waLink, waMessages, fmtPKR } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQ from "@/components/ui/FAQ";
import Stars from "@/components/ui/Stars";
import { WhatsAppIcon, ArrowIcon, CheckIcon } from "@/components/Icons";

export const metadata = buildMetadata({ title: "Bridal Makeup in Lahore — Bridal Salon, Hair, Mehndi & Packages", description: "ÉLAN is the bridal salon Lahore brides trust: signature bridal makeup by Ayesha Malik, bridal hair, mehndi, pre-bridal skin programmes and complete bridal packages. Book a consultation.", path: "/bridal", image: "/images/bridal.jpg" });

const steps = [["Consultation", "We discuss your events, outfits, jewellery and the mood you want — soft, classic, editorial."], ["Skin preparation", "A 3-month pre-bridal skin programme so your base is glowing, not covered."], ["Trial", "A full trial 3–6 weeks out, in daylight, with your dupatta and jewellery."], ["The big day", "Lead artist, luxury products, 16-hour wear, touch-up kit and a calm, private bridal suite."]];
const bridalFaqs = [
  { q: "How much does bridal makeup cost in Lahore at ÉLAN?", a: "Signature Bridal Makeup with hair starts at Rs 45,000 per event including a complimentary trial. Our Complete Bridal Experience (mehndi, barat, walima, pre-bridal skin and mehndi application) is Rs 135,000." },
  { q: "Is a trial included?", a: "Yes — every bridal booking includes one complimentary trial with your artist." },
  { q: "Do you travel to venues in Lahore?", a: "Yes. On-location bridal services are available across Lahore including DHA, Bahria Town and Cantt for bookings of two or more looks." },
  { q: "How far in advance should I book?", a: "For October–March weddings, 2–4 months. A 30% deposit secures your date and artist." },
  { q: "Can family members get makeup done on the same day?", a: "Absolutely. We regularly style 4–8 family members alongside the bride, in-studio or on location." },
];
export default function BridalPage() {
  const bridalServices = [...servicesByCategory("bridal"), getService("engagement-makeup")!, getService("party-makeup")!];
  const ayesha = getStaff("ayesha-malik")!;
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <Image src="/images/bridal.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-40" aria-hidden />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/30" />
        <div className="container-x relative py-20 sm:py-28 lg:py-36">
          <Breadcrumbs light items={[{ name: "Bridal", href: "/bridal" }]} />
          <p className="eyebrow mt-8 animate-rise">Bridal by ÉLAN · Lahore</p>
          <h1 className="h-display mt-4 max-w-2xl !text-ivory animate-rise delay-1">Your Big Day Deserves the Best.</h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/80 animate-rise delay-2">Signature bridal makeup, hair, mehndi and skin preparation from the bridal makeup artists Lahore brides recommend most — luminous, long-wearing and unmistakably you.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-rise delay-3"><Link href="/booking?service=bridal-makeup" className="btn-gold !px-8 !py-4">Book Bridal Consultation <ArrowIcon width={16} height={16} /></Link><a href={waLink(waMessages.bridal)} target="_blank" rel="noopener noreferrer" className="btn-light !px-8 !py-4"><WhatsAppIcon className="text-[#25D366]" /> Ask About Bridal Packages</a></div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ivory/80">{["600+ brides styled", "Complimentary trial", "On-location across Lahore", "Lead artist guaranteed"].map((t) => (<li key={t} className="flex items-center gap-2"><CheckIcon width={16} height={16} className="text-gold" />{t}</li>))}</ul>
        </div>
      </section>
      <section className="container-x py-16 sm:py-24"><Reveal><SectionHeading eyebrow="Bridal Services" title="Everything for mehndi, barat & walima" description="Bridal makeup, bridal hair, mehndi, pre-bridal facials and skin preparation, engagement looks and party makeup for your family." /></Reveal><div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{bridalServices.map((s, i) => (<Reveal key={s.slug} delay={(i % 3) * 70}><ServiceCard s={s} /></Reveal>))}</div></section>
      <section className="bg-white"><div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <Reveal><p className="eyebrow">The ÉLAN bridal journey</p><h2 className="h-section mt-3">Calm, planned and beautifully executed</h2><ol className="mt-8 space-y-6">{steps.map(([t, d], i) => (<li key={t} className="flex gap-4"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream font-serif text-lg text-gold-deep">{i + 1}</span><div><h3 className="font-serif text-xl text-ink">{t}</h3><p className="mt-1 text-sm text-ink-soft">{d}</p></div></li>))}</ol></Reveal>
        <Reveal delay={100} className="card overflow-hidden"><div className="relative aspect-[4/3]"><Image src={ayesha.image} alt={ayesha.alt} fill sizes="(max-width:1024px) 100vw, 50vw" loading="lazy" className="object-cover object-top" /></div><div className="p-6"><p className="eyebrow">Lead bridal artist</p><h3 className="mt-2 font-serif text-2xl text-ink">{ayesha.name}</h3><p className="mt-1 text-sm text-ink-soft">{ayesha.bio}</p><div className="mt-3 flex items-center gap-2 text-sm"><Stars rating={5} /><strong>5.0</strong><span className="text-ink-soft">({ayesha.reviews} bridal reviews)</span></div><Link href="/our-team/ayesha-malik" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-deep hover:text-gold">View profile <ArrowIcon width={14} height={14} /></Link></div></Reveal>
      </div></section>
      <section className="bg-cream"><div className="container-x py-16 sm:py-24"><Reveal><SectionHeading eyebrow="Bridal Packages" title="Bridal makeup packages in Lahore" description="Transparent, all-inclusive pricing — no surprises before the wedding." /></Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">{packages.filter((p) => p.bridal).map((p, i) => (<Reveal key={p.slug} delay={i * 80} as="article" className="card relative overflow-hidden p-7">{p.badge && <span className="absolute right-5 top-5 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{p.badge}</span>}<h3 className="font-serif text-3xl text-ink">{p.name}</h3><p className="text-sm text-ink-soft">{p.tagline}</p><ul className="mt-5 grid gap-2 sm:grid-cols-2">{p.includes.map((x) => (<li key={x} className="flex gap-2 text-sm text-ink-soft"><CheckIcon width={14} height={14} className="mt-1 shrink-0 text-gold" />{x}</li>))}</ul><div className="mt-6 flex items-end justify-between border-t border-ink/5 pt-5"><div><p className="text-xs text-ink-soft line-through">{fmtPKR(p.original)}</p><p className="font-serif text-3xl text-ink">{fmtPKR(p.price)}</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">Save {fmtPKR(p.original - p.price)}</span></div><div className="mt-5 flex gap-2"><Link href={`/booking?package=${p.slug}`} className="btn-primary flex-1">Book Package</Link><a href={waLink(waMessages.pkg(p.name))} target="_blank" rel="noopener noreferrer" aria-label={`Ask about ${p.name} on WhatsApp`} className="btn-whatsapp !px-4"><WhatsAppIcon /></a></div></Reveal>))}</div></div></section>
      <section className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-2">
        <Reveal><p className="eyebrow">Real brides</p><h2 className="h-section mt-3">Words from ÉLAN brides</h2><div className="mt-8 space-y-5">{testimonials.filter((t) => /Bridal|Engagement/.test(t.service)).map((t) => (<blockquote key={t.name} className="card p-6"><Stars rating={t.rating} /><p className="mt-3 text-sm leading-relaxed text-ink-soft">“{t.review}”</p><footer className="mt-4 flex items-center gap-3"><Image src={t.image} alt={`${t.name}, ÉLAN bride`} width={40} height={40} className="h-10 w-10 rounded-full object-cover" loading="lazy" /><div><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-ink-soft">{t.service} · {t.area}</p></div></footer></blockquote>))}</div></Reveal>
        <Reveal delay={100}><p className="eyebrow">Bridal FAQs</p><h2 className="h-section mt-3">Planning questions</h2><div className="mt-8"><FAQ items={bridalFaqs} /></div><div className="mt-8 rounded-2xl bg-ink p-6 text-ivory"><p className="font-serif text-2xl">Ready to plan your look?</p><p className="mt-1 text-sm text-ivory/70">Book a consultation or message our bridal coordinator on WhatsApp.</p><div className="mt-4 flex flex-col gap-2 sm:flex-row"><Link href="/booking?service=bridal-makeup" className="btn-gold">Book Bridal Consultation</Link><a href={waLink(waMessages.bridal)} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsAppIcon className="text-[#25D366]" /> WhatsApp</a></div></div></Reveal>
      </section>
    </>
  );
}
