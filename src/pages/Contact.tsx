import { motion } from "framer-motion";
import { Mail, MapPin, Clock } from "lucide-react";

const Contact = () => (
  <main className="pt-24 max-w-[1280px] mx-auto px-6 md:px-10 pb-24 min-h-screen">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mb-16">
        <div className="eyebrow mb-4">KONTAKT</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-6">Hör av dig.</h1>
        <p className="text-muted-foreground text-[15px] leading-[1.7]">
          Frågor om produkten, din beställning, eller något helt annat? Vi svarar inom 24 timmar, oftast snabbare.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 border-y border-border py-10">
        <div className="flex gap-4">
          <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
          <div>
            <div className="eyebrow mb-2">E-POST</div>
            <a href="mailto:hej@deskessence.se" className="text-[15px] hover:gold-text transition-colors">
              hej@deskessence.se
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
          <div>
            <div className="eyebrow mb-2">KONTOR</div>
            <p className="text-[15px]">Stockholm, Sverige</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Clock className="w-5 h-5 mt-1 flex-shrink-0 text-accent" />
          <div>
            <div className="eyebrow mb-2">SVARSTID</div>
            <p className="text-[15px]">Mån–Fre · 24 h</p>
          </div>
        </div>
      </div>

      <p className="scribble mt-10 text-[16px]">
        Vi är ett litet team — du får svar av en människa, inte en bot.
      </p>
    </motion.div>
  </main>
);

export default Contact;
