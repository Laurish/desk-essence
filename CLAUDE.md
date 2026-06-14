# CLAUDE.md
This file provides guidance to Claude Code when working with this repository.

## Project context
Single-product e-commerce site selling an ergonomic footrest (Desk Essence).
Pre-launch phase — no live customers yet. Pre-sale planned before inventory arrives.
Owner is non-technical; explain decisions clearly and ask before doing anything destructive.

## Communication
- Answer in Swedish
- Keep responses concise unless asked otherwise
- Always explain what you're about to do before doing it
- List planned changes and wait for confirmation on multi-step tasks

## Git workflow
- Always create a new branch before making changes
- Never merge to main without explicit instruction
- Never push without explicit instruction
- Commit messages in Swedish

## Commands
npm run dev       # Start Vite dev server (port 8080)
npm run build     # TypeScript compile + production build
npm run lint      # ESLint
npm run test      # Run tests once with Vitest
npm run test:watch  # Vitest in watch mode

## Architecture
React + TypeScript + Vite SPA, deployed on Vercel.

### Two separate runtimes
**Frontend** (src/) — React SPA, runs in browser, built by Vite.
**Backend** (api/) — Vercel Serverless Functions (Node.js ESM):
- api/create-checkout-session.js — Stripe Checkout session (price ID set server-side)
- api/contact.js — contact form emails via Resend
- api/submit-review.js — receives review, inserts to Supabase (service role) + admin notification via Resend

### Key files
- src/lib/products.ts — price, product info, images
- src/lib/supabase.ts — Supabase client (hardcoded anon key, intentional — RLS is configured)
- api/create-checkout-session.js — contains hardcoded Stripe Price ID (PRICE_ID)
- api/contact.js / api/submit-review.js — recipient email hardcoded, update before launch

### Data flow
Checkout: Cart.tsx → POST /api/create-checkout-session (price set server-side) → Stripe → /order-success
Reviews: Reviews.tsx → POST /api/submit-review → insert approved:false (service role) + admin email → approve via Supabase SQL Editor → visible on site

### Environment variables (Vercel, never in code)
- STRIPE_SECRET_KEY
- RESEND_API_KEY
- SUPABASE_URL — for api/submit-review.js
- SUPABASE_SERVICE_ROLE_KEY — for api/submit-review.js (secret, bypasses RLS)

### UI components (shadcn/ui subset)
Only installed: accordion, button, sonner, toast, toaster, tooltip.
Do not add new shadcn components without removing unused ones.

### Path alias
@/ maps to src/ — defined in vite.config.ts.

## Before launch checklist
- [ ] Buy domain (deskessence.se)
- [ ] Google Workspace (company email)
- [ ] Verify domain in Resend
- [ ] Activate Stripe account (org number + bank details)
- [ ] Update recipient email in api/contact.js and api/submit-review.js
- [ ] Update review count in src/pages/Index.tsx