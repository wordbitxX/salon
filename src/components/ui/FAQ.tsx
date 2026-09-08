import JsonLd from "../JsonLd";
import { faqSchema } from "@/lib/seo";
import { ChevronIcon } from "../Icons";
export default function FAQ({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <div className="divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-white">
      {withSchema && <JsonLd data={faqSchema(items)} />}
      {items.map((f) => (
        <details key={f.q} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg [&::-webkit-details-marker]:hidden">
            <h3 className="font-sans text-base">{f.q}</h3>
            <ChevronIcon className="shrink-0 text-gold transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-ink-soft sm:text-base">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
