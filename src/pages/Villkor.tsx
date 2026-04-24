import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl mb-4">{title}</h2>
    <div className="text-[15px] text-muted-foreground leading-[1.8] space-y-3">{children}</div>
  </div>
);

const Villkor = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">JURIDISKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Allmänna villkor</h1>
        <p className="text-muted-foreground text-[15px]">Senast uppdaterad: januari 2025</p>
      </div>
      <div className="max-w-2xl">
        <Section title="Företagsinformation">
          <p>Desk Essence drivs av Sandra Andriainen, enskild näringsidkare.</p>
          <p>Organisationsnummer: 910830-XXXX</p>
          <p>Adress: Hammargatan 15 d Lgh 1202, 811 30 Sandviken</p>
          <p>E-post: <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a></p>
        </Section>
        <Section title="Tillämpning">
          <p>Dessa allmänna villkor gäller för alla köp som görs via desk-essence.se. Genom att genomföra ett köp godkänner du dessa villkor.</p>
        </Section>
        <Section title="Priser och betalning">
          <p>Alla priser anges i svenska kronor (SEK) inklusive moms (25%). Betalning sker via Stripe och accepterade betalningsmetoder är kort (Visa, Mastercard) samt Klarna.</p>
        </Section>
        <Section title="Orderbekräftelse">
          <p>Efter genomfört köp skickas en orderbekräftelse till den e-postadress du angett. Avtalet anses ingånget när du mottagit orderbekräftelsen.</p>
        </Section>
        <Section title="Leverans">
          <p>Varor levereras till den adress du anger vid köptillfället. Vi levererar med Fraktjakt och samarbetande fraktbolag. Leveranstid är normalt 2–5 arbetsdagar inom Sverige. Vi ansvarar för varan tills den är levererad till dig.</p>
        </Section>
        <Section title="Reklamation">
          <p>Om du mottagit en felaktig eller skadad vara ska du kontakta oss snarast möjligt på <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a>. Vi bekostar returfrakt vid reklamationer.</p>
        </Section>
        <Section title="Tvist">
          <p>Vid tvist som inte löses i samförstånd kan du vända dig till Allmänna reklamationsnämnden (ARN), Box 174, 101 23 Stockholm, <a href="https://www.arn.se" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">www.arn.se</a>. Vi åtar oss att delta i ARN:s prövning.</p>
        </Section>
      </div>
    </motion.div>
  </main>
);

export default Villkor;
