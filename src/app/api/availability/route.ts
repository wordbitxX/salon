import { NextResponse } from "next/server";
import { and, eq, ne } from "drizzle-orm";
import { db } from "@/db";
import { appointments } from "@/db/schema";
import { getStaff } from "@/lib/staff";
import { computeSlots } from "@/lib/booking";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const staffSlug = searchParams.get("staff") || ""; const date = searchParams.get("date") || ""; const duration = Number(searchParams.get("duration") || 60);
  const st = getStaff(staffSlug);
  if (!st || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  const existing = await db.select({ time: appointments.time, durationMin: appointments.durationMin }).from(appointments).where(and(eq(appointments.staffSlug, staffSlug), eq(appointments.date, date), ne(appointments.status, "cancelled")));
  return NextResponse.json(computeSlots({ date, duration, workingDays: st.workingDays, existing, staffSlug }));
}
