import { motion } from "framer-motion";

const About = () => (
  <main className="pt-24 max-w-2xl mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="eyebrow mb-4">OM DESK ESSENCE</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-10">En sak, gjord ordentligt.</h1>
      <div className="space-y-6 text-muted-foreground text-[15px] leading-[1.75]">
        <p>
          Desk Essence grundades med en enkel idé: att din arbetsplats förtjänar
          produkter som verkligen gör skillnad för ditt välmående. Vi designar
          ergonomiska tillbehör som hjälper dig sitta bekvämare — dag efter dag.
        </p>
        <p>
          Vårt fotstöd är vår första produkt, utvecklad efter månader av testning
          för att hitta den perfekta balansen mellan komfort, hållbarhet och design.
          Minnesskum som inte plattas till, tvättbart sametsöverdrag och justerbar
          höjd — allt för att ge dig bästa möjliga upplevelse.
        </p>
        <p className="font-serif italic text-foreground text-xl leading-snug pt-4">
          Vi tror på att göra en sak riktigt bra.
        </p>
      </div>
    </motion.div>
  </main>
);

export default About;
