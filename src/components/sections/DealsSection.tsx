"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Check, ArrowRight, Sparkles } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function DealsSection() {
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [claimed, setClaimed] = useState(false);

  // Find the ultimate broast feast item
  const dealItem = menuItems.find((item) => item.id === "broast-family-feast") || menuItems.find((item) => item.id === "broast-full") || menuItems[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    addItem(dealItem, 1);
    setClaimed(true);
    setTimeout(() => setClaimed(false), 2000);
  };

  return (
    <section id="deals" className="relative py-24 md:py-32 bg-[#071333] overflow-hidden select-none">
      {/* Background radial blue glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[#1E4FBF]/20 via-sky-500/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Gradient Border Wrapper */}
        <div className="relative p-[2px] rounded-[32px] overflow-hidden shadow-[0_20px_70px_rgba(30,79,191,0.3)]">
          {/* Rotating gradient background border in royal blue & sky */}
          <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,#1E4FBF,#38BDF8,#1640A0,#1E4FBF)]" />

          {/* Inner Card Container */}
          <div className="relative rounded-[30px] bg-gradient-to-br from-[#0D2260] via-[#0A1A4A] to-[#071333] p-6 sm:p-10 lg:p-14 overflow-hidden border border-white/10">
            {/* Header / Urgency Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9381E] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D9381E]" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-sky-200">
                  Featured Family Deal
                </span>
              </div>

              {/* Countdown Urgency Counter */}
              <div className="flex items-center gap-2 bg-[#0A1A4A]/80 border border-white/15 rounded-full px-4 py-1.5 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
                <span className="text-xs font-mono font-bold text-sky-200">Order Today:</span>
                <span className="text-xs font-mono font-black text-white">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content Grid: Left Text Details, Right Big Combo Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E4FBF]/30 border border-[#1E4FBF]/50 text-sky-200 text-xs font-black uppercase tracking-wider mb-4 w-max">
                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  <span>The Ultimate Crowd Favorite</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-none">
                  MASHAALLAH <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-white bg-clip-text text-transparent">CRISPY BROAST</span> FEAST
                </h2>

                <p className="mt-4 text-sm sm:text-base text-sky-100 font-medium leading-relaxed">
                  The legendary crunch that put us on the map. Four massive pieces of fresh chicken marinated in 18 secret herbs and spices, pressure-fried to crackling golden perfection with succulent juicy meat inside.
                </p>

                {/* What's Included */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {[
                    "4x Large Crispy Chicken Broast Pieces",
                    "1x Steaming Basket of Golden Salted Fries",
                    "2x Freshly Baked Soft Dinner Buns",
                    "2x House Signature Garlic Mayo Dip Cups",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-sky-100">
                      <div className="w-4 h-4 rounded-full bg-[#1E4FBF]/40 border border-sky-400/50 flex items-center justify-center text-sky-300 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl font-black font-display text-white">
                      Rs. {dealItem.price}
                    </span>
                    {dealItem.originalPrice && (
                      <span className="text-lg sm:text-xl font-bold text-sky-300/60 line-through">
                        Rs. {dealItem.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleClaim}
                    className={`px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-xl ${
                      claimed
                        ? "bg-emerald-600 text-white shadow-[0_0_25px_#10b981]"
                        : "bg-[#1E4FBF] hover:bg-[#1640A0] text-white shadow-[0_0_35px_rgba(30,79,191,0.6)] transform hover:-translate-y-0.5 border border-white/20"
                    }`}
                  >
                    <span>{claimed ? "Deal Added to Cart!" : "Claim Deal Now"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column (5 cols): Big Combo Image */}
              <div className="lg:col-span-5 relative">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden border border-white/20 bg-black/40 shadow-2xl"
                >
                  <Image
                    src="/assets/hero/hero-5-combo.jpg"
                    alt="MashaAllah Feast Spread"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
