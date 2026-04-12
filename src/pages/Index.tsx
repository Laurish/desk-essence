import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { footrest, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(footrest);
    toast.success(`${footrest.name} lades till i varukorgen`);
  };

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-secondary/30">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-sm font-medium tracking-wide uppercase mb-4 block">
              Desk Essence
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-foreground mb-6">
              Sitt bekvämt, hela dagen
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Ergonomiskt fotstöd i minnesskum med justerbar höjd och tvättbart
              sametsöverdrag. Designat för ditt välmående.
            </p>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-serif text-3xl text-foreground">
                {formatPrice(footrest.price)}
              </span>
              <span className="text-sm text-accent font-medium">Fri frakt</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" onClick={handleAdd} className="gap-2">
                <ShoppingBag className="w-4 h-4" />
                Lägg i varukorg
              </Button>
              <Link to="/product/ergonomic-footrest">
                <Button size="lg" variant="outline" className="gap-2 w-full">
                  Läs mer
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/product/ergonomic-footrest">
              <img
                src={footrest.images[0]}
                alt={footrest.name}
                className="w-full rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                width={1080}
                height={1080}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features highlight */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-3xl mb-12 text-center"
        >
          Varför vårt fotstöd?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: footrest.images[1], title: "Mysig fleece-ficka", desc: "Håller fötterna varma under kalla dagar." },
            { img: footrest.images[3], title: "Justerbar höjd", desc: "Välj mellan 10 cm och 15 cm – passar de flesta stolar." },
            { img: footrest.images[6], title: "Tvättbart överdrag", desc: "Avtagbart sametsöverdrag som enkelt tvättas i maskin." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group"
            >
              <Link to="/product/ergonomic-footrest">
                <div className="rounded-lg overflow-hidden mb-4 aspect-square bg-card">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <h3 className="font-serif text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src={footrest.images[5]}
              alt="Fördelar med fotstöd"
              loading="lazy"
              className="rounded-lg w-full"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="font-serif text-2xl md:text-3xl mb-6">
              Designat för ditt välmående
            </h2>
            {[
              "Minskar ryggsmärta",
              "Förbättrar blodcirkulationen",
              "Stödjer ben och höfter",
              "Värmer kalla fötter",
            ].map((b) => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="text-foreground">{b}</span>
              </div>
            ))}
            <div className="pt-4">
              <Link to="/product/ergonomic-footrest">
                <Button variant="outline" className="gap-2">
                  Se alla detaljer
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle gallery */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-3xl mb-12 text-center"
        >
          Passar överallt
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[footrest.images[2], footrest.images[7], footrest.images[1]].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg overflow-hidden aspect-square"
            >
              <Link to="/product/ergonomic-footrest">
                <img
                  src={img}
                  alt={`Fotstöd i användning ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary/30">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="font-serif text-2xl md:text-3xl mb-4">
            Redo att sitta bekvämare?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Beställ idag och få fri frakt. 30 dagars garanti.
          </p>
          <Button size="lg" onClick={handleAdd} className="gap-2">
            <ShoppingBag className="w-4 h-4" />
            Köp nu – {formatPrice(footrest.price)}
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Index;
