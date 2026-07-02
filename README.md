# Desk Essence

Webbshop för en enda produkt – ett ergonomiskt fotstöd. React + TypeScript + Vite, driftsatt på Vercel. Betalning via Stripe, mejl via Resend, recensioner i Supabase.

## Kom igång

```bash
npm install     # installera beroenden
npm run dev     # utvecklingsserver på http://localhost:8080
npm run build   # produktionsbygge
npm run test    # kör tester
npm run lint    # ESLint
```

## Dokumentation

- **[MAINTENANCE.md](MAINTENANCE.md)** – underhållsguide på svenska: ändra pris, hantera recensioner, miljövariabler och lanseringssteg. **Börja här.**
- **[CLAUDE.md](CLAUDE.md)** – arkitektur och riktlinjer (för Claude Code och utvecklare).

## Struktur

- `src/` – React-frontend (sidor, komponenter, produktdata)
- `api/` – Vercel serverless-funktioner (Stripe-checkout, kontaktformulär, recensionsinskick)

Sajten driftsätts automatiskt av Vercel vid push till `main`.
