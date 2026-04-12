import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { footrest, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const Product = () => {
  const { addItem } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);

  const handleAdd = () => {
    addItem(footrest);
    toast.success(`${footrest.name} lades till i varukorgen`);
  };

  const nextImg = () => setSelectedImg((prev) => (prev + 1) % footrest.images.length);
  const prevImg = () => setSelectedImg((prev) => (prev - 1 + footrest.images.length) % footrest.images.length);

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={footrest.images[selectedImg]}
                  alt={`${footrest.name} bild ${selectedImg + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {footrest.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === selectedImg ? "bg-foreground" : "bg-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {footrest.images.slice(0, 5).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(i)}
                  className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                    i === selectedImg ? "border-accent" : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            {footrest.badge && (
              <span className="inline-block bg-accent text-accent-foreground text-xs font-medium px-2.5 py-1 rounded-sm mb-4">
                {footrest.badge}
              </span>
            )}
            <h1 className="font-serif text-3xl md:text-4xl mb-2">{footrest.name}</h1>
            <p className="text-2xl text-foreground font-medium mb-6">
              {formatPrice(footrest.price)}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {footrest.description}
            </p>

            <Button size="lg" onClick={handleAdd} className="w-full gap-2 mb-4">
              <ShoppingBag className="w-4 h-4" />
              Lägg i varukorg
            </Button>
            <p className="text-xs text-muted-foreground text-center mb-8">
              Fri frakt · 30 dagars garanti
            </p>

            {/* Features */}
            <div className="border-t border-border pt-6">
              <h3 className="font-serif text-lg mb-4">Egenskaper</h3>
              <ul className="space-y-3">
                {footrest.features?.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* All images gallery */}
        <section className="mt-20">
          <h2 className="font-serif text-2xl mb-8">Galleri</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {footrest.images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setSelectedImg(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${footrest.name} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Product;
