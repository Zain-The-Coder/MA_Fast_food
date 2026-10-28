"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Flame, Sparkles, Star } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";

const heroSlides = [
  {
    image: "/assets/generated/hero-burger.webp",
    headline: "TASTE THAT HITS DIFFERENT.",
    subhead: "Fresh 100% Angus smash patties seared at 500°F with molten cheddar drip.",
    badge: "Signature Smash",
    accent: "from-orange-500 via-amber-400 to-red-500",
  },
  {
    image: "/assets/generated/zinger-burger.webp",
    headline: "AUDIBLE CRUNCH. MAXIMUM HEAT.",
    subhead: "24-hour marinated crispy chicken glazed in fiery Nashville crunch & garlic aioli.",
    badge: "Firehouse Crunch",
    accent: "from-red-500 via-orange-500 to-amber-300",
  },
  {
    image: "/assets/generated/pizza-pull.webp",
    headline: "THE LEGENDARY CHEESE PULL.",
    subhead: "48-hour cold fermented sourdough crust, San Marzano sauce and cupped pepperoni.",
    badge: "Artisan Sourdough",
    accent: "from-amber-400 via-orange-500 to-red-600",
  },
  {
    image: "/assets/shop/image_1.webp",
    headline: "CRAFTED FRESH IN OUR KITCHEN.",
    subhead: "Experience the electric vibe and mouthwatering aromas right on Food Street.",
    badge: "Real Shop Vibe",
    accent: "from-orange-400 via-amber-300 to-yellow-500",
  },
  {
    image: "/assets/generated/combo-spread.webp",
    headline: "THE ULTIMATE SQUAD FEAST.",
    subhead: "Double smash, volcano loaded fries, iced fizzy drinks all packed into one box.",
    badge: "Special Combo",
    accent: "from-amber-500 via-orange-400 to-red-500",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { openCart } = useCart();

  // Mouse Parallax Values for Floating Elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const burgerX = useTransform(smoothMouseX, [-500, 500], [-35, 35]);
  const burgerY = useTransform(smoothMouseY, [-500, 500], [-35, 35]);
  const friesX = useTransform(smoothMouseX, [-500, 500], [40, -40]);
  const friesY = useTransform(smoothMouseY, [-500, 500], [40, -40]);

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

  // Auto slide interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const slide = heroSlides[currentSlide];

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#070605] select-none"
    >
      {/* Background Slider with Crossfade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
              scale: { duration: 8, ease: "linear" },
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.headline}
              fill
              priority
              quality={90}
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layered cinematic gradient overlays for high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/75 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/90 via-[#080706]/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#080706_90%)] z-10 opacity-70" />
      </div>

      {/* Floating Parallax Burger Element (Right Side Desktop) */}
      <motion.div
        style={{ x: burgerX, y: burgerY }}
        className="hidden xl:block absolute right-[6%] top-[24%] z-20 pointer-events-none drop-shadow-[0_20px_50px_rgba(255,75,18,0.35)]"
      >
        <motion.div
          animate={{
            y: [-12, 12, -12],
            rotate: [-2, 3, -2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-72 h-72 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-black/30 p-2 shadow-2xl"
        >
          <Image
            src="/assets/generated/hero-burger.webp"
            alt="Double Smash Burger"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md rounded-xl p-2.5 border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-wider text-orange-400">Trending Now</p>
              <p className="text-xs font-black text-white">Double Smash Beast</p>
            </div>
            <span className="text-xs font-black text-amber-300">Rs. 890</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Parallax Crispy Fries Element (Left Bottom Desktop) */}
      <motion.div
        style={{ x: friesX, y: friesY }}
        className="hidden xl:block absolute left-[4%] bottom-[16%] z-20 pointer-events-none drop-shadow-[0_20px_40px_rgba(251,191,36,0.3)]"
      >
        <motion.div
          animate={{
            y: [10, -15, 10],
            rotate: [3, -3, 3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="relative w-56 h-56 rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm bg-black/30 p-2 shadow-2xl"
        >
          <Image
            src="/assets/generated/fries.webp"
            alt="Loaded Fries"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute bottom-3 left-3 right-3 bg-black/75 backdrop-blur-md rounded-lg p-2 border border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-black text-white">Volcano Fries 🔥</span>
            <span className="text-[11px] font-black text-amber-400">Rs. 590</span>
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(255,75,18,0.2)]"
        >
          <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-300">
            {slide.badge}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <div className="flex items-center text-amber-400 text-xs gap-0.5">
            <Star className="w-3 h-3 fill-amber-400" />
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
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white uppercase max-w-4xl leading-[0.92]"
          >
            {slide.headline.split(" ").map((word, idx) => (
              <span key={idx} className="inline-block mr-3 md:mr-4">
                {idx === 1 || idx === 3 ? (
                  <span className={`bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,75,18,0.5)]`}>
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
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-xl font-medium leading-relaxed"
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
            data-cursor="ORDER"
            className="w-full sm:w-auto relative group px-8 py-4 rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(255,75,18,0.5)] hover:shadow-[0_0_55px_rgba(255,75,18,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden"
          >
            <span className="relative z-10">Order Online Now</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          {/* Secondary CTA */}
          <a
            href="#menu"
            data-cursor="VIEW"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/15 backdrop-blur-md text-white font-bold text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Explore Full Menu</span>
          </a>
        </motion.div>
      </div>

      {/* Slider Controls (Bottom Navigation) */}
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
                    ? "w-10 bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_10px_#ff4500]"
                    : "w-3 bg-white/20 group-hover:bg-white/40"
                }`}
              />
            </button>
          ))}
          <span className="text-xs font-mono text-zinc-400 ml-2 hidden sm:inline">
            0{currentSlide + 1} / 0{heroSlides.length}
          </span>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400">
            Scroll to taste
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-orange-500 rounded-full shadow-[0_0_6px_#ff4500]"
            />
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="w-10 h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-600/30 hover:border-orange-500/50 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="w-10 h-10 rounded-full bg-black/40 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-600/30 hover:border-orange-500/50 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
