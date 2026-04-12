import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-wide text-foreground">
          Desk Essence
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          <Link to="/product/ergonomic-footrest" className="text-muted-foreground hover:text-foreground transition-colors">
            Fotstöd
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            Om oss
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:bg-secondary rounded-md transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
              >
                {totalItems}
              </motion.span>
            )}
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
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
            <nav className="flex flex-col gap-4 p-6 text-sm font-medium">
              <Link to="/product/ergonomic-footrest" onClick={() => setMenuOpen(false)} className="text-foreground">
                Fotstöd
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)} className="text-foreground">
                Om oss
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
