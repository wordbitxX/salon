import { db } from "@/db";
import { appointments, customers, leads, messages, reviews } from "@/db/schema";
import { and, asc, count, desc, eq, gte, lte, sql, sum, ilike, or } from "drizzle-orm";
import { ensureSeed } from "./seed";
const iso = (d: Date) => d.toISOString().slice(0, 10);
export async function getOverview() {
  await ensureSeed();
  const today = iso(new Date()); const monthStart = today.slice(0, 8) + "01";
  const lastMonth = new Date(); lastMonth.setMonth(lastMonth.getMonth() - 1); const lmStart = iso(lastMonth).slice(0, 8) + "01"; const lmEnd = iso(new Date(new Date(monthStart).getTime() - 86400000));
  const [todayAppts, upcoming, [{ totalCustomers }], [{ newCustomers }], [{ revenue }], [{ lastRevenue }], [{ pending }], [{ cancelled }], popular, revenueByDay, custByWeek, apptsByStatus] = await Promise.all([
    db.select().from(appointments).where(eq(appointments.date, today)).orderBy(asc(appointments.time)),
    db.select().from(appointments).where(and(gte(appointments.date, today), sql`${appointments.status} in ('pending','confirmed')`)).orderBy(asc(appointments.date), asc(appointments.time)).limit(8),
    db.select({ totalCustomers: count() }).from(customers),
    db.select({ newCustomers: count() }).from(customers).where(gte(customers.createdAt, new Date(monthStart))),
    db.select({ revenue: sum(appointments.price) }).from(appointments).where(and(eq(appointments.status, "completed"), gte(appointments.date, monthStart))),
    db.select({ lastRevenue: sum(appointments.price) }).from(appointments).where(and(eq(appointments.status, "completed"), gte(appointments.date, lmStart), lte(appointments.date, lmEnd))),
    db.select({ pending: count() }).from(appointments).where(eq(appointments.status, "pending")),
    db.select({ cancelled: count() }).from(appointments).where(and(eq(appointments.status, "cancelled"), gte(appointments.date, monthStart))),
    db.select({ name: appointments.serviceName, n: count(), rev: sum(appointments.price) }).from(appointments).where(sql`${appointments.status} <> 'cancelled'`).groupBy(appointments.serviceName).orderBy(desc(count())).limit(6),
    db.select({ week: sql<string>`to_char(date_trunc('week', ${appointments.date}::date), 'DD Mon')`, wk: sql<string>`date_trunc('week', ${appointments.date}::date)`, rev: sum(appointments.price), n: count() }).from(appointments).where(and(sql`${appointments.status} in ('completed','confirmed')`, gte(appointments.date, iso(new Date(Date.now() - 56 * 86400000))), lte(appointments.date, today))).groupBy(sql`date_trunc('week', ${appointments.date}::date)`).orderBy(sql`date_trunc('week', ${appointments.date}::date)`),
    db.select({ week: sql<string>`to_char(date_trunc('week', ${customers.createdAt}), 'DD Mon')`, n: count() }).from(customers).groupBy(sql`date_trunc('week', ${customers.createdAt})`).orderBy(sql`date_trunc('week', ${customers.createdAt})`),
    db.select({ status: appointments.status, n: count() }).from(appointments).groupBy(appointments.status),
  ]);
  return { todayAppts, upcoming, totalCustomers, newCustomers, revenue: Number(revenue || 0), lastRevenue: Number(lastRevenue || 0), pending, cancelled, popular: popular.map((p) => ({ ...p, rev: Number(p.rev || 0) })), revenueByDay: revenueByDay.map((r) => ({ label: r.week, value: Number(r.rev || 0), n: r.n })), custByWeek, apptsByStatus };
}
export async function listAppointments(f: { date?: string; from?: string; to?: string; staff?: string; service?: string; status?: string; q?: string }) {
  await ensureSeed();
  const conds = [];
  if (f.date) conds.push(eq(appointments.date, f.date)); if (f.from) conds.push(gte(appointments.date, f.from)); if (f.to) conds.push(lte(appointments.date, f.to));
  if (f.staff) conds.push(eq(appointments.staffSlug, f.staff)); if (f.service) conds.push(eq(appointments.serviceSlug, f.service)); if (f.status) conds.push(eq(appointments.status, f.status));
  if (f.q) conds.push(or(ilike(appointments.customerName, `%${f.q}%`), ilike(appointments.customerPhone, `%${f.q}%`), ilike(appointments.reference, `%${f.q}%`)));
  return db.select().from(appointments).where(conds.length ? and(...conds) : undefined).orderBy(desc(appointments.date), asc(appointments.time)).limit(300);
}
export async function listCustomers(q?: string, filter?: string) {
  await ensureSeed();
  const rows = await db.select({ id: customers.id, name: customers.name, phone: customers.phone, email: customers.email, preferredStaff: customers.preferredStaff, createdAt: customers.createdAt, visits: sql<number>`count(${appointments.id}) filter (where ${appointments.status}='completed')`, spent: sql<number>`coalesce(sum(${appointments.price}) filter (where ${appointments.status}='completed'),0)`, lastVisit: sql<string | null>`max(${appointments.date}) filter (where ${appointments.status}='completed')`, nextAppt: sql<string | null>`min(${appointments.date}) filter (where ${appointments.status} in ('pending','confirmed') and ${appointments.date} >= current_date)` })
    .from(customers).leftJoin(appointments, eq(appointments.customerId, customers.id)).where(q ? or(ilike(customers.name, `%${q}%`), ilike(customers.phone, `%${q}%`), ilike(customers.email, `%${q}%`)) : undefined).groupBy(customers.id).orderBy(desc(sql`coalesce(sum(${appointments.price}) filter (where ${appointments.status}='completed'),0)`));
  if (filter === "vip") return rows.filter((r) => Number(r.spent) >= 30000); if (filter === "new") return rows.filter((r) => Number(r.visits) <= 1); if (filter === "upcoming") return rows.filter((r) => r.nextAppt); return rows;
}
export async function getCustomer(id: number) {
  await ensureSeed();
  const [c] = await db.select().from(customers).where(eq(customers.id, id)); if (!c) return null;
  const appts = await db.select().from(appointments).where(eq(appointments.customerId, id)).orderBy(desc(appointments.date));
  return { c, appts };
}
export async function listLeads(status?: string, source?: string) { await ensureSeed(); const conds = []; if (status) conds.push(eq(leads.status, status)); if (source) conds.push(eq(leads.source, source)); return db.select().from(leads).where(conds.length ? and(...conds) : undefined).orderBy(desc(leads.createdAt)); }
export async function listMessages() { await ensureSeed(); return db.select().from(messages).orderBy(desc(messages.createdAt)); }
export async function listReviews() { await ensureSeed(); return db.select().from(reviews).orderBy(desc(reviews.createdAt)); }
export async function getReports() {
  await ensureSeed();
  const [byStaff, byMonth, byService, byStatus, [{ avg }]] = await Promise.all([
    db.select({ name: appointments.staffName, n: count(), rev: sum(appointments.price) }).from(appointments).where(eq(appointments.status, "completed")).groupBy(appointments.staffName).orderBy(desc(sum(appointments.price))),
    db.select({ m: sql<string>`to_char(${appointments.date}::date, 'Mon')`, mo: sql<string>`date_trunc('month', ${appointments.date}::date)`, rev: sum(appointments.price), n: count() }).from(appointments).where(sql`${appointments.status} in ('completed','confirmed')`).groupBy(sql`date_trunc('month', ${appointments.date}::date)`, sql`to_char(${appointments.date}::date, 'Mon')`).orderBy(sql`date_trunc('month', ${appointments.date}::date)`),
    db.select({ name: appointments.serviceName, n: count(), rev: sum(appointments.price) }).from(appointments).where(eq(appointments.status, "completed")).groupBy(appointments.serviceName).orderBy(desc(sum(appointments.price))).limit(8),
    db.select({ status: appointments.status, n: count() }).from(appointments).groupBy(appointments.status),
    db.select({ avg: sql<number>`coalesce(avg(${appointments.price}),0)` }).from(appointments).where(eq(appointments.status, "completed")),
  ]);
  return { byStaff, byMonth, byService, byStatus, avg: Number(avg) };
}
