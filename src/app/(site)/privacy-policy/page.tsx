import { buildMetadata } from "@/lib/seo";
import PageHero from "@/components/ui/PageHero";
export const metadata = buildMetadata({ title: "Privacy Policy", description: "How ÉLAN Beauty Studio collects, uses and protects your personal information when you book online, contact us or visit our Lahore salon.", path: "/privacy-policy" });
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description="Last updated: January 2025" crumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]} />
      <section className="container-x py-12 sm:py-16"><div className="prose-elan mx-auto max-w-3xl">
        <h2 className="!mt-0">Who we are</h2><p>ÉLAN Beauty Studio ("we", "us") operates the salon at 12-B Main Boulevard, Gulberg III, Lahore and this website. This policy explains how we handle your personal data.</p>
        <h2>What we collect</h2><ul><li><strong>Booking details:</strong> name, phone number, email, chosen service, specialist, date and time.</li><li><strong>Contact enquiries:</strong> the information you submit through our contact form or WhatsApp.</li><li><strong>Service notes:</strong> preferences, allergies or sensitivities you share so we can serve you safely.</li><li><strong>Technical data:</strong> basic, anonymised analytics about how the website is used.</li></ul>
        <h2>How we use it</h2><p>To confirm and manage your appointments, send reminders, respond to enquiries, personalise your visits, and improve our services. With your consent, we may send occasional offers — you can opt out at any time.</p>
        <h2>Sharing</h2><p>We never sell your data. We share it only with service providers who help us run bookings and messaging (for example, hosting and WhatsApp), and only as needed.</p>
        <h2>Retention & security</h2><p>Client records are kept for as long as you remain a client and for a reasonable period afterwards. Data is stored securely with access limited to authorised staff.</p>
        <h2>Your rights</h2><p>You may request a copy of your data, ask us to correct it, or ask us to delete it by emailing info@wordbitx.com.</p>
        <h2>Cookies</h2><p>This website uses only essential cookies and privacy-friendly analytics. No advertising cookies are set.</p>
        <h2>Contact</h2><p>Questions about privacy: info@wordbitx.com or +92 325 1888841.</p>
        <p className="text-xs">This website and its booking platform were developed by <a href="https://wordbitx.com" target="_blank" rel="noopener noreferrer">WordbitX</a>. This is a demonstration project; policies shown are illustrative.</p>
      </div></section>
    </>
  );
}
