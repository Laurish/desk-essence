export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  badge?: string;
  features?: string[];
}

import footrestOverview from "@/assets/footrest-overview.jpg";
import footrestWarranty from "@/assets/footrest-warranty.jpg";
import footrestWashable from "@/assets/footrest-washable.jpg";
import footrestFeatures from "@/assets/footrest-features.jpg";
import footrestBenefits from "@/assets/footrest-benefits.jpg";
import footrestRelaxed from "@/assets/footrest-relaxed.jpg";
import footrestAdjustable from "@/assets/footrest-adjustable.jpg";
import footrestOccasions from "@/assets/footrest-occasions.jpg";
import footrestFleece from "@/assets/footrest-fleece.jpg";

export const footrest: Product = {
  id: "ergonomic-footrest",
  name: "Ergonomic Footrest",
  description:
    "Vårt ergonomiska fotstöd med minnesskum hjälper dig att sitta bekvämare hela dagen. Justerbar höjd, tvättbart överdrag i sammet och en mysig fleece-ficka som håller fötterna varma. Halkfri botten och stark kardborre håller allt på plats.",
  price: 549,
  images: [
    footrestOverview,
    footrestFleece,
    footrestRelaxed,
    footrestAdjustable,
    footrestFeatures,
    footrestBenefits,
    footrestWashable,
    footrestOccasions,
    footrestWarranty,
  ],
  category: "Fotstöd",
  badge: "Populär",
  features: [
    "Justerbar höjd – 10 cm eller 15 cm",
    "Minnesskum som inte blir platt",
    "Tvättbart sametsöverdrag",
    "Mysig fleece-ficka för kalla fötter",
    "Halkfri botten",
    "Stark kardborre håller delarna på plats",
    "30 dagars garanti",
  ],
};

// Keep backward compat
export const products: Product[] = [footrest];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  }).format(price);
};
