export interface GalleryItem {
  id: string;
  title: string;
  category: "Kitchen & Shop" | "Crispy Broast & Zingers" | "Pastas & Rice" | "Sandwiches & Sides";
  src: string;
  aspectRatio: "square" | "tall" | "wide";
  caption: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Giant Crispy Zinger Burger",
    category: "Crispy Broast & Zingers",
    src: "/assets/hero/hero-1-zinger.jpg",
    aspectRatio: "wide",
    caption: "Audible crunch, marinated 24 hours, and fried golden crisp per order.",
  },
  {
    id: "gal-2",
    title: "The Main Counter & Kitchen Vibe",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_1.webp",
    aspectRatio: "tall",
    caption: "Where the sizzle begins. Open kitchen standard and hygiene guaranteed.",
  },
  {
    id: "gal-3",
    title: "Velvety Chicken Alfredo Pasta",
    category: "Pastas & Rice",
    src: "/assets/hero/hero-3-pasta.jpg",
    aspectRatio: "square",
    caption: "Creamy white garlic butter sauce with succulent grilled chicken strips.",
  },
  {
    id: "gal-4",
    title: "Double Beef Smash Burger",
    category: "Crispy Broast & Zingers",
    src: "/assets/hero/hero-2-beef.jpg",
    aspectRatio: "tall",
    caption: "Juicy griddled patties dripping molten cheddar and caramelized onions.",
  },
  {
    id: "gal-5",
    title: "Cozy Dining Ambience",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_2.webp",
    aspectRatio: "wide",
    caption: "Welcoming dining space designed for friends, families, and food lovers.",
  },
  {
    id: "gal-6",
    title: "MashaAllah Broast Family Feast",
    category: "Crispy Broast & Zingers",
    src: "/assets/hero/hero-5-combo.jpg",
    aspectRatio: "square",
    caption: "Pressure-fried crispy broast, golden fries, soft dinner buns and garlic dip.",
  },
  {
    id: "gal-7",
    title: "Storefront & Evening Glow",
    category: "Kitchen & Shop",
    src: "/assets/shop/image_3.webp",
    aspectRatio: "square",
    caption: "Open late night till 2:30 AM every weekend in Sharifabad, Karachi.",
  },
  {
    id: "gal-8",
    title: "Crispy Wrap & Hot Golden Fries",
    category: "Sandwiches & Sides",
    src: "/assets/hero/hero-6-fries-wrap.jpg",
    aspectRatio: "wide",
    caption: "Golden fried tenders in soft flatbread with piping hot crinkle fries.",
  },
  {
    id: "gal-9",
    title: "Triple-Decker Club Sandwich",
    category: "Sandwiches & Sides",
    src: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=700&auto=format&fit=crop&q=80",
    aspectRatio: "tall",
    caption: "Toasted bread with seasoned chicken, fried egg, cheese, and creamy mayo.",
  },
];
