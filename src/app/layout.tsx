import type { Metadata } from "next";
import { Bebas_Neue, Poppins } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { CartProvider } from "@/context/CartContext";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";
import CartDrawer from "@/components/cart/CartDrawer";
import FloatingActions from "@/components/cart/FloatingCartButton";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Sizzling Smashed Burgers, Loaded Fries & Artisan Pizza`,
  description: siteConfig.description,
  keywords: [
    "Fast Food",
    "Smash Burgers",
    "Zinger Burger",
    "Loaded Fries",
    "Pepperoni Pizza",
    "MA Fast Food",
    "Food Street Lahore",
    "Late Night Delivery",
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL("https://mafastfood.com"),
  openGraph: {
    title: `${siteConfig.name} - Taste That Hits Different`,
    description: siteConfig.description,
    url: "https://mafastfood.com",
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/generated/hero-burger.webp",
        width: 1200,
        height: 675,
        alt: "MA Fast Food Towering Double Smash Burger",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: siteConfig.brandAssets.logo,
    shortcut: siteConfig.brandAssets.logo,
    apple: siteConfig.brandAssets.logo,
  },
};

// JSON-LD LocalBusiness & Restaurant Schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: siteConfig.name,
  image: "https://mafastfood.com/assets/generated/hero-burger.webp",
  description: siteConfig.description,
  url: "https://mafastfood.com",
  telephone: siteConfig.contact.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.contact.address.street,
    addressLocality: siteConfig.contact.address.city,
    addressRegion: siteConfig.contact.address.region,
    postalCode: siteConfig.contact.address.postalCode,
    addressCountry: siteConfig.contact.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 31.514684,
    longitude: 74.221528,
  },
  servesCuisine: ["American", "Burgers", "Pizza", "Fast Food", "Loaded Fries"],
  priceRange: "Rs. 300 - Rs. 3500",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "12:00",
      closes: "01:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday", "Sunday"],
      opens: "12:00",
      closes: "02:30",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#070605] text-[#fcfcfc] antialiased selection:bg-orange-600 selection:text-white relative">
        <CartProvider>
          <SmoothScroll>
            {/* Film grain subtle texture overlay */}
            <div className="fixed inset-0 pointer-events-none z-[80] film-grain select-none" />

            {/* Custom magnetic interactive cursor */}
            <CustomCursor />

            {/* Cinematic Burger Stacking Preloader */}
            <Preloader />

            {/* Slide-over cart drawer */}
            <CartDrawer />

            {/* Floating Quick Action Buttons */}
            <FloatingActions />

            {/* Page content */}
            {children}
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
