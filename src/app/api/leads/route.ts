import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const b = await req.json(); const name = String(b.name || "").trim(), phone = String(b.phone || "").trim();
    if (!name || phone.replace(/\D/g, "").length < 10) return NextResponse.json({ error: "Name and valid phone are required." }, { status: 400 });
    await db.insert(leads).values({ name, phone, email: b.email || null, source: b.source || "Website", interest: b.interest || null, status: "New", notes: b.notes || null });
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}
