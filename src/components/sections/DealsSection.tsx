"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Flame, Clock, Sparkles, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { menuItems } from "@/data/menu";
import { useCart } from "@/context/CartContext";

export default function DealsSection() {
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  const [claimed, setClaimed] = useState(false);

  // Find the ultimate deal item
  const dealItem = menuItems.find((item) => item.id === "the-ma-triple-threat-deal") || menuItems[menuItems.length - 1];

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
    <section id="deals" className="relative py-24 md:py-32 bg-[#0a0807] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-red-600/15 via-orange-500/15 to-transparent blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Gradient Border Wrapper */}
        <div className="relative p-[2px] rounded-[32px] overflow-hidden shadow-[0_20px_70px_rgba(255,75,18,0.25)]">
          {/* Rotating gradient background border */}
          <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#ff4500,#f59e0b,#ef4444,#ff4500)]" />

          {/* Inner Card Container */}
          <div className="relative rounded-[30px] bg-gradient-to-br from-[#17110e] via-[#120e0c] to-[#0c0908] p-6 sm:p-10 lg:p-14 overflow-hidden">
            {/* Header / Urgency Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                </span>
                <span className="text-xs font-black uppercase tracking-widest text-red-400">
                  Limited Time Mega Deal
                </span>
              </div>

              {/* Countdown Urgency Counter */}
              <div className="flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-zinc-300">Offer Ends In:</span>
                <span className="text-xs font-mono font-black text-amber-400">
                  {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:{String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Content Grid: Left Text Details, Right Big Combo Image */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/20 border border-orange-500/40 text-orange-400 text-xs font-black uppercase tracking-wider mb-4 w-max">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Save Rs. 370 Instantly</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-white leading-none">
                  THE MA <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-400 bg-clip-text text-transparent">ULTIMATE TRIO</span> BOX
                </h2>

                <p className="mt-4 text-sm sm:text-base text-zinc-300 font-medium leading-relaxed">
                  The ultimate feast designed for maximum flavor. Get our award-winning Double Smash Beast, a steaming mountain of Volcano Loaded Fries, and an ice-cold Sub-Zero Fizz at an unbeatable special price.
                </p>

                {/* What's Included */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {[
                    "1x Double Smash Beast Burger (Rs. 890 value)",
                    "1x Volcano Loaded Cheese Fries (Rs. 590 value)",
                    "1x Sub-Zero Citrus Neon Fizz (Rs. 280 value)",
                    "2x Chef's Secret Dip Ramekins (Free)",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
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
                      <span className="text-lg sm:text-xl font-bold text-zinc-500 line-through">
                        Rs. {dealItem.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleClaim}
                    data-cursor="ORDER"
                    className={`px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-3 shadow-xl ${
                      claimed
                        ? "bg-emerald-600 text-white shadow-[0_0_25px_#10b981]"
                        : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white shadow-[0_0_35px_rgba(255,75,18,0.5)] transform hover:-translate-y-0.5"
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
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-square rounded-3xl overflow-hidden border border-white/15 bg-black/40 shadow-2xl"
                >
                  <Image
                    src="/assets/generated/combo-spread.webp"
                    alt="MA Ultimate Trio Combo Box"
                    fill
                    className="object-cover"
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 z-10 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-black text-xs uppercase tracking-wider shadow-lg">
                    HOT COMBO
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-semibold text-zinc-200">100% Fresh Guaranteed</span>
                    </div>
                    <span className="text-xs font-bold text-amber-300">Ready in 12 min</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
