import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  return (
    <main className="pt-24 container mx-auto px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
      <h1 className="font-serif text-3xl mb-4">Tack för din beställning!</h1>
      <p className="text-muted-foreground mb-8">
        Din betalning är genomförd. Du får en bekräftelse via e-post inom kort.
      </p>
      <Link to="/">
        <Button>Tillbaka till startsidan</Button>
      </Link>
    </main>
  );
};

export default OrderSuccess;
