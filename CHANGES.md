# Desk Essence — v2 design

Ergonomiskt fotstöd · **Direkt**-designen (cream / ink / gold).

## Vad är nytt

Hela frontend är omskriven enligt den nya designriktningen, men med **exakt samma** backend/Stripe-flöde som tidigare. Inget har förändrats kring:

- `api/create-checkout-session.js` — Stripe checkout (oförändrad)
- `vercel.json` — Vercel routing (oförändrad)
- `src/lib/cart.tsx` — cart state (oförändrad)
- `src/lib/products.ts` — produktdata (oförändrad)

## Ny design

- **Palett:** cream paper (`#f6f4ef`), ink (`#1a1a1a`), gold accent (`#b8935a`)
- **Typografi:** Cormorant Garamond (serif) + Inter (sans) + Caveat (hand-script)
- **Layout:** max-bredd 1280px, generös whitespace, dashed dividers, subtila grayscale-filter på bilder

## Nya sidor

- `/` — Landningssida (Direkt-hero, features, benefits, CTA)
- `/product/:id` — **Dedikerad produktsida** med bildgalleri, egenskaper, specs och gallery
- `/faq` — **Ny** — 7 vanliga frågor via accordion
- `/contact` — **Ny** — e-post, kontor, svarstid

## Uppdaterade filer

```
src/App.tsx
src/index.css
src/components/Header.tsx           # Produkten / FAQ / Kontakt
src/components/Footer.tsx
src/pages/Index.tsx
src/pages/Product.tsx               # all produktinfo här
src/pages/Cart.tsx
src/pages/About.tsx
src/pages/Faq.tsx                   # NY
src/pages/Contact.tsx               # NY
src/pages/OrderSuccess.tsx
src/pages/NotFound.tsx
tailwind.config.ts
index.html                          # uppdaterad titel/meta
```

## Kör lokalt

```bash
npm install     # eller: bun install
npm run dev     # startar Vite dev server
```

## Nästa steg

- Ersätt placeholder-bilder i `src/assets/` med riktiga produktbilder
- Uppdatera Stripe `priceId` i `src/pages/Cart.tsx` om det har ändrats
- Publicera via Vercel (redan konfigurerad)
