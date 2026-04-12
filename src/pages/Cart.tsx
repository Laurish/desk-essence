import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Cart = () => {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-24 container mx-auto px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-serif text-3xl mb-4">Varukorgen är tom</h1>
        <p className="text-muted-foreground mb-8">Utforska vårt fotstöd och lägg till det i varukorgen.</p>
        <Link to="/product/ergonomic-footrest">
          <Button>Se fotstödet</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 container mx-auto px-6 pb-20 min-h-screen">
      <h1 className="font-serif text-3xl mb-10">Varukorg</h1>
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              key={item.product.id}
              layout
              className="flex gap-4 border-b border-border pb-6"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded-md"
                loading="lazy"
                width={96}
                height={96}
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.product.name}</h3>
                <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="p-1 hover:bg-secondary rounded"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="p-1 hover:bg-secondary rounded"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      removeItem(item.product.id);
                      toast.info(`${item.product.name} togs bort`);
                    }}
                    className="ml-auto p-1 hover:bg-secondary rounded text-muted-foreground"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-card rounded-md p-6 border border-border h-fit sticky top-24">
          <h3 className="font-serif text-lg mb-4">Sammanfattning</h3>
          <div className="space-y-2 text-sm border-b border-border pb-4 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delsumma</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Frakt</span>
              <span className="text-accent font-medium">Gratis</span>
            </div>
          </div>
          <div className="flex justify-between font-medium mb-6">
            <span>Totalt</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Button
            className="w-full"
            onClick={() => toast.info("Betalning via Stripe kopplas snart!")}
          >
            Till kassan
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3">
            Stripe-betalning aktiveras snart
          </p>
        </div>
      </div>
    </main>
  );
};

export default Cart;
