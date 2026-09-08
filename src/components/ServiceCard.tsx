import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { fmtPKR, fmtDuration } from "@/lib/site";
import { ClockIcon, ArrowIcon } from "./Icons";
export default function ServiceCard({ s, priority = false }: { s: Service; priority?: boolean }) {
  return (
    <article className="card card-hover group overflow-hidden">
      <Link href={`/services/${s.slug}`} className="relative block aspect-[4/3] overflow-hidden" aria-label={`${s.name} details`}>
        <Image src={s.image} alt={s.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" />
        {s.popular && <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink backdrop-blur">Popular</span>}
      </Link>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl text-ink"><Link href={`/services/${s.slug}`} className="hover:text-gold transition">{s.name}</Link></h3>
          <span className="shrink-0 text-right text-sm"><span className="block text-[10px] uppercase tracking-wider text-ink-soft">from</span><span className="font-semibold text-ink">{fmtPKR(s.price)}</span></span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{s.short}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs text-ink-soft"><ClockIcon width={14} height={14} className="text-gold" /> {fmtDuration(s.duration)}</span>
          <Link href={`/booking?service=${s.slug}`} className="btn-outline !px-4 !py-2 text-xs">Book Now <ArrowIcon width={14} height={14} /></Link>
        </div>
      </div>
    </article>
  );
}
