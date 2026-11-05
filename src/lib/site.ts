export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://saloon.wordbitx.pk";
export const site = {
  name: "ÉLAN Beauty Studio",
  shortName: "ÉLAN",
  tagline: "Beauty, Confidence & You.",
  description: "ÉLAN Beauty Studio is a premium ladies salon in Gulberg, Lahore offering expert haircuts, hair colour, facials, bridal makeup, nails and spa treatments.",
  phone: "+92 325 1888841",
  phoneHref: "tel:+923251888841",
  whatsapp: "923251888841",
  email: "info@wordbitx.com",
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
  url: "https://wordbitx.com",
  tagline: "We create amazing digital products.",
  /** WordbitX sales and support contact. */
  phone: site.phone,
  phoneHref: site.phoneHref,
  whatsapp: site.whatsapp,
  phoneLabel: "Pakistan / WhatsApp",
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
// Local editorial imagery keeps the demo independent of external image hosts.
const imageGroups: Record<string, number[]> = {
  hair: [14615063, 7755207, 3993451, 8834048, 36327550],
  skin: [8460604, 7321552, 7321353, 7321715, 7479557, 3373716, 33793884],
  nails: [30294773, 6135672, 7321735, 7321731],
  bridal: [29624009, 31252207, 33461102, 29545940, 33497582, 1552542],
};
export const px = (id: number, _w = 900, _h = 1100) => {
  const group = Object.entries(imageGroups).find(([, ids]) => ids.includes(id))?.[0] ?? "artist";
  return `/images/${group}.jpg`;
};
export const fmtPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
export const fmtDuration = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}` : `${m} min`);
