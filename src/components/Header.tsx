import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: "/product/ergonomic-footrest", label: "Produkten" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/60">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-lg tracking-[0.18em] uppercase text-foreground flex items-center gap-1">
          Desk
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-1 -translate-y-0.5" />
          Essence
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[12px] tracking-[0.08em] uppercase">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 border border-border px-3 py-2 text-[11px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Varukorg</span>
            <span>({totalItems})</span>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav className="flex flex-col p-6 text-sm tracking-[0.06em] uppercase">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 border-b border-border/60 last:border-b-0 text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
