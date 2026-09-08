import Image from "next/image";
import Link from "next/link";
import { services, categories } from "@/lib/services";
import { fmtPKR, fmtDuration } from "@/lib/site";
import { PageTitle, Card, Table, Td } from "@/components/admin/ui";
export const metadata = { title: "Services" };
export default function AdminServices() {
  return (<><PageTitle title="Services" sub={`${services.length} services across ${categories.length - 1} categories`} action={<button className="btn-primary !py-2.5 text-xs" type="button">+ Add Service</button>} />
    <div className="mb-4 flex flex-wrap gap-2">{categories.filter((c) => c.slug !== "packages").map((c) => (<span key={c.slug} className="rounded-full bg-white px-3 py-1 text-xs shadow-card">{c.name} · {services.filter((s) => s.category === c.slug).length}</span>))}</div>
    <Card><Table head={["Service", "Category", "Price", "Duration", "Specialists", "Status", ""]}>{services.map((s) => (<tr key={s.slug}><Td><div className="flex items-center gap-3"><Image src={s.image} alt="" width={40} height={40} className="h-10 w-10 rounded-lg object-cover" /><div><p className="font-medium">{s.name}</p><p className="max-w-xs truncate text-xs text-ink-soft">{s.short}</p></div></div></Td><Td className="capitalize">{s.category.replace("-", " & ")}</Td><Td>{fmtPKR(s.price)}</Td><Td>{fmtDuration(s.duration)}</Td><Td className="text-xs">{s.staff.length}</Td><Td><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">Active</span>{s.featured && <span className="ml-1 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-gold-deep">Featured</span>}</Td><Td><Link href={`/services/${s.slug}`} className="text-xs font-semibold text-gold-deep hover:text-gold">View</Link></Td></tr>))}</Table></Card></>);
}
