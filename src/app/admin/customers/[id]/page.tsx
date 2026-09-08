import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomer } from "@/lib/admin-data";
import { staff } from "@/lib/staff";
import { fmtPKR } from "@/lib/site";
import { fmtTime } from "@/lib/booking";
import { PageTitle, Card, Stat, Badge, Table, Td } from "@/components/admin/ui";
import { updateCustomerNotes } from "../../actions";
import StatusButtons from "../../appointments/StatusButtons";
export const metadata = { title: "Customer" };
export default async function CustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; const data = await getCustomer(Number(id)); if (!data) notFound();
  const { c, appts } = data; const done = appts.filter((a) => a.status === "completed"); const spent = done.reduce((a, b) => a + b.price, 0);
  const next = appts.filter((a) => ["pending", "confirmed"].includes(a.status) && a.date >= new Date().toISOString().slice(0, 10)).sort((a, b) => a.date.localeCompare(b.date))[0];
  const svc = Object.entries(done.reduce<Record<string, number>>((m, a) => ((m[a.serviceName] = (m[a.serviceName] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  return (
    <>
      <Link href="/admin/customers" className="text-xs text-ink-soft hover:text-gold">← Customers</Link>
      <PageTitle title={c.name} sub={`${c.phone}${c.email ? " · " + c.email : ""} · Client since ${c.createdAt.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}`} action={<a href={`https://wa.me/${c.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !py-2.5 text-xs">WhatsApp client</a>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Total spending" value={fmtPKR(spent)} /><Stat label="Completed visits" value={done.length} /><Stat label="Last visit" value={done.sort((a, b) => b.date.localeCompare(a.date))[0]?.date || "—"} /><Stat label="Next appointment" value={next ? `${next.date}` : "—"} delta={next ? `${fmtTime(next.time)} · ${next.serviceName}` : "None scheduled"} /></div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card title="Profile & notes"><form action={updateCustomerNotes} className="space-y-3"><input type="hidden" name="id" value={c.id} /><div><label htmlFor="pref" className="label">Preferred specialist</label><select id="pref" name="preferredStaff" defaultValue={c.preferredStaff || ""} className="input"><option value="">None</option>{staff.map((s) => (<option key={s.slug} value={s.name}>{s.name}</option>))}</select></div><div><label htmlFor="notes" className="label">Notes</label><textarea id="notes" name="notes" rows={5} defaultValue={c.notes || ""} className="input" placeholder="Allergies, preferences, colour formulas…" /></div><button className="btn-primary !py-2.5 text-xs">Save</button></form></Card>
        <Card title="Services purchased">{svc.length === 0 ? <p className="text-sm text-ink-soft">No completed services yet.</p> : <ul className="space-y-2 text-sm">{svc.map(([n, k]) => (<li key={n} className="flex justify-between border-b border-ink/5 pb-2"><span>{n}</span><span className="font-semibold">×{k}</span></li>))}</ul>}</Card>
        <Card title="Quick actions"><div className="flex flex-col gap-2"><Link href={`/booking?staff=${staff.find((s) => s.name === c.preferredStaff)?.slug || ""}`} className="btn-primary !py-2.5 text-xs">Book new appointment</Link><a href={`tel:${c.phone}`} className="btn-outline !py-2.5 text-xs">Call {c.phone}</a>{c.email && <a href={`mailto:${c.email}`} className="btn-outline !py-2.5 text-xs">Email client</a>}</div></Card>
      </div>
      <Card title="Appointment history" className="mt-4"><Table head={["Date", "Service", "Specialist", "Price", "Status", "Actions"]}>{appts.map((a) => (<tr key={a.id}><Td className="whitespace-nowrap">{a.date} · {fmtTime(a.time)}</Td><Td>{a.serviceName}</Td><Td>{a.staffName}</Td><Td>{fmtPKR(a.price)}</Td><Td><Badge s={a.status} /></Td><Td><StatusButtons id={a.id} status={a.status} compact /></Td></tr>))}</Table></Card>
    </>
  );
}
