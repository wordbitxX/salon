import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getService, homeServiceCards } from "@/lib/services";
import { staff } from "@/lib/staff";
import { packages, faqs, gallery, trustNumbers } from "@/lib/content";
import { posts } from "@/lib/blog";
import { site, waLink, waMessages, fmtPKR } from "@/lib/site";
import ServiceCard from "@/components/ServiceCard";
import StaffCard from "@/components/StaffCard";
import Testimonials from "@/components/Testimonials";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/ui/FAQ";
import SectionHeading from "@/components/ui/SectionHeading";
import OpenStatus from "@/components/OpenStatus";
import BeforeAfter from "@/components/BeforeAfter";
import AppointmentForm from "@/components/AppointmentForm";
import { BookingCTA, WordbitXShowcase } from "@/components/CTA";
import { ArrowIcon, WhatsAppIcon, InstagramIcon, CheckIcon, PinIcon, ClockIcon, PhoneIcon, StarIcon } from "@/components/Icons";

export const metadata = buildMetadata({ title: "ÉLAN Beauty Studio | Best Beauty Salon in Lahore — Bridal, Hair, Skin & Nails", description: "Lahore's premium ladies beauty salon in Gulberg. Bridal makeup, hair colour & keratin, facials, nails, waxing & spa. 4.9★ rated, 5,000+ clients. Book online or on WhatsApp.", path: "/" });

const heroStats = [["5,000+", "Happy Clients"], ["4.9/5", "Client Rating"], ["10+", "Years Experience"]];
const serviceAreas = [["/locations/gulberg", "Gulberg"], ["/locations/dha-lahore", "DHA Lahore"], ["/locations/johar-town", "Johar Town"], ["/locations/model-town", "Model Town"], ["/locations/wapda-town", "Wapda Town"], ["/locations/bahria-town", "Bahria Town"]];

