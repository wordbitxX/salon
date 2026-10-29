import type { Role } from "./rbac";

/**
 * Demo logins that are created automatically the first time the dashboard is
 * opened. They exist so the owner can try every role immediately — change or
 * delete them from Dashboard → Team & access before going live.
 *
 * Override the owner login with ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * Set SEED_DEMO_TEAM=false to skip creating the manager + receptionist sample logins.
 */
export type DemoAccount = {
  name: string;
  email: string;
  password: string;
  role: Role;
  blurb: string;
};

export const DEFAULT_OWNER: DemoAccount = {
  name: "Sofia Malik",
  email: process.env.ADMIN_EMAIL || "admin@elanbeauty.pk",
  password: process.env.ADMIN_PASSWORD || "Elan@2026",
  role: "owner",
  blurb: "Owner — full access, team logins, deletions",
};

export const DEFAULT_TEAM: DemoAccount[] = [
  {
    name: "Hina Qureshi",
    email: "manager@elanbeauty.pk",
    password: "Manager@2026",
    role: "manager",
    blurb: "Manager — everything except logins & deletions",
  },
  {
    name: "Areeba Sheikh",
    email: "reception@elanbeauty.pk",
    password: "Reception@2026",
    role: "receptionist",
    blurb: "Reception — appointments, clients, leads only",
  },
];

export const seedDemoTeam = process.env.SEED_DEMO_TEAM !== "false";

/** Demo credentials shown on the sign-in screen. */
export const demoAccounts: DemoAccount[] = [DEFAULT_OWNER, ...(seedDemoTeam ? DEFAULT_TEAM : [])];

export const showDemoLogins = process.env.SHOW_DEMO_LOGINS !== "false";
