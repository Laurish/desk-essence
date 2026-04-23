import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => (
  <main className="pt-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
    <div className="eyebrow mb-4">404</div>
    <h1 className="font-serif text-5xl md:text-6xl mb-4">Sidan finns inte.</h1>
    <p className="text-muted-foreground mb-10">Den här länken leder ingenstans.</p>
    <Link to="/">
      <Button variant="outline" className="rounded-sm tracking-[0.14em] uppercase text-xs px-6 py-6">
        Tillbaka till start
      </Button>
    </Link>
  </main>
);

export default NotFound;
