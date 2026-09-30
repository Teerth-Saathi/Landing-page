# TeerthSaathi

A responsive, elderly-first (and welcoming to all ages) pilgrimage interest website. Next.js App Router, React, TypeScript, Tailwind CSS, and Supabase. No bookings or payments are collected.

## Run locally

Use Node.js 22.13+ or current Node LTS and npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. This workspace also has a git-ignored portable Node runtime in `.tools/node-v24.21.0-win-x64`, because the machine's configured Node installation was missing. For this machine's PowerShell terminal:

```powershell
$env:PATH = "$PWD\.tools\node-v24.21.0-win-x64;$env:PATH"
npm.cmd run dev
```

## Connect Supabase

1. Create a Supabase project.
2. Run [the migration](supabase/migrations/001_leads.sql) once in its SQL editor.
3. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in `.env.local`.
   - Open Supabase Dashboard -> Project Settings -> API.
   - Copy the Project URL into `SUPABASE_URL`. It should look like `https://mmlnfcdckkjjwihkhvre.supabase.co`, not the dashboard URL.
   - Copy the server secret key, or the legacy `service_role` key, into `SUPABASE_SECRET_KEY`.
   - **Never prefix the secret with NEXT_PUBLIC or expose it in browser code.**

   For local development, `.env.local` should look like this:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   SUPABASE_URL=https://mmlnfcdckkjjwihkhvre.supabase.co
   SUPABASE_SECRET_KEY=paste_your_server_secret_key_here
   ```
4. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin, without a trailing slash. It controls SEO URLs, Open Graph and the sitemap.
5. Restart the app. Submit a real, consented test enquiry and verify its row in the Supabase table editor before launch.

The API validates fields independently of the client. Supabase RLS blocks anonymous/authenticated table access. Only the server inserts leads. `(phone, destination)` is unique, so repeated registrations return a clear message without overwriting an existing lead. Input length limits, a honeypot and same-origin browser checks provide basic abuse protection. Before paid campaigns, configure a Vercel Firewall rate limit for `POST /api/leads` (for example 10 requests per minute per IP, tuned for legitimate shared networks). No fragile in-memory rate limiter is used on serverless instances.

Without Supabase configuration, the API returns a 503 and the form keeps the visitor's input and offers WhatsApp. It never claims an enquiry was saved. Live database insertion cannot be verified until credentials and the migration are supplied. Do not collect payments through this site.

## Deploy on Vercel

Import the repository into Vercel using its Next.js preset. Add the three environment variables from [.env.example](.env.example) in the appropriate environments, run the SQL migration, and deploy. No custom build command is needed. Set the real canonical production domain and redeploy when it changes. Preview environments should use a separate Supabase project if testing live submissions. Manage leads in Supabase; an admin dashboard is intentionally outside this MVP.

## Quality checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# In a second terminal, after installing Chromium once:
npx playwright install chromium
npm run test:browser
```

Browser tests cover all five requested widths, overflow, WCAG A/AA automated checks, navigation, FAQs, form success/failure with mocked API responses, and invalid API requests. Mocked success verifies UI behavior, not live database persistence. Screenshots are saved to `test-results/`. The browser suite expects a production server on port 3000. Automated accessibility tests complement manual keyboard and visual review; they are not certification.

## Structure

- `app/`: pages, metadata, generated Open Graph image, and lead API.
- `components/sections/`: focused homepage sections, shared by the journey page where appropriate.
- `components/ui/`: brand and WhatsApp link.
- `data/`: journey content and FAQs.
- `lib/`: site configuration and shared lead validation.
- `types/`: API response contract.
- `supabase/migrations/`: database setup, constraints and RLS.
- `tests/`: validation and browser tests.

Most sections are Server Components. Only the mobile menu and interactive lead form require client JavaScript. Images are served locally and optimized by `next/image`; system serif and sans-serif fonts avoid external font requests. Photography attribution and license links appear on `/credits`. See [credits](app/credits/page.tsx) for sources and licenses.

Journey pages use `/journeys/[slug]` with route-specific metadata and static generation. Extend the journey data and route lookup together when adding confirmed offerings. All current destination, pricing, care and medical-support copy deliberately distinguishes plans from confirmed inclusions.

## Before opening bookings

Confirm operational details and update published terms, privacy practices, price, itinerary, medical-support scope, pickup points and cancellation policies to reflect actual operations. This MVP's terms cover interest registration only.
