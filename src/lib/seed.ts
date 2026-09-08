import { db } from "@/db";
import { appointments, customers, leads, messages, reviews } from "@/db/schema";
import { count } from "drizzle-orm";
import { services } from "./services";
import { staff } from "./staff";
import { testimonials } from "./content";
import { genReference } from "./booking";

const names = [["Amna Rehman", "+92 300 1112233", "amna.r@example.com"], ["Sana Tariq", "+92 321 4455667", "sana.t@example.com"], ["Hina Javed", "+92 333 7788990", "hina.j@example.com"], ["Rabia Iqbal", "+92 301 2233445", "rabia.i@example.com"], ["Mariam Sheikh", "+92 345 6677889", "mariam.s@example.com"], ["Zainab Ali", "+92 302 9988776", "zainab.a@example.com"], ["Fatima Noor", "+92 311 5544332", "fatima.n@example.com"], ["Iqra Hassan", "+92 322 1122334", "iqra.h@example.com"], ["Sadia Khan", "+92 331 4433221", "sadia.k@example.com"], ["Nimra Butt", "+92 303 8877665", "nimra.b@example.com"], ["Ayesha Siddiq", "+92 344 2211009", "ayesha.s@example.com"], ["Laiba Ahmed", "+92 312 6655443", "laiba.a@example.com"], ["Mahnoor Raza", "+92 334 9900112", "mahnoor.r@example.com"], ["Kinza Malik", "+92 305 3344556", "kinza.m@example.com"], ["Hafsa Iqbal", "+92 323 7766554", "hafsa.i@example.com"], ["Anum Javaid", "+92 335 1100998", "anum.j@example.com"]];
const statuses = ["confirmed", "confirmed", "confirmed", "completed", "completed", "completed", "completed", "pending", "cancelled"];
const iso = (d: Date) => d.toISOString().slice(0, 10);
let seeded = false;
export async function ensureSeed() {
  if (seeded) return; seeded = true;
  const [{ value }] = await db.select({ value: count() }).from(customers);
  if (value > 0) return;
  const custRows = await db.insert(customers).values(names.map(([name, phone, email], i) => ({ name, phone, email, preferredStaff: staff[i % staff.length].name, notes: i % 3 === 0 ? "Prefers ammonia-free colour. Allergic to fragrance-heavy products." : i % 3 === 1 ? "Likes quiet room; usually books Saturday mornings." : null }))).returning();
  const appts: (typeof appointments.$inferInsert)[] = []; const today = new Date();
  let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < 140; i++) {
    const c = custRows[Math.floor(rnd() * custRows.length)]; const s = services[Math.floor(rnd() * services.length)]; const stf = staff.find((x) => s.staff.includes(x.slug)) || staff[0];
    const dayOffset = Math.floor(rnd() * 75) - 60; const d = new Date(today); d.setDate(d.getDate() + dayOffset);
    const hour = 10 + Math.floor(rnd() * 10); const time = `${String(hour).padStart(2, "0")}:${rnd() > 0.5 ? "30" : "00"}`;
    let status = statuses[Math.floor(rnd() * statuses.length)]; if (dayOffset > 0) status = rnd() > 0.3 ? "confirmed" : "pending"; else if (dayOffset < 0 && status === "pending") status = "completed";
    appts.push({ reference: genReference() + i, customerId: c.id, customerName: c.name, customerPhone: c.phone, customerEmail: c.email, serviceSlug: s.slug, serviceName: s.name, staffSlug: stf.slug, staffName: stf.name, date: iso(d), time, durationMin: s.duration, price: s.price, status });
  }
  for (let i = 0; i < 6; i++) { const c = custRows[i]; const s = services[[0, 4, 7, 12, 1, 5][i]]; const stf = staff.find((x) => s.staff.includes(x.slug)) || staff[0]; appts.push({ reference: genReference() + "T" + i, customerId: c.id, customerName: c.name, customerPhone: c.phone, customerEmail: c.email, serviceSlug: s.slug, serviceName: s.name, staffSlug: stf.slug, staffName: stf.name, date: iso(today), time: ["10:30", "11:00", "12:30", "14:00", "16:00", "17:30"][i], durationMin: s.duration, price: s.price, status: i < 2 ? "completed" : i === 5 ? "pending" : "confirmed" }); }
  await db.insert(appointments).values(appts);
  const fu = (n: number) => { const d = new Date(today); d.setDate(d.getDate() + n); return iso(d); };
  await db.insert(leads).values([
    { name: "Areeba Shahid", phone: "+92 300 5551234", email: "areeba@example.com", source: "Instagram", interest: "Complete Bridal Experience", status: "Interested", notes: "Wedding in December, wants Ayesha. Asked for trial dates.", followUpDate: fu(2) },
    { name: "Maha Qureshi", phone: "+92 321 5559876", source: "WhatsApp", interest: "Keratin Treatment", status: "New", notes: "Asked about price for long hair.", followUpDate: fu(1) },
    { name: "Tooba Naveed", phone: "+92 333 5554321", email: "tooba@example.com", source: "Google", interest: "HydraFacial", status: "Contacted", notes: "Called back, will confirm weekend slot.", followUpDate: fu(3) },
    { name: "Rida Farhan", phone: "+92 301 5558765", source: "Facebook", interest: "Party Makeup x4 (family)", status: "Booked", notes: "Booked for Saturday 6 PM group.", followUpDate: null },
    { name: "Sundus Ali", phone: "+92 345 5552468", email: "sundus@example.com", source: "Website", interest: "Glow Package", status: "Completed", notes: "Visited, very happy. Ask for review.", followUpDate: null },
    { name: "Eman Zafar", phone: "+92 302 5551357", source: "Phone", interest: "Hair Colouring", status: "Lost", notes: "Went with a salon closer to home.", followUpDate: null },
    { name: "Warda Saleem", phone: "+92 311 5553691", email: "warda@example.com", source: "Instagram", interest: "Bridal Glow package", status: "New", notes: "DM'd asking about mehndi + walima combo.", followUpDate: fu(1) },
  ]);
  await db.insert(messages).values([
    { name: "Nadia Aslam", phone: "+92 300 7770001", email: "nadia@example.com", service: "Bridal", message: "Hi, my sister's wedding is in March. Do you have Ayesha available for barat on the 14th? Also need party makeup for 3 family members.", read: false },
    { name: "Komal Riaz", phone: "+92 321 7770002", service: "Hair", message: "I want to go from black to caramel balayage. Is a strand test needed and how many sessions would it take?", read: false },
    { name: "Bushra Tahir", phone: "+92 333 7770003", email: "bushra@example.com", service: "Skin", message: "Do you offer a course discount for 6 HydraFacials? I'd like to start next week.", read: true },
  ]);
  await db.insert(reviews).values(testimonials.map((t) => ({ customerName: t.name, service: t.service, rating: String(t.rating), review: t.review, approved: true })));
}
