import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="eyebrow mb-4">VARUKORG</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-4">Tom varukorg.</h1>
        <p className="text-muted-foreground mb-8">Utforska vårt fotstöd och lägg det i varukorgen.</p>
        <Link to="/product/ergonomic-footrest">
          <Button className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2 py-6 px-6">
            Se fotstödet <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-20 min-h-screen">
      <div className="eyebrow mb-3">VARUKORG</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-12">Din beställning</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              className="flex gap-5 border-b border-border pb-6"
            >
              <div className="w-28 h-32 overflow-hidden bg-foreground flex-shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover grayscale-[0.15]"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl mb-1">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{formatPrice(item.product.price)}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Minska"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted transition-colors"
                      aria-label="Öka"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(item.product.id);
                      toast.info(`${item.product.name} togs bort`);
                    }}
                    className="ml-auto p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Ta bort"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border border-border p-6 h-fit lg:sticky lg:top-24 bg-card">
          <div className="eyebrow mb-4">SAMMANFATTNING</div>
          <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delsumma</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frakt</span>
              <span className="gold-text">Gratis</span>
            </div>
          </div>
          <div className="flex justify-between font-serif text-xl mb-6">
            <span>Totalt</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button
            className="w-full rounded-sm tracking-[0.14em] uppercase text-xs gap-2 py-6"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const res = await fetch("/api/create-checkout-session", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    items: items.map((item) => ({
                      priceId: "price_1TQ9s77vlCiXlogahA3By2lf",
                      quantity: item.quantity,
                    })),
                  }),
                });
                const data = await res.json();
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  toast.error("Något gick fel, försök igen.");
                }
              } catch {
                toast.error("Kunde inte ansluta till betalning.");
              } finally {
                setLoading(false);
              }
            }}
          >
            {loading ? "Laddar..." : (<>Till kassan <ArrowRight className="w-4 h-4" /></>)}
          </Button>
          <p className="scribble text-center mt-4">Säker betalning via Stripe</p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
