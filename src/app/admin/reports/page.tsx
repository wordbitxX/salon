import { getReports } from "@/lib/admin-data";
import { fmtPKR } from "@/lib/site";
import { PageTitle, Card, Stat, Table, Td } from "@/components/admin/ui";
import { BarChart, LineChart, Donut } from "@/components/admin/Charts";
export const metadata = { title: "Reports" };
export default async function ReportsPage() {
  const r = await getReports(); const total = r.byStaff.reduce((a, b) => a + Number(b.rev || 0), 0); const n = r.byStaff.reduce((a, b) => a + b.n, 0);
  const cancelled = r.byStatus.find((s) => s.status === "cancelled")?.n || 0; const all = r.byStatus.reduce((a, b) => a + b.n, 0);
  return (<><PageTitle title="Reports" sub="Revenue, staff performance & service mix" />
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat label="Total revenue (completed)" value={fmtPKR(total)} /><Stat label="Completed appointments" value={n} /><Stat label="Average ticket" value={fmtPKR(Math.round(r.avg))} /><Stat label="Cancellation rate" value={`${Math.round((cancelled / Math.max(1, all)) * 100)}%`} tone="warn" /></div>
    <div className="mt-6 grid gap-4 lg:grid-cols-3"><Card title="Monthly revenue" className="lg:col-span-2"><LineChart data={r.byMonth.map((m) => ({ label: m.m, value: Number(m.rev || 0) }))} color="#b08d57" format={fmtPKR} /></Card><Card title="Status mix"><Donut data={r.byStatus.map((s) => ({ label: s.status, value: s.n, color: { completed: "#10b981", confirmed: "#0ea5e9", pending: "#f59e0b", cancelled: "#ef4444" }[s.status] || "#999" }))} /></Card><Card title="Revenue by service" className="lg:col-span-2"><BarChart data={r.byService.map((s) => ({ label: s.name.split(" ")[0], value: Number(s.rev || 0) }))} format={fmtPKR} /></Card><Card title="Staff performance"><Table head={["Specialist", "Appts", "Revenue"]}>{r.byStaff.map((s) => (<tr key={s.name}><Td className="font-medium">{s.name}</Td><Td>{s.n}</Td><Td>{fmtPKR(Number(s.rev || 0))}</Td></tr>))}</Table></Card></div></>);
}
