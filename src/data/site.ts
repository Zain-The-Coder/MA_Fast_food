// Single source of configuration for MashaAllah Fast Foods
// Tagline: "Oh it's so tasty"

export interface OpeningHour {
  days: string;
  open: string;  // "12:00"
  close: string; // "02:00" (next day)
  label: string; // "12:00 PM - 02:00 AM"
}

export const siteConfig = {
  name: "MashaAllah Fast Foods",
  shortName: "MashaAllah",
  tagline: "Oh it's so tasty",
  slogan: "Crispy Golden Broast, Giant Zingers, Creamy Pastas & Loaded Club Sandwiches",
  description: "Welcome to MashaAllah Fast Foods (Oh it's so tasty). Savor our signature crispy broast, juicy zinger and beef burgers, rich creamy pastas, wok-tossed chowmein, and triple-decker club sandwiches.",

  // Brand Palette
  theme: {
    primary: "#1E4FBF",     // Royal / Cobalt blue from logo
    primaryHover: "#1640A0",
    navy: "#0A1A4A",        // Deep navy for dark sections
    navyCard: "#0D2260",    // Navy card background
    white: "#FFFFFF",       // Clean white for sections and cards
    offWhite: "#F7FAFF",    // Soft off-white
    accentRed: "#D9381E",   // "FAST FOODS" banner accent
    accentGlow: "rgba(217, 56, 30, 0.4)",
  },

  // Contact & Location
  contact: {
    phone: "+92 318 2622266",
    displayPhone: "0318 2622266",
    whatsappNumber: "923182622266", // numbers only for wa.me link
    email: "orders@mashaallahfastfoods.com",
    address: {
      street: "Sharifabad Block 1, Gulberg Town",
      city: "Karachi",
      region: "Sindh",
      country: "Pakistan",
      postalCode: "75950",
      full: "Sharifabad Block 1, Gulberg Town, Karachi, Pakistan",
    },
    // Google Maps Embed & Direction URLs
    maps: {
      embedUrl: "https://maps.google.com/maps?q=Sharifabad+Block+1+Gulberg+Town+Karachi&t=&z=16&ie=UTF8&iwloc=&output=embed",
      directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Sharifabad+Block+1,+Gulberg+Town,+Karachi",
    },
  },

  // Operating Hours
  hours: {
    schedule: [
      { days: "Monday - Thursday", open: "12:00", close: "01:00", label: "12:00 PM – 01:00 AM" },
      { days: "Friday", open: "14:00", close: "02:30", label: "02:00 PM – 02:30 AM" },
      { days: "Saturday - Sunday", open: "12:00", close: "02:30", label: "12:00 PM – 02:30 AM" },
    ],
    isOpenNow: (): boolean => {
      try {
        const now = new Date();
        const hour = now.getHours();
        return hour >= 12 || hour < 2;
      } catch {
        return true;
      }
    },
  },

  // Social Links
  socials: {
    instagram: "https://instagram.com/mashaallahfastfoods",
    facebook: "https://facebook.com/mashaallahfastfoods",
    tiktok: "https://tiktok.com/@mashaallahfastfoods",
  },

  // Delivery & Ordering Settings
  delivery: {
    currency: "PKR",
    currencySymbol: "Rs.",
    deliveryFee: 150,
    freeDeliveryThreshold: 2000,
    estimatedMinutes: "25 - 40 min",
    minOrder: 500,
  },

  // Assets mapping
  brandAssets: {
    logo: "/logo.png",
    logoWhiteBg: "/assets/logo/logo-white-bg.png",
    logoOriginal: "/assets/logo/logo-original.png",
    favicon: "/favicon.ico",
    realMenu1: "/assets/menu/menu.webp",
    realMenu2: "/assets/menu/chinese_menu.webp",
    heroImages: [
      "/assets/hero/hero-1-zinger.jpg",
      "/assets/hero/hero-2-beef.jpg",
      "/assets/hero/hero-3-pasta.jpg",
      "/assets/hero/hero-4-spicy-pasta.jpg",
      "/assets/hero/hero-5-combo.jpg",
      "/assets/hero/hero-6-fries-wrap.jpg",
    ],
    shopPhotos: [
      "/assets/shop/image_1.webp",
      "/assets/shop/image_2.webp",
      "/assets/shop/image_3.webp",
    ],
  },
};

// Generate direct WhatsApp link with prefilled cart or query message
export function getWhatsAppOrderUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  if (!message) {
    return `${base}?text=${encodeURIComponent("Hi MashaAllah Fast Foods! I would like to place an order from your menu.")}`;
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}
