"use client";
import Image from "next/image";
import { useState } from "react";
import { gallery, galleryCats } from "@/lib/content";
export default function GalleryGrid() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? gallery : gallery.filter((g) => g.cat === cat);
  return (
    <>
      <div role="tablist" aria-label="Filter gallery" className="flex flex-wrap justify-center gap-2">{galleryCats.map((c) => (<button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${cat === c ? "bg-ink text-ivory" : "border border-ink/15 bg-white text-ink hover:border-gold hover:text-gold"}`}>{c}</button>))}</div>
      <ul className="masonry mt-10" aria-live="polite">{list.map((g, i) => (<li key={g.src} className="group relative overflow-hidden rounded-2xl bg-cream"><Image src={g.src} alt={g.alt} width={g.w * 200} height={g.h * 200} sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" loading={i < 3 ? "eager" : "lazy"} className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.03]" /><span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink backdrop-blur">{g.cat}</span></li>))}</ul>
    </>
  );
}
