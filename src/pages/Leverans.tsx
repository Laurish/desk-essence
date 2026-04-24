import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl mb-4">{title}</h2>
    <div className="text-[15px] text-muted-foreground leading-[1.8] space-y-3">{children}</div>
  </div>
);

const Leverans = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">JURIDISKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Leveransvillkor</h1>
        <p className="text-muted-foreground text-[15px]">Senast uppdaterad: januari 2025</p>
      </div>
      <div className="max-w-2xl">
        <Section title="Leveransområde">
          <p>Vi levererar för närvarande inom Sverige.</p>
        </Section>
        <Section title="Fraktsätt">
          <p>Leverans sker via Fraktjakt med samarbetande fraktbolag, t.ex. PostNord, DHL eller Schenker.</p>
        </Section>
        <Section title="Leveranstid">
          <p>Normal leveranstid är 2–5 arbetsdagar efter bekräftad order. Vid hög belastning eller externa störningar kan längre leveranstid förekomma. Vi meddelar dig vid eventuell försening.</p>
        </Section>
        <Section title="Frakt">
          <p>Fri frakt på alla ordrar inom Sverige.</p>
        </Section>
        <Section title="Spårning">
          <p>Du får ett spårningsnummer via e-post när din order skickats.</p>
        </Section>
        <Section title="Ansvar vid leverans">
          <p>Vi ansvarar för varan fram till leverans. Om ditt paket är synligt skadat vid mottagning, notera skadan hos fraktbolaget och kontakta oss omgående.</p>
        </Section>
        <Section title="Utebliven leverans">
          <p>Om du inte mottagit din order inom angiven leveranstid, kontakta oss på <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a> så undersöker vi saken.</p>
        </Section>
      </div>
    </motion.div>
  </main>
);

export default Leverans;
