"use server";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { appointments, customers, leads, messages, reviews } from "@/db/schema";
export async function setAppointmentStatus(id: number, status: string) { await db.update(appointments).set({ status }).where(eq(appointments.id, id)); revalidatePath("/admin"); revalidatePath("/admin/appointments"); }
export async function rescheduleAppointment(fd: FormData) { const id = Number(fd.get("id")); const date = String(fd.get("date")); const time = String(fd.get("time")); if (!id || !date || !time) return; await db.update(appointments).set({ date, time, status: "confirmed" }).where(eq(appointments.id, id)); revalidatePath("/admin/appointments"); }
export async function updateCustomerNotes(fd: FormData) { const id = Number(fd.get("id")); await db.update(customers).set({ notes: String(fd.get("notes") || ""), preferredStaff: String(fd.get("preferredStaff") || "") || null }).where(eq(customers.id, id)); revalidatePath(`/admin/customers/${id}`); }
export async function updateLead(fd: FormData) { const id = Number(fd.get("id")); const status = String(fd.get("status")); const notes = String(fd.get("notes") || ""); const followUpDate = String(fd.get("followUpDate") || "") || null; await db.update(leads).set({ status, notes, followUpDate }).where(eq(leads.id, id)); revalidatePath("/admin/leads"); }
export async function createLead(fd: FormData) { const name = String(fd.get("name") || "").trim(); const phone = String(fd.get("phone") || "").trim(); if (!name || !phone) return; await db.insert(leads).values({ name, phone, email: String(fd.get("email") || "") || null, source: String(fd.get("source") || "Website"), interest: String(fd.get("interest") || "") || null, notes: String(fd.get("notes") || "") || null, followUpDate: String(fd.get("followUpDate") || "") || null }); revalidatePath("/admin/leads"); }
export async function markMessageRead(id: number, read: boolean) { await db.update(messages).set({ read }).where(eq(messages.id, id)); revalidatePath("/admin/messages"); }
export async function toggleReview(id: number, approved: boolean) { await db.update(reviews).set({ approved }).where(eq(reviews.id, id)); revalidatePath("/admin/reviews"); }
