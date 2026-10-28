import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import MenuSection from "@/components/sections/MenuSection";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/site";
import Link from "next/link";
import { ChevronRight, Utensils } from "lucide-react";

export const metadata: Metadata = {
  title: `Full Food Menu | ${siteConfig.name}`,
  description: `Explore the complete menu of ${siteConfig.name} - Crispy Broast, Jumbo Zingers, Double Beef Smash Burgers, Creamy Pastas, Chinese Gravies, and Sandwiches.`,
};

export default function MenuPage() {
  return (
    <main className="relative min-h-screen bg-[#0A1A4A] text-white overflow-x-hidden pt-28">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Page Header / Breadcrumb Banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-200/70 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-sky-300/50" />
          <span className="text-white">Menu</span>
        </nav>

        {/* Hero Banner for Menu Page */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0D2260] via-[#122b7a] to-[#0D2260] border border-white/10 p-8 sm:p-12 shadow-[0_20px_50px_rgba(10,26,74,0.5)]">
          {/* Subtle glow orb */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E4FBF]/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-black uppercase tracking-widest mb-4">
              <Utensils className="w-3.5 h-3.5" />
              <span>Authentic Pakistani & Chinese Fast Food</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display uppercase tracking-tight text-white leading-none">
              OUR COMPLETE <span className="bg-gradient-to-r from-sky-300 via-blue-200 to-white bg-clip-text text-transparent">MENU</span>
            </h1>
            <p className="mt-4 text-sky-100/90 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Every item is freshly cooked to order using premium chicken fillets, authentic secret spices, and fresh vegetables. Select a category below or search your favorite cravings.
            </p>
          </div>
        </div>
      </div>

      {/* Full Interactive Menu Section */}
      <div className="-mt-6">
        <MenuSection />
      </div>

      {/* Outlined Footer */}
      <Footer />
    </main>
  );
}
