import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="container-x flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="eyebrow">404 — Page not found</p>
        <h1 className="h-display mt-4">This page has left the salon.</h1>
        <p className="lead mt-4 max-w-md">The link may be outdated, or the page may have moved. Let's get you back to something beautiful.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Back to Home</Link>
          <Link href="/services" className="btn-outline">Explore Services</Link>
          <Link href="/booking" className="btn-gold">Book an Appointment</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
