import Breadcrumbs from "./Breadcrumbs";
import type { ReactNode } from "react";
export default function PageHero({ eyebrow, title, description, crumbs, children }: { eyebrow: string; title: string; description?: string; crumbs: { name: string; href: string }[]; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blush/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="container-x relative py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-6 animate-rise">{eyebrow}</p>
        <h1 className="h-display mt-3 max-w-3xl animate-rise delay-1">{title}</h1>
        {description && <p className="lead mt-5 max-w-2xl animate-rise delay-2">{description}</p>}
        {children && <div className="mt-8 animate-rise delay-3">{children}</div>}
      </div>
    </section>
  );
}