export default function HomePage() {
  const featured = homeServiceCards.map((c) => ({ ...c, s: getService(c.slug)! }));
  const teamHome = ["mahnoor-elahi", "ayesha-malik", "sofia-khan", "maya-ahmed"].map((k) => staff.find((m) => m.slug === k)!);
  const homePkgs = ["signature-glow", "bridal-elegance", "complete-bridal", "party-glam", "hair-transformation"].map((k) => packages.find((p) => p.slug === k)!);
  return (
    <>
      {/* 1. Hero */}
      <section className="hero-luxury relative overflow-hidden bg-cream">
        <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-blush/40 blur-3xl" />
        <div className="container-x grid items-center gap-12 py-12 sm:min-h-[calc(100svh-4rem)] lg:grid-cols-12 lg:gap-20 lg:py-20">
          <div className="lg:col-span-6">
            <p className="eyebrow animate-rise">Lahore's Premium Beauty Experience</p>
            <h1 className="h-display mt-4 animate-rise delay-1">Where Beauty Meets <em className="font-normal text-gold-deep">Confidence.</em></h1>
            <p className="lead mt-6 max-w-xl animate-rise delay-2">Expert stylists, skin specialists and bridal artists in Gulberg, Lahore — for transformations that feel effortlessly you. Premium treatments, personal attention, visible results.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row animate-rise delay-3">
              <Link href="/booking" className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ivory shadow-soft transition duration-300 hover:bg-gold-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
                Book Appointment <ArrowIcon width={16} height={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/20 bg-white/70 px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition duration-300 hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream">
                <WhatsAppIcon width={18} height={18} className="text-[#22a75b]" /> WhatsApp Us
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 animate-rise delay-3">
              <OpenStatus className="text-ink-soft" />
              <Link href="/services" className="text-sm font-semibold text-ink underline-offset-4 hover:text-gold hover:underline">View Services →</Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8 animate-rise delay-3">
              {heroStats.map(([v, l]) => (<div key={l}><dd className="font-serif text-3xl text-ink sm:text-4xl">{v}</dd><dt className="text-xs text-ink-soft">{l}</dt></div>))}
            </dl>
          </div>
          <div className="relative lg:col-span-6">
            <div className="hero-portrait relative aspect-[4/5] overflow-hidden shadow-soft sm:aspect-[5/6] lg:aspect-[4/5]">
              <Image src="/images/hero.jpg" alt="Beauty editorial portrait of a woman with glossy styled hair" fill priority fetchPriority="high" sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-3 hidden w-60 border border-gold/20 bg-ivory/95 p-5 shadow-soft backdrop-blur sm:block lg:-left-10 animate-rise delay-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-deep">The ÉLAN experience</p>
              <p className="mt-2 font-serif text-xl text-ink">Beauty, thoughtfully curated.</p>
              <Link href="/services" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-gold-deep hover:text-gold">Explore our services <ArrowIcon width={12} height={12} /></Link>
            </div>
            <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium text-ivory shadow-soft md:flex"><StarIcon className="text-gold" /> 4.9 · Rated by 1,800+ clients</div>
          </div>
        </div>
      </section>

      {/* 2. Trust strip */}
      <section aria-label="Trust indicators" className="border-y border-ink/5 bg-white">
        <div className="container-x grid grid-cols-2 gap-px overflow-hidden rounded-none sm:grid-cols-3 lg:grid-cols-5">
          {trustNumbers.map((t, i) => (<Reveal key={t.label} delay={i * 60} className={`px-4 py-8 text-center ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}><p className="font-serif text-3xl text-ink sm:text-4xl">{t.value}</p><p className="mt-1 text-sm font-semibold text-ink">{t.label}</p><p className="text-[11px] text-ink-soft">{t.note}</p></Reveal>))}
        </div>
      </section>

      {/* 3. Services */}
      <section className="container-x py-16 sm:py-24" aria-labelledby="services-heading">
        <Reveal><SectionHeading eyebrow="Our Services" title="Every beauty service, one trusted studio" description="From hair colour and keratin to facials, nails, waxing, party and bridal makeup — each delivered by a dedicated specialist at our Lahore studio." /></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featured.map((c, i) => (<Reveal key={c.label} delay={(i % 4) * 60}><ServiceCard s={{ ...c.s, name: c.label === c.s.name ? c.s.name : c.label }} priority={i < 2} /></Reveal>))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Link href="/services" className="btn-outline">View Full Service Menu <ArrowIcon width={16} height={16} /></Link><a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> Chat &amp; Book on WhatsApp</a></div>
      </section>

      {/* 4. Bridal */}
      <section className="relative overflow-hidden bg-white" aria-labelledby="bridal-heading">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <p className="eyebrow">Bridal by ÉLAN</p>
            <h2 id="bridal-heading" className="h-section mt-3">Your Big Day Deserves the Best.</h2>
            <p className="lead mt-5">Trusted by 600+ Lahore brides. Our senior artists craft luminous, 16-hour looks for every event — with a complimentary trial, pre-bridal skin preparation and on-location service across Lahore.</p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">{[["Bridal Makeup", "/services/bridal-makeup"], ["Engagement Makeup", "/services/engagement-makeup"], ["Mehndi Makeup", "/services/mehndi-day-makeup"], ["Reception / Walima Makeup", "/services/reception-walima-makeup"], ["Bridal Hair Styling", "/services/bridal-makeup"], ["Complete Bridal Packages", "/bridal-packages-lahore"]].map(([t, h]) => (<li key={t}><Link href={h} className="flex items-center gap-2 text-sm text-ink hover:text-gold"><CheckIcon width={16} height={16} className="shrink-0 text-gold" />{t}</Link></li>))}</ul>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/booking?service=bridal-makeup" className="btn-gold">Book Bridal Consultation</Link><a href={waLink(waMessages.bridal)} target="_blank" rel="noopener noreferrer" className="btn-outline"><WhatsAppIcon className="text-[#25D366]" /> Ask About Bridal Packages</a></div>
          </Reveal>
          <Reveal delay={100} className="order-1 lg:order-2"><div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-square lg:aspect-[4/5]"><Image src="/images/bridal.jpg" alt="Pakistani bride with flawless bridal makeup by ÉLAN, bridal makeup artist in Lahore" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" loading="lazy" /><div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-4 py-3 backdrop-blur"><p className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Bridal makeup from</p><p className="font-serif text-2xl text-ink">{fmtPKR(45000)}</p></div></div></Reveal>
        </div>
      </section>

      {/* 5. Packages */}
      <section className="bg-ink text-ivory" aria-labelledby="packages-heading">
        <div className="container-x py-16 sm:py-24">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl"><p className="eyebrow">Packages</p><h2 id="packages-heading" className="h-section mt-3 !text-ivory">Curated packages, considered pricing</h2><p className="mt-3 text-ivory/70">Thoughtfully bundled treatments in one relaxed visit — priced lower than booking separately.</p></div>
            <Link href="/packages" className="btn-light self-start">All Packages <ArrowIcon width={16} height={16} /></Link>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {homePkgs.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60} as="article" className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                {p.badge && <span className="absolute right-4 top-4 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">{p.badge}</span>}
                <h3 className="font-serif text-2xl">{p.name}</h3><p className="mt-1 text-xs text-ivory/70">{p.tagline}</p>
                <ul className="mt-4 flex-1 space-y-1.5 text-xs text-ivory/80">{p.includes.slice(0, 3).map((x) => (<li key={x} className="flex gap-2"><CheckIcon width={14} height={14} className="mt-0.5 shrink-0 text-gold" />{x}</li>))}</ul>
                <div className="mt-5 border-t border-white/10 pt-4"><p className="text-[10px] uppercase tracking-wider text-ivory/50">Starting from</p><p className="font-serif text-2xl">PKR {p.price.toLocaleString("en-PK")}</p><p className="text-[11px] text-emerald-300">Save {fmtPKR(p.original - p.price)}</p></div>
                <Link href={`/booking?package=${p.slug}`} className="btn-gold mt-4 w-full !py-2.5 text-xs">Book Package</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Before / After */}
      <section className="container-x py-16 sm:py-24" aria-labelledby="results-heading">
        <Reveal><SectionHeading eyebrow="Real Results" title="Transformations, not filters" description="Real clients, photographed in our studio light. Filter by hair, makeup, skin or bridal." /></Reveal>
        <div className="mt-10"><BeforeAfter /></div>
        <div className="mt-10 text-center"><Link href="/gallery" className="btn-outline">View Full Gallery <ArrowIcon width={16} height={16} /></Link></div>
      </section>

      {/* 7. Instagram feed */}
      <section className="bg-white" aria-labelledby="ig-heading">
        <div className="container-x py-16 sm:py-24">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4"><span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-tr from-gold to-rose p-[2px]"><span className="grid h-full w-full place-items-center rounded-full bg-white font-serif text-xl text-ink">É</span></span><div><p className="font-semibold text-ink">@elanbeautystudio</p><p className="text-xs text-ink-soft">Gulberg, Lahore · Bridal · Hair · Skin · 42.8k followers</p><h2 id="ig-heading" className="sr-only">Fresh from the studio on Instagram</h2></div></div>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-primary self-start sm:self-auto"><InstagramIcon /> Follow Us on Instagram</a>
          </Reveal>
          <ul className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
            {gallery.slice(0, 12).map((g, i) => (<Reveal key={g.src} delay={i * 40} as="li" className="group relative aspect-square overflow-hidden rounded-xl"><Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 16vw" loading="lazy" className="object-cover transition duration-700 group-hover:scale-105" /><Link href="/gallery" className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/60 to-transparent p-3 text-ivory opacity-0 transition group-hover:opacity-100 focus-visible:opacity-100" aria-label={`View ${g.cat} in gallery`}><span className="text-[11px] font-semibold">♥ {(1240 + i * 187) % 3000 + 400} · {g.cat}</span></Link></Reveal>))}
          </ul>
        </div>
      </section>

      {/* 8. Reviews */}
      <section className="bg-cream" aria-labelledby="reviews-heading">
        <div className="container-x py-16 sm:py-24">
          <Reveal className="flex flex-col items-center gap-6 text-center"><SectionHeading eyebrow="Client Love" title="What Lahore says about ÉLAN" /><div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-2.5 shadow-card"><span className="flex text-gold">{[1, 2, 3, 4, 5].map((i) => (<StarIcon key={i} />))}</span><span className="text-sm font-semibold text-ink">4.9/5 Google Rating</span><span className="text-xs text-ink-soft">· 1,800+ reviews</span></div></Reveal>
          <div className="mt-12"><Testimonials withSchema limit={6} /></div>
          <div className="mt-10 text-center"><Link href="/booking" className="btn-primary">Book Appointment</Link></div>
        </div>
      </section>

      {/* 9. Team */}
      <section className="container-x py-16 sm:py-24" aria-labelledby="team-heading">
        <Reveal><SectionHeading eyebrow="Beauty Experts" title="Meet the specialists behind the results" description="Led by our founder, each ÉLAN specialist focuses on one craft — so you're always in the hands of someone who does this every day." /></Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{teamHome.map((m, i) => (<Reveal key={m.slug} delay={i * 70}><StaffCard m={m} /></Reveal>))}</div>
        <div className="mt-10 text-center"><Link href="/our-team" className="btn-outline">View All Specialists <ArrowIcon width={16} height={16} /></Link></div>
      </section>

      {/* 10. Appointment request */}
      <section id="appointment" className="scroll-mt-24 bg-white" aria-labelledby="appt-heading">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-5 lg:items-start">
          <Reveal className="lg:col-span-2">
            <p className="eyebrow">Appointment</p>
            <h2 id="appt-heading" className="h-section mt-3">Request your appointment</h2>
            <p className="lead mt-4">Tell us what you'd like and when. We confirm personally on WhatsApp within minutes during salon hours — or pick an exact slot from live availability.</p>
            <ul className="mt-6 space-y-3 text-sm text-ink">{["Confirmation on WhatsApp or by call", "Choose your preferred specialist", "Free cancellation up to 12 hours before", "Pay at the salon — no online payment needed"].map((t) => (<li key={t} className="flex gap-2.5"><CheckIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" />{t}</li>))}</ul>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/booking" className="btn-outline">Live Online Booking</Link><a href={site.phoneHref} className="btn-outline"><PhoneIcon /> Call Now</a></div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-3"><AppointmentForm /></Reveal>
        </div>
      </section>

      {/* 11. Location & service areas */}
      <section className="bg-cream" aria-labelledby="local-heading">
        <div className="container-x grid gap-10 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Visit Us</p>
            <h2 id="local-heading" className="h-section mt-3">Beauty salon in Gulberg, Lahore</h2>
            <p className="lead mt-4">Centrally located on Main Boulevard, Gulberg III — minutes from Liberty Market and an easy drive from DHA, Model Town, Johar Town, Wapda Town and Bahria Town. Free parking on site.</p>
            <address className="mt-6 space-y-2.5 not-italic text-sm text-ink-soft">
              <p className="flex gap-2"><PinIcon className="shrink-0 text-gold" /><span>{site.name}, {site.address.street}, {site.address.city} {site.address.postal}, Pakistan</span></p>
              <p className="flex gap-2"><PhoneIcon className="shrink-0 text-gold" /><a href={site.phoneHref} className="hover:text-ink">{site.phone}</a> · <a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="hover:text-ink">WhatsApp</a> · <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram</a></p>
              <p className="flex gap-2"><ClockIcon className="shrink-0 text-gold" />Mon–Sat 10 AM – 9 PM · Sun 12 – 8 PM</p>
            </address>
            <div className="mt-6 flex flex-wrap gap-3"><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Get Directions</a><a href={site.phoneHref} className="btn-outline"><PhoneIcon /> Call Now</a><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp"><WhatsAppIcon /> WhatsApp</a></div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-ink-soft">Service areas across Lahore</p>
            <ul className="mt-2 flex flex-wrap gap-2 text-xs">{serviceAreas.map(([h, l]) => (<li key={h}><Link href={h} className="rounded-full border border-ink/10 bg-white px-3 py-1.5 font-medium hover:border-gold hover:text-gold">{l}</Link></li>))}</ul>
            <p className="mt-2 text-[11px] text-ink-soft">One studio in Gulberg III. On-location bridal &amp; party makeup available across these areas.</p>
          </Reveal>
          <Reveal delay={100} className="overflow-hidden rounded-3xl border border-ink/5 bg-white">
            <div className="flex items-center justify-between gap-3 border-b border-ink/5 px-5 py-3.5">
              <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Our Studio</p><p className="truncate text-sm font-medium text-ink">{site.address.street}, {site.address.city}</p></div>
              <a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs font-semibold text-gold-deep hover:text-gold">Directions →</a>
            </div>
            <iframe title="Map to ÉLAN Beauty Studio, Main Boulevard Gulberg III Lahore" src={site.mapsEmbed} className="h-72 w-full sm:h-80 lg:h-[26rem]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </Reveal>
        </div>
      </section>

      {/* 12. FAQ */}
      <section className="container-x py-16 sm:py-24" aria-labelledby="faq-heading">
        <div className="grid gap-10 lg:grid-cols-3">
          <Reveal><p className="eyebrow">Good to know</p><h2 id="faq-heading" className="h-section mt-3">Questions, answered</h2><p className="lead mt-4">Bridal pricing, booking, home service, hygiene and more.</p><Link href="/faq" className="btn-outline mt-6">All FAQs</Link></Reveal>
          <Reveal delay={100} className="lg:col-span-2"><FAQ items={faqs.slice(0, 6)} withSchema={false} /></Reveal>
        </div>
      </section>

      {/* 13. Local SEO content */}
      <section className="bg-white" aria-labelledby="seo-heading">
        <div className="container-x grid gap-12 py-16 sm:py-24 lg:grid-cols-5">
          <Reveal className="prose-elan lg:col-span-3">
            <p className="eyebrow not-prose">About ÉLAN</p>
            <h2 id="seo-heading" className="!mt-2">Beauty Salon in Lahore</h2>
            <p>ÉLAN Beauty Studio is a premium ladies salon in Lahore, founded in 2015 and located in the heart of Gulberg. Women searching for the best beauty salon in Lahore usually want three things: specialists who know their craft, hygiene they can trust, and results that last past the drive home. That's exactly what we built.</p>
            <p>Our <Link href="/hair-salon-lahore">hair salon</Link> team handles precision cuts, colour and keratin; our <Link href="/facial-skincare-lahore">skincare specialists</Link> deliver facials and HydraFacial tailored to your skin; and our <Link href="/bridal-makeup-lahore">bridal makeup artists</Link> have styled more than 600 Lahore brides. Party makeup, nails, waxing, threading, mehndi and a private spa suite complete the menu — see the <Link href="/services">full service list</Link>.</p>
            <p>If you've been searching for a "ladies beauty salon near me" or a "bridal makeup artist near me" from DHA, Model Town, Johar Town or Bahria Town, our Gulberg studio is a short drive with free parking, and our bridal team travels on location across the city. Explore our <Link href="/locations/lahore">Lahore service areas</Link>, read our <Link href="/blog">beauty journal</Link>, or <Link href="/booking">book online</Link> in under a minute.</p>
          </Reveal>
          <div className="lg:col-span-2">
            <Reveal className="flex items-end justify-between"><h3 className="font-serif text-2xl text-ink">From the ÉLAN journal</h3><Link href="/blog" className="text-sm font-semibold text-gold-deep hover:text-gold">All articles →</Link></Reveal>
            <div className="mt-6 space-y-5">
              {posts.slice(0, 3).map((p, i) => (<Reveal key={p.slug} delay={i * 70} as="article" className="group"><Link href={`/blog/${p.slug}`} className="flex gap-4"><div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl"><Image src={p.image} alt={p.alt} fill sizes="112px" loading="lazy" className="object-cover transition duration-700 group-hover:scale-105" /></div><div><p className="text-[11px] font-semibold uppercase tracking-wider text-gold">{p.category}</p><h4 className="mt-1 font-serif text-lg leading-snug text-ink group-hover:text-gold">{p.title}</h4></div></Link></Reveal>))}
            </div>
          </div>
        </div>
      </section>

      <WordbitXShowcase />
      <BookingCTA />
    </>
  );
}
