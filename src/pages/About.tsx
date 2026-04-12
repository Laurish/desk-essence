import { motion } from "framer-motion";

const About = () => (
  <main className="pt-24 container mx-auto px-6 pb-20 min-h-screen max-w-2xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="font-serif text-4xl mb-8">Om Desk Essence</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Desk Essence grundades med en enkel idé: att din arbetsplats förtjänar
          produkter som verkligen gör skillnad för ditt välmående. Vi designar
          ergonomiska tillbehör som hjälper dig att sitta bekvämare – dag efter dag.
        </p>
        <p>
          Vårt fotstöd är vår första produkt, utvecklad efter månader av testning
          för att hitta den perfekta balansen mellan komfort, hållbarhet och design.
          Minnesskum som inte plattas till, tvättbart sametsöverdrag och justerbar
          höjd – allt för att ge dig bästa möjliga upplevelse.
        </p>
        <p>
          Vi tror på att göra en sak riktigt bra. Välkommen till Desk Essence.
        </p>
      </div>
    </motion.div>
  </main>
);

export default About;
