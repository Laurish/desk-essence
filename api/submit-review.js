import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { z } from "zod";

// Service role-nyckeln går förbi RLS – därför MÅSTE koden själv garantera
// att approved alltid sätts till false (se nedan).
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const reviewSchema = z.object({
  name: z.string().trim().min(1).max(100),
  rating: z.coerce.number().int().min(1).max(5),
  message: z.string().trim().min(1).max(2000),
  order_number: z.string().trim().min(1).max(100),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Honeypot: samma dolda fält som kontaktformuläret. Bara bottar fyller i det.
  // Låtsas att allt gick bra utan att spara något.
  if (req.body?.company) {
    return res.status(200).json({ ok: true });
  }

  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Ogiltig recension." });
  }

  const { name, rating, message, order_number } = parsed.data;

  // approved sätts ALLTID på servern – läses aldrig från klienten.
  const { error } = await supabase.from("reviews").insert({
    name,
    rating,
    message,
    order_number,
    approved: false,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return res.status(500).json({ error: "Kunde inte spara recensionen. Försök igen senare." });
  }

  // Notis-mejl till admin (samma innehåll som api/review-notify.js).
  // Recensionen är redan sparad, så ett misslyckat mejl ska inte fälla requesten.
  try {
    await resend.emails.send({
      from: "Desk Essence <onboarding@resend.dev>",
      to: "daniel.skshipek@hotmail.com",
      subject: `[Desk Essence] Ny recension att godkänna – ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #111;">
          <h2 style="font-size: 20px; margin-bottom: 24px;">Ny recension att godkänna</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px; color: #666; font-size: 14px;">Namn</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(name)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Betyg</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Recension</td>
              <td style="padding: 10px 0; font-size: 14px; white-space: pre-line;">${esc(message)}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #666;">
            Logga in på <a href="https://supabase.com">supabase.com</a> för att godkänna eller neka recensionen.
          </p>
        </div>
      `,
    });
  } catch (mailError) {
    console.error("Resend error:", mailError);
  }

  return res.status(200).json({ ok: true });
}
