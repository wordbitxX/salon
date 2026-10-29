import Link from "next/link";
import { posts } from "@/lib/blog";
import { PageTitle, Card, Table, Td } from "@/components/admin/ui";
import { requirePermission } from "@/lib/auth";
export const metadata = { title: "Blog" };
export default async function AdminBlog() {
  await requirePermission("catalog:view");
  return (<><PageTitle title="Blog" sub={`${posts.length} published articles · Content SEO`} action={<button type="button" className="btn-primary !py-2.5 text-xs">+ New Article</button>} /><Card><Table head={["Title", "Category", "Author", "Published", "SEO", ""]}>{posts.map((p) => (<tr key={p.slug}><Td><p className="font-medium">{p.title}</p><p className="max-w-md truncate text-xs text-ink-soft">/{p.slug}</p></Td><Td>{p.category}</Td><Td>{p.author}</Td><Td>{p.date}</Td><Td><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.seoTitle.length <= 60 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>Title {p.seoTitle.length}ch</span> <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${p.description.length <= 160 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>Meta {p.description.length}ch</span></Td><Td><Link href={`/blog/${p.slug}`} className="text-xs font-semibold text-gold-deep hover:text-gold">View</Link></Td></tr>))}</Table></Card></>);
}
