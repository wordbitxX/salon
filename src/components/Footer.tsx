import Link from "next/link";
import { site, wordbitx, waLink, waMessages, wordbitxWaLink } from "@/lib/site";
import { InstagramIcon, FacebookIcon, TikTokIcon, YouTubeIcon, PhoneIcon, MailIcon, PinIcon, WhatsAppIcon, ClockIcon, ArrowIcon } from "./Icons";

const columns: { title: string; links: [string, string][] }[] = [
  { title: "Services", links: [["/services#hair", "Hair & Colour"], ["/services#skin", "Facials & Skin"], ["/services#makeup", "Makeup"], ["/services#nails", "Nails"], ["/services#lashes-brows", "Lashes & Brows"], ["/services#waxing-threading", "Waxing & Threading"], ["/bridal", "Bridal"], ["/packages", "Packages"]] },
  { title: "Popular in Lahore", links: [["/beauty-salon-lahore", "Beauty Salon Lahore"], ["/bridal-makeup-lahore", "Bridal Makeup Lahore"], ["/hair-salon-lahore", "Hair Salon Lahore"], ["/facial-skincare-lahore", "Facials Lahore"], ["/party-makeup-lahore", "Party Makeup Lahore"], ["/ladies-salon-lahore", "Ladies Salon Lahore"], ["/bridal-packages-lahore", "Bridal Packages"], ["/hair-treatments-lahore", "Hair Treatments"]] },
  { title: "Studio", links: [["/about", "About Us"], ["/our-team", "Our Team"], ["/gallery", "Gallery"], ["/offers", "Offers"], ["/blog", "Journal"], ["/faq", "FAQ"], ["/contact", "Contact"], ["/booking", "Book Online"]] },
  { title: "Service Areas", links: [["/locations/gulberg", "Gulberg — Our Studio"], ["/locations/dha-lahore", "DHA Lahore"], ["/locations/johar-town", "Johar Town"], ["/locations/model-town", "Model Town"], ["/locations/wapda-town", "Wapda Town"], ["/locations/bahria-town", "Bahria Town"], ["/locations/lahore", "All of Lahore"]] },
];

export default function Footer() {
  const socials = [
    { href: site.social.instagram, label: "ÉLAN Beauty Studio on Instagram", Icon: InstagramIcon },
    { href: site.social.facebook, label: "ÉLAN Beauty Studio on Facebook", Icon: FacebookIcon },
    { href: site.social.tiktok, label: "ÉLAN Beauty Studio on TikTok", Icon: TikTokIcon },
    { href: site.social.youtube, label: "ÉLAN Beauty Studio on YouTube", Icon: YouTubeIcon },
  ];
  return (
    <footer className="bg-ink text-ivory pb-20 lg:pb-0">
      {/* Appointment band */}
      <div className="border-b border-white/10">
        <div className="container-x flex flex-col gap-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">Appointments</p>
            <p className="mt-2 font-serif text-2xl leading-snug text-ivory sm:text-3xl">Ready to feel your best?</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="/booking" className="group inline-flex items-center gap-2 border-b border-gold/50 pb-1 text-sm font-semibold text-ivory transition hover:border-gold hover:text-gold">
              Book an Appointment <ArrowIcon width={15} height={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-ivory/80 transition hover:border-gold hover:text-gold">
              <WhatsAppIcon width={15} height={15} /> WhatsApp Us
            </a>
            <a href={site.phoneHref} className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-sm font-medium text-ivory/80 transition hover:border-gold hover:text-gold">
              <PhoneIcon width={15} height={15} /> {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex items-baseline gap-2" aria-label="ÉLAN Beauty Studio home">
            <span className="font-serif text-3xl tracking-[0.2em] text-ivory">ÉLAN</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">Beauty Studio</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
            A premium, women-only beauty studio on Main Boulevard, Gulberg III — where specialist hair, skin, bridal and nail care meet genuine hospitality.
          </p>
          <address className="mt-7 space-y-3 not-italic text-sm text-ivory/70">
            <p className="flex gap-3"><PinIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" /><span>{site.address.street}<br />{site.address.city} {site.address.postal}, {site.address.region}, Pakistan</span></p>
            <p className="flex gap-3"><ClockIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" /><span>Mon – Sat: 10:00 AM – 9:00 PM<br />Sunday: 12:00 PM – 8:00 PM</span></p>
            <p className="flex gap-3"><MailIcon width={16} height={16} className="mt-0.5 shrink-0 text-gold" /><a href={`mailto:${site.email}`} className="transition hover:text-gold">{site.email}</a></p>
          </address>
          <a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition hover:text-ivory">
            Get Directions <ArrowIcon width={14} height={14} />
          </a>
          <ul className="mt-7 flex gap-2.5" aria-label="Social media">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={label} title={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-ivory/70 transition hover:border-gold hover:bg-gold hover:text-ink">
                  <Icon width={17} height={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="lg:col-span-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">{col.title}</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-ivory/65">
              {col.links.map(([href, label]) => (
                <li key={href}><Link href={href} className="transition hover:text-gold">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-6 py-7 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ivory/45">A WordbitX Digital Experience</p>
            <p className="mt-1.5 text-sm text-ivory/70">
              Website &amp; Digital Solutions by{" "}
              <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ivory underline decoration-gold/50 underline-offset-4 transition hover:text-gold">WordbitX</a>
              <span className="hidden sm:inline"> — {wordbitx.tagline}</span>
            </p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ivory/55 md:justify-start">
              <span>Want this for your salon?</span>
              <a href={wordbitx.phoneHref} className="inline-flex items-center gap-1.5 font-medium text-ivory/80 transition hover:text-gold"><PhoneIcon width={13} height={13} /> {wordbitx.phone}</a>
              <a href={wordbitxWaLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ivory/80 transition hover:text-gold"><WhatsAppIcon width={13} height={13} /> WhatsApp</a>
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 text-xs text-ivory/50 md:items-end">
            <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              <Link href="/privacy-policy" className="transition hover:text-gold">Privacy Policy</Link>
              <Link href="/terms" className="transition hover:text-gold">Terms &amp; Conditions</Link>
              <Link href="/sitemap.xml" className="transition hover:text-gold">Sitemap</Link>
              <Link href="/admin" className="transition hover:text-gold">Salon Dashboard</Link>
            </nav>
            <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
