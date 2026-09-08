import Image from "next/image";
import { gallery, galleryCats } from "@/lib/content";
import { PageTitle, Card } from "@/components/admin/ui";
export const metadata = { title: "Gallery" };
export default function AdminGallery() {
  return (<><PageTitle title="Gallery" sub={`${gallery.length} images · ${galleryCats.length - 1} categories`} action={<button type="button" className="btn-primary !py-2.5 text-xs">+ Upload Images</button>} /><Card><ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">{gallery.map((g) => (<li key={g.src} className="group relative aspect-square overflow-hidden rounded-xl"><Image src={g.src} alt={g.alt} fill sizes="200px" className="object-cover" /><span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold">{g.cat}</span></li>))}</ul></Card></>);
}
