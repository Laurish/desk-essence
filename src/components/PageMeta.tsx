import { useEffect } from "react";

const DEFAULT_DESCRIPTION =
  "Desk Essence — Ergonomiskt fotstöd med minnesskum, justerbar höjd och tvättbart sametsöverdrag. Gjort för långa dagar vid skrivbordet.";

interface PageMetaProps {
  title: string;
  description?: string;
}

// Sätter unik titel + beskrivning per sida (SPA:n har annars samma för alla sidor).
const PageMeta = ({ title, description = DEFAULT_DESCRIPTION }: PageMetaProps) => {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
};

export default PageMeta;
