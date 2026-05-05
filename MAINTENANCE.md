# Desk Essence – Underhållsguide

Allt du behöver veta för att underhålla och uppdatera sajten.

---

## Innehåll

1. [Teknikstack](#teknikstack)
2. [Viktiga filer](#viktiga-filer)
3. [Deploya ändringar](#deploya-ändringar)
4. [Ändra priset](#ändra-priset)
5. [Stripe](#stripe)
6. [Resend – kontaktformulär](#resend--kontaktformulär)
7. [Miljövariabler](#miljövariabler)
8. [Domän & hosting](#domän--hosting)

---

## Teknikstack

| Del | Verktyg |
|---|---|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Routing | React Router |
| Betalning | Stripe Checkout |
| E-post | Resend |
| Hosting | Vercel |
| Repo | GitHub – `Laurish/desk-essence` |

---

## Viktiga filer

```
src/
  lib/
    products.ts          ← Pris, produktinfo, bilder
  pages/
    Index.tsx            ← Startsidan
    Product.tsx          ← Produktsidan
    Cart.tsx             ← Varukorgen (innehåller Stripe Price ID)
    Contact.tsx          ← Kontaktformulär med fotouppladdning
  components/
    Footer.tsx           ← Footer med länkar

api/
  contact.js             ← Serverless-funktion för kontaktformulär (Resend)
  create-checkout-session.js  ← Serverless-funktion för Stripe-betalning
```

---

## Deploya ändringar

Öppna terminalen i VS Code (`Ctrl+Ö`) och kör:

```bash
git add .
git commit -m "Beskriv vad du ändrat"
git push
```

Vercel bygger och deployar automatiskt inom någon minut. Du behöver aldrig göra en manuell redeploy.

---

## Ändra priset

All prisinformation sitter i **`src/lib/products.ts`**.

### Ändra försäljningspris

```ts
price: 399,        // ← det pris kunden betalar
originalPrice: 499, // ← överstryckt "gamla" pris
```

### Ta bort överstrykningen (ingen rabatt)

Ta bort eller kommentera bort `originalPrice`-raden:

```ts
price: 499,
// originalPrice: 599,
```

Överstrykningen försvinner automatiskt på alla sidor.

### OBS – Stripe måste också uppdateras

Koden visar rätt pris i UI:t, men det faktiska beloppet som dras från kunden sätts i **Stripe**. Varje gång du ändrar priset måste du:

1. Skapa ett nytt pris i Stripe (se nedan)
2. Byta ut Price ID:t i `src/pages/Cart.tsx`

---

## Stripe

### Logga in
[dashboard.stripe.com](https://dashboard.stripe.com)

### Skapa ett nytt pris

1. Gå till **Products** i vänstermenyn
2. Klicka på din produkt (fotresten)
3. Under **Pricing** – klicka **Add another price**
4. Sätt belopp i SEK, välj **One-time**
5. Klicka **Save**
6. Kopiera det nya **Price ID** (ser ut som `price_1Ab...`)

> Du kan inte redigera ett befintligt pris i Stripe – du skapar alltid ett nytt. Det gamla kan du arkivera efteråt.

### Uppdatera Price ID i koden

Öppna `src/pages/Cart.tsx` och hitta:

```js
priceId: "price_1TTjSI7vlCiXlogaymKvMcNV",
```

Byt ut mot ditt nya Price ID. Pusha sedan som vanligt.

### Aktivera Stripe-kontot

För att ta emot riktiga betalningar måste kontot vara aktiverat med bankuppgifter och organisationsnummer. Görs i Stripe-dashboarden under **Settings → Business**.

### Stripe Tax

25% moms är konfigurerat via **Automatic Tax** i checkout-sessionen. Ingen manuell hantering behövs.

### Klarna

Klarna är aktiverat som betalmetod. Kräver att Stripe-kontot är aktiverat och godkänt för Klarna (sker automatiskt för svenska konton i de flesta fall).

---

## Resend – kontaktformulär

Resend hanterar alla mail från kontaktformuläret.

### Logga in
[resend.com](https://resend.com)

### Vart skickas mailen?

Öppna `api/contact.js` och hitta:

```js
to: "daniel.skshipek@hotmail.com",
```

Byt till rätt e-postadress när det är dags.

### Avsändaradress

```js
from: "Desk Essence <onboarding@resend.dev>",
```

När ni köper en domän för sajten – verifiera den i Resend och byt till t.ex. `noreply@deskessence.se`.

### Formulärets funktioner

- **Fråga om produkt** – fritt meddelande
- **Retur / Ånger** – ordernummer, returorsak, önskat utfall
- **Reklamation** – beskrivning + möjlighet att bifoga foto (skickas som bilaga i mailet)
- **Övrigt** – fritt meddelande

---

## Miljövariabler

Känsliga nycklar lagras i Vercel och används aldrig direkt i koden. Hanteras under:

**vercel.com → ditt projekt → Settings → Environment Variables**

| Variabel | Används till |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe betalningar |
| `RESEND_API_KEY` | Skicka mail via Resend |

Om något slutar fungera – kontrollera att nycklarna fortfarande är giltiga i respektive dashboard.

---

## Domän & hosting

- **Hosting:** Vercel – [vercel.com](https://vercel.com)
- **Nuvarande URL:** [desk-essence.vercel.app](https://desk-essence.vercel.app)
- **Repo:** [github.com/Laurish/desk-essence](https://github.com/Laurish/desk-essence)

### Koppla en egen domän

1. Köp domänen (t.ex. `deskessence.se`) hos valfri registrar
2. Gå till Vercel → ditt projekt → **Settings → Domains**
3. Lägg till domänen och följ instruktionerna för DNS-inställningar
4. Uppdatera avsändaradressen i Resend när domänen är verifierad

---

*Senast uppdaterad: Maj 2026*
