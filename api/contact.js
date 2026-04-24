import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const subjectLabels = {
  question: "Fråga om produkt",
  return: "Retur / Ånger",
  complaint: "Reklamation",
  other: "Övrigt",
};

const returnReasonLabels = {
  changed_mind: "Ångrat mig",
  wrong_product: "Beställde fel produkt",
  not_as_expected: "Produkten motsvarade inte förväntningarna",
  other: "Annat",
};

const desiredOutcomeLabels = {
  refund: "Återbetalning",
  exchange: "Byte mot annan produkt",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, orderNumber, subject, returnReason, desiredOutcome, message } = req.body;

  if (!name || !email || !subject) {
    return res.status(400).json({ error: "Namn, e-post och ämne är obligatoriska." });
  }

  // Build email body
  const subjectLabel = subjectLabels[subject] || subject;

  let bodyHtml = `
    <div style="font-family: sans-serif; max-width: 600px; color: #111;">
      <h2 style="font-size: 20px; margin-bottom: 24px;">Nytt meddelande – ${subjectLabel}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px; color: #666; font-size: 14px;">Namn</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">E-post</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Ämne</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${subjectLabel}</td>
        </tr>
        ${orderNumber ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Ordernummer</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${orderNumber}</td>
        </tr>` : ""}
        ${returnReason ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Returorsak</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${returnReasonLabels[returnReason] || returnReason}</td>
        </tr>` : ""}
        ${desiredOutcome ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Önskat resultat</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${desiredOutcomeLabels[desiredOutcome] || desiredOutcome}</td>
        </tr>` : ""}
        ${message ? `
        <tr>
          <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Meddelande</td>
          <td style="padding: 10px 0; font-size: 14px; white-space: pre-line;">${message}</td>
        </tr>` : ""}
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Desk Essence <onboarding@resend.dev>",   // Byt till er domän
      to: "daniel.skshipek@hotmail.com",                      // Byt till Sandras e-post
      replyTo: email,
      subject: `[Desk Essence] ${subjectLabel} – ${name}`,
      html: bodyHtml,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Kunde inte skicka meddelandet. Försök igen senare." });
  }
}