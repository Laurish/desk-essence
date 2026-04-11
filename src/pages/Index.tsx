import { motion } from "framer-motion";
import heroImg from "@/assets/hero-workspace.jpg";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const Index = () => {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[85vh] flex items-end">
        <img
          src={heroImg}
          alt="Curated workspace with Desk Essence accessories"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <div className="relative container mx-auto px-6 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-foreground mb-4">
              Skapa ditt perfekta skrivbord
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              Handgjorda tillbehör i naturliga material – designade för att inspirera ditt dagliga arbete.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-2xl md:text-3xl mb-12"
        >
          Kollektionen
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-card border-y border-border">
        <div className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Handgjort", desc: "Varje produkt tillverkas för hand med omsorg om detaljer." },
              { title: "Naturliga material", desc: "Valnöt, mässing, keramik och läder – material som åldras med värdighet." },
              { title: "Fri frakt", desc: "Fri frakt på alla beställningar inom Sverige." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <h3 className="font-serif text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
