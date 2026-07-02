import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import PageMeta from "@/components/PageMeta";

interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
  created_at: string;
}

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <span key={i} className={i <= rating ? "gold-text" : "text-muted-foreground/30"}>★</span>
    ))}
  </div>
);

const StarInput = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className={`text-3xl transition-colors ${i <= (hovered || value) ? "gold-text" : "text-muted-foreground/30"}`}
          aria-label={`${i} stjärnor`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

const Reviews = () => {
  const [form, setForm] = useState({ name: "", orderNumber: "", rating: 0, message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    const loadReviews = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, name, rating, message, created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setReviews(data || []);
    };
    loadReviews();
  }, []);

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-transparent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent transition text-[15px]";

  const isDisabled =
    status === "loading" ||
    !form.name ||
    !form.orderNumber ||
    !form.rating ||
    !form.message;

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          rating: form.rating,
          message: form.message,
          order_number: form.orderNumber,
          company: honeypot,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setForm({ name: "", orderNumber: "", rating: 0, message: "" });
      setHoneypot("");
    } catch {
      setStatus("error");
    }
  };

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
      <PageMeta
        title="Recensioner | Desk Essence"
        description="Läs vad kunder säger om vårt ergonomiska fotstöd — och dela din egen upplevelse."
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <div className="eyebrow mb-4">RECENSIONER</div>
          <h1 className="font-serif text-4xl md:text-5xl mb-6">
            Vad våra kunder <em className="italic gold-text">säger.</em>
          </h1>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5 text-xl">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className={i <= Math.round(avgRating) ? "gold-text" : "text-muted-foreground/30"}>★</span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{avgRating.toFixed(1)} av 5 · {reviews.length} recensioner</p>
            </div>
          )}
        </div>

        {/* Existing reviews */}
        {reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="border border-border p-6 flex flex-col gap-3 bg-card"
              >
                <Stars rating={review.rating} />
                <p className="text-[14px] leading-[1.7] text-foreground/80 flex-1">"{review.message}"</p>
                <p className="text-[12px] tracking-[0.06em] uppercase text-muted-foreground">{review.name}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Form */}
        <div className="max-w-2xl">
          <div className="eyebrow mb-4">LÄMNA EN RECENSION</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Dela din <em className="italic gold-text">upplevelse.</em>
          </h2>
          <p className="text-muted-foreground text-[15px] leading-[1.7] mb-10">
            Vi värdesätter din feedback. Ditt ordernummer används för att verifiera att du köpt produkten — det visas aldrig publikt.
          </p>

          {status === "success" ? (
            <div className="py-12 text-center border border-border rounded-xl">
              <p className="font-serif text-2xl mb-3">Tack för din recension!</p>
              <p className="text-muted-foreground text-[15px]">Den granskas och publiceras inom kort.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Lämna en till
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Honeypot – dolt fält som bara bottar fyller i */}
              <input
                type="text"
                name="company"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>NAMN <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Anna Svensson"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>ORDERNUMMER <span className="text-accent">*</span></label>
                  <input
                    type="text"
                    value={form.orderNumber}
                    onChange={(e) => setForm((p) => ({ ...p, orderNumber: e.target.value }))}
                    placeholder="Från din orderbekräftelse"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>BETYG <span className="text-accent">*</span></label>
                <StarInput value={form.rating} onChange={(v) => setForm((p) => ({ ...p, rating: v }))} />
              </div>

              <div>
                <label className="eyebrow mb-2 block" style={{ fontSize: "11px" }}>DIN RECENSION <span className="text-accent">*</span></label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  placeholder="Berätta om din upplevelse av produkten..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">Något gick fel. Försök igen.</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className="w-full bg-foreground text-background py-3.5 px-6 rounded-lg text-[15px] font-medium hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed transition-opacity"
              >
                {status === "loading" ? "Skickar..." : "Skicka recension"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </main>
  );
};

export default Reviews;