import { Link } from "react-router-dom";

const TopLink = ({ to, className, children }: { to: string; className?: string; children: React.ReactNode }) => (
  <Link to={to} className={className} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
    {children}
  </Link>
);

const Footer = () => (
  <footer className="bg-foreground text-background mt-24">
    <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 grid md:grid-cols-5 gap-10">
      <div className="md:col-span-2">
        <div className="font-serif text-xl tracking-[0.18em] uppercase mb-3 flex items-center gap-1">
          Desk
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-1 -translate-y-0.5" />
          Essence
        </div>
        <p className="text-sm text-background/60 max-w-xs leading-relaxed">
          Ergonomiska tillbehör designade för ditt välmående vid skrivbordet.
        </p>
      </div>
      <div>
        <h5 className="text-[11px] tracking-[0.14em] uppercase text-background/50 mb-3 font-sans">Handla</h5>
        <ul className="space-y-2 text-sm text-background/80">
          <li><TopLink to="/product/ergonomic-footrest" className="hover:text-accent transition-colors">Fotstöd</TopLink></li>
          <li><TopLink to="/cart" className="hover:text-accent transition-colors">Varukorg</TopLink></li>
        </ul>
      </div>
      <div>
        <h5 className="text-[11px] tracking-[0.14em] uppercase text-background/50 mb-3 font-sans">Hjälp</h5>
        <ul className="space-y-2 text-sm text-background/80">
          <li><TopLink to="/faq" className="hover:text-accent transition-colors">FAQ</TopLink></li>
          <li><TopLink to="/contact" className="hover:text-accent transition-colors">Kontakt</TopLink></li>
          <li><TopLink to="/about" className="hover:text-accent transition-colors">Om oss</TopLink></li>
        </ul>
      </div>
      <div>
        <h5 className="text-[11px] tracking-[0.14em] uppercase text-background/50 mb-3 font-sans">Juridiskt</h5>
        <ul className="space-y-2 text-sm text-background/80">
          <li><TopLink to="/villkor" className="hover:text-accent transition-colors">Allmänna villkor</TopLink></li>
          <li><TopLink to="/integritetspolicy" className="hover:text-accent transition-colors">Integritetspolicy</TopLink></li>
          <li><TopLink to="/retur" className="hover:text-accent transition-colors">Retur & Ångerrätt</TopLink></li>
          <li><TopLink to="/leverans" className="hover:text-accent transition-colors">Leveransvillkor</TopLink></li>
          <li><TopLink to="/cookies" className="hover:text-accent transition-colors">Cookies</TopLink></li>
        </ul>
      </div>
    </div>
    <div className="border-t border-background/10 py-5 text-center text-[11px] tracking-[0.1em] uppercase text-background/50">
      © {new Date().getFullYear()} Desk Essence
    </div>
  </footer>
);

export default Footer;