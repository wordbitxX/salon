"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { transformations } from "@/lib/content";
import { ArrowIcon } from "./Icons";
const cats = ["All", "Hair", "Makeup", "Skin", "Bridal"] as const;
export default function BeforeAfter({ limit }: { limit?: number }) {
  const [cat, setCat] = useState<(typeof cats)[number]>("All");
  const list = (cat === "All" ? transformations : transformations.filter((t) => t.cat === cat)).slice(0, limit ?? 99);
  return (
    <>
      <div role="tablist" aria-label="Filter transformations" className="flex flex-wrap justify-center gap-2">{cats.map((c) => (<button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${cat === c ? "bg-ink text-ivory" : "border border-ink/15 bg-white text-ink hover:border-gold hover:text-gold"}`}>{c}</button>))}</div>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
        {list.map((t) => (
          <li key={t.title} className="card card-hover group overflow-hidden">
            <figure className="relative grid grid-cols-2 gap-0.5 bg-sand">
              <div className="relative aspect-[3/4]"><Image src={t.before} alt={`Before — ${t.alt}`} fill sizes="(max-width:640px) 50vw, 12vw" loading="lazy" className="object-cover" /><span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Before</span></div>
              <div className="relative aspect-[3/4]"><Image src={t.after} alt={`After — ${t.alt}`} fill sizes="(max-width:640px) 50vw, 12vw" loading="lazy" className="object-cover" /><span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">After</span></div>
              <figcaption className="sr-only">{t.alt}</figcaption>
            </figure>
            <div className="p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-gold">{t.cat}</p><h3 className="mt-1 font-serif text-lg leading-snug text-ink">{t.title}</h3><Link href={`/services/${t.slug}`} className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-ink-soft hover:text-gold">{t.service} <ArrowIcon width={12} height={12} /></Link></div>
          </li>
        ))}
      </ul>
    </>
  );
}
