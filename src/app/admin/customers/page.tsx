import Link from "next/link";
import { listCustomers } from "@/lib/admin-data";
import { fmtPKR } from "@/lib/site";
import { PageTitle, Card, Table, Td } from "@/components/admin/ui";
export const metadata = { title: "Customers" };
export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ q?: string; filter?: string }> }) {
  const { q, filter } = await searchParams; const rows = await listCustomers(q, filter);
  return (
    <>
      <PageTitle title="Customers" sub={`${rows.length} clients · Beauty salon CRM`} />
      <Card className="mb-4"><form className="flex flex-col gap-3 sm:flex-row"><input name="q" defaultValue={q} placeholder="Search by name, phone or email" className="input" aria-label="Search customers" /><select name="filter" defaultValue={filter} className="input sm:w-48" aria-label="Filter"><option value="">All customers</option><option value="vip">VIP (Rs 30k+)</option><option value="new">New (≤1 visit)</option><option value="upcoming">Has upcoming</option></select><button className="btn-primary !py-2.5 text-xs">Search</button></form></Card>
      <Card><Table head={["Customer", "Contact", "Visits", "Total spent", "Last visit", "Next appointment", "Preferred"]}>{rows.map((c) => (<tr key={c.id}><Td><Link href={`/admin/customers/${c.id}`} className="font-medium hover:text-gold">{c.name}</Link>{Number(c.spent) >= 30000 && <span className="ml-2 rounded-full bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-gold-deep">VIP</span>}</Td><Td>{c.phone}<br /><span className="text-xs text-ink-soft">{c.email}</span></Td><Td>{c.visits}</Td><Td className="font-medium">{fmtPKR(Number(c.spent))}</Td><Td>{c.lastVisit || "—"}</Td><Td>{c.nextAppt || "—"}</Td><Td className="text-xs text-ink-soft">{c.preferredStaff || "—"}</Td></tr>))}</Table></Card>
    </>
  );
}
