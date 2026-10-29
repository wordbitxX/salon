import Image from "next/image";
import Link from "next/link";
import type { Staff } from "@/lib/staff";
import Stars from "./ui/Stars";
import InitialsAvatar from "./ui/InitialsAvatar";
export default function StaffCard({ m }: { m: Staff }) {
  return (
    <article className="card card-hover group overflow-hidden">
      <div className="relative aspect-[4/5] overflow-hidden">
        {m.image ? (
          <Image src={m.image} alt={m.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <InitialsAvatar name={m.name} decorative textClassName="text-7xl sm:text-8xl" className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-ivory">
          <h3 className="font-serif text-2xl">{m.name}</h3>
          <p className="text-xs uppercase tracking-wider text-ivory/80">{m.role}</p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between text-sm"><span className="inline-flex items-center gap-2"><Stars rating={m.rating} /> <span className="font-semibold">{m.rating.toFixed(1)}</span> <span className="text-ink-soft">({m.reviews})</span></span><span className="text-ink-soft">{m.experience}+ yrs</span></div>
        <ul className="mt-3 flex flex-wrap gap-1.5">{m.specialties.map((s) => (<li key={s} className="rounded-full bg-cream px-2.5 py-1 text-[11px] text-ink-soft">{s}</li>))}</ul>
        <p className="mt-3 text-xs text-ink-soft">Available: {m.days.join(", ")}</p>
        <Link href={`/booking?staff=${m.slug}`} className="btn-primary mt-4 w-full !py-2.5 text-xs">Book with {m.name.split(" ")[0]}</Link>
      </div>
    </article>
  );
}
