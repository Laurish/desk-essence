import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { footrest, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(footrest);
    toast.success(`${footrest.name} lades till i varukorgen`);
  };

  const trustItems = ["2 431 recensioner", "Utvecklad i Sverige", "Ergonom-godkänd", "1 års garanti"];

  const features = [
    { n: "01", t: "Minnesskum", p: "Formar sig efter dina fötter och återgår till sin form." },
    { n: "02", t: "Justerbar höjd", p: "Två höjdlägen — hög för avslappning, låg för skrivbord." },
    { n: "03", t: "Fleece-ficka", p: "Håller fötterna varma under hela arbetsdagen." },
    { n: "04", t: "Halkfri botten", p: "Stannar där du sätter den. Inget glidande." },
  ];

  return (
    <main className="pt-16">
      {/* HERO */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid md:grid-cols-[6fr_5fr] gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow mb-5">ERGONOMISKT FOTSTÖD · MINNESSKUM</div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-6">
              Avslappnade fötter.<br />
              <em className="italic gold-text">Hela dagen.</em>
            </h1>
            <p className="text-[15px] leading-[1.7] text-muted-foreground max-w-[46ch] mb-8">
              Justerbar höjd, sammetsöverdrag och en varm fleece-ficka. Gjord för långa dagar vid skrivbordet.
            </p>

            <div className="flex items-baseline gap-3 mb-6 font-serif">
              <span className="text-base text-muted-foreground line-through">899 kr</span>
              <span className="text-3xl font-medium text-foreground">{formatPrice(footrest.price)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button size="lg" onClick={handleAdd} className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2 px-6 py-6">
                <ShoppingBag className="w-4 h-4" />
                Köp nu
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link to="/product/ergonomic-footrest">
                <Button size="lg" variant="outline" className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2 px-6 py-6 w-full sm:w-auto">
                  Läs mer
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 scribble text-[15px]">
              <span>✓ Fri frakt</span>
              <span>✓ 30 dagars retur</span>
              <span>✓ I lager</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="aspect-[4/5] bg-foreground border border-foreground overflow-hidden"
          >
            <Link to="/product/ergonomic-footrest">
              <img
                src={footrest.images[0]}
                alt={footrest.name}
                className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 hover:scale-[1.02] transition-all duration-500 cursor-pointer"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustItems.map((item, i) => (
              <div key={i} className="scribble">
                {i === 0 && <span className="gold-text mr-1">★★★★★</span>}
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">VARFÖR DESK ESSENCE</div>
          <h2 className="font-serif text-4xl md:text-5xl">Stöd där det faktiskt behövs.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={f.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-3"
            >
              <div className="w-10 h-10 rounded-full border border-dashed border-muted-foreground/60 flex items-center justify-center text-[10px] font-mono text-muted-foreground">
                {f.n}
              </div>
              <h4 className="font-serif text-xl">{f.t}</h4>
              <p className="text-[13px] leading-[1.65] text-muted-foreground">{f.p}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BENEFITS — image + checks */}
      <section className="bg-card border-y border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src={footrest.images[5]}
            alt="Fördelar"
            loading="lazy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full aspect-square object-cover"
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="eyebrow mb-4">DESIGNAT FÖR VÄLMÅENDE</div>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">En liten sak som ändrar hela dagen.</h2>
            <ul className="space-y-3 mb-8">
              {["Minskar ryggsmärta", "Förbättrar blodcirkulationen", "Stödjer ben och höfter", "Värmer kalla fötter"].map((b) => (
                <li key={b} className="flex items-center gap-3 text-[15px]">
                  <span className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link to="/product/ergonomic-footrest">
              <Button variant="outline" className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2">
                Se alla detaljer <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA REPEAT */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-24 text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-8">
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
    </main>
  );
};

export default Index;
