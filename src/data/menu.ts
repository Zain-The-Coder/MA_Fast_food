// Menu items and categories data for MA Fast Food

export type MenuCategory = "all" | "burgers" | "pizza" | "fries" | "wraps" | "drinks" | "deals";

export interface MenuItem {
  id: string;
  name: string;
  category: "burgers" | "pizza" | "fries" | "wraps" | "drinks" | "deals";
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: "Bestseller" | "Spicy" | "Chef's Special" | "New" | "50% OFF" | "Must Try";
  rating: number;
  reviewsCount: number;
  prepTime: string;
  calories?: string;
  isSignature?: boolean;
  ingredients?: string[];
}

export const menuCategories: { id: MenuCategory; label: string; icon: string }[] = [
  { id: "all", label: "Full Menu", icon: "🔥" },
  { id: "burgers", label: "Smash & Burgers", icon: "🍔" },
  { id: "pizza", label: "Artisan Pizza", icon: "🍕" },
  { id: "fries", label: "Loaded Fries", icon: "🍟" },
  { id: "wraps", label: "Wraps & Shawarma", icon: "🌯" },
  { id: "drinks", label: "Cold Drinks", icon: "🥤" },
  { id: "deals", label: "Deals & Combos", icon: "⚡" },
];

export const menuItems: MenuItem[] = [
  // SIGNATURE / BESTSELLER BURGERS
  {
    id: "double-smash-beast",
    name: "The Double Smash Beast",
    category: "burgers",
    tagline: "Double Patty • Liquid Cheddar • Brioche",
    description: "Two 100% pure beef smash patties seared crisp on a 500° flat top, dripping melted sharp cheddar, caramelized onions, MA secret smokey sauce, and toasted buttery brioche.",
    price: 890,
    originalPrice: 1050,
    image: "/assets/generated/hero-burger.webp",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 342,
    prepTime: "12-15 min",
    calories: "780 kcal",
    isSignature: true,
    ingredients: ["Dual Smash Beef", "Sharp Cheddar", "Caramelized Onions", "Secret Sauce", "Pickles"],
  },
  {
    id: "firehouse-zinger",
    name: "Firehouse Crunchy Zinger",
    category: "burgers",
    tagline: "Extra Crispy • Nashville Hot Glaze",
    description: "Thick chicken breast fillet marinated 24 hours, coated in 12 secret crunch spices, dipped in Nashville chili oil, topped with jalapeño slaw and garlic herb aioli.",
    price: 690,
    originalPrice: 790,
    image: "/assets/generated/zinger-burger.webp",
    badge: "Spicy",
    rating: 4.8,
    reviewsCount: 289,
    prepTime: "10-12 min",
    calories: "690 kcal",
    isSignature: true,
    ingredients: ["Crispy Chicken Thigh", "Nashville Heat", "Jalapeño Slaw", "Garlic Aioli"],
  },
  {
    id: "truffle-mushroom-melt",
    name: "Truffle Melt Burger",
    category: "burgers",
    tagline: "Sautéed Mushrooms • Swiss Cheese",
    description: "Juicy beef patty blanketed in melted Swiss emmental, butter-seared portobello mushrooms, and white truffle garlic emulsion.",
    price: 980,
    image: "/assets/generated/hero-burger.webp",
    badge: "Chef's Special",
    rating: 4.9,
    reviewsCount: 154,
    prepTime: "15 min",
    calories: "720 kcal",
    isSignature: true,
  },

  // PIZZA
  {
    id: "pepperoni-cheese-pull",
    name: "Overloaded Pepperoni Feast",
    category: "pizza",
    tagline: "Cupping Pepperoni • 4x Mozzarella",
    description: "48-hour slow fermented sourdough crust, San Marzano tomato sauce, double pepperoni crisped to cupped perfection, basil oil and insane cheese pull.",
    price: 1450,
    originalPrice: 1690,
    image: "/assets/generated/pizza-pull.webp",
    badge: "Must Try",
    rating: 4.9,
    reviewsCount: 412,
    prepTime: "18-20 min",
    calories: "1120 kcal",
    isSignature: true,
    ingredients: ["48h Sourdough", "San Marzano Sauce", "Crispy Beef Pepperoni", "Fior di Latte Mozzarella"],
  },
  {
    id: "smokey-bbq-chicken-pizza",
    name: "Smokey BBQ Supreme Pizza",
    category: "pizza",
    tagline: "Tender BBQ Chicken • Bell Peppers • Red Onion",
    description: "Hickory wood smoked chicken chunks, sweet and tangy Texas BBQ drizzle, diced capsicum, purple onions, and golden mozzarella.",
    price: 1390,
    image: "/assets/generated/pizza-pull.webp",
    badge: "Bestseller",
    rating: 4.7,
    reviewsCount: 198,
    prepTime: "18 min",
    calories: "1050 kcal",
  },

  // FRIES & SIDES
  {
    id: "loaded-volcano-fries",
    name: "Volcano Loaded Fries",
    category: "fries",
    tagline: "Crispy Fries • Melted Queso • Smashed Meat",
    description: "Heaped basket of extra crispy crinkle & skin-on fries drowned in warm cheddar cheese sauce, smashed beef bits, fried shallots, jalapeños, and MA flame drizzle.",
    price: 590,
    originalPrice: 700,
    image: "/assets/generated/fries.webp",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 380,
    prepTime: "8 min",
    calories: "640 kcal",
    isSignature: true,
  },
  {
    id: "classic-salted-golden-fries",
    name: "Golden Cone Fries",
    category: "fries",
    tagline: "Double Fried • Sea Salt & Herbs",
    description: "Hand-cut Idaho style potatoes, double flash-fried for an audible crunch exterior and fluffy interior, dusted with pink Himalayan salt and rosemary.",
    price: 320,
    image: "/assets/generated/fries.webp",
    rating: 4.6,
    reviewsCount: 175,
    prepTime: "5 min",
    calories: "380 kcal",
  },

  // WRAPS & SHAWARMA
  {
    id: "gourmet-flame-wrap",
    name: "Gourmet Charcoal Shawarma",
    category: "wraps",
    tagline: "Charcoal Grilled Chicken • Toum Garlic Sauce",
    description: "Toasted Mediterranean flatbread stuffed with shaved spit-roasted spiced chicken, Lebanese garlic toum, pickles, fries inside, and sumac onions.",
    price: 520,
    originalPrice: 590,
    image: "/assets/generated/shawarma-wrap.webp",
    badge: "Must Try",
    rating: 4.8,
    reviewsCount: 220,
    prepTime: "8-10 min",
    calories: "510 kcal",
    isSignature: true,
  },
  {
    id: "crispy-zinger-twister",
    name: "Cheesy Zinger Twister",
    category: "wraps",
    tagline: "Fried Crispy Tenders • Honey Mustard Mayo",
    description: "Crispy fried tenderloins wrapped in a warm butter tortilla with shredded romaine, diced tomatoes, cheddar sauce, and sweet pepper ranch.",
    price: 550,
    image: "/assets/generated/shawarma-wrap.webp",
    rating: 4.7,
    reviewsCount: 165,
    prepTime: "8 min",
    calories: "580 kcal",
  },

  // DRINKS
  {
    id: "sub-zero-neon-fizz",
    name: "Sub-Zero Citrus Neon Fizz",
    category: "drinks",
    tagline: "Icy Cold • Lime • Fizzy Mint Punch",
    description: "Ultra-cold fizzy refresher served with crushed ice pebbles, fresh mint leaves, lime zest, and electric berry syrup.",
    price: 280,
    image: "/assets/generated/cold-drink.webp",
    rating: 4.7,
    reviewsCount: 110,
    prepTime: "3 min",
    calories: "140 kcal",
    isSignature: true,
  },
  {
    id: "monster-choc-shake",
    name: "Nutella Monster Shake",
    category: "drinks",
    tagline: "Rich Nutella • Whipped Cream • Waffle Crisp",
    description: "Creamy artisanal vanilla bean gelato spun with rich Italian hazelnut cocoa spread, crowned with whipped mountain and brownie crumbs.",
    price: 490,
    image: "/assets/generated/cold-drink.webp",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 240,
    prepTime: "5 min",
    calories: "490 kcal",
  },

  // COMBOS & DEALS
  {
    id: "the-ma-triple-threat-deal",
    name: "The MA Ultimate Trio Box",
    category: "deals",
    tagline: "Double Smash + Loaded Fries + Cold Drink",
    description: "Our #1 best-selling combo: 1x Double Smash Beast Burger, 1x Loaded Volcano Fries, and 1x Sub-Zero Fizz. Save 25% compared to individual items!",
    price: 1390,
    originalPrice: 1760,
    image: "/assets/generated/combo-spread.webp",
    badge: "50% OFF",
    rating: 5.0,
    reviewsCount: 520,
    prepTime: "12-15 min",
    calories: "1480 kcal",
    isSignature: true,
  },
  {
    id: "party-feast-deal",
    name: "Squad Night Pizza & Smash Combo",
    category: "deals",
    tagline: "1 Large Pepperoni Pizza + 2 Zinger Burgers + Large Fries + 1.5L Drink",
    description: "Engineered for 3 to 4 hungry friends: 1x 14\" Artisan Pepperoni Pizza, 2x Firehouse Zinger Burgers, jumbo seasoned fries, and a chilled drink bottle.",
    price: 2990,
    originalPrice: 3650,
    image: "/assets/generated/combo-spread.webp",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 310,
    prepTime: "20 min",
    calories: "3200 kcal",
  },
];
