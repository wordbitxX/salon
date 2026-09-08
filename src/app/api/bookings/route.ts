import { NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { appointments, customers } from "@/db/schema";
import { getService } from "@/lib/services";
import { getStaff } from "@/lib/staff";
import { computeSlots, genReference } from "@/lib/booking";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const s = getService(b.service); const st = getStaff(b.staff);
    const name = String(b.name || "").trim(); const phone = String(b.phone || "").trim(); const email = String(b.email || "").trim() || null; const date = String(b.date || ""); const time = String(b.time || "");
    if (!s || !st || !name || phone.replace(/\D/g, "").length < 10 || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    const existing = await db.select({ time: appointments.time, durationMin: appointments.durationMin }).from(appointments).where(and(eq(appointments.staffSlug, st.slug), eq(appointments.date, date), ne(appointments.status, "cancelled")));
    const avail = computeSlots({ date, duration: s.duration, workingDays: st.workingDays, existing, staffSlug: st.slug });
    if (avail.closed || !avail.slots.find((x) => x.time === time)?.available) return NextResponse.json({ error: "That slot was just taken. Please pick another time." }, { status: 409 });
    let [cust] = await db.select().from(customers).where(eq(customers.phone, phone)).limit(1);
    if (!cust) [cust] = await db.insert(customers).values({ name, phone, email, preferredStaff: st.name }).returning();
    const reference = genReference();
    const [appt] = await db.insert(appointments).values({ reference, customerId: cust.id, customerName: name, customerPhone: phone, customerEmail: email, serviceSlug: s.slug, serviceName: s.name, staffSlug: st.slug, staffName: st.name, date, time, durationMin: s.duration, price: s.price, status: "pending", notes: b.notes ? String(b.notes).slice(0, 500) : null }).returning();
    return NextResponse.json({ ok: true, reference: appt.reference, id: appt.id });
  } catch (e) { console.error(e); return NextResponse.json({ error: "Something went wrong. Please try again or WhatsApp us." }, { status: 500 }); }
}
