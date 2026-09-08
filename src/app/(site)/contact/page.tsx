import { buildMetadata } from "@/lib/seo";
import { site, waLink, waMessages } from "@/lib/site";
import PageHero from "@/components/ui/PageHero";
import AppointmentForm from "@/components/AppointmentForm";
import OpenStatus from "@/components/OpenStatus";
import Reveal from "@/components/Reveal";
import { PhoneIcon, MailIcon, PinIcon, ClockIcon, WhatsAppIcon, InstagramIcon, FacebookIcon, TikTokIcon, YouTubeIcon } from "@/components/Icons";
export const metadata = buildMetadata({ title: "Contact & Book — ÉLAN Beauty Studio, Gulberg Lahore | Phone, WhatsApp, Map", description: "Contact ÉLAN Beauty Studio in Gulberg III, Lahore. Request an appointment, call +92 325 1888841, chat on WhatsApp, get directions or see opening hours.", path: "/contact" });
export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact & Booking" title="We'd love to hear from you" description="Request an appointment, ask about bridal packages or just say hello — by form, WhatsApp or phone." crumbs={[{ name: "Contact", href: "/contact" }]}><OpenStatus /></PageHero>
      <section className="container-x grid gap-10 py-12 sm:py-16 lg:grid-cols-5">
        <Reveal className="space-y-6 lg:col-span-2">
          <address className="card space-y-5 p-6 not-italic text-sm">
            <div className="flex gap-3"><PinIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Address</p><p>{site.name}<br />{site.address.street}, {site.address.city} {site.address.postal}, {site.address.region}, Pakistan</p><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block font-semibold text-gold-deep hover:text-gold">Get Directions →</a></div></div>
            <div className="flex gap-3"><PhoneIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Phone & WhatsApp</p><a href={site.phoneHref} className="hover:text-gold">{site.phone}</a></div></div>
            <div className="flex gap-3"><MailIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Email</p><a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a></div></div>
            <div className="flex gap-3"><ClockIcon className="mt-0.5 shrink-0 text-gold" /><div><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Opening hours</p><ul>{site.hours.map((h) => (<li key={h.days}>{h.days}: {h.open} – {h.close}</li>))}</ul></div></div>
          </address>
          <div className="grid grid-cols-2 gap-2"><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp col-span-2 !py-4"><WhatsAppIcon /> Chat &amp; Book on WhatsApp</a><a href={site.phoneHref} className="btn-outline !py-3"><PhoneIcon /> Call Now</a><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-primary !py-3">Get Directions</a></div>
          <div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Follow us</p><ul className="mt-3 flex gap-2">{[[site.social.instagram, "Instagram", InstagramIcon], [site.social.facebook, "Facebook", FacebookIcon], [site.social.tiktok, "TikTok", TikTokIcon], [site.social.youtube, "YouTube", YouTubeIcon]].map(([h, l, I]) => { const Icon = I as typeof InstagramIcon; return (<li key={l as string}><a href={h as string} target="_blank" rel="noopener noreferrer me" aria-label={`ÉLAN on ${l}`} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 hover:border-gold hover:bg-gold hover:text-white"><Icon /></a></li>); })}</ul></div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-3"><h2 className="font-serif text-2xl text-ink sm:text-3xl">Request an appointment</h2><p className="mt-1 mb-5 text-sm text-ink-soft">We reply within minutes during salon hours. Bridal enquiries welcome.</p><AppointmentForm /></Reveal>
      </section>
      <section className="container-x pb-16" aria-label="Map"><div className="overflow-hidden rounded-3xl border border-ink/5 bg-white"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/5 px-5 py-4"><div><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">Our Studio</p><p className="text-sm font-medium text-ink">{site.address.street}, {site.address.city} {site.address.postal}</p></div><a href={site.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-outline !px-4 !py-2 text-xs">Get Directions</a></div><iframe title="Map to ÉLAN Beauty Studio, Main Boulevard Gulberg III Lahore" src={site.mapsEmbed} className="h-80 w-full sm:h-96" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></section>
    </>
  );
}
