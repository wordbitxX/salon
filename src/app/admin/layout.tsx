import type { Metadata } from "next";
import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";
export const metadata: Metadata = { title: { default: "Salon Manager", template: "%s · ÉLAN Salon Manager" }, description: "ÉLAN Beauty Studio salon management dashboard — appointments, CRM, leads, reports. A WordbitX salon management software demo.", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";
export default function AdminLayout({ children }: { children: ReactNode }) { return <AdminShell>{children}</AdminShell>; }
