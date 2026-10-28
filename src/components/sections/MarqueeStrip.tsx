"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles, Star, Zap } from "lucide-react";

const marqueeItems = [
  { text: "100% PURE ANGUS BEEF", icon: Flame },
  { text: "SMASHED TO PERFECTION", icon: Sparkles },
  { text: "MELTING AGED CHEDDAR", icon: Zap },
  { text: "CRISPY GOLDEN CONE FRIES", icon: Star },
  { text: "ARTISAN SOURDOUGH PIZZA", icon: Flame },
  { text: "NASHVILLE HOT CRUNCH", icon: Zap },
  { text: "SUB-ZERO CITRUS FIZZ", icon: Sparkles },
  { text: "CHEF'S SECRET SMOKEY SAUCE", icon: Star },
];

export default function MarqueeStrip() {
  return (
    <div className="relative w-full py-5 bg-gradient-to-r from-[#170e0a] via-[#24130b] to-[#170e0a] border-y border-orange-500/20 overflow-hidden shadow-[0_0_40px_rgba(255,75,18,0.15)] select-none">
      {/* Glow lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60" />

      {/* Marquee Track */}
      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-8 whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-6">
                <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white hover:text-orange-400 transition-colors">
                  {item.text}
                </span>
                <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 shadow-[0_0_12px_rgba(255,75,18,0.4)]">
                  <Icon className="w-4 h-4 fill-orange-400/50" />
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
