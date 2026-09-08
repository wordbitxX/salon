import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata, faqSchema } from "@/lib/seo";
import { posts, getPost } from "@/lib/blog";
import { getService } from "@/lib/services";
import { SITE_URL, fmtPKR, waLink, waMessages } from "@/lib/site";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import FAQ from "@/components/ui/FAQ";
import { ArrowIcon, WhatsAppIcon } from "@/components/Icons";
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const p = getPost(slug); if (!p) return {};
  return buildMetadata({ title: p.seoTitle, description: p.description, path: `/blog/${p.slug}`, image: p.image, type: "article" });
}
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const p = getPost(slug); if (!p) notFound();
  const related = p.related.map(getService).filter(Boolean);
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <JsonLd data={[{ "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.description, image: p.image.startsWith("http") ? p.image : `${SITE_URL}${p.image}`, datePublished: p.date, dateModified: p.date, author: { "@type": "Person", name: p.author }, publisher: { "@id": `${SITE_URL}/#salon` }, mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`, articleSection: p.category }, faqSchema(p.faqs)]} />
      <article>
        <header className="bg-cream"><div className="container-x py-10 sm:py-14"><Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }]} /><p className="eyebrow mt-6">{p.category} · {p.readTime} min read</p><h1 className="h-display mt-3 max-w-4xl">{p.title}</h1><p className="lead mt-4 max-w-2xl">{p.excerpt}</p><p className="mt-5 text-sm text-ink-soft">By <strong className="text-ink">{p.author}</strong> · <time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></p></div></header>
        <div className="container-x -mt-0 py-10"><div className="relative aspect-[21/9] overflow-hidden rounded-3xl"><Image src={p.image} alt={p.alt} fill priority sizes="100vw" className="object-cover" /></div></div>
        <div className="container-x grid gap-12 pb-16 lg:grid-cols-3">
          <div className="lg:col-span-2"><div className="prose-elan max-w-none" dangerouslySetInnerHTML={{ __html: p.body }} />
            <section className="mt-12" aria-labelledby="post-faq"><h2 id="post-faq" className="font-serif text-2xl text-ink sm:text-3xl">Frequently asked questions</h2><div className="mt-5"><FAQ items={p.faqs} withSchema={false} /></div></section>
            <div className="mt-12 rounded-2xl bg-ink p-7 text-ivory"><p className="eyebrow !text-gold">Ready when you are</p><p className="mt-2 font-serif text-2xl sm:text-3xl">Book your appointment at ÉLAN, Gulberg Lahore</p><div className="mt-5 flex flex-col gap-2 sm:flex-row"><Link href="/booking" className="btn-gold">Book an Appointment <ArrowIcon width={14} height={14} /></Link><a href={waLink(waMessages.general)} target="_blank" rel="noopener noreferrer" className="btn-light"><WhatsAppIcon className="text-[#25D366]" /> Chat on WhatsApp</a></div></div>
          </div>
          <aside className="space-y-8"><div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">Related services</p><ul className="mt-3 divide-y divide-ink/5">{related.map((s) => (<li key={s!.slug} className="py-3"><Link href={`/services/${s!.slug}`} className="flex items-center gap-3 group"><Image src={s!.image} alt="" width={48} height={48} className="h-12 w-12 rounded-lg object-cover" loading="lazy" /><div><p className="text-sm font-medium text-ink group-hover:text-gold">{s!.name}</p><p className="text-xs text-ink-soft">from {fmtPKR(s!.price)}</p></div></Link></li>))}</ul></div><div className="card p-6"><p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">More articles</p><ul className="mt-3 space-y-3">{more.map((m) => (<li key={m.slug}><Link href={`/blog/${m.slug}`} className="text-sm font-medium text-ink hover:text-gold">{m.title}</Link><p className="text-[11px] text-ink-soft">{m.category}</p></li>))}</ul></div></aside>
        </div>
      </article>
    </>
  );
}
