import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import MarqueeStrip from "@/components/sections/MarqueeStrip";
import SignatureDishes from "@/components/sections/SignatureDishes";
import DealsSection from "@/components/sections/DealsSection";
import StorySection from "@/components/sections/StorySection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A1A4A] text-white overflow-x-hidden">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Hero Section with Slider & Parallax Cutouts */}
      <Hero />

      {/* Infinite Glowing Marquee Ribbon */}
      <MarqueeStrip />

      {/* Signature Cravings Showcase */}
      <SignatureDishes />

      {/* The Story & Kitchen Atmosphere */}
      <StorySection />

      {/* Bento Photo Gallery & Lightbox */}
      <GallerySection />

      {/* Reviews & Social Proof */}
      <TestimonialsSection />

      {/* Live Hours, WhatsApp Ordering, Map & Contact */}
      <ContactSection />

      {/* Cinematic Outlined Footer */}
      <Footer />
    </main>
  );
}
