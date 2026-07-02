export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  badge?: string;
  features?: string[];
}

import footrestOverview from "@/assets/footrest-overview.webp";
import footrestWarranty from "@/assets/footrest-warranty.webp";
import footrestWashable from "@/assets/footrest-washable.webp";
import footrestFeatures from "@/assets/footrest-features.webp";
import footrestBenefits from "@/assets/footrest-benefits.webp";
import footrestRelaxed from "@/assets/footrest-relaxed.webp";
import footrestAdjustable from "@/assets/footrest-adjustable.webp";
import footrestOccasions from "@/assets/footrest-occasions.webp";
import footrestFleece from "@/assets/footrest-fleece.webp";

export const footrest: Product = {
  id: "ergonomic-footrest",
  name: "Ergonomic Footrest",
  description:
    "Vårt ergonomiska fotstöd med minnesskum hjälper dig att sitta bekvämare hela dagen. Justerbar höjd, tvättbart överdrag i sammet och en mysig fleece-ficka som håller fötterna varma. Halkfri botten och stark kardborre håller allt på plats.",
  price: 399,
  originalPrice: 499,
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

export const products: Product[] = [footrest];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  }).format(price);
};