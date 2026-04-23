import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { footrest, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Check, ChevronLeft, ChevronRight, Truck, RotateCcw, Shield } from "lucide-react";
import { toast } from "sonner";

const Product = () => {
  const { addItem } = useCart();
  const [selectedImg, setSelectedImg] = useState(0);

  const handleAdd = () => {
    addItem(footrest);
    toast.success(`${footrest.name} lades till i varukorgen`);
  };

  const nextImg = () => setSelectedImg((p) => (p + 1) % footrest.images.length);
  const prevImg = () => setSelectedImg((p) => (p - 1 + footrest.images.length) % footrest.images.length);

  const specs = [
    { k: "Mått", v: "42 × 32 × 10 / 15 cm" },
    { k: "Vikt", v: "1,8 kg" },
    { k: "Material", v: "Minnesskum · Sammet · Fleece" },
    { k: "Höjdlägen", v: "Två (10 cm / 15 cm)" },
    { k: "Botten", v: "Halkfri silikon" },
    { k: "Tvätt", v: "Avtagbart överdrag, 30°C" },
    { k: "Designad i", v: "Stockholm, Sverige" },
    { k: "Garanti", v: "1 år" },
  ];

  return (
    <main className="pt-16 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-12 md:py-16">
        {/* Breadcrumb */}
        <div className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground mb-8">
          Produkten / {footrest.name}
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-foreground border border-foreground">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImg}
                  src={footrest.images[selectedImg]}
                  alt={`${footrest.name} bild ${selectedImg + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover grayscale-[0.15]"
                />
              </AnimatePresence>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Föregående bild"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                aria-label="Nästa bild"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {footrest.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    aria-label={`Bild ${i + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i === selectedImg ? "bg-background" : "bg-background/40"
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
                  className={`aspect-square overflow-hidden border transition-colors ${
                    i === selectedImg ? "border-accent" : "border-transparent hover:border-border"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover grayscale-[0.15]" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:sticky md:top-24"
          >
            {footrest.badge && (
              <span className="inline-block text-[10px] tracking-[0.18em] uppercase px-2.5 py-1 border border-accent text-accent mb-5">
                {footrest.badge}
              </span>
            )}
            <div className="eyebrow mb-4">ERGONOMISKT FOTSTÖD · MINNESSKUM</div>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.05] mb-4">
              Ergonomic <em className="italic gold-text">Footrest</em>
            </h1>

            <div className="flex items-baseline gap-3 mb-6 font-serif">
              <span className="text-base text-muted-foreground line-through">899 kr</span>
              <span className="text-3xl font-medium">{formatPrice(footrest.price)}</span>
            </div>

            <p className="text-[15px] leading-[1.7] text-muted-foreground mb-8">
              {footrest.description}
            </p>

            <Button
              size="lg"
              onClick={handleAdd}
              className="w-full rounded-sm tracking-[0.14em] uppercase text-xs gap-2 py-6 mb-3"
            >
              <ShoppingBag className="w-4 h-4" />
              Lägg i varukorg
            </Button>
            <p className="scribble text-center mb-8">Fri frakt · 30 dagars retur · 1 års garanti</p>

            {/* Trust icons */}
            <div className="grid grid-cols-3 gap-4 mb-10 border-y border-border py-5 text-center">
              <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                <Truck className="w-4 h-4" /> Fri frakt
              </div>
              <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                <RotateCcw className="w-4 h-4" /> 30 dagars retur
              </div>
              <div className="flex flex-col items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
                <Shield className="w-4 h-4" /> 1 års garanti
              </div>
            </div>

            {/* Features */}
            <div className="mb-10">
              <div className="eyebrow mb-4">EGENSKAPER</div>
              <ul className="space-y-3">
                {footrest.features?.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px]">
                    <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-accent" />
                    </span>
                    <span className="text-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div>
              <div className="eyebrow mb-4">SPECIFIKATIONER</div>
              <dl className="divide-y divide-border border-y border-border">
                {specs.map((s) => (
                  <div key={s.k} className="flex justify-between py-3 text-[13px]">
                    <dt className="text-muted-foreground">{s.k}</dt>
                    <dd className="text-foreground">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Gallery */}
        <section className="mt-24">
          <div className="eyebrow mb-4">GALLERI</div>
          <h2 className="font-serif text-3xl md:text-4xl mb-10">I användning</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {footrest.images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  setSelectedImg(i);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="aspect-square overflow-hidden"
              >
                <img
                  src={img}
                  alt={`${footrest.name} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-[0.15] hover:grayscale-0 hover:scale-[1.03] transition-all duration-500"
                />
              </motion.button>
            ))}
          </div>
        </section>

        {/* CTA bottom */}
        <section className="text-center mt-24 py-16 border-t border-border">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            <em className="italic gold-text">Redo för bekvämare dagar?</em>
          </h2>
          <Button
            size="lg"
            onClick={handleAdd}
            className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2 px-7 py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <ShoppingBag className="w-4 h-4" />
            Köp Desk Essence · {formatPrice(footrest.price)}
          </Button>
        </section>
      </div>
    </main>
  );
};

export default Product;
