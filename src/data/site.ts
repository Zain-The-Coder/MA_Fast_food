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
    phone: "+92 300 1234567",
    displayPhone: "(+92) 300 1234567",
    whatsappNumber: "923001234567", // numbers only for wa.me link
    email: "orders@mashaallahfastfoods.com",
    address: {
      street: "Main Commercial Avenue, Food Street",
      city: "Lahore",
      region: "Punjab",
      country: "Pakistan",
      postalCode: "54000",
      full: "Shop #4, Main Commercial Avenue, Food Street, Lahore, Pakistan",
    },
    // Google Maps Embed & Direction URLs
    maps: {
      embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108843.8824874251!2d74.22152865768551!3d31.51468494957644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
      directionsUrl: "https://maps.google.com/?q=MashaAllah+Fast+Foods",
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
