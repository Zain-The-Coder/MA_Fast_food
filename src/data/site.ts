// Single source of configuration for MA Fast Food
// Update phone, address, WhatsApp, coordinates, hours, and socials here.

export interface OpeningHour {
  days: string;
  open: string;  // "12:00"
  close: string; // "02:00" (next day)
  label: string; // "12:00 PM - 02:00 AM"
}

export const siteConfig = {
  name: "MA Fast Food",
  shortName: "MA Food",
  tagline: "Taste That Hits Different.",
  slogan: "Sizzling Smashed Burgers, Loaded Crispy Chicken, Artisan Pizza & Golden Fries",
  description: "Experience the ultimate fast food revolution at MA Fast Food. Premium double smash burgers, dripping sauces, fiery zinger crunch, hot cheese-pull pizzas and handcrafted shakes.",
  
  // Contact & Location
  contact: {
    phone: "+92 300 1234567",
    displayPhone: "(+92) 300 1234567",
    whatsappNumber: "923001234567", // numbers only for wa.me link
    email: "orders@mafastfood.com",
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
      directionsUrl: "https://maps.google.com/?q=MA+Fast+Food+Food+Street",
    },
  },

  // Operating Hours
  hours: {
    schedule: [
      { days: "Monday - Thursday", open: "12:00", close: "01:00", label: "12:00 PM – 01:00 AM" },
      { days: "Friday", open: "14:00", close: "02:30", label: "02:00 PM – 02:30 AM" },
      { days: "Saturday - Sunday", open: "12:00", close: "02:30", label: "12:00 PM – 02:30 AM" },
    ],
    // Helper to evaluate if the shop is currently open
    isOpenNow: (): boolean => {
      try {
        const now = new Date();
        const hour = now.getHours();
        // Open between 12 PM (12) and 2 AM (2)
        return hour >= 12 || hour < 2;
      } catch {
        return true;
      }
    },
  },

  // Social Links
  socials: {
    instagram: "https://instagram.com/mafastfood",
    facebook: "https://facebook.com/mafastfood",
    tiktok: "https://tiktok.com/@mafastfood",
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
    logo: "/assets/logo/logo.png",
    favicon: "/assets/logo/logo.png",
    realMenu1: "/assets/menu/menu.webp",
    realMenu2: "/assets/menu/chinese_menu.webp",
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
    return `${base}?text=${encodeURIComponent("Hi MA Fast Food! I would like to place an order from your menu.")}`;
  }
  return `${base}?text=${encodeURIComponent(message)}`;
}
