export interface GalleryItem {
  id: string;
  title: string;
  category: "Kitchen & Shop" | "Burgers & Sizzles" | "Artisan Pizza" | "Crispy Specials";
  src: string;
  aspectRatio: "square" | "tall" | "wide";
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Double Smash on the Griddle",
    category: "Burgers & Sizzles",
    src: "/assets/generated/hero-burger.webp",
    aspectRatio: "wide",
    caption: "Caramelized crust seared at 500°F with molten cheddar.",
  },
  {
    id: "gal-2",
    title: "The Main Counter & Kitchen Vibe",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_1.webp",
    aspectRatio: "tall",
    caption: "Where the sizzle begins. Open kitchen standard.",
  },
  {
    id: "gal-3",
    title: "Crispy Golden Hand-Cut Fries",
    category: "Crispy Specials",
    src: "/assets/generated/fries.webp",
    aspectRatio: "square",
    caption: "Double fried for maximum crunch, dusted with herb salt.",
  },
  {
    id: "gal-4",
    title: "Firehouse Crunchy Zinger",
    category: "Burgers & Sizzles",
    src: "/assets/generated/zinger-burger.webp",
    aspectRatio: "tall",
    caption: "Marinated 24h, battered fresh per order.",
  },
  {
    id: "gal-5",
    title: "Cozy Dining Ambience",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_2.webp",
    aspectRatio: "wide",
    caption: "Modern urban dining space designed for friends and families.",
  },
  {
    id: "gal-6",
    title: "Molten Mozzarella Pull",
    category: "Artisan Pizza",
    src: "/assets/generated/pizza-pull.webp",
    aspectRatio: "square",
    caption: "Sourdough fermented crust with Italian cupping pepperoni.",
  },
  {
    id: "gal-7",
    title: "Storefront & Evening Glow",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_3.webp",
    aspectRatio: "square",
    caption: "Open late night till 2:30 AM every weekend.",
  },
  {
    id: "gal-8",
    title: "Ultimate Trio Box Flat Lay",
    category: "Crispy Specials",
    src: "/assets/generated/combo-spread.webp",
    aspectRatio: "wide",
    caption: "Our crowd favorite combo spread ready for the table.",
  },
  {
    id: "gal-9",
    title: "Toasted Mediterranean Wrap",
    category: "Crispy Specials",
    src: "/assets/generated/shawarma-wrap.webp",
    aspectRatio: "tall",
    caption: "Charcoal aroma with luscious homemade toum sauce.",
  },
];
