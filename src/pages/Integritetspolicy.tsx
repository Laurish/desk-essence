import { motion } from "framer-motion";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="font-serif text-xl mb-4">{title}</h2>
    <div className="text-[15px] text-muted-foreground leading-[1.8] space-y-3">{children}</div>
  </div>
);

const Integritetspolicy = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">JURIDISKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Integritetspolicy</h1>
        <p className="text-muted-foreground text-[15px]">Senast uppdaterad: april 2026</p>
      </div>
      <div className="max-w-2xl">
        <Section title="Vilka uppgifter samlar vi in?">
          <p>Vid köp behandlar vi följande personuppgifter: namn, leveransadress och faktureringsadress, e-postadress, telefonnummer (om du anger det), köp- och orderhistorik samt betalningsinformation (hanteras av Stripe — vi lagrar inga kortuppgifter).</p>
        </Section>
        <Section title="Varför behandlar vi dina uppgifter?">
          <p><strong className="text-foreground">Fullgörande av avtal:</strong> För att ta emot och leverera din order, skicka orderbekräftelse och hantera returer och reklamationer.</p>
          <p><strong className="text-foreground">Rättslig förpliktelse:</strong> För bokföring och momsredovisning enligt bokföringslagen.</p>
          <p><strong className="text-foreground">Berättigat intresse:</strong> För kundservice och för att kunna hantera tvister.</p>
        </Section>
        <Section title="Google Analytics">
          <p>Vi använder Google Analytics för att analysera hur besökare använder vår webbplats. Tjänsten samlar in anonymiserad data via cookies. Du kan välja bort detta under Cookieinställningar.</p>
        </Section>
        <Section title="Hur länge sparar vi dina uppgifter?">
          <p>Orderuppgifter sparas i 7 år i enlighet med bokföringslagen. Övriga kunduppgifter sparas så länge det krävs för det ändamål de samlades in för, och raderas därefter.</p>
        </Section>
        <Section title="Dina rättigheter">
          <p>Du har rätt att begära tillgång till de uppgifter vi har om dig, begära rättelse av felaktiga uppgifter, begära radering, invända mot behandling samt inge klagomål till Integritetsskyddsmyndigheten (IMY), <a href="https://www.imy.se" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">imy.se</a>.</p>
          <p>Kontakta oss på <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a> för att utöva dina rättigheter.</p>
        </Section>
        <Section title="Delning med tredje part">
          <p>Vi delar dina uppgifter med Stripe (betalning), Klarna (betalning), Fraktjakt och samarbetande fraktbolag (leverans) samt Google (anonym webbanalys). Vi säljer aldrig dina personuppgifter till tredje part.</p>
        </Section>
        <Section title="Kontakt och personuppgiftsansvarig">
          <p>Desk Essence drivs av Sandra Andriainen (enskild näringsidkare, org.nr 910830-XXXX), som är ansvarig för behandlingen av dina personuppgifter.</p>
          <p>Hammargatan 15 d Lgh 1202, 811 30 Sandviken</p>
          <p>E-post: <a href="mailto:hej@deskessence.se" className="underline underline-offset-4 hover:text-foreground transition-colors">hej@deskessence.se</a></p>
        </Section>
      </div>
    </motion.div>
  </main>
);

export default Integritetspolicy;
