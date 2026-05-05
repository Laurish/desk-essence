import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

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

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("reviews")
        .select("id, name, rating, message, created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false });
      setReviews(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading || reviews.length === 0) return null;

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="eyebrow mb-4">RECENSIONER</div>
          <h2 className="font-serif text-4xl md:text-5xl">
            Vad våra kunder <em className="italic gold-text">säger.</em>
          </h2>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1">
          <div className="flex gap-0.5 text-xl">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={i <= Math.round(avgRating) ? "gold-text" : "text-muted-foreground/30"}>★</span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{avgRating.toFixed(1)} av 5 · {reviews.length} recensioner</p>
          <Link to="/recensioner" className="text-xs tracking-[0.08em] uppercase text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors mt-1">
            Lämna en recension
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </section>
  );
};

export default ReviewsSection;