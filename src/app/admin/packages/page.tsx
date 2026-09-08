import { packages } from "@/lib/content";
import { fmtPKR } from "@/lib/site";
import { PageTitle, Card, Table, Td } from "@/components/admin/ui";
export const metadata = { title: "Packages" };
export default function AdminPackages() {
  return (<><PageTitle title="Packages" sub="Bundled treatments & pricing" action={<button type="button" className="btn-primary !py-2.5 text-xs">+ New Package</button>} /><Card><Table head={["Package", "Includes", "Original", "Price", "Savings", "Badge"]}>{packages.map((p) => (<tr key={p.slug}><Td><p className="font-medium">{p.name}</p><p className="text-xs text-ink-soft">{p.tagline}</p></Td><Td className="max-w-xs text-xs text-ink-soft">{p.includes.join(" · ")}</Td><Td className="line-through">{fmtPKR(p.original)}</Td><Td className="font-semibold">{fmtPKR(p.price)}</Td><Td className="text-emerald-700">{Math.round(((p.original - p.price) / p.original) * 100)}%</Td><Td>{p.badge ? <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold-deep">{p.badge}</span> : "—"}</Td></tr>))}</Table></Card></>);
}
