import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const OrderSuccess = () => (
  <main className="pt-24 min-h-[70vh] flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-6 md:px-10 pb-24">
    <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-6">
      <Check className="w-7 h-7 text-accent" />
    </div>
    <div className="eyebrow mb-4">TACK!</div>
    <h1 className="font-serif text-4xl md:text-5xl mb-4">Din beställning är bekräftad.</h1>
    <p className="text-muted-foreground mb-10 text-[15px] leading-relaxed max-w-md">
      Vi skickar ett kvitto och spårningslänk till din e-post så snart vi packat ditt paket.
    </p>
    <Link to="/">
      <Button variant="outline" className="rounded-sm tracking-[0.14em] uppercase text-xs gap-2 px-6 py-6">
        Tillbaka till start
      </Button>
    </Link>
  </main>
);

export default OrderSuccess;
