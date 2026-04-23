import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Hur länge tar leveransen?",
    a: "Vi skickar alla beställningar inom 1–2 arbetsdagar från vårt lager i Stockholm. Leverans inom Sverige tar vanligtvis 2–4 arbetsdagar med PostNord.",
  },
  {
    q: "Kostar frakten något?",
    a: "Nej, vi erbjuder fri frakt på alla beställningar inom Sverige.",
  },
  {
    q: "Hur fungerar 30 dagars retur?",
    a: "Inte nöjd? Skicka tillbaka fotstödet inom 30 dagar så återbetalar vi hela beloppet. Produkten ska vara i ursprungligt skick — men vi är rimliga, det räcker att den ser ut som en normalt använd retur.",
  },
  {
    q: "Kan jag tvätta överdraget?",
    a: "Ja. Överdraget i sammet är avtagbart och kan tvättas i maskin på 30°C. Vi rekommenderar att hänga på tork — ingen torktumlare.",
  },
  {
    q: "Passar det under alla skrivbord?",
    a: "Fotstödet är 42 × 32 cm och finns i två höjdlägen (10 cm och 15 cm). Det passar under de flesta skrivbord. Mät gärna din skrivbordshöjd och stolshöjd innan du beställer om du är osäker.",
  },
  {
    q: "Vad är fleece-fickan till för?",
    a: "Det är en ficka på sidan av fotstödet där du kan trä in fötterna när det är kallt. Perfekt under kalla morgnar eller om du jobbar hemifrån med kyligt golv.",
  },
  {
    q: "Hur länge håller minnesskummet?",
    a: "Vårt minnesskum är testat för att behålla sin form i minst 3–5 år vid daglig användning. Vi ger 1 års garanti — om det plattas till inom den tiden byter vi ut det.",
  },
];

const Faq = () => (
  <main className="pt-24 max-w-2xl mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="eyebrow mb-4">VANLIGA FRÅGOR</div>
      <h1 className="font-serif text-4xl md:text-5xl mb-4">FAQ</h1>
      <p className="text-muted-foreground mb-12 text-[15px] leading-relaxed">
        Hittar du inte svaret? Skriv till oss på <a href="mailto:hej@deskessence.se" className="gold-text underline underline-offset-4">hej@deskessence.se</a> så återkommer vi inom 24 timmar.
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="font-serif text-lg text-left hover:no-underline py-5">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-[15px] leading-[1.7] pb-5">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  </main>
);

export default Faq;
