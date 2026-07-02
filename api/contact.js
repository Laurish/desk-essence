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

// Läser filens faktiska "magic bytes" – litar inte på klientens påstådda mimeType.
function detectImage(base64) {
  let buf;
  try {
    buf = Buffer.from(base64, "base64");
  } catch {
    return null;
  }
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return { mime: "image/jpeg", ext: "jpg" };
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return { mime: "image/png", ext: "png" };
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return { mime: "image/webp", ext: "webp" };
  return null;
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

  // Verifiera att bilagan verkligen är en bild (kontrollera innehållet, inte påstådd typ).
  let safeAttachmentName = null;
  if (attachment) {
    const detected = detectImage(attachment.base64);
    if (!detected) {
      return res.status(400).json({ error: "Bilagan måste vara en giltig bildfil (JPG, PNG eller WEBP)." });
    }
    safeAttachmentName = `bilaga.${detected.ext}`;
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
      ${attachment ? `<p style="margin-top: 20px; font-size: 13px; color: #666;">📎 Foto bifogat: ${esc(safeAttachmentName)}</p>` : ""}
    </div>
  `;

  // Build attachments array for Resend (säkert filnamn baserat på verifierad bildtyp)
  const attachments = attachment
    ? [{ filename: safeAttachmentName, content: attachment.base64 }]
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