import { offers } from "@/lib/content";
import { PageTitle, Card } from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
export const metadata = { title: "Offers" };
export default async function AdminOffers() {
  await requirePermission("catalog:view");
  return (<><PageTitle title="Offers" sub="Promotions & discount codes" action={<button type="button" className="btn-primary !py-2.5 text-xs">+ Create Offer</button>} /><div className="grid gap-4 md:grid-cols-2">{offers.map((o) => (<Card key={o.code}><div className="flex items-start justify-between"><div><p className="font-semibold">{o.title}</p><p className="mt-1 text-sm text-ink-soft">{o.desc}</p></div><span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold text-ivory">{o.discount}</span></div><dl className="mt-4 grid grid-cols-3 gap-3 text-xs"><div><dt className="text-ink-soft">Code</dt><dd className="font-mono font-semibold">{o.code}</dd></div><div><dt className="text-ink-soft">Validity</dt><dd>{o.validity}</dd></div><div><dt className="text-ink-soft">Status</dt><dd><span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">Active</span></dd></div></dl><p className="mt-3 text-[11px] text-ink-soft">{o.terms}</p></Card>))}</div></>);
}
