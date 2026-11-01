import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
export const metadata = buildMetadata({ title: "Terms & Conditions", description: "Booking, cancellation, deposit, bridal and salon etiquette terms for ÉLAN Beauty Studio, Lahore.", path: "/terms" });
export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms & Conditions" description="Last updated: January 2025" crumbs={[{ name: "Terms & Conditions", href: "/terms" }]} />
      <section className="container-x py-12 sm:py-16"><div className="prose-elan mx-auto max-w-3xl">
        <h2 className="!mt-0">Appointments</h2><p>Online bookings are requests confirmed by our team via WhatsApp or SMS. Please arrive 5–10 minutes early. Arrivals more than 15 minutes late may need to be shortened or rescheduled.</p>
        <h2>Cancellations & rescheduling</h2><p>Please give at least 12 hours' notice. Repeated no-shows may require a deposit for future bookings.</p>
        <h2>Deposits</h2><p>Bridal bookings require a 30% non-refundable deposit to secure the date and artist. Packages above Rs 20,000 may require a 20% deposit.</p>
        <h2>Prices</h2><p>All prices are in Pakistani Rupees and include applicable taxes. Final prices for hair services depend on length and density and are confirmed at consultation. Offers cannot be combined unless stated.</p>
        <h2>Consultations & patch tests</h2><p>Colour, lash and some skin services require a patch test 48 hours before the first appointment. Please disclose allergies, medications, pregnancy and recent treatments.</p>
        <h2>Satisfaction</h2><p>If you're unhappy with a result, tell us within 7 days and we will make it right at no additional cost wherever possible.</p>
        <h2>Salon etiquette</h2><p>ÉLAN is a women-only space. To keep it calm for everyone, we ask that phones be on silent in treatment rooms and that children are accompanied at all times.</p>
        <h2>Contact</h2><p>info@wordbitx.pk · +92 325 1888841</p>
        <p className="text-xs">Demonstration website by <a href="https://wordbitx.pk/" target="_blank" rel="noopener noreferrer">WordbitX</a>; terms shown are illustrative.</p>
      </div></section>
    </>
  );
}
