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
7. [Supabase – recensioner](#supabase--recensioner)
8. [Miljövariabler](#miljövariabler)
9. [Domän & hosting](#domän--hosting)
10. [Nästa steg – inför lansering](#nästa-steg--inför-lansering)
11. [Nästa steg – när ordrar börjar komma in](#nästa-steg--när-ordrar-börjar-komma-in)

---

## Teknikstack

| Del | Verktyg |
|---|---|
| Frontend | React + TypeScript + Vite |
| Styling | Tailwind CSS + Framer Motion |
| Routing | React Router |
| Betalning | Stripe Checkout |
| E-post | Resend |
| Databas | Supabase |
| Hosting | Vercel |
| Repo | GitHub – `Laurish/desk-essence` |

---

## Viktiga filer

```
src/
  lib/
    products.ts          ← Pris, produktinfo, bilder
    supabase.ts          ← Supabase-klient (URL + anon key)
  pages/
    Index.tsx            ← Startsidan
    Product.tsx          ← Produktsidan
    Cart.tsx             ← Varukorgen
    Contact.tsx          ← Kontaktformulär med fotouppladdning
    Reviews.tsx          ← Recensionssidan (visa + lämna recension)
  components/
    Header.tsx           ← Navbar med länkar
    Footer.tsx           ← Footer med länkar
    ReviewsSection.tsx   ← Recensionskomponent (används på Index + Product)

api/
  contact.js             ← Serverless-funktion för kontaktformulär (Resend)
  create-checkout-session.js  ← Serverless-funktion för Stripe-betalning (pris sätts på servern)
  submit-review.js       ← Serverless-funktion: tar emot recension, sparar i Supabase + notismail
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
price: 399,         // ← det pris kunden betalar
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
2. Byta ut Price ID:t i `api/create-checkout-session.js`

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

Öppna `api/create-checkout-session.js` och hitta:

```js
const PRICE_ID = "price_1TTjSI7vlCiXlogaymKvMcNV";
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

Resend hanterar alla mail från kontaktformuläret och recensionsnotiser.

### Logga in
[resend.com](https://resend.com)

### Vart skickas mailen?

Öppna `api/contact.js` och `api/submit-review.js` och hitta:

```js
to: "daniel.skshipek@hotmail.com",
```

Byt till rätt e-postadress när det är dags.

### Avsändaradress

```js
from: "Desk Essence <onboarding@resend.dev>",
```

När ni köper en domän – verifiera den i Resend och byt till t.ex. `noreply@deskessence.se` i båda API-filerna.

### Formulärets funktioner

- **Fråga om produkt** – fritt meddelande
- **Retur / Ånger** – ordernummer, returorsak, önskat utfall
- **Reklamation** – beskrivning + möjlighet att bifoga foto (skickas som bilaga i mailet)
- **Övrigt** – fritt meddelande

---

## Supabase – recensioner

### Logga in
[supabase.com](https://supabase.com) → projektet **desk-essence**

### Uppgifter
- **Project URL:** `https://schgcawfirvzlemwdoqf.supabase.co`
- **Anon key:** finns i `src/lib/supabase.ts`

### Hur recensioner fungerar

1. Kunden fyller i formuläret på `/recensioner`
2. Recensionen sparas i databasen med `approved = false`
3. Du får ett notismail till din e-post
4. Den syns **inte** på sajten förrän du godkänner den
5. Du hanterar recensioner via **SQL Editor** i Supabase

### Godkänna recensioner

Gå till **SQL Editor** och kör:

```sql
-- Godkänn alla väntande recensioner på en gång
update public.reviews set approved = true where approved = false;
```

Eller godkänn en specifik – kolla `id`-värdet i Table Editor först:

```sql
update public.reviews set approved = true where id = 'uuid-här';
```

### Se väntande recensioner

```sql
select * from public.reviews where approved = false order by created_at desc;
```

### Ta bort en recension

```sql
-- Ta bort en specifik recension
delete from public.reviews where id = 'uuid-här';

-- Ta bort alla recensioner
delete from public.reviews;
```

### Lägga till en recension manuellt

```sql
insert into public.reviews (name, rating, order_number, message, approved)
values ('Anna Svensson', 5, 'order-123', 'Fantastisk produkt!', true);
```

---

## Miljövariabler

Känsliga nycklar lagras i Vercel och används aldrig direkt i koden. Hanteras under:

**vercel.com → ditt projekt → Settings → Environment Variables**

| Variabel | Används till |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe betalningar |
| `RESEND_API_KEY` | Skicka mail via Resend |
| `SUPABASE_URL` | Server-funktion för recensioner (`submit-review`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-funktion för recensioner – **hemlig**, ger full databasåtkomst |

Om något slutar fungera – kontrollera att nycklarna fortfarande är giltiga i respektive dashboard.

---

## Domän & hosting

- **Hosting:** Vercel – [vercel.com](https://vercel.com)
- **Nuvarande URL:** [desk-essence.vercel.app](https://desk-essence.vercel.app)
- **Repo:** [github.com/Laurish/desk-essence](https://github.com/Laurish/desk-essence)

### Koppla en egen domän till Vercel

1. Köp domänen (t.ex. `deskessence.se`) hos Loopia eller Namecheap
2. Gå till Vercel → ditt projekt → **Settings → Domains**
3. Lägg till domänen och följ instruktionerna för DNS-inställningar
4. Uppdatera avsändaradressen i Resend när domänen är verifierad

---

## Nästa steg – inför lansering

Dessa saker måste göras innan sajten kan ta emot riktiga betalningar. Be Claude om hjälp med varje steg.

### 1. Köp domän
Köp t.ex. `deskessence.se` hos Loopia eller Namecheap. Koppla sedan till Vercel enligt instruktionerna ovan.

### 2. Sätt upp företagsmail med Google Workspace
Domänen ger inte automatiskt ett mailkonto – det måste sättas upp separat.

**Rekommendation: Google Workspace** (~70 kr/månad)
- Ger er `hej@deskessence.se`, `info@deskessence.se`, `daniel@deskessence.se` osv.
- Fungerar precis som vanlig Gmail men med er domän
- Ni kan ha hur många alias ni vill (flera adresser → samma inkorg)
- När ni svarar på mail kan ni välja vilken avsändaradress som visas

**Setup:**
1. Registrera på [workspace.google.com](https://workspace.google.com)
2. Följ guiden – Google ger er exakt vilka DNS-rader som ska läggas till hos domänregistraren
3. Be Claude om hjälp med DNS-inställningarna

**Undvika skräppost:**
Google Workspace sätter automatiskt upp SPF, DKIM och DMARC – de tre DNS-poster som ser till att era mail inte hamnar i skräppost. Följ Googles guide noga.

### 3. Verifiera domänen i Resend
När domänen och Google Workspace är klara – verifiera domänen i Resend också så att transaktionsmail från sajten skickas från `noreply@deskessence.se` istället för `onboarding@resend.dev`.

1. Logga in på [resend.com](https://resend.com)
2. Gå till **Domains → Add domain**
3. Följ instruktionerna (ytterligare DNS-rader)
4. Uppdatera avsändaradressen i `api/contact.js` och `api/submit-review.js`

### 4. Aktivera Stripe-kontot
Gå till [dashboard.stripe.com](https://dashboard.stripe.com) → **Settings → Business** och fyll i:
- Organisationsnummer
- Bankuppgifter för utbetalningar
- Företagsadress

### 5. Uppdatera mottagarmail i koden
Byt `daniel.skshipek@hotmail.com` till rätt adress i:
- `api/contact.js`
- `api/submit-review.js`

### 6. Uppdatera trust-stripet på startsidan
I `src/pages/Index.tsx` finns denna rad hårdkodad:
```tsx
const trustItems = ["2 431 recensioner", ...];
```
Uppdatera antalet när ni faktiskt har recensioner.

---

## Nästa steg – när ordrar börjar komma in

Dessa saker är värda att bygga när ni har kunder och trafik. Be Claude om hjälp med att bygga/sätta upp varje punkt.

### Konfigurera API-funktionerna var för sig (Vercel Pro)
När Vercel uppgraderas till Pro vid lansering kan varje serverless-funktion i `api/` konfigureras separat — egen region, timeout, minne och **rate limiting per endpoint**. Då kan betalning (`create-checkout-session`), kontakt (`contact`) och recensioner (`submit-review`) finjusteras oberoende av varandra: t.ex. hårdare spärrar på kontakt/recensioner och snabbaste region för checkout.

### Recensionsmail efter en vecka
Skicka automatiskt ett mail till kunden en vecka efter köp med en länk till `/recensioner`. Kräver:
- **Vercel Cron Jobs** (ingår i Vercel Pro)
- En ny API-funktion som kollar ordrar och skickar mail via Resend

### Maillista med rabatter och nyhetsbrev
**Rekommendation: Klaviyo** – gratis upp till 500 kontakter, byggt för e-handel.
- Signup-formulär på sajten
- Automatiskt välkomstmail med eventuell rabattkod
- Schemalagda kampanjmail
- Unsubscribe-hantering (GDPR-kompatibelt inbyggt)

> OBS – en maillista kräver explicit opt-in enligt GDPR. Klaviyo hanterar detta automatiskt.

### Instagram-flöde
Meta's API kräver ett godkänt utvecklarkonto. Enklaste alternativet är en tredjepartstjänst som **EmbedSocial** eller **Behold** som hanterar API-åtkomsten åt er.

---

*Senast uppdaterad: Juni 2026*
