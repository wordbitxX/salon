import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { posts, blogCategories } from "@/lib/blog";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/Reveal";
import { BookingCTA } from "@/components/CTA";
export const metadata = buildMetadata({ title: "Beauty Blog — Hair, Skin, Bridal & Salon Tips from Lahore Experts", description: "Expert beauty advice from ÉLAN's stylists and skin specialists in Lahore: hair colour guides, pre-wedding skincare, bridal makeup tips, facial frequency and more.", path: "/blog" });
export default function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <>
      <PageHero eyebrow="The ÉLAN Journal" title="Beauty advice, written by the people who do it every day" description="Honest, practical guides from our stylists, makeup artists and skin specialists." crumbs={[{ name: "Blog", href: "/blog" }]}><ul className="flex flex-wrap gap-2">{blogCategories.map((c) => (<li key={c} className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-medium text-ink">{c}</li>))}</ul></PageHero>
      <section className="container-x py-12 sm:py-16">
        <Reveal as="article" className="card card-hover grid overflow-hidden lg:grid-cols-2"><Link href={`/blog/${first.slug}`} className="relative aspect-[16/10] lg:aspect-auto"><Image src={first.image} alt={first.alt} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></Link><div className="flex flex-col justify-center p-7 sm:p-10"><p className="eyebrow">{first.category} · {first.readTime} min read</p><h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl"><Link href={`/blog/${first.slug}`} className="hover:text-gold">{first.title}</Link></h2><p className="mt-4 text-ink-soft">{first.excerpt}</p><p className="mt-5 text-xs text-ink-soft">By {first.author} · {new Date(first.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p></div></Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rest.map((p, i) => (<Reveal key={p.slug} delay={(i % 3) * 70} as="article" className="card card-hover group overflow-hidden"><Link href={`/blog/${p.slug}`} className="relative block aspect-[16/10] overflow-hidden"><Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw, 33vw" loading="lazy" className="object-cover transition duration-700 group-hover:scale-105" /></Link><div className="p-6"><p className="text-[11px] font-semibold uppercase tracking-wider text-gold">{p.category} · {p.readTime} min</p><h2 className="mt-2 font-serif text-xl leading-snug text-ink"><Link href={`/blog/${p.slug}`} className="hover:text-gold">{p.title}</Link></h2><p className="mt-2 line-clamp-2 text-sm text-ink-soft">{p.excerpt}</p><p className="mt-4 text-xs text-ink-soft">By {p.author}</p></div></Reveal>))}</div>
      </section>
      <BookingCTA />
    </>
  );
}
