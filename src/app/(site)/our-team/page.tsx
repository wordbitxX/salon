import { buildMetadata } from "@/lib/seo";
import { staff } from "@/lib/staff";
import PageHero from "@/components/ui/PageHero";
import StaffCard from "@/components/StaffCard";
import Reveal from "@/components/Reveal";
import { BookingCTA } from "@/components/CTA";
export const metadata = buildMetadata({ title: "Our Team — Hair Stylists, Makeup Artists & Skin Specialists in Lahore", description: "Meet ÉLAN's specialists: senior hair stylists, Lahore's top bridal makeup artists, certified skin specialists, lash & brow therapists and nail technicians. Book with your favourite.", path: "/our-team" });
export default function TeamPage() {
  return (
    <>
      <PageHero eyebrow="Beauty Experts" title="The specialists behind every ÉLAN result" description="Eight specialists led by our founder, one craft each. Read their profiles, check availability and book directly with the specialist you trust." crumbs={[{ name: "Our Team", href: "/our-team" }]} />
      <section className="container-x py-16"><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{staff.map((m, i) => (<Reveal key={m.slug} delay={(i % 4) * 60}><StaffCard m={m} /></Reveal>))}</div></section>
      <BookingCTA title="Not sure who to book with?" text="Tell us what you need on WhatsApp and we'll match you with the right specialist." />
    </>
  );
}
