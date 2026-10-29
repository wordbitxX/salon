import InitialsAvatar from "./ui/InitialsAvatar";
import { testimonials } from "@/lib/content";
import Stars from "./ui/Stars";
import Reveal from "./Reveal";
import JsonLd from "./JsonLd";
import { reviewsSchema } from "@/lib/seo";
export default function Testimonials({ limit = 6, withSchema = false }: { limit?: number; withSchema?: boolean }) {
  const list = testimonials.slice(0, limit);
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {withSchema && <JsonLd data={reviewsSchema(list)} />}
      {list.map((t, i) => (
        <Reveal key={t.name} delay={i * 60} as="article" className="card flex flex-col p-6">
          <div className="flex items-center justify-between"><Stars rating={t.rating} /><span className="text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Verified client</span></div>
          <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft sm:text-[15px]">“{t.review}”</blockquote>
          <footer className="mt-5 flex items-center gap-3 border-t border-ink/5 pt-4">
            <InitialsAvatar name={t.name} decorative textClassName="text-sm" className="h-11 w-11 shrink-0 rounded-full ring-1 ring-gold/25" />
            <div><p className="text-sm font-semibold text-ink">{t.name}</p><p className="text-xs text-ink-soft">{t.service} · {t.area}, Lahore</p></div>
          </footer>
        </Reveal>
      ))}
    </div>
  );
}
