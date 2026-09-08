import Link from "next/link";
import { getOverview } from "@/lib/admin-data";
import { fmtPKR } from "@/lib/site";
import { fmtTime } from "@/lib/booking";
import { Stat, Card, PageTitle, Badge, Table, Td } from "@/components/admin/ui";
import { BarChart, LineChart, Donut } from "@/components/admin/Charts";
import StatusButtons from "./appointments/StatusButtons";
export const metadata = { title: "Overview" };
export default async function AdminHome() {
  const o = await getOverview();
  const growth = o.lastRevenue ? Math.round(((o.revenue - o.lastRevenue) / o.lastRevenue) * 100) : 0;
  const colors: Record<string, string> = { completed: "#10b981", confirmed: "#0ea5e9", pending: "#f59e0b", cancelled: "#ef4444" };
  return (
    <>
      <PageTitle title="Good day, Sofia" sub={new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} action={<Link href="/booking" className="btn-primary !py-2.5 text-xs">+ New Booking</Link>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Today's Appointments" value={o.todayAppts.length} delta={`${o.todayAppts.filter((a) => a.status === "completed").length} completed`} />
        <Stat label="Upcoming Appointments" value={o.upcoming.length + "+"} delta="Next 7 days" />
        <Stat label="Total Customers" value={o.totalCustomers} delta={`+${o.newCustomers} new this month`} tone="good" />
        <Stat label="Revenue (this month)" value={fmtPKR(o.revenue)} delta={`${growth >= 0 ? "▲" : "▼"} ${Math.abs(growth)}% vs last month`} tone={growth >= 0 ? "good" : "bad"} />
        <Stat label="Pending Bookings" value={o.pending} delta="Awaiting confirmation" tone="warn" />
        <Stat label="Cancelled (month)" value={o.cancelled} tone="bad" delta="Track no-show rate" />
        <Stat label="New Customers" value={o.newCustomers} delta="This month" tone="good" />
        <Stat label="Popular Service" value={o.popular[0]?.name || "—"} delta={`${o.popular[0]?.n || 0} bookings`} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card title="Revenue (weekly)" className="lg:col-span-2"><LineChart data={o.revenueByDay} color="#b08d57" format={(v) => fmtPKR(v)} /></Card>
        <Card title="Appointments by status"><Donut data={o.apptsByStatus.map((s) => ({ label: s.status, value: s.n, color: colors[s.status] || "#999" }))} /></Card>
        <Card title="Appointments per week"><BarChart data={o.revenueByDay.map((r) => ({ label: r.label, value: r.n }))} color="#1f1b18" /></Card>
        <Card title="New customers per week"><BarChart data={o.custByWeek.slice(-8).map((c) => ({ label: c.week, value: c.n }))} color="#c78d7b" /></Card>
        <Card title="Popular services"><ul className="space-y-3">{o.popular.map((p) => { const max = o.popular[0].n; return (<li key={p.name}><div className="flex justify-between text-xs"><span className="font-medium">{p.name}</span><span className="text-ink-soft">{p.n} · {fmtPKR(p.rev)}</span></div><div className="mt-1 h-2 rounded-full bg-cream"><div className="h-2 rounded-full bg-gold" style={{ width: `${(p.n / max) * 100}%` }} /></div></li>); })}</ul></Card>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Today's schedule">{o.todayAppts.length === 0 ? <p className="text-sm text-ink-soft">No appointments today.</p> : <ul className="divide-y divide-ink/5">{o.todayAppts.map((a) => (<li key={a.id} className="flex items-center gap-3 py-3 text-sm"><span className="w-20 shrink-0 font-semibold">{fmtTime(a.time)}</span><div className="min-w-0 flex-1"><p className="truncate font-medium">{a.customerName}</p><p className="truncate text-xs text-ink-soft">{a.serviceName} · {a.staffName}</p></div><Badge s={a.status} /><StatusButtons id={a.id} status={a.status} compact /></li>))}</ul>}</Card>
        <Card title="Upcoming appointments"><Table head={["Date", "Client", "Service", "Staff", "Status"]}>{o.upcoming.map((a) => (<tr key={a.id}><Td className="whitespace-nowrap">{a.date} · {fmtTime(a.time)}</Td><Td><Link href={`/admin/customers/${a.customerId}`} className="font-medium hover:text-gold">{a.customerName}</Link></Td><Td>{a.serviceName}</Td><Td>{a.staffName}</Td><Td><Badge s={a.status} /></Td></tr>))}</Table><Link href="/admin/appointments" className="mt-3 inline-block text-xs font-semibold text-gold-deep hover:text-gold">All appointments →</Link></Card>
      </div>
    </>
  );
}
