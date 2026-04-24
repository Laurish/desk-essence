import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl mb-4">{title}</h2>
    <div className="text-[15px] text-muted-foreground leading-[1.8] space-y-3">{children}</div>
  </div>
);

const Retur = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">JURIDISKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Retur & Ångerrätt</h1>
        <p className="text-muted-foreground text-[15px]">Senast uppdaterad: januari 2025</p>
      </div>
      <div className="max-w-2xl">
        <Section title="Ångerrätt – 30 dagar">
          <p>Du har 30 dagars ångerrätt från den dag du mottog varan, i enlighet med distansavtalslagen. Det är frivilligt att uppge skäl för ånger.</p>
        </Section>
        <Section title="Så här returnerar du">
          <p>1. Kontakta oss via <Link to="/contact" className="underline underline-offset-4 hover:text-foreground transition-colors">kontaktformuläret</Link> eller på <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a> och välj ämnet Retur / Ånger.</p>
          <p>2. Du får instruktioner och en returfraktsedel via e-post.</p>
          <p>3. Returnera varan i original- eller likvärdigt emballage, väl förpackad.</p>
          <p>4. Varan ska vara oskadad och i väsentligen samma skick som när du mottog den.</p>
        </Section>
        <Section title="Returfrakt">
          <p>Du som kund bekostar returfrakten vid ånger. Vid reklamation (felaktig eller skadad vara) bekostar vi returfrakten.</p>
        </Section>
        <Section title="Undantag">
          <p>Ångerrätten gäller inte för varor som är förseglerade och av hygieniska skäl inte kan returneras efter att förseglingen brutits.</p>
        </Section>
        <Section title="Återbetalning">
          <p>När vi mottagit och godkänt din retur återbetalas hela köpesumman inom 14 dagar. Återbetalning sker via samma betalningsmetod som du använde vid köpet.</p>
        </Section>
        <Section title="Byte">
          <p>Önskar du byta mot annan variant, kontakta oss så hjälper vi dig.</p>
        </Section>
      </div>
    </motion.div>
  </main>
);

export default Retur;
