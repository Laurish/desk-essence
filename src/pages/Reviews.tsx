import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

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
    const { error } = await supabase.from("reviews").insert({
      name: form.name,
      order_number: form.orderNumber,
      rating: form.rating,
      message: form.message,
      approved: false,
    });

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setForm({ name: "", orderNumber: "", rating: 0, message: "" });
    }
  };

  return (
    <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <div className="eyebrow mb-4">RECENSIONER</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">
          Dela din <em className="italic gold-text">upplevelse.</em>
        </h1>
        <p className="text-muted-foreground text-[15px] leading-[1.7] mb-12">
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
      </motion.div>
    </main>
  );
};

export default Reviews;