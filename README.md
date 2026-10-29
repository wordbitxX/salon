# ÉLAN Beauty Studio — salon website + manager dashboard

A complete salon site for **ÉLAN Beauty Studio, Gulberg Lahore** (services, bridal, gallery, blog,
online booking, WhatsApp flows) with a **role-based manager dashboard** for the salon team.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Drizzle ORM and PostgreSQL
(Supabase, Neon or any Postgres).

---

## 1. Quick start

```bash
npm install
cp .env.example .env.local     # then paste your Postgres / Supabase connection string
npm run dev                    # http://localhost:3000  ·  dashboard at /admin
```

On the first request the app creates every table it needs (`customers`, `appointments`, `leads`,
`messages`, `reviews`, `admin_users`, `admin_sessions`, `activity_log`) and seeds demo salon data
plus the three logins below. Nothing else to run.

### Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **Project Settings → Database → Connection string → URI**. Use the **pooler** host
   (`...pooler.supabase.com:6543`) when deploying to Vercel/serverless, add `?sslmode=require`.
3. Put it in `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres.xxxx:PASSWORD@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require"
ADMIN_EMAIL="owner@yoursalon.pk"
ADMIN_PASSWORD="choose-a-strong-one"
```

### Deploy to Vercel

Add the same environment variables (**Settings → Environment Variables**) and deploy.
`ADMIN_EMAIL` / `ADMIN_PASSWORD` are only used to create the **first owner login**; afterwards
manage everything from the dashboard.

---

## 2. Logins & roles

The sign-in screen is `/login` (linked from the footer and from `/admin`).
The first owner is created from `ADMIN_EMAIL` / `ADMIN_PASSWORD` — defaults:

| Role | Email | Password |
| --- | --- | --- |
| **Owner / Admin** | `admin@elanbeauty.pk` | `Elan@2026` |
| Manager | `manager@elanbeauty.pk` | `Manager@2026` |
| Receptionist | `reception@elanbeauty.pk` | `Reception@2026` |

> The manager and receptionist demo logins can be skipped with `SEED_DEMO_TEAM="false"`, and the
> demo-credentials card on the sign-in screen can be hidden with `SHOW_DEMO_LOGINS="false"`.
> **Change the passwords before a real salon uses this** (Dashboard → My account).

| What they can do | Owner | Manager | Reception |
| --- | :---: | :---: | :---: |
| Dashboard, appointments, clients, leads, messages | ✅ | ✅ | ✅ |
| Confirm / complete / reschedule bookings, edit client notes | ✅ | ✅ | ✅ |
| Services, prices, staff, packages, offers, gallery, blog | ✅ | ✅ | view only |
| Reports, revenue & CSV export | ✅ | ✅ | — |
| Salon settings | ✅ | ✅ | — |
| Reviews moderation | ✅ | ✅ | — |
| Activity log | ✅ | ✅ | — |
| **Delete** bookings, clients, leads | ✅ | — | — |
| **Team & access** — create logins, change roles, reset passwords, switch off / delete logins | ✅ | — | — |

Rules enforced on the server (not just hidden in the UI):

- Every `/admin/*` page requires a signed-in session; each page checks its own permission and
  sends unauthorised roles back to the overview with a notice.
- Every server action re-checks the permission — a receptionist calling a delete action directly
  gets `Only the salon owner can delete records.`
- Passwords are hashed with scrypt (`scrypt$salt$hash`), sessions are random 32-byte tokens stored
  as SHA-256 hashes in `admin_sessions`, in an `httpOnly`, `sameSite=lax`, `secure` cookie for 7 days.
- Switching a login off, deleting it or resetting its password ends its sessions immediately.
- The owner cannot delete or switch off their own login, cannot demote themselves, and the last
  active owner can never be removed.
- Every sign-in, failed sign-in, password change, role change and deletion is written to
  `activity_log` and shown on **Team & access**.

### Onboarding a receptionist or manager

1. Sign in as the owner → **Team & access**.
2. Enter name, email, role and a temporary password (or press **Auto**).
3. Send them the details — they can change the password from **My account**.
4. Later: change their role from the dropdown, **Reset password**, **Switch off** (keeps the record)
   or **Delete**.

---

## 3. Photography

All imagery is bundled in `public/images` (~2.7 MB of optimised JPEGs) and served through
`next/image`. The design used to hot-link Pexels CDN URLs plus a few `/images/*.jpg` files that were
never committed, which is why pictures showed up broken. `px()` in `src/lib/site.ts` now resolves the
old numeric ids to local files, so content files keep working.
Team portraits and client testimonial avatars are elegant monograms (`src/components/ui/InitialsAvatar.tsx`)
instead of stock head-shots.

Fonts (Cormorant Garamond + Manrope) are self-hosted from `src/fonts`, so builds never depend on
`fonts.googleapis.com`.

---

## 4. Project map

```
src/app/(site)            public website (home, services, bridal, gallery, blog, booking…)
src/app/login             sign-in screen + login/logout server actions
src/app/admin             dashboard — one folder per section, guarded by requirePermission()
src/app/admin/team-access owner-only login management + activity log
src/app/admin/account     my profile / change password
src/app/api               booking, availability, leads, health endpoints
src/components/admin      dashboard shell, charts, table UI, delete button
src/lib/auth.ts           sessions, sign-in/out, guards, activity logging
src/lib/rbac.ts           roles, permissions, sidebar navigation
src/lib/schema-init.ts    idempotent table creation (runs once per process)
src/lib/passwords.ts      scrypt hashing / verification
src/lib/demo-accounts.ts  first-run logins + demo credential list
src/db/schema.ts          Drizzle schema
public/images             all site photography
```

## 5. Commands

```bash
npm run dev        # dev server
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

Sitemap: `/sitemap.xml` · Robots: `/robots.txt` (disallows `/admin`, `/login`, `/api`)
