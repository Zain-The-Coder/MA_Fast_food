"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Utensils } from "lucide-react";

const marqueeItems = [
  { text: "CRISPY GOLDEN BROAST", icon: Utensils },
  { text: "JUMBO ZINGER BURGERS", icon: Sparkles },
  { text: "CREAMY ALFREDO PASTA", icon: Zap },
  { text: "JUICY BEEF SMASH BURGERS", icon: Star },
  { text: "HOT TOASTED CLUB SANDWICHES", icon: Utensils },
  { text: "CRISPY WRAPS & ROLLS", icon: Zap },
  { text: "WOK-TOSSED CHOWMEIN", icon: Sparkles },
  { text: "CHILLED DRINKS & STING", icon: Star },
];

export default function MarqueeStrip() {
  return (
    <div className="relative w-full py-5 bg-gradient-to-r from-[#071333] via-[#0D2260] to-[#071333] border-y border-[#1E4FBF]/30 overflow-hidden shadow-[0_0_40px_rgba(30,79,191,0.25)] select-none">
      {/* Top and Bottom Glow Accent Lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1E4FBF] to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80" />

      {/* Marquee Track */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white hover:text-sky-300 transition-colors">
                  {item.text}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#1E4FBF]/30 border border-[#1E4FBF]/60 flex items-center justify-center text-sky-300 shadow-[0_0_12px_rgba(30,79,191,0.5)]">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
