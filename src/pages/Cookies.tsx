import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl mb-4">{title}</h2>
    <div className="text-[15px] text-muted-foreground leading-[1.8] space-y-3">{children}</div>
  </div>
);

const Cookies = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">JURIDISKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Cookies</h1>
        <p className="text-muted-foreground text-[15px]">Senast uppdaterad: januari 2025</p>
      </div>
      <div className="max-w-2xl">
        <Section title="Vad är cookies?">
          <p>Cookies är små textfiler som lagras i din webbläsare när du besöker en webbplats. De används för att sajten ska fungera korrekt och för att vi ska kunna förbättra din upplevelse.</p>
        </Section>
        <Section title="Vilka cookies använder vi?">
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-foreground font-medium">Typ</th>
                  <th className="text-left px-4 py-3 text-foreground font-medium">Leverantör</th>
                  <th className="text-left px-4 py-3 text-foreground font-medium">Syfte</th>
                  <th className="text-left px-4 py-3 text-foreground font-medium">Varaktighet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Nödvändig</td>
                  <td className="px-4 py-3">Sajten</td>
                  <td className="px-4 py-3">Varukorg och köpflöde</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3">Nödvändig</td>
                  <td className="px-4 py-3">Stripe</td>
                  <td className="px-4 py-3">Säker betalning</td>
                  <td className="px-4 py-3">Session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Analys</td>
                  <td className="px-4 py-3">Google Analytics</td>
                  <td className="px-4 py-3">Anonym webbanalys</td>
                  <td className="px-4 py-3">2 år</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Ditt val">
          <p>Nödvändiga cookies kan inte stängas av eftersom webbplatsen inte fungerar utan dem. Analytiska cookies kräver ditt samtycke och kan när som helst ändras.</p>
        </Section>
        <Section title="Hantera cookies i webbläsaren">
          <p>Du kan radera eller blockera cookies direkt i din webbläsares inställningar, oavsett dina val här.</p>
        </Section>
      </div>
    </motion.div>
  </main>
);

export default Cookies;
