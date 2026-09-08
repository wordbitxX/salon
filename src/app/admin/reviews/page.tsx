import { listReviews } from "@/lib/admin-data";
import { PageTitle, Card, Stat } from "@/components/admin/ui";
import Stars from "@/components/ui/Stars";
import ApproveToggle from "./ApproveToggle";
export const metadata = { title: "Reviews" };
export default async function AdminReviews() {
  const rows = await listReviews(); const avg = rows.length ? rows.reduce((a, b) => a + Number(b.rating), 0) / rows.length : 0;
  return (<><PageTitle title="Reviews" sub="Moderate and publish client reviews" /><div className="grid gap-4 sm:grid-cols-3"><Stat label="Average rating" value={avg.toFixed(1)} /><Stat label="Published" value={rows.filter((r) => r.approved).length} /><Stat label="Hidden" value={rows.filter((r) => !r.approved).length} /></div><div className="mt-6 space-y-3">{rows.map((r) => (<Card key={r.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{r.customerName} <span className="ml-1 text-xs font-normal text-ink-soft">· {r.service}</span></p><Stars rating={Number(r.rating)} className="mt-1" /></div><ApproveToggle id={r.id} approved={r.approved} /></div><p className="mt-3 text-sm text-ink-soft">{r.review}</p></Card>))}</div></>);
}
