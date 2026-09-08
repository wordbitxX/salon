import Link from "next/link";
import JsonLd from "../JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
export default function Breadcrumbs({ items, light = false }: { items: { name: string; href: string }[]; light?: boolean }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className={`text-xs ${light ? "text-white/80" : "text-ink-soft"}`}>
      <JsonLd data={breadcrumbSchema(all)} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {all.map((it, i) => (
          <li key={it.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="opacity-50">/</span>}
            {i === all.length - 1 ? <span aria-current="page" className="font-medium">{it.name}</span> : <Link href={it.href} className="hover:text-gold transition">{it.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
