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
/**
 * Photography is served from /public/images so the site never depends on an
 * external image host. (The design originally hot-linked Pexels CDN URLs plus a
 * few /images/*.jpg files that were never committed — both showed up as broken
 * pictures in production.)
 */
const LOCAL_PHOTOS = {
  interior: "/images/interior.jpg",
  hero: "/images/hero.jpg",
  bridal: "/images/bridal.jpg",
  facial: "/images/facial.jpg",
  hydrafacial: "/images/hydrafacial.jpg",
  hairCut: "/images/hair-cut.jpg",
  hairColour: "/images/hair-colour.jpg",
  hairTreatment: "/images/hair-treatment.jpg",
  makeup: "/images/makeup.jpg",
  mehndi: "/images/mehndi.jpg",
  nails: "/images/nails.jpg",
  lashes: "/images/lashes.jpg",
  waxing: "/images/waxing.jpg",
  spa: "/images/spa.jpg",
} as const;

/** Legacy numeric ids used across content files → the local photo they now map to. */
const PHOTO_BY_ID: Record<number, string> = {
  1552542: LOCAL_PHOTOS.makeup,
  3373716: LOCAL_PHOTOS.facial,
  3993451: LOCAL_PHOTOS.hairTreatment,
  6135672: LOCAL_PHOTOS.nails,
  7321353: LOCAL_PHOTOS.facial,
  7321552: LOCAL_PHOTOS.hydrafacial,
  7321649: LOCAL_PHOTOS.facial,
  7321715: LOCAL_PHOTOS.waxing,
  7321731: LOCAL_PHOTOS.spa,
  7321735: LOCAL_PHOTOS.spa,
  7479557: LOCAL_PHOTOS.facial,
  7755207: LOCAL_PHOTOS.hairColour,
  8154350: LOCAL_PHOTOS.makeup,
  8460604: LOCAL_PHOTOS.facial,
  8834018: LOCAL_PHOTOS.interior,
  8834048: LOCAL_PHOTOS.hairTreatment,
  14615063: LOCAL_PHOTOS.hairCut,
  20022699: LOCAL_PHOTOS.interior,
  20051635: LOCAL_PHOTOS.hairCut,
  20068197: LOCAL_PHOTOS.waxing,
  29545940: LOCAL_PHOTOS.makeup,
  29624009: LOCAL_PHOTOS.makeup,
  30294773: LOCAL_PHOTOS.nails,
  31252207: LOCAL_PHOTOS.bridal,
  31869537: LOCAL_PHOTOS.interior,
  31871011: LOCAL_PHOTOS.nails,
  33461102: LOCAL_PHOTOS.bridal,
  33497582: LOCAL_PHOTOS.makeup,
  33793884: LOCAL_PHOTOS.facial,
  35288343: LOCAL_PHOTOS.lashes,
  36327550: LOCAL_PHOTOS.hairColour,
  36623225: LOCAL_PHOTOS.mehndi,
};

/**
 * Photo helper kept for backwards compatibility with the content files.
 * The `w`/`h` arguments are ignored — Next/Image resizes the local file.
 */
export const px = (id: number, _w = 900, _h = 1100): string => PHOTO_BY_ID[id] ?? LOCAL_PHOTOS.interior;

export const photos = LOCAL_PHOTOS;

export const fmtPKR = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
export const fmtDuration = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h${m % 60 ? ` ${m % 60}m` : ""}` : `${m} min`);
