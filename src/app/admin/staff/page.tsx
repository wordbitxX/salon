import Image from "next/image";
import Link from "next/link";
import { staff } from "@/lib/staff";
import { services } from "@/lib/services";
import { PageTitle, Card } from "@/components/admin/ui";
import Stars from "@/components/ui/Stars";
export const metadata = { title: "Staff" };
export default function AdminStaff() {
  return (<><PageTitle title="Staff" sub={`${staff.length} specialists · Schedules & specialties`} action={<button type="button" className="btn-primary !py-2.5 text-xs">+ Add Staff</button>} /><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{staff.map((m) => (<Card key={m.slug}><div className="flex gap-4"><Image src={m.image} alt={m.alt} width={72} height={72} className="h-18 w-18 rounded-xl object-cover object-top" /><div className="min-w-0"><p className="font-semibold">{m.name}</p><p className="text-xs text-ink-soft">{m.role}</p><div className="mt-1 flex items-center gap-1.5 text-xs"><Stars rating={m.rating} size={11} />{m.rating.toFixed(1)} · {m.reviews} reviews</div></div></div><div className="mt-4 flex flex-wrap gap-1">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (<span key={d} className={`rounded px-2 py-0.5 text-[10px] font-semibold ${m.workingDays.includes(i) ? "bg-ink text-ivory" : "bg-cream text-ink/30"}`}>{d}</span>))}</div><p className="mt-3 text-xs text-ink-soft">Services: {services.filter((s) => s.staff.includes(m.slug)).map((s) => s.name).join(", ")}</p><div className="mt-4 flex gap-2"><Link href={`/admin/appointments?staff=${m.slug}&view=week`} className="btn-outline !px-3 !py-1.5 text-xs">Schedule</Link><Link href={`/our-team/${m.slug}`} className="btn-outline !px-3 !py-1.5 text-xs">Profile</Link></div></Card>))}</div></>);
}
