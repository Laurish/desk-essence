import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

type Subject = "question" | "return" | "complaint" | "other" | "";

interface FormData {
  name: string;
  email: string;
  orderNumber: string;
  subject: Subject;
  returnReason: string;
  desiredOutcome: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  orderNumber: "",
  subject: "",
  returnReason: "",
  desiredOutcome: "",
  message: "",
};

const subjectLabels: Record<string, string> = {
  question: "Fråga om produkt",
  return: "Retur / Ånger",
  complaint: "Reklamation",
  other: "Övrigt",
};

const Contact = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const showOrderField = form.subject === "return" || form.subject === "complaint";
  const showReturnFields = form.subject === "return";

  const isReturnIncomplete =
    form.subject === "return" &&
    (!form.orderNumber || !form.returnReason || !form.desiredOutcome);

  const isSubmitDisabled =
    status === "loading" ||
    !form.name ||
    !form.email ||
    !form.subject ||
    isReturnIncomplete;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Något gick fel");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Något gick fel. Försök igen.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition text-[15px]";

  const selectClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-accent transition text-[15px] appearance-none cursor-pointer";

  return (
    <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="eyebrow mb-4">KONTAKT</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">Hör av dig.</h1>
          <p className="text-muted-foreground text-[15px] leading-[1.7]">
            Frågor om produkten, din beställning, eller något helt annat? Vi svarar inom 24 timmar, oftast snabbare. Du kan också använda formuläret för att utöva din <strong className="text-foreground">30-dagars ångerrätt</strong> — välj bara "Retur / Ånger" som ämne.
          </p>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-0 max-w-2xl mb-24"
        >
          <div className="eyebrow mb-6">SKRIV TILL OSS</div>

          {status === "success" ? (
            <div className="py-12 text-center border border-border rounded-xl">
              <p className="font-serif text-2xl mb-3">Tack för ditt meddelande!</p>
              <p className="text-muted-foreground text-[15px]">Vi återkommer inom 1–2 arbetsdagar.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Skicka ett nytt meddelande
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>NAMN <span className="text-accent">*</span></label>
                  <input
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Anna Svensson"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>E-POST <span className="text-accent">*</span></label>
                  <input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="anna@exempel.se"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>ÄMNE <span className="text-accent">*</span></label>
                <select
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className={selectClass}
                >
                  <option value="" disabled>Välj ämne...</option>
                  <option value="question">Fråga om produkt</option>
                  <option value="return">Retur / Ånger</option>
                  <option value="complaint">Reklamation</option>
                  <option value="other">Övrigt</option>
                </select>
              </div>

              {/* Order number */}
              {showOrderField && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>ORDERNUMMER <span className="text-accent">*</span></label>
                  <input
                    name="orderNumber"
                    type="text"
                    required
                    value={form.orderNumber}
                    onChange={handleChange}
                    placeholder="Klistra in ditt order-ID från bekräftelsemailet"
                    className={inputClass}
                  />
                  <p className="mt-1.5 text-xs text-muted-foreground">Finns i din orderbekräftelse via e-post.</p>
                </motion.div>
              )}

              {/* Return fields */}
              {showReturnFields && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="p-4 border border-border rounded-lg text-[13px] text-muted-foreground leading-relaxed">
                    Du har <strong className="text-foreground">30 dagars ångerrätt</strong> från mottagen leverans. Varan ska vara i ursprungligt skick. Returfrakten betalas av dig — vi skickar instruktioner via e-post.
                  </div>
                  <div>
                    <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>RETURORSAK <span className="text-accent">*</span></label>
                    <select name="returnReason" value={form.returnReason} onChange={handleChange} className={selectClass}>
                      <option value="">Välj orsak...</option>
                      <option value="changed_mind">Ångrat mig</option>
                      <option value="wrong_product">Beställde fel produkt</option>
                      <option value="not_as_expected">Produkten motsvarade inte förväntningarna</option>
                      <option value="other">Annat</option>
                    </select>
                  </div>
                  <div>
                    <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>VAD VILL DU HA ISTÄLLET? <span className="text-accent">*</span></label>
                    <select name="desiredOutcome" value={form.desiredOutcome} onChange={handleChange} className={selectClass}>
                      <option value="">Välj...</option>
                      <option value="refund">Återbetalning</option>
                      <option value="replacement">Ny ersättningsprodukt</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Message */}
              <div>
                <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>
                  MEDDELANDE {form.subject !== "return" && <span className="text-accent">*</span>}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={
                    form.subject === "return"
                      ? "Övrig information du vill tillägga (valfritt)..."
                      : form.subject === "complaint"
                      ? "Beskriv felet och bifoga gärna ett foto om möjligt..."
                      : "Skriv ditt meddelande här..."
                  }
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}

              {/* Subject tag */}
              {form.subject && (
                <p className="text-xs text-muted-foreground">
                  Ämne: <span className="text-foreground">{subjectLabels[form.subject]}</span>
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full bg-foreground text-background py-3.5 px-6 rounded-lg text-[15px] font-medium hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                {status === "loading" ? "Skickar..." : "Skicka meddelande"}
              </button>
            </div>
          )}
        </motion.div>

        {/* Info strip */}
        <div className="grid md:grid-cols-3 gap-8 border-y border-border py-10">
          <div className="flex gap-4">
            <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
            <div>
              <div className="eyebrow mb-2">E-POST</div>
              <a href="mailto:hej@deskessence.se" className="text-[15px] hover:gold-text transition-colors">
                hej@deskessence.se
              </a>
            </div>
          </div>
          <div className="flex gap-4">
            <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
            <div>
              <div className="eyebrow mb-2">KONTOR</div>
              <p className="text-[15px]">Stockholm, Sverige</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
            <div>
              <div className="eyebrow mb-2">SVARSTID</div>
              <p className="text-[15px]">Mån–Fre · 24 h</p>
            </div>
          </div>
        </div>

        <p className="scribble mt-10 text-[16px]">
          Vi är ett litet team — du får svar av en människa, inte en bot.
        </p>
      </motion.div>
    </main>
  );
};

export default Contact;
