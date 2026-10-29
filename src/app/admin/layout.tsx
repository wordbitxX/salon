import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Salon Manager", template: "%s · ÉLAN Salon Manager" },
  description: "ÉLAN Beauty Studio salon management dashboard — appointments, CRM, leads, reports. A WordbitX salon management software demo.",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireUser("/admin");
  return (
    <AdminShell user={{ id: user.id, name: user.name, email: user.email, role: user.role }}>
      {user.mustChangePassword && <PasswordNudge />}
      {children}
    </AdminShell>
  );
}

function PasswordNudge() {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
      <p>
        <strong>You are still using a demo password.</strong> Set your own before the salon team starts using this dashboard.
      </p>
      <Link href="/admin/account" className="rounded-full bg-amber-900 px-3 py-1.5 font-semibold text-white">Change password</Link>
    </div>
  );
}
