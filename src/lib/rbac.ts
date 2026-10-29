/**
 * Role based access control for the ÉLAN salon dashboard.
 *
 * Three logins exist:
 *  - owner        → the salon owner / admin. Everything, including team logins,
 *                   password resets and deleting records.
 *  - manager      → runs the salon day to day. Can create & edit everything
 *                   operational, but cannot manage logins or delete records.
 *  - receptionist → front desk. Appointments, customers, leads, messages only.
 */

export type Role = "owner" | "manager" | "receptionist";

export const ROLES: Role[] = ["owner", "manager", "receptionist"];

export type Permission =
  | "dashboard:view"
  | "appointments:view"
  | "appointments:update"
  | "appointments:delete"
  | "customers:view"
  | "customers:update"
  | "customers:delete"
  | "leads:view"
  | "leads:update"
  | "leads:delete"
  | "messages:view"
  | "reviews:view"
  | "catalog:view"
  | "catalog:update"
  | "reports:view"
  | "settings:view"
  | "activity:view"
  | "data:export"
  | "users:manage";

export type RoleMeta = {
  label: string;
  short: string;
  description: string;
  badge: string;
  accent: string;
};

export const roleMeta: Record<Role, RoleMeta> = {
  owner: {
    label: "Owner / Admin",
    short: "Owner",
    description: "Full access — bookings, reports, catalogue, team logins, password changes and deletions.",
    badge: "bg-ink text-ivory",
    accent: "text-ink",
  },
  manager: {
    label: "Manager",
    short: "Manager",
    description: "Runs the salon day to day — bookings, clients, reports, prices and content. Cannot manage logins or delete records.",
    badge: "bg-gold/20 text-gold-deep",
    accent: "text-gold-deep",
  },
  receptionist: {
    label: "Receptionist",
    short: "Reception",
    description: "Front desk only — appointments, clients, leads and messages. No reports, settings or team access.",
    badge: "bg-sky-50 text-sky-700",
    accent: "text-sky-700",
  },
};

const OWNER_PERMISSIONS: Permission[] = [
  "dashboard:view",
  "appointments:view",
  "appointments:update",
  "appointments:delete",
  "customers:view",
  "customers:update",
  "customers:delete",
  "leads:view",
  "leads:update",
  "leads:delete",
  "messages:view",
  "reviews:view",
  "catalog:view",
  "catalog:update",
  "reports:view",
  "settings:view",
  "activity:view",
  "data:export",
  "users:manage",
];

const MANAGER_PERMISSIONS: Permission[] = [
  "dashboard:view",
  "appointments:view",
  "appointments:update",
  "customers:view",
  "customers:update",
  "leads:view",
  "leads:update",
  "messages:view",
  "reviews:view",
  "catalog:view",
  "catalog:update",
  "reports:view",
  "settings:view",
  "activity:view",
  "data:export",
];

const RECEPTIONIST_PERMISSIONS: Permission[] = [
  "dashboard:view",
  "appointments:view",
  "appointments:update",
  "customers:view",
  "customers:update",
  "leads:view",
  "leads:update",
  "messages:view",
  "catalog:view",
];

export const rolePermissions: Record<Role, Permission[]> = {
  owner: OWNER_PERMISSIONS,
  manager: MANAGER_PERMISSIONS,
  receptionist: RECEPTIONIST_PERMISSIONS,
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as string[]).includes(value);
}

export function can(role: Role | string | null | undefined, permission: Permission): boolean {
  if (!role || !isRole(role)) return false;
  return rolePermissions[role].includes(permission);
}

export function permissionsFor(role: Role): Permission[] {
  return rolePermissions[role] ?? [];
}

export type NavItem = { label: string; href: string; permission: Permission };

/** Sidebar navigation, in display order, filtered by permission. */
export const adminNav: NavItem[] = [
  { label: "Overview", href: "/admin", permission: "dashboard:view" },
  { label: "Appointments", href: "/admin/appointments", permission: "appointments:view" },
  { label: "Customers", href: "/admin/customers", permission: "customers:view" },
  { label: "Leads", href: "/admin/leads", permission: "leads:view" },
  { label: "Messages & WhatsApp", href: "/admin/messages", permission: "messages:view" },
  { label: "Services & prices", href: "/admin/services", permission: "catalog:view" },
  { label: "Staff & team", href: "/admin/staff", permission: "catalog:view" },
  { label: "Packages", href: "/admin/packages", permission: "catalog:view" },
  { label: "Offers", href: "/admin/offers", permission: "catalog:view" },
  { label: "Gallery", href: "/admin/gallery", permission: "catalog:view" },
  { label: "Reviews", href: "/admin/reviews", permission: "reviews:view" },
  { label: "Blog", href: "/admin/blog", permission: "catalog:view" },
  { label: "Reports & export", href: "/admin/reports", permission: "reports:view" },
  { label: "Team & access", href: "/admin/team-access", permission: "users:manage" },
  { label: "Settings", href: "/admin/settings", permission: "settings:view" },
];

export function navFor(role: Role): NavItem[] {
  return adminNav.filter((item) => can(role, item.permission));
}
