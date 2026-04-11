export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
}

import organizerImg from "@/assets/product-organizer.jpg";
import deskmatImg from "@/assets/product-deskmat.jpg";
import penholderImg from "@/assets/product-penholder.jpg";
import lampImg from "@/assets/product-lamp.jpg";
import trayImg from "@/assets/product-tray.jpg";

export const products: Product[] = [
  {
    id: "walnut-organizer",
    name: "Walnut & Brass Organizer",
    description: "Hand-finished walnut desk organizer with solid brass base. Holds pens, cards, and small essentials with timeless elegance.",
    price: 1290,
    image: organizerImg,
    category: "Organizers",
    badge: "Bestseller",
  },
  {
    id: "cognac-desk-mat",
    name: "Cognac Leather Desk Mat",
    description: "Full-grain vegetable-tanned leather desk mat. Ages beautifully with a rich patina unique to you.",
    price: 1690,
    image: deskmatImg,
    category: "Desk Mats",
  },
  {
    id: "ceramic-pen-holder",
    name: "Ceramic Pen Holder",
    description: "Matte white ceramic pen holder, hand-thrown and kiln-fired. A quiet statement of refined taste.",
    price: 590,
    image: penholderImg,
    category: "Pen Holders",
  },
  {
    id: "concrete-brass-lamp",
    name: "Concrete & Brass Lamp",
    description: "Industrial-meets-luxury desk lamp with hand-cast concrete base and adjustable solid brass shade.",
    price: 2490,
    image: lampImg,
    category: "Lighting",
    badge: "New",
  },
  {
    id: "walnut-accessory-tray",
    name: "Walnut Accessory Tray",
    description: "Handcrafted walnut tray with felt-lined interior. Perfect for watches, keys, and daily carry items.",
    price: 890,
    image: trayImg,
    category: "Trays",
  },
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    minimumFractionDigits: 0,
  }).format(price);
};
