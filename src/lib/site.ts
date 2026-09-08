export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://elanbeauty.demo.wordbitxtech.com";
export const site = {
  name: "ÉLAN Beauty Studio",
  shortName: "ÉLAN",
  tagline: "Beauty, Confidence & You.",
  description: "ÉLAN Beauty Studio is a premium ladies salon in Gulberg, Lahore offering expert haircuts, hair colour, facials, bridal makeup, nails and spa treatments.",
  phone: "+92 325 1888841",
  phoneHref: "tel:+923251888841",
  whatsapp: "923251888841",
  email: "hello@elanbeauty.pk",
  address: { street: "12-B, Main Boulevard, Gulberg III", city: "Lahore", region: "Punjab", postal: "54660", country: "PK" },
  geo: { lat: 31.5169, lng: 74.3484 },
  mapsEmbed: "https://www.google.com/maps?q=31.5169,74.3484&z=16&hl=en&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=31.5169%2C74.3484",
  directionsLink: "https://www.google.com/maps/dir/?api=1&destination=31.5169%2C74.3484",
  hours: [
    { days: "Monday – Saturday", open: "10:00 AM", close: "9:00 PM" },
    { days: "Sunday", open: "12:00 PM", close: "8:00 PM" },
  ],
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    tiktok: "https://www.tiktok.com/",
    youtube: "https://www.youtube.com/",
  },
  priceNote: "Prices in PKR",
  founded: 2015,
  // numeric hours by weekday (0=Sun) in 24h, Asia/Karachi
  hoursNumeric: { 0: [12, 20], 1: [10, 21], 2: [10, 21], 3: [10, 21], 4: [10, 21], 5: [10, 21], 6: [10, 21] } as Record<number, [number, number]>,
  googleRating: 4.9,
};
export const wordbitx = {
  name: "WordbitX",
  url: "https://www.wordbitxtech.com/",
  tagline: "We create amazing digital products.",
  /** WordbitX sales line (US) — for agency/demo enquiries, not salon bookings. */
  phone: "+1 (929) 619 7699",
  phoneHref: "tel:+19296197699",
  whatsapp: "19296197699",
  phoneLabel: "US / WhatsApp",
};
/** Pre-filled WhatsApp link for WordbitX agency enquiries. */
export function wordbitxWaLink(message = wordbitxMessages.demo) {
  return `https://wa.me/${wordbitx.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const wordbitxMessages = {
  demo: "Hi WordbitX! I saw the ÉLAN Beauty Studio demo. I'd like a website + booking system for my salon.",
  quote: "Hi WordbitX! Please share pricing for a salon website with online booking, WhatsApp leads and a CRM dashboard.",
};
export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
export const waMessages = {
  general: "Hi ÉLAN Beauty Studio! I'd like to chat and book an appointment.",
  request: (o: { name: string; service: string; date: string; time: string }) => `Hi ÉLAN! I'm ${o.name}. I'd like to book ${o.service} on ${o.date} around ${o.time}. Please confirm availability.`,
  book: "Hi ÉLAN! I'd like to book an appointment. Could you share available slots?",
  bridal: "Hi ÉLAN! I'm interested in your bridal packages. Could you share details and pricing?",
  offers: "Hi ÉLAN! I saw your current offers online and would like to know more.",
  service: (s: string) => `Hi ÉLAN! I'd like to book "${s}". What slots are available this week?`,
  staff: (s: string) => `Hi ÉLAN! I'd like to book an appointment with ${s}.`,
  pkg: (s: string) => `Hi ÉLAN! I'm interested in the "${s}" package. Please share details.`,
};
/** A few Pexels assets are only published as PNG — requesting .jpeg 404s. */
const PNG_ASSETS = new Set([30294773, 16096141]);
export const px = (id: number, w = 900, h = 1100) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${PNG_ASSETS.has(id) ? "png" : "jpeg"}?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
export const fmtPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
export const fmtDuration = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}` : `${m} min`);
