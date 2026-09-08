import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads, messages } from "@/db/schema";
import { genReference } from "@/lib/booking";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const b = await req.json();
    const name = String(b.name || "").trim(), phone = String(b.phone || "").trim(), whatsapp = String(b.whatsapp || "").trim() || phone, service = String(b.service || "").trim(), date = String(b.date || "").trim(), time = String(b.time || "").trim(), message = String(b.message || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10) return NextResponse.json({ error: "Please enter your name and a valid phone number." }, { status: 400 });
    if (!service || !date || !time) return NextResponse.json({ error: "Please choose a service, preferred date and time." }, { status: 400 });
    const reference = genReference().replace("ELN-", "REQ-");
    const notes = `Appointment request ${reference}: ${service} on ${date} at ${time}. WhatsApp: ${whatsapp}.${message ? " Note: " + message.slice(0, 300) : ""}`;
    await db.insert(leads).values({ name, phone, email: null, source: "Website", interest: service, status: "New", notes, followUpDate: date });
    await db.insert(messages).values({ name, phone, email: null, service, message: notes });
    return NextResponse.json({ ok: true, reference });
  } catch (e) { console.error(e); return NextResponse.json({ error: "Could not send your request. Please try WhatsApp." }, { status: 500 }); }
}
