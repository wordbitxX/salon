import type { Metadata } from "next";
import { SITE_URL, site } from "./site";
import { services } from "./services";
import { testimonials } from "./content";
const avgRating = () => (testimonials.reduce((a, t) => a + t.rating, 0) / testimonials.length).toFixed(1);

export function buildMetadata({ title, description, path, image, type = "website" }: { title: string; description: string; path: string; image?: string; type?: "website" | "article" }): Metadata {
  const url = `${SITE_URL}${path}`;
  const img = image ? (image.startsWith("http") ? image : `${SITE_URL}${image}`) : `${SITE_URL}/images/hero.jpg`;
  return {
    title: path === "/" ? { absolute: title } : title, description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type, images: [{ url: img, width: 1200, height: 630, alt: title }], locale: "en_PK" },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

export const orgSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "LocalBusiness", "Organization"],
  "@id": `${SITE_URL}/#salon`,
  name: site.name, url: SITE_URL, logo: `${SITE_URL}/icon.svg`, image: `${SITE_URL}/images/hero.jpg`,
  description: site.description, telephone: site.phone, email: site.email, priceRange: "Rs 800 – Rs 135,000", currenciesAccepted: "PKR", paymentAccepted: "Cash, Credit Card, Bank Transfer, JazzCash, EasyPaisa",
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.region, postalCode: site.address.postal, addressCountry: site.address.country },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  hasMap: site.mapsLink,
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "21:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday"], opens: "12:00", closes: "20:00" },
  ],
  sameAs: Object.values(site.social),
  areaServed: ["Lahore", "Gulberg", "DHA Lahore", "Johar Town", "Model Town"],
  aggregateRating: { "@type": "AggregateRating", ratingValue: avgRating(), reviewCount: String(testimonials.length), bestRating: "5" },
  hasOfferCatalog: { "@type": "OfferCatalog", name: "Salon Services", itemListElement: services.slice(0, 10).map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` }, price: s.price, priceCurrency: "PKR" })) },
});

export const websiteSchema = () => ({
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { "@id": `${SITE_URL}/#salon` },
  potentialAction: { "@type": "SearchAction", target: `${SITE_URL}/services?q={search_term_string}`, "query-input": "required name=search_term_string" },
});

export const breadcrumbSchema = (items: { name: string; href: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.href}` })),
});

export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org", "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const serviceSchema = (s: { name: string; description: string; slug: string; price: number; image: string }) => ({
  "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.description, url: `${SITE_URL}/services/${s.slug}`, serviceType: s.name,
  provider: { "@id": `${SITE_URL}/#salon` }, areaServed: { "@type": "City", name: "Lahore" },
  image: s.image.startsWith("http") ? s.image : `${SITE_URL}${s.image}`,
  offers: { "@type": "Offer", price: s.price, priceCurrency: "PKR", availability: "https://schema.org/InStock", url: `${SITE_URL}/booking?service=${s.slug}` },
});

export const productSchema = (p: { name: string; price: number; original: number; slug: string; image: string; tagline: string }) => ({
  "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.tagline, image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`, url: `${SITE_URL}/packages#${p.slug}`,
  brand: { "@type": "Brand", name: site.name },
  offers: { "@type": "Offer", price: p.price, priceCurrency: "PKR", availability: "https://schema.org/InStock", seller: { "@id": `${SITE_URL}/#salon` } },
});

export const reviewsSchema = (reviews: { name: string; rating: number; review: string; service: string }[]) => ({
  "@context": "https://schema.org", "@type": "BeautySalon", "@id": `${SITE_URL}/#salon`, name: site.name,
  review: reviews.map((r) => ({ "@type": "Review", author: { "@type": "Person", name: r.name }, reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 }, reviewBody: r.review, itemReviewed: { "@type": "Service", name: r.service } })),
});
