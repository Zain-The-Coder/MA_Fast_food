"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";

const heroSlides = [
  {
    image: "/assets/hero/hero-1-zinger.jpg",
    headline: "AUDIBLE CRUNCH. MAXIMUM FLAVOR.",
    subhead: "Giant crispy golden zinger chicken breast fillet with fresh lettuce, dripping creamy sauce, and a toasted sesame bun.",
    badge: "Signature Zinger",
    accent: "from-sky-300 via-blue-200 to-white",
  },
  {
    image: "/assets/hero/hero-2-beef.jpg",
    headline: "PURE JUICY BEEF PERFECTION.",
    subhead: "Thick double beef smash patties, melted cheddar dripping, caramelized onions, and butter-toasted brioche bun.",
    badge: "Juicy Beef Smash",
    accent: "from-blue-300 via-sky-100 to-white",
  },
  {
    image: "/assets/hero/hero-3-pasta.jpg",
    headline: "VELVETY CHICKEN ALFREDO PASTA.",
    subhead: "Silky garlic butter white sauce, ribbon fettuccine, tender grilled chicken slices, fresh herbs, and aged parmesan.",
    badge: "Creamy Alfredo",
    accent: "from-sky-200 via-blue-300 to-white",
  },
  {
    image: "/assets/hero/hero-4-spicy-pasta.jpg",
    headline: "FIERY RED-SAUCE CHICKEN PASTA.",
    subhead: "Loaded penne pasta tossed in spicy chili marinara with grilled chicken chunks, roasted garlic, and melted cheese.",
    badge: "Spicy Arrabbiata",
    accent: "from-red-400 via-orange-300 to-white",
  },
  {
    image: "/assets/hero/hero-5-combo.jpg",
    headline: "THE ULTIMATE SQUAD COMBO.",
    subhead: "Golden zinger burger, double beef stack, steaming hot salted fries, and ice-cold drinks packed for your table.",
    badge: "MashaAllah Feast",
    accent: "from-sky-300 via-blue-300 to-white",
  },
  {
    image: "/assets/hero/hero-6-fries-wrap.jpg",
    headline: "CRISPY WRAP & LOADED FRIES.",
    subhead: "Crunchy fried tenderloins wrapped in warm flatbread with garlic mayo and piping hot, crisp French fries.",
    badge: "Crispy Wrap & Fries",
    accent: "from-blue-300 via-sky-200 to-white",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openCart } = useCart();
  const touchStartX = useRef<number | null>(null);

  // Mouse Parallax Values for Floating Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const burgerX = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const burgerY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);
  const friesX = useTransform(smoothMouseX, [-500, 500], [35, -35]);
  const friesY = useTransform(smoothMouseY, [-500, 500], [35, -35]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto slide interval: exactly 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
  };

  const slide = heroSlides[currentSlide];
  const nextSlideIndex = (currentSlide + 1) % heroSlides.length;

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#0A1A4A] select-none"
    >
      {/* Background Slider with Crossfade & Very Slow Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.0, ease: "easeInOut" },
              scale: { duration: 7, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority={currentSlide === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-[70%_center] sm:object-center md:object-[center_right]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Preload images to eliminate flicker */}
        <div className="sr-only" aria-hidden="true">
          {heroSlides.map((s, idx) => (
            <Image
              key={`preload-${idx}`}
              src={s.image}
              alt="Preload hero slide"
              fill
              sizes="100vw"
              priority={idx <= 1}
              className="opacity-0 pointer-events-none"
            />
          ))}
        </div>

        {/* Cinematic gradient overlay only on the LEFT behind the headline */}
        {/* Food on right stays bright and clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1A4A] via-[#0A1A4A]/85 sm:via-[#0A1A4A]/70 to-transparent z-10 w-full md:w-[75%]" />
        {/* Soft bottom edge blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A1A4A] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Floating Parallax Zinger Cutout (Right Side Desktop) */}
      <motion.div
        style={{ x: burgerX, y: burgerY }}
        className="hidden 2xl:block absolute right-[6%] top-[22%] z-20 pointer-events-none drop-shadow-[0_20px_50px_rgba(30,79,191,0.4)]"
      >
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [-2, 2, -2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-64 rounded-3xl overflow-hidden border border-white/20 backdrop-blur-md bg-[#0D2260]/60 p-3 shadow-2xl"
        >
          <div className="relative w-full h-full">
            <Image
              src="/assets/generated/burger-cutout.webp"
              alt="Jumbo Zinger Burger"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-[#0A1A4A]/90 backdrop-blur-md rounded-xl p-2.5 border border-white/15 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-sky-300">Customer Favorite</p>
              <p className="text-xs font-black text-white">Jumbo Zinger</p>
            </div>
            <span className="text-xs font-black text-[#FFB300] bg-white/10 px-2 py-0.5 rounded-md">Rs. 750</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Parallax Fries Cutout (Left Bottom Desktop) */}
      <motion.div
        style={{ x: friesX, y: friesY }}
        className="hidden 2xl:block absolute left-[3%] bottom-[14%] z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(30,79,191,0.35)]"
      >
        <motion.div
          animate={{
            y: [8, -12, 8],
            rotate: [2, -2, 2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="relative w-52 h-52 rounded-3xl overflow-hidden border border-white/20 backdrop-blur-md bg-[#0D2260]/60 p-3 shadow-2xl"
        >
          <div className="relative w-full h-full">
            <Image
              src="/assets/generated/fries-cutout.webp"
              alt="Crispy Golden Fries"
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-3 left-3 right-3 bg-[#0A1A4A]/90 backdrop-blur-md rounded-lg p-2 border border-white/15 flex items-center justify-between">
            <span className="text-[11px] font-black text-white">Crispy Fries 🍟</span>
            <span className="text-[11px] font-black text-[#FFB300] bg-white/10 px-2 py-0.5 rounded-md">Rs. 150</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Animated Badge */}
        <motion.div
          key={`badge-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(30,79,191,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-white">
            {slide.badge}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <div className="flex items-center text-amber-300 text-xs gap-0.5">
            <Star className="w-3 h-3 fill-amber-300" />
            <span className="font-bold">4.9</span>
          </div>
        </motion.div>

        {/* Split Text Headline */}
        <div className="overflow-hidden">
          <motion.h1
            key={`headline-${currentSlide}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase max-w-3xl leading-[0.92]"
          >
            {slide.headline.split(" ").map((word, idx) => (
              <span key={idx} className="inline-block mr-3 md:mr-4">
                {idx === 1 || idx === 3 ? (
                  <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(30,79,191,0.5)]`}>
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          key={`subhead-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-sky-100 max-w-xl font-medium leading-relaxed drop-shadow"
        >
          {slide.subhead}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Glowing Primary CTA */}
          <button
            onClick={openCart}
            className="w-full sm:w-auto relative group px-8 py-4 rounded-full bg-gradient-to-r from-[#1E4FBF] to-[#1640A0] text-white font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(30,79,191,0.6)] hover:shadow-[0_0_55px_rgba(30,79,191,0.9)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden border border-white/20"
          >
            <span className="relative z-10">Order Online Now</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1640A0] to-[#1E4FBF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Secondary CTA */}
          <Link
            href="/menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[#0A1A4A] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-sky-300" />
            <span>Explore Full Menu</span>
          </Link>
        </motion.div>
      </div>

      {/* Slider Controls (Bottom Navigation) with 5s Progress Bar */}
      <div className="absolute bottom-8 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Slider Dots & Numbers */}
        <div className="flex items-center gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className="group relative py-2"
            >
              <div
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? "w-10 bg-white shadow-[0_0_10px_#ffffff]"
                    : "w-3 bg-white/30 group-hover:bg-white/60"
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-mono text-sky-200 ml-2 hidden sm:inline">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-sky-200">
            Scroll to taste
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/30 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-white rounded-full shadow-[0_0_6px_#ffffff]"
            />
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-[#0A1A4A]/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#1E4FBF] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-[#0A1A4A]/60 border border-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#1E4FBF] transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 5-second slide countdown thin progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-[#1E4FBF] via-sky-300 to-white shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        />
      </div>
    </section>
  );
}
