import { desc } from "drizzle-orm";
import { db } from "@/db";
import { activityLog, adminUsers } from "@/db/schema";
import { PageTitle, Card } from "@/components/admin/ui";
import { ensureDefaultUsers, requirePermission } from "@/lib/auth";
import { ROLES, roleMeta, rolePermissions, type Permission, type Role } from "@/lib/rbac";
import UserManager, { type TeamRow } from "./UserManager";

export const metadata = { title: "Team & access" };

const PERMISSION_LABELS: Partial<Record<Permission, string>> = {
  "dashboard:view": "Open the dashboard",
  "appointments:view": "See appointments",
  "appointments:update": "Confirm / complete / reschedule bookings",
  "appointments:delete": "Delete bookings",
  "leads:delete": "Delete leads",
  "customers:view": "See client records",
  "customers:update": "Edit client notes",
  "customers:delete": "Delete clients",
  "leads:view": "See leads",
  "leads:update": "Update leads",
  "messages:view": "Read messages",
  "reviews:view": "See reviews",
  "catalog:view": "See services, prices, staff, packages, offers, gallery, blog",
  "catalog:update": "Edit services, prices and content",
  "reports:view": "See reports & revenue",
  "settings:view": "See salon settings",
  "activity:view": "See the activity log",
  "data:export": "Export data (CSV)",
  "users:manage": "Create logins, change roles, reset passwords, delete",
};

const ALL_PERMISSIONS: Permission[] = [
  "appointments:update",
  "appointments:delete",
  "leads:delete",
  "customers:update",
  "customers:delete",
  "reports:view",
  "catalog:update",
  "settings:view",
  "data:export",
  "users:manage",
];

export default async function TeamAccessPage() {
  const actor = await requirePermission("users:manage");
  await ensureDefaultUsers();

  const rows = await db
    .select({
      id: adminUsers.id,
      name: adminUsers.name,
      email: adminUsers.email,
      role: adminUsers.role,
      active: adminUsers.active,
      mustChangePassword: adminUsers.mustChangePassword,
      lastLoginAt: adminUsers.lastLoginAt,
      createdAt: adminUsers.createdAt,
    })
    .from(adminUsers)
    .orderBy(adminUsers.id);

  const users: TeamRow[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: (ROLES as string[]).includes(row.role) ? (row.role as Role) : "receptionist",
    active: row.active,
    mustChangePassword: row.mustChangePassword,
    lastLoginAt: row.lastLoginAt ? row.lastLoginAt.toISOString() : null,
    createdAt: row.createdAt.toISOString(),
  }));

  const logs = await db.select().from(activityLog).orderBy(desc(activityLog.id)).limit(25);

  return (
    <>
      <PageTitle
        title="Team & access"
        sub="Create logins for your manager and reception team, and control what each one can open."
      />

      <UserManager users={users} currentUserId={actor.id} />

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card title="What each role can do">
          <div className="space-y-3">
            {ROLES.map((role) => (
              <div key={role} className="rounded-xl border border-ink/10 p-3">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${roleMeta[role].badge}`}>{roleMeta[role].label}</span>
                </p>
                <p className="mt-1 text-xs text-ink-soft">{roleMeta[role].description}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-[11px]">
              <thead>
                <tr className="border-b border-ink/5 uppercase tracking-wider text-ink-soft">
                  <th className="px-2 py-2 font-semibold">Permission</th>
                  {ROLES.map((role) => (
                    <th key={role} className="px-2 py-2 font-semibold">{roleMeta[role].short}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {ALL_PERMISSIONS.map((permission) => (
                  <tr key={permission}>
                    <td className="px-2 py-1.5 text-ink-soft">{PERMISSION_LABELS[permission] ?? permission}</td>
                    {ROLES.map((role) => (
                      <td key={role} className="px-2 py-1.5">
                        {rolePermissions[role].includes(permission) ? (
                          <span className="font-semibold text-emerald-600">✓</span>
                        ) : (
                          <span className="text-ink/20">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Recent activity">
          {logs.length === 0 ? (
            <p className="text-sm text-ink-soft">Nothing logged yet.</p>
          ) : (
            <ul className="space-y-2.5">
              {logs.map((entry) => (
                <li key={entry.id} className="border-b border-ink/5 pb-2.5 text-xs last:border-0">
                  <p className="flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
                      {entry.action.replace(/_/g, " ")}
                    </span>
                    <span className="font-semibold">{entry.actorName}</span>
                    <span className="text-ink-soft">· {entry.actorRole}</span>
                  </p>
                  {entry.detail && <p className="mt-0.5 text-ink-soft">{entry.detail}</p>}
                  <p className="mt-0.5 text-[10px] text-ink-soft/80">
                    {new Date(entry.createdAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </>
  );
}
