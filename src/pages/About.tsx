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
          Desk Essence grundades med en enkel idé: att ditt skrivbord förtjänar lika mycket omsorg
          som resten av ditt hem. Vi designar och handtillverkar skrivbordstillbehör i naturliga
          material som valnöt, mässing, keramik och läder.
        </p>
        <p>
          Varje produkt är tänkt att vara tidlös – något som blir vackrare med åren, inte sämre.
          Vi tror på slow design, hållbara material och den tysta glädje som en
          väl organiserad arbetsplats kan ge.
        </p>
        <p>
          Välkommen att utforska vår kollektion.
        </p>
      </div>
    </motion.div>
  </main>
);

export default About;
