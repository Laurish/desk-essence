import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, rating, message } = req.body;

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
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Betyg</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Recension</td>
              <td style="padding: 10px 0; font-size: 14px; white-space: pre-line;">${message}</td>
            </tr>
          </table>
          <p style="margin-top: 24px; font-size: 13px; color: #666;">
            Logga in på <a href="https://supabase.com">supabase.com</a> för att godkänna eller neka recensionen.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Kunde inte skicka notis." });
  }
}