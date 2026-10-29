"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appointments, customers, leads, messages, reviews } from "@/db/schema";
import { assertOwner, assertPermission, logActivity } from "@/lib/auth";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

function refreshAll() {
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
  revalidatePath("/admin/customers");
  revalidatePath("/admin/leads");
  revalidatePath("/admin/messages");
  revalidatePath("/admin/reviews");
}

export async function setAppointmentStatus(id: number, status: string) {
  const actor = await assertPermission("appointments:update");
  if (!Number.isFinite(id) || !STATUSES.includes(status)) return;

  const [before] = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  await db.update(appointments).set({ status }).where(eq(appointments.id, id));

  await logActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "appointment_status",
    detail: before ? `${before.customerName} · ${before.serviceName} on ${before.date} ${before.time}: ${before.status} → ${status}` : `Appointment #${id} → ${status}`,
  });
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
}

export async function rescheduleAppointment(fd: FormData) {
  const actor = await assertPermission("appointments:update");
  const id = Number(fd.get("id"));
  const date = String(fd.get("date"));
  const time = String(fd.get("time"));
  if (!id || !date || !time) return;
  await db.update(appointments).set({ date, time, status: "confirmed" }).where(eq(appointments.id, id));
  await logActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "appointment_rescheduled",
    detail: `Appointment #${id} moved to ${date} ${time}`,
  });
  revalidatePath("/admin/appointments");
}

export async function updateCustomerNotes(fd: FormData) {
  await assertPermission("customers:update");
  const id = Number(fd.get("id"));
  await db
    .update(customers)
    .set({ notes: String(fd.get("notes") || ""), preferredStaff: String(fd.get("preferredStaff") || "") || null })
    .where(eq(customers.id, id));
  revalidatePath(`/admin/customers/${id}`);
}

export async function updateLead(fd: FormData) {
  await assertPermission("leads:update");
  const id = Number(fd.get("id"));
  const status = String(fd.get("status"));
  const notes = String(fd.get("notes") || "");
  const followUpDate = String(fd.get("followUpDate") || "") || null;
  await db.update(leads).set({ status, notes, followUpDate }).where(eq(leads.id, id));
  revalidatePath("/admin/leads");
}

export async function createLead(fd: FormData) {
  await assertPermission("leads:update");
  const name = String(fd.get("name") || "").trim();
  const phone = String(fd.get("phone") || "").trim();
  if (!name || !phone) return;
  await db.insert(leads).values({
    name,
    phone,
    email: String(fd.get("email") || "") || null,
    source: String(fd.get("source") || "Website"),
    interest: String(fd.get("interest") || "") || null,
    notes: String(fd.get("notes") || "") || null,
    followUpDate: String(fd.get("followUpDate") || "") || null,
  });
  revalidatePath("/admin/leads");
}

export async function markMessageRead(id: number, read: boolean) {
  await assertPermission("messages:view");
  await db.update(messages).set({ read }).where(eq(messages.id, id));
  revalidatePath("/admin/messages");
}

export async function toggleReview(id: number, approved: boolean) {
  await assertPermission("reviews:view");
  await db.update(reviews).set({ approved }).where(eq(reviews.id, id));
  revalidatePath("/admin/reviews");
}

/* ------------------------------------------------------------------ *
 * Deletions — owner only
 * ------------------------------------------------------------------ */

export async function deleteAppointment(id: number) {
  const actor = await assertOwner();
  const [row] = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  await db.delete(appointments).where(eq(appointments.id, id));
  await logActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "appointment_deleted",
    detail: row ? `Deleted booking ${row.reference} — ${row.customerName} (${row.date} ${row.time})` : `Deleted appointment #${id}`,
  });
  refreshAll();
}

export async function deleteCustomer(id: number) {
  const actor = await assertOwner();
  const [row] = await db.select().from(customers).where(eq(customers.id, id)).limit(1);
  await db.delete(appointments).where(eq(appointments.customerId, id));
  await db.delete(customers).where(eq(customers.id, id));
  await logActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "customer_deleted",
    detail: row ? `Deleted client ${row.name} (${row.phone}) and their bookings` : `Deleted client #${id}`,
  });
  refreshAll();
}

export async function deleteLead(id: number) {
  const actor = await assertPermission("leads:delete");
  const [row] = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  await db.delete(leads).where(eq(leads.id, id));
  await logActivity({
    actorId: actor.id,
    actorName: actor.name,
    actorRole: actor.role,
    action: "lead_deleted",
    detail: row ? `Deleted lead ${row.name} (${row.phone})` : `Deleted lead #${id}`,
  });
  revalidatePath("/admin/leads");
}
