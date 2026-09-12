# Reservations App

A simple reservation booking app built with Next.js + Supabase.

## Stack
- **Next.js 15** (App Router) — TypeScript + Tailwind CSS
- **Supabase** — PostgreSQL database with RLS
- **Vercel** — deployment

## Local setup
```bash
cp .env.example .env.local
# Fill in your Supabase values
npm run dev
```

## Database
The `reservations` table schema is in `supabase/migrations/001_create_reservations.sql`.

## API Routes
- `GET /api/health` — health check
- `POST /api/reservations` — create a reservation
- `GET /api/reservations` — list reservations

## Deploy
Push to GitHub → Vercel auto-deploys. Set env vars on Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Built by Reinvent Labs 🚀