import { px } from "./site";
export type Pkg = { slug: string; name: string; tagline: string; includes: string[]; original: number; price: number; duration: number; image: string; alt: string; badge?: string; bridal?: boolean };
export const packages: Pkg[] = [
  { slug: "signature-glow", name: "Signature Glow", tagline: "Hair + Facial + Manicure", includes: ["Haircut & blow-dry", "Signature Glow Facial", "Luxury manicure", "Brow threading"], original: 13800, price: 9900, duration: 225, image: px(8460604, 900, 700), alt: "Signature Glow package facial treatment at ÉLAN beauty salon Lahore", badge: "Most Popular" },
  { slug: "bridal-elegance", name: "Bridal Elegance", tagline: "Facial + Hair + Makeup Trial", includes: ["HydraFacial", "Hair spa & blow-dry", "Bridal makeup trial with lead artist", "Brow shaping"], original: 26500, price: 19900, duration: 300, image: "/images/bridal.jpg", alt: "Bridal Elegance package at the best bridal salon in Lahore", badge: "Brides' Favourite", bridal: true },
  { slug: "complete-bridal", name: "Complete Bridal", tagline: "Mehndi + Barat + Walima", includes: ["Pre-bridal skin programme (6 sessions)", "Mehndi day makeup & hair", "Signature barat bridal makeup", "Walima / reception makeup & hair", "Bridal mehndi", "2 party makeups for family"], original: 165000, price: 135000, duration: 240, image: px(33461102, 900, 700), alt: "Complete bridal package including makeup, hair and mehndi in Lahore", badge: "Best Value", bridal: true },
  { slug: "party-glam", name: "Party Glam", tagline: "Makeup + Hair + Lashes", includes: ["Party makeup (HD)", "Hairstyling or blow-dry", "Premium strip lashes", "Dupatta / saree setting"], original: 10000, price: 8500, duration: 105, image: px(29624009, 900, 700), alt: "Party Glam makeup and hair package at ÉLAN Lahore" },
  { slug: "hair-transformation", name: "Hair Transformation", tagline: "Colour + Cut + Treatment", includes: ["Balayage or global colour", "Precision haircut", "Bond-protect treatment", "Shine gloss & blow-dry"], original: 18500, price: 14900, duration: 240, image: px(7755207, 900, 700), alt: "Hair transformation colour and cut package at a hair salon in Lahore" },
  { slug: "self-care-package", name: "Self Care Ritual", tagline: "Manicure + Pedicure + Facial", includes: ["Luxury manicure", "Luxury pedicure", "Signature Glow Facial", "Herbal tea & refreshments"], original: 10500, price: 7900, duration: 165, image: px(6135672, 900, 700), alt: "Self care manicure and pedicure package at a ladies salon in Lahore" },
  { slug: "spa-day", name: "Spa Day Escape", tagline: "Massage + Body Polish + Facial", includes: ["Aromatherapy massage", "Brightening body polish", "Signature Glow Facial", "Private suite & refreshments"], original: 20000, price: 15900, duration: 195, image: "/images/spa.jpg", alt: "Spa day package at a premium spa in Lahore" },
];
export type Offer = { title: string; desc: string; code: string; validity: string; terms: string; discount: string };
export const offers: Offer[] = [
  { title: "First Visit Welcome", desc: "New to ÉLAN? Enjoy 20% off any single service on your first appointment.", code: "WELCOME20", validity: "Ongoing for new clients", discount: "20% OFF", terms: "Valid on services above Rs 3,000. Not combinable with packages." },
  { title: "Midweek Glow", desc: "Book any facial Monday to Wednesday before 3 PM and save 15%.", code: "MIDWEEK15", validity: "Mon–Wed, before 3 PM", discount: "15% OFF", terms: "Applies to Skin category services only." },
  { title: "Bring a Friend", desc: "Book together and you both receive a complimentary hair spa upgrade.", code: "DUO", validity: "Weekends", discount: "Free Upgrade", terms: "Both appointments must be booked for the same day." },
  { title: "Bridal Season Bonus", desc: "Book the Complete Bridal package and get 2 additional party makeups for family free.", code: "BRIDE2025", validity: "Wedding season bookings", discount: "Worth Rs 14,000", terms: "Applies to Complete Bridal package bookings with deposit." },
];
export type Testimonial = { name: string; area: string; service: string; rating: number; review: string; image: string };
export const testimonials: Testimonial[] = [
  { name: "Amna Rehman", area: "DHA Phase 5", service: "Signature Bridal Makeup", rating: 5, review: "Absolutely loved my bridal makeup. Ayesha listened to exactly what I wanted — soft, glowy, not cakey — and it lasted through a 14-hour barat in July. The entire team was professional and made me feel so comfortable.", image: px(8154350, 200, 200) },
  { name: "Sana Tariq", area: "Gulberg", service: "Hair Colouring", rating: 5, review: "I'd been burnt by bad balayage twice before. Sofia did a strand test, explained the toner, and the result is the most natural caramel I've ever had. Three months later it's still not brassy.", image: px(20051635, 200, 200) },
  { name: "Hina Javed", area: "Johar Town", service: "HydraFacial", rating: 5, review: "Came in with dull, congested skin a week before my sister's walima. One HydraFacial with Maya and my makeup artist actually asked what I'd done to my skin. Booked the pre-bridal programme for myself right after.", image: px(31869537, 200, 200) },
  { name: "Rabia Iqbal", area: "Model Town", service: "Manicure & Pedicure", rating: 4.5, review: "Finally a nail salon in Lahore that opens fresh single-use files in front of you. The heated chairs, the tea, the calm — it's my monthly reset. Only wish they'd extend Sunday hours.", image: px(35288343, 200, 200) },
  { name: "Mariam Sheikh", area: "Cantt", service: "Keratin Treatment", rating: 5, review: "My frizzy, thick hair used to take 45 minutes to blow-dry. After the keratin treatment it's 12 minutes and looks like I've stepped out of the salon every day. Worth every rupee.", image: px(36623225, 200, 200) },
  { name: "Zainab Ali", area: "Bahria Town", service: "Engagement Look", rating: 5, review: "Noor did my engagement makeup and hair and the photos still make me smile. She matched my base perfectly in daylight and it didn't oxidise at all. Booking her for my mehndi too.", image: px(31871011, 200, 200) },
  { name: "Noor ul Ain", area: "Wapda Town", service: "Party Glam Package", rating: 5, review: "Booked the Party Glam package for my cousin's walima at 4 PM and was out by 6 looking better than I ever manage myself. The lashes were so comfortable I forgot they were on.", image: px(3373716, 200, 200) },
  { name: "Farah Nadeem", area: "Gulberg", service: "Waxing & Threading", rating: 5, review: "Least painful full-body wax I've had in Lahore, and the room was actually private. They opened a fresh wax strip pack in front of me without me asking. Small thing, big trust.", image: px(20068197, 200, 200) },
];
export type Transformation = { cat: "Hair" | "Makeup" | "Skin" | "Bridal"; title: string; service: string; slug: string; before: string; after: string; alt: string };
export const transformations: Transformation[] = [
  { cat: "Hair", title: "Frizzy to glass-smooth", service: "Keratin Smoothing", slug: "keratin-treatment", before: px(3993451, 700, 900), after: px(14615063, 700, 900), alt: "Hair before and after keratin smoothing treatment at ÉLAN hair salon Lahore" },
  { cat: "Hair", title: "Flat black to caramel balayage", service: "Hair Colouring", slug: "hair-coloring", before: px(36327550, 700, 900), after: px(7755207, 700, 900), alt: "Hair colour before and after caramel balayage at a hair colouring salon in Lahore" },
  { cat: "Makeup", title: "Bare face to soft glam", service: "Party Makeup", slug: "party-makeup", before: px(1552542, 700, 900), after: px(29624009, 700, 900), alt: "Before and after party makeup by a makeup artist in Lahore" },
  { cat: "Makeup", title: "Everyday to evening", service: "Engagement Look", slug: "engagement-makeup", before: px(20068197, 700, 900), after: px(33497582, 700, 900), alt: "Before and after engagement makeup at ÉLAN Beauty Studio Lahore" },
  { cat: "Skin", title: "Dull & congested to radiant", service: "HydraFacial", slug: "hydrafacial", before: px(7479557, 700, 900), after: px(3373716, 700, 900), alt: "Skin before and after HydraFacial at a facial salon in Lahore" },
  { cat: "Skin", title: "Texture & marks, 6 sessions later", service: "Acne Clarifying", slug: "acne-clarifying-treatment", before: px(33793884, 700, 900), after: px(8460604, 700, 900), alt: "Skin before and after acne clarifying facials at ÉLAN skin clinic Lahore" },
  { cat: "Bridal", title: "Getting ready to barat bride", service: "Signature Bridal Makeup", slug: "bridal-makeup", before: px(33461102, 700, 900), after: "/images/bridal.jpg", alt: "Bride before and after signature bridal makeup by ÉLAN, bridal makeup artist Lahore" },
  { cat: "Bridal", title: "Trial to walima elegance", service: "Reception / Walima Makeup", slug: "reception-walima-makeup", before: px(29624009, 700, 900), after: px(31252207, 700, 900), alt: "Before and after walima reception makeup at ÉLAN bridal salon Lahore" },
];
export type GalleryItem = { src: string; alt: string; cat: "Hair" | "Makeup" | "Bridal" | "Nails" | "Salon Interior" | "Before & After"; w: number; h: number };
export const gallery: GalleryItem[] = [
  { src: "/images/interior.jpg", alt: "ÉLAN Beauty Studio salon interior in Gulberg, Lahore with ivory walls and arched mirrors", cat: "Salon Interior", w: 4, h: 3 },
  { src: px(33461102, 800, 1100), alt: "Bridal hair styling with fresh flowers at ÉLAN bridal salon Lahore", cat: "Bridal", w: 3, h: 4 },
  { src: px(7755207, 800, 600), alt: "Hair colouring in progress at ÉLAN hair salon Lahore", cat: "Hair", w: 4, h: 3 },
  { src: px(30294773, 800, 1100), alt: "Minimal nail art gel manicure at ÉLAN nail salon Lahore", cat: "Nails", w: 3, h: 4 },
  { src: "/images/bridal.jpg", alt: "Signature bridal makeup look on a Pakistani bride by ÉLAN Lahore", cat: "Bridal", w: 3, h: 4 },
  { src: px(29624009, 800, 1100), alt: "Party makeup client checking her look in the salon mirror in Lahore", cat: "Makeup", w: 3, h: 4 },
  { src: px(14615063, 800, 600), alt: "Blow-dry and styling result at a women's hair salon in Lahore", cat: "Hair", w: 4, h: 3 },
  { src: px(8834018, 800, 1000), alt: "Stylist station with round mirrors at ÉLAN salon interior", cat: "Salon Interior", w: 4, h: 5 },
  { src: px(6135672, 800, 1100), alt: "Manicure nail shaping close-up at ÉLAN nail bar Lahore", cat: "Nails", w: 3, h: 4 },
  { src: px(31252207, 800, 1100), alt: "Soft glam bridal makeup in warm lighting, bridal makeup artist Lahore", cat: "Bridal", w: 3, h: 4 },
  { src: px(3993451, 800, 1100), alt: "Before hair treatment: luxury hair wash at ÉLAN Lahore", cat: "Before & After", w: 3, h: 4 },
  { src: px(8834048, 800, 600), alt: "After hair spa: smooth, glossy hair result at ÉLAN Lahore", cat: "Before & After", w: 4, h: 3 },
  { src: px(29545940, 800, 1100), alt: "Elegant bridal look with lace details styled by ÉLAN Beauty Studio", cat: "Bridal", w: 3, h: 4 },
  { src: "/images/spa.jpg", alt: "Private spa suite at ÉLAN spa in Lahore", cat: "Salon Interior", w: 4, h: 3 },
  { src: px(8460604, 800, 600), alt: "Before & after facial: relaxed client mid-treatment at ÉLAN facial salon Lahore", cat: "Before & After", w: 4, h: 3 },
  { src: px(7321735, 800, 1100), alt: "Fresh manicure result at ÉLAN nail salon Lahore", cat: "Nails", w: 3, h: 4 },
];
export const galleryCats = ["All", "Hair", "Makeup", "Bridal", "Nails", "Salon Interior", "Before & After"] as const;
export type FAQ = { q: string; a: string };
export const faqs: FAQ[] = [
  { q: "Which is the best beauty salon in Lahore?", a: "The best beauty salon in Lahore is the one that combines specialist expertise, visible hygiene, honest pricing and consistent results. ÉLAN Beauty Studio in Gulberg is rated 4.9/5 by clients for exactly those reasons — a specialist-led team, sterilised tools opened in front of you, published prices and real-time online booking." },
  { q: "How much does bridal makeup cost in Lahore?", a: "Premium bridal makeup in Lahore typically ranges from Rs 35,000 to Rs 80,000 per event depending on the artist. At ÉLAN, Signature Bridal Makeup with hair starts at Rs 45,000 and includes a complimentary trial. Our Complete Bridal package (mehndi, barat, walima, skin prep and mehndi application) is Rs 135,000." },
  { q: "Do you offer bridal packages?", a: "Yes. Bridal Elegance (trial + facial + hair), Complete Bridal (all three events with pre-bridal skin) and custom combinations are available. Every bridal booking includes a consultation with our creative director and a trial with your artist." },
  { q: "How can I book an appointment?", a: "Book online in under a minute at elanbeauty.pk/booking with real-time availability, message us on WhatsApp at +92 325 1888841, or call the same number during salon hours." },
  { q: "Do you offer home service in Lahore?", a: "We offer on-location bridal and party makeup across Lahore — DHA, Bahria Town, Model Town, Johar Town, Wapda Town and Cantt — for bookings of two or more looks. Travel charges apply. Hair, skin, nails and spa services are in-studio only." },
  { q: "What hair treatments do you offer?", a: "Keratin smoothing (formaldehyde-free), hair spa and repair rituals, bond-protect treatments with colour, scalp detox, gloss treatments and protein/moisture masks. Our stylists diagnose your hair first and recommend the right treatment." },
  { q: "Do you offer party makeup?", a: "Yes — party and event makeup for dinners, mehndis, walimas and photoshoots starts at Rs 7,000 and includes skin prep, lashes and a simple hair set. Our Party Glam package adds full hairstyling for Rs 8,500." },
  { q: "Do you accept WhatsApp bookings?", a: "Absolutely. Message +92 325 1888841 on WhatsApp with your preferred service, date and time and we'll confirm within minutes during salon hours. Every page on this website has a Chat & Book on WhatsApp button." },
  { q: "Where is the salon located?", a: "12-B Main Boulevard, Gulberg III, Lahore — 5 minutes from Liberty Market and MM Alam Road with free on-site parking. We're 15–20 minutes from DHA, Model Town and Johar Town." },
  { q: "Is ÉLAN a ladies-only salon?", a: "Yes. ÉLAN is a women-only salon with an all-female team, private treatment rooms and a discreet entrance." },
  { q: "What are your hygiene standards?", a: "Hospital-grade autoclave sterilisation for metal tools, single-use files, buffers and wax strips, and fresh towels and capes for every client." },
  { q: "Can I cancel or reschedule?", a: "Yes — please give at least 12 hours' notice via WhatsApp or phone. Bridal bookings follow the terms in your bridal agreement." },
];
export const stats = [
  { value: "5000+", label: "Happy Clients" },
  { value: "10+", label: "Beauty Experts" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "10+", label: "Years of Experience" },
];

export const trustNumbers = [
  { value: "4.9/5", label: "Google Rating", note: "Based on client reviews" },
  { value: "1,800+", label: "Client Reviews", note: "Across Google & Instagram" },
  { value: "5,000+", label: "Happy Clients", note: "Since 2015" },
  { value: "10+", label: "Years Experience", note: "Serving Lahore" },
  { value: "25,000+", label: "Services Completed", note: "Hair, skin, bridal & more" },
];
