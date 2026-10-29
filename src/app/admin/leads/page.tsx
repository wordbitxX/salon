import Link from "next/link";
import { listLeads } from "@/lib/admin-data";
import { PageTitle, Card, Badge, Stat } from "@/components/admin/ui";
import { updateLead, createLead } from "../actions";
import { requirePermission } from "@/lib/auth";
import { can } from "@/lib/rbac";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteLead } from "../actions";
export const metadata = { title: "Leads" };
const STATUSES = ["New", "Contacted", "Interested", "Booked", "Completed", "Lost"]; const SOURCES = ["Website", "Instagram", "Facebook", "Google", "WhatsApp", "Phone"];
export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ status?: string; source?: string }> }) {
  const user = await requirePermission("leads:view");
  const canDelete = can(user.role, "leads:delete");
  const sp = await searchParams; const rows = await listLeads(sp.status, sp.source); const all = await listLeads();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <PageTitle title="Leads" sub="Lead generation & follow-up pipeline" />
      <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-6">{STATUSES.map((s) => (<Link key={s} href={`/admin/leads?status=${s}`} className="block"><Stat label={s} value={all.filter((l) => l.status === s).length} /></Link>))}</div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card><form className="flex flex-col gap-2 sm:flex-row"><select name="status" defaultValue={sp.status} className="input" aria-label="Status"><option value="">All statuses</option>{STATUSES.map((s) => (<option key={s}>{s}</option>))}</select><select name="source" defaultValue={sp.source} className="input" aria-label="Source"><option value="">All sources</option>{SOURCES.map((s) => (<option key={s}>{s}</option>))}</select><button className="btn-primary !py-2.5 text-xs">Filter</button><Link href="/admin/leads" className="btn-outline !py-2.5 text-xs">Reset</Link></form></Card>
          {rows.map((l) => (<Card key={l.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-semibold">{l.name} <span className="ml-1 text-xs font-normal text-ink-soft">via {l.source}</span></p><p className="text-xs text-ink-soft">{l.phone}{l.email && ` · ${l.email}`}</p>{l.interest && <p className="mt-1 text-sm">Interested in: <strong>{l.interest}</strong></p>}</div><div className="flex items-center gap-2"><Badge s={l.status} />{l.followUpDate && <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${l.followUpDate <= today ? "bg-red-50 text-red-700" : "bg-cream text-ink-soft"}`}>Follow-up {l.followUpDate}</span>}</div></div>
            <form action={updateLead} className="mt-4 grid gap-2 sm:grid-cols-[140px_150px_1fr_auto]"><input type="hidden" name="id" value={l.id} /><select name="status" defaultValue={l.status} className="input !py-2 text-xs" aria-label="Lead status">{STATUSES.map((s) => (<option key={s}>{s}</option>))}</select><input type="date" name="followUpDate" defaultValue={l.followUpDate || ""} className="input !py-2 text-xs" aria-label="Follow-up date" /><input name="notes" defaultValue={l.notes || ""} className="input !py-2 text-xs" placeholder="Notes" aria-label="Notes" /><div className="flex flex-wrap items-center gap-1"><button className="btn-primary !px-3 !py-2 text-xs">Save</button>{canDelete && <DeleteButton onDelete={deleteLead} id={l.id} confirmText={`Delete lead ${l.name}?`} />}<a href={`https://wa.me/${l.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${l.name.split(" ")[0]}, this is ÉLAN Beauty Studio following up on your enquiry about ${l.interest || "our services"}.`)}`} target="_blank" rel="noopener noreferrer" className="btn-whatsapp !px-3 !py-2 text-xs">WA</a></div></form></Card>))}
          {rows.length === 0 && <Card><p className="text-sm text-ink-soft">No leads match.</p></Card>}
        </div>
        <Card title="Add lead"><form action={createLead} className="space-y-3"><input name="name" required placeholder="Name" className="input" aria-label="Name" /><input name="phone" required placeholder="Phone" className="input" aria-label="Phone" /><input name="email" type="email" placeholder="Email (optional)" className="input" aria-label="Email" /><select name="source" className="input" aria-label="Source">{SOURCES.map((s) => (<option key={s}>{s}</option>))}</select><input name="interest" placeholder="Interested in…" className="input" aria-label="Interest" /><input type="date" name="followUpDate" className="input" aria-label="Follow-up date" /><textarea name="notes" rows={3} placeholder="Notes" className="input" aria-label="Notes" /><button className="btn-primary w-full !py-2.5 text-xs">Add Lead</button></form></Card>
      </div>
    </>
  );
}
