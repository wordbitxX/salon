import { Suspense } from "react";
import { buildMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import BookingWizard from "./BookingWizard";
import { wordbitx } from "@/lib/site";
export const metadata = buildMetadata({ title: "Book an Appointment Online — Salon Booking in Lahore", description: "Book your salon appointment online at ÉLAN Beauty Studio, Lahore. Choose your service, specialist, date and time, and get instant confirmation with a booking reference.", path: "/booking" });
export default async function BookingPage({ searchParams }: { searchParams: Promise<{ service?: string; staff?: string; package?: string }> }) {
  const sp = await searchParams;
  return (
    <section className="bg-cream/60"><div className="container-x py-8 sm:py-12">
      <Breadcrumbs items={[{ name: "Book an Appointment", href: "/booking" }]} />
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Online Booking</p><h1 className="h-section mt-2">Book your appointment</h1></div><p className="text-sm text-ink-soft">Real-time availability · Instant reference · Pay at salon</p></div>
      <div className="mt-8"><Suspense fallback={<div className="card h-96 animate-pulse" />}><BookingWizard key={`${sp.service}-${sp.staff}-${sp.package}`} initialService={sp.service} initialStaff={sp.staff} initialPackage={sp.package} /></Suspense></div>
      <p className="mt-10 text-center text-[11px] text-ink-soft">Online Appointment Booking System by <a href={wordbitx.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink hover:text-gold">WordbitX</a> · <a href={wordbitx.phoneHref} className="font-semibold text-ink hover:text-gold">{wordbitx.phone}</a></p>
    </div></section>
  );
}
