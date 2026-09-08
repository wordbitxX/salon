import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { faqs } from "@/lib/content";
import PageHero from "@/components/ui/PageHero";
import FAQ from "@/components/ui/FAQ";
import { BookingCTA } from "@/components/CTA";
export const metadata = buildMetadata({ title: "FAQ — Booking, Hygiene, Bridal & Salon Questions | ÉLAN Lahore", description: "Answers to common questions about ÉLAN Beauty Studio in Lahore: location, booking, cancellations, hygiene standards, bridal timelines, home service and payments.", path: "/faq" });
export default function FAQPage() {
  return (
    <>
      <PageHero eyebrow="Help" title="Frequently asked questions about our Lahore salon" description="Can't find what you need? Message us on WhatsApp — we reply within minutes during salon hours." crumbs={[{ name: "FAQ", href: "/faq" }]} />
      <section className="container-x py-12 sm:py-16"><div className="mx-auto max-w-3xl"><FAQ items={faqs} /><p className="mt-8 text-center text-sm text-ink-soft">Bridal-specific questions? See the <Link href="/bridal" className="font-semibold text-gold-deep underline-offset-4 hover:underline">bridal page</Link>. Or <Link href="/contact" className="font-semibold text-gold-deep underline-offset-4 hover:underline">contact us</Link>.</p></div></section>
      <BookingCTA />
    </>
  );
}
