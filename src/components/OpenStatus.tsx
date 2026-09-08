"use client";
import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import { ClockIcon } from "./Icons";
function status() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));
  const [open, close] = site.hoursNumeric[now.getDay()]; const h = now.getHours() + now.getMinutes() / 60;
  const fmt = (x: number) => `${((x + 11) % 12) + 1} ${x >= 12 ? "PM" : "AM"}`;
  if (h >= open && h < close) return { open: true, text: `Open today · closes ${fmt(close)}` };
  if (h < open) return { open: false, text: `Opens today at ${fmt(open)}` };
  const [nOpen] = site.hoursNumeric[(now.getDay() + 1) % 7]; return { open: false, text: `Closed · opens tomorrow ${fmt(nOpen)}` };
}
export default function OpenStatus({ className = "" }: { className?: string }) {
  const key = useSyncExternalStore((cb) => { const t = setInterval(cb, 60000); return () => clearInterval(t); }, () => Math.floor(Date.now() / 60000), () => 0);
  const s = key === 0 ? null : status();
  return (<span className={`inline-flex items-center gap-2 text-sm ${className}`} aria-live="polite"><span aria-hidden className={`relative flex h-2.5 w-2.5`}><span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${s?.open ? "bg-emerald-400" : "bg-amber-400"}`} /><span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s?.open ? "bg-emerald-500" : "bg-amber-500"}`} /></span><ClockIcon width={14} height={14} className="text-gold" />{s ? s.text : "Mon–Sat 10 AM – 9 PM"}</span>);
}
