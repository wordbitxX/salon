import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, safeNextPath } from "@/lib/auth";
import { demoAccounts, showDemoLogins } from "@/lib/demo-accounts";
import { site } from "@/lib/site";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the ÉLAN Beauty Studio salon manager dashboard.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; denied?: string }> }) {
  const user = await getCurrentUser();
  const { next } = await searchParams;
  const target = safeNextPath(next);
  if (user) redirect(target);

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/images/interior.jpg" alt="Interior of ÉLAN Beauty Studio, Gulberg Lahore" fill priority sizes="55vw" className="object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="relative flex h-full flex-col justify-between p-10 text-ivory">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold font-serif text-lg text-white">É</span>
            <div>
              <p className="font-serif text-xl leading-none tracking-[0.18em]">ÉLAN</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/60">Salon Manager</p>
            </div>
          </div>
          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Beauty, Confidence &amp; You</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight">
              One dashboard for bookings, clients and the whole salon floor.
            </h2>
            <ul className="mt-6 space-y-2.5 text-sm text-ivory/75">
              <li>• Reception sees today&apos;s bookings and clients — nothing else.</li>
              <li>• Managers run reports, prices and the catalogue.</li>
              <li>• The owner controls every login, password and deletion.</li>
            </ul>
            <p className="mt-8 text-xs text-ivory/50">
              {site.address.street}, {site.address.city} · {site.phone}
            </p>
          </div>
        </div>
      </aside>

      <main id="main" className="flex items-center justify-center px-5 py-12 sm:px-10">
        <LoginForm demo={demoAccounts} showDemo={showDemoLogins} next={target} />
      </main>

      <Link href="/" className="sr-only">Back to the ÉLAN website</Link>
    </div>
  );
}
