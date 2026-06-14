import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Priset bestäms på servern – aldrig av webbläsaren.
const PRICE_ID = "price_1TTjSI7vlCiXlogaymKvMcNV";
const MAX_QUANTITY = 20;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { items } = req.body || {};

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Ogiltigt format." });
  }

  // Räkna ihop antal från klienten, men använd alltid serverns pris-ID.
  const quantity = items.reduce((sum, item) => {
    const q = Number(item?.quantity);
    return sum + (Number.isInteger(q) && q > 0 ? q : 0);
  }, 0);

  if (quantity < 1 || quantity > MAX_QUANTITY) {
    return res.status(400).json({ error: "Ogiltigt antal." });
  }

  const origin = process.env.SITE_URL || req.headers.origin;
  if (!origin) {
    return res.status(400).json({ error: "Ogiltig förfrågan." });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      billing_address_collection: "required",
      line_items: [{ price: PRICE_ID, quantity }],
      mode: "payment",
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ["SE"],
      },
      success_url: `${origin}/order-success`,
      cancel_url: `${origin}/cart`,
    });

    res.status(200).json({ url: session.url });
  } catch {
    res.status(500).json({ error: "Betalningen kunde inte startas. Försök igen." });
  }
}
