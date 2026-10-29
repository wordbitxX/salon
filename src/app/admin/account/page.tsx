import Link from "next/link";
import { PageTitle, Card } from "@/components/admin/ui";
import { requireUser } from "@/lib/auth";
import { roleMeta, permissionsFor } from "@/lib/rbac";
import AccountForms from "./AccountForms";

export const metadata = { title: "My account" };

const PERMISSION_TEXT: Record<string, string> = {
  "dashboard:view": "Open the dashboard",
  "appointments:view": "See appointments",
  "appointments:update": "Confirm, complete & reschedule bookings",
  "appointments:delete": "Delete bookings",
  "customers:view": "See clients",
  "customers:update": "Edit client notes",
  "customers:delete": "Delete clients",
  "leads:view": "See leads",
  "leads:update": "Update leads",
  "leads:delete": "Delete leads",
  "messages:view": "Read messages",
  "reviews:view": "See reviews",
  "catalog:view": "See services, prices & content",
  "catalog:update": "Edit services, prices & content",
  "reports:view": "See reports & revenue",
  "settings:view": "See salon settings",
  "activity:view": "See the activity log",
  "data:export": "Export CSV reports",
  "users:manage": "Manage team logins",
};

export default async function AccountPage() {
  const user = await requireUser("/admin/account");
  const meta = roleMeta[user.role];

  return (
    <>
      <PageTitle
        title="My account"
        sub={`Signed in as ${user.email}`}
        action={
          <span className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${meta.badge}`}>{meta.label}</span>
        }
      />

      <div className="mb-4 grid gap-4 lg:grid-cols-[1fr_320px]">
        <AccountForms name={user.name} email={user.email} />
        <div className="space-y-4">
          <Card title="What this login can open">
            <p className="text-xs text-ink-soft">{meta.description}</p>
            <ul className="mt-3 space-y-1.5 text-xs">
              {permissionsFor(user.role).map((permission) => (
                <li key={permission} className="flex gap-2">
                  <span className="text-emerald-600">✓</span>
                  <span>{PERMISSION_TEXT[permission] ?? permission}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] text-ink-soft">
              Need more access?{" "}
              {user.role === "owner" ? (
                <Link href="/admin/team-access" className="font-semibold text-gold-deep hover:text-gold">Manage team logins →</Link>
              ) : (
                "Ask the salon owner to change your role."
              )}
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
