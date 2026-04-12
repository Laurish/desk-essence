import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border mt-24">
    <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8 text-sm text-muted-foreground">
      <div>
        <h4 className="font-serif text-lg text-foreground mb-2">Desk Essence</h4>
        <p className="max-w-xs">Ergonomiska tillbehör designade för ditt välmående vid skrivbordet.</p>
      </div>
      <div className="flex gap-12">
        <div className="space-y-2">
          <p className="font-medium text-foreground">Sidor</p>
          <Link to="/product/ergonomic-footrest" className="block hover:text-foreground transition-colors">Fotstöd</Link>
          <Link to="/about" className="block hover:text-foreground transition-colors">Om oss</Link>
        </div>
        <div className="space-y-2">
          <p className="font-medium text-foreground">Kontakt</p>
          <p>hej@deskessence.se</p>
        </div>
      </div>
    </div>
    <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Desk Essence. Alla rättigheter förbehållna.
    </div>
  </footer>
);

export default Footer;
