import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "./GalleryGrid";
import { BookingCTA } from "@/components/CTA";
import { site } from "@/lib/site";
import { InstagramIcon } from "@/components/Icons";
export const metadata = buildMetadata({ title: "Gallery — Hair, Bridal Makeup, Nails & Salon Interior | ÉLAN Lahore", description: "Browse real work from ÉLAN Beauty Studio in Lahore: hair colour and cuts, bridal and party makeup, nail art, before & after results and our Gulberg salon interior.", path: "/gallery", image: "/images/interior.jpg" });
export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our work, in real light" description="Hair, makeup, bridal looks, nails and glimpses of our Gulberg studio — photographed on real clients, not stock models." crumbs={[{ name: "Gallery", href: "/gallery" }]}><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline"><InstagramIcon /> More on Instagram</a></PageHero>
      <section className="container-x py-12 sm:py-16"><GalleryGrid /><p className="mt-8 text-center text-sm text-ink-soft">Love a look? <Link href="/booking" className="font-semibold text-gold-deep underline-offset-4 hover:underline">Book it</Link> or send us the photo on WhatsApp.</p></section>
      <BookingCTA />
    </>
  );
}
