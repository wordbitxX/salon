import { pool } from "@/db";

/**
 * Creates every table the app needs if it is missing.
 *
 * The template ships without a migration step, so a freshly attached Postgres
 * (Supabase, Neon, RDS…) would otherwise throw "relation does not exist" the
 * first time an admin page loads. Everything here is idempotent and runs once
 * per server process.
 */
const STATEMENTS: string[] = [
  `create table if not exists customers (
     id serial primary key,
     name text not null,
     phone text not null,
     email text,
     notes text,
     preferred_staff text,
     created_at timestamptz not null default now()
   )`,
  `create table if not exists appointments (
     id serial primary key,
     reference text not null unique,
     customer_id integer references customers(id),
     customer_name text not null,
     customer_phone text not null,
     customer_email text,
     service_slug text not null,
     service_name text not null,
     staff_slug text not null,
     staff_name text not null,
     date date not null,
     time text not null,
     duration_min integer not null,
     price integer not null,
     status text not null default 'pending',
     notes text,
     created_at timestamptz not null default now()
   )`,
  `create index if not exists appointments_date_idx on appointments (date)`,
  `create table if not exists leads (
     id serial primary key,
     name text not null,
     phone text not null,
     email text,
     source text not null default 'Website',
     interest text,
     status text not null default 'New',
     notes text,
     follow_up_date date,
     created_at timestamptz not null default now()
   )`,
  `create table if not exists messages (
     id serial primary key,
     name text not null,
     phone text not null,
     email text,
     service text,
     message text not null,
     read boolean not null default false,
     created_at timestamptz not null default now()
   )`,
  `create table if not exists reviews (
     id serial primary key,
     customer_name text not null,
     service text not null,
     rating numeric not null,
     review text not null,
     approved boolean not null default true,
     created_at timestamptz not null default now()
   )`,
  `create table if not exists admin_users (
     id serial primary key,
     name text not null,
     email text not null unique,
     password_hash text not null,
     role text not null default 'receptionist',
     active boolean not null default true,
     must_change_password boolean not null default true,
     last_login_at timestamptz,
     created_at timestamptz not null default now()
   )`,
  `create table if not exists admin_sessions (
     id text primary key,
     user_id integer not null references admin_users(id) on delete cascade,
     expires_at timestamptz not null,
     created_at timestamptz not null default now()
   )`,
  `create index if not exists admin_sessions_user_idx on admin_sessions (user_id)`,
  `create table if not exists activity_log (
     id serial primary key,
     actor_id integer,
     actor_name text not null,
     actor_role text not null,
     action text not null,
     detail text,
     created_at timestamptz not null default now()
   )`,
];

let ready: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      for (const statement of STATEMENTS) await pool.query(statement);
    })().catch((error) => {
      ready = null; // allow a retry on the next request
      throw error;
    });
  }
  return ready;
}
