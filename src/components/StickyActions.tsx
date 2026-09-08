"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { waLink, waMessages, site } from "@/lib/site";
import { WhatsAppIcon, CalendarIcon, PhoneIcon } from "./Icons";

export default function StickyActions() {
  const path = usePathname();
  if (path.startsWith("/admin")) return null;
  return (
    <>
      {/* Desktop — refined dark pill */}
      <a
        href={waLink(waMessages.general)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat and book on WhatsApp"
        className="group fixed bottom-7 right-7 z-40 hidden items-center gap-3 rounded-full border border-white/10 bg-ink/95 py-2 pl-2 pr-6 text-ivory shadow-soft backdrop-blur transition duration-300 hover:border-gold/40 hover:bg-ink lg:flex"
      >
        <span className="grid h-11 w-11 place-items-center rounded-full bg-[#22a75b]/15 text-[#4ade80] transition group-hover:bg-[#22a75b]/25"><WhatsAppIcon width={22} height={22} /></span>
        <span className="text-left leading-tight"><span className="block text-sm font-semibold">Chat &amp; Book</span><span className="block text-[11px] font-medium text-ivory/60">on WhatsApp</span></span>
      </a>

      {/* Mobile — elegant bottom bar */}
      {!path.startsWith("/booking") && (
        <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 shadow-[0_-8px_30px_-12px_rgba(31,27,24,0.18)] backdrop-blur lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
          <div className="mx-auto flex max-w-md items-center gap-2 px-3 py-2.5">
            <a href={waLink(waMessages.book)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 flex-1 flex-col items-center justify-center rounded-xl border border-ink/10 bg-white text-ink transition active:scale-95">
              <WhatsAppIcon width={18} height={18} className="text-[#22a75b]" /><span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
            </a>
            <a href={site.phoneHref} className="flex min-h-11 flex-1 flex-col items-center justify-center rounded-xl border border-ink/10 bg-white text-ink transition active:scale-95">
              <PhoneIcon width={18} height={18} className="text-gold" /><span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider">Call</span>
            </a>
            <Link href="/booking" className="flex min-h-11 flex-[1.5] items-center justify-center gap-2 rounded-xl bg-ink text-ivory transition active:scale-95">
              <CalendarIcon width={17} height={17} className="text-gold" /><span className="text-xs font-semibold uppercase tracking-wider">Book Now</span>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
