import { Resend } from "resend";
import { z } from "zod";

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

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(150),
  orderNumber: z.string().max(100).optional(),
  subject: z.enum(["question", "return", "complaint", "other"]),
  returnReason: z.string().max(50).optional(),
  desiredOutcome: z.string().max(50).optional(),
  message: z.string().max(5000).optional(),
  attachment: z
    .object({
      name: z.string().min(1).max(200),
      base64: z.string().min(1),
      mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
    })
    .nullable()
    .optional(),
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Honeypot: dolt fält som bara bottar fyller i.
  if (req.body?.company) {
    return res.status(200).json({ ok: true });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Kontrollera att alla fält är korrekt ifyllda." });
  }

  const { name, email, orderNumber, subject, returnReason, desiredOutcome, message, attachment } = parsed.data;

  if (attachment && attachment.base64.length > 6 * 1024 * 1024) {
    return res.status(400).json({ error: "Filen är för stor. Max 4 MB." });
  }

  const subjectLabel = subjectLabels[subject] || subject;

  let bodyHtml = `
    <div style="font-family: sans-serif; max-width: 600px; color: #111;">
      <h2 style="font-size: 20px; margin-bottom: 24px;">Nytt meddelande – ${esc(subjectLabel)}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 160px; color: #666; font-size: 14px;">Namn</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">E-post</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Ämne</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(subjectLabel)}</td>
        </tr>
        ${orderNumber ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Ordernummer</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(orderNumber)}</td>
        </tr>` : ""}
        ${returnReason ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Returorsak</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(returnReasonLabels[returnReason] || returnReason)}</td>
        </tr>` : ""}
        ${desiredOutcome ? `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px;">Önskat resultat</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px;">${esc(desiredOutcomeLabels[desiredOutcome] || desiredOutcome)}</td>
        </tr>` : ""}
        ${message ? `
        <tr>
          <td style="padding: 10px 0; color: #666; font-size: 14px; vertical-align: top;">Meddelande</td>
          <td style="padding: 10px 0; font-size: 14px; white-space: pre-line;">${esc(message)}</td>
        </tr>` : ""}
      </table>
      ${attachment ? `<p style="margin-top: 20px; font-size: 13px; color: #666;">📎 Foto bifogat: ${esc(attachment.name)}</p>` : ""}
    </div>
  `;

  // Build attachments array for Resend
  const attachments = attachment
    ? [{ filename: attachment.name, content: attachment.base64 }]
    : [];

  try {
    await resend.emails.send({
      from: "Desk Essence <onboarding@resend.dev>",
      to: "daniel.skshipek@hotmail.com",
      replyTo: email,
      subject: `[Desk Essence] ${subjectLabel} – ${name}`,
      html: bodyHtml,
      attachments,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Resend error:", error);
    return res.status(500).json({ error: "Kunde inte skicka meddelandet. Försök igen senare." });
  }
}