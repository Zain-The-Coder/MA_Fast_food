"use client";

import { motion } from "framer-motion";

export default function FloatingIngredients() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none">
      {/* Drifting Sesame Seed 1 */}
      <motion.div
        animate={{
          y: [-15, 20, -15],
          x: [-10, 15, -10],
          rotate: [0, 45, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[18%] left-[8%] w-3 h-1.5 bg-amber-200/40 rounded-full blur-[0.5px] shadow-[0_0_8px_rgba(251,191,36,0.3)]"
      />

      {/* Floating Red Chili Flake */}
      <motion.div
        animate={{
          y: [20, -25, 20],
          x: [15, -15, 15],
          rotate: [15, 85, 15],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[35%] right-[10%] w-3 h-3 bg-red-600/35 rounded-sm transform rotate-45 blur-[0.5px] shadow-[0_0_12px_rgba(239,68,68,0.4)]"
      />

      {/* Floating Fresh Mint / Basil Leaf */}
      <motion.div
        animate={{
          y: [-25, 25, -25],
          x: [-20, 20, -20],
          rotate: [-20, 30, -20],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[25%] left-[5%] w-6 h-3 bg-emerald-500/25 rounded-full rotate-45 blur-[0.5px]"
      />

      {/* Drifting Pepper Flake */}
      <motion.div
        animate={{
          y: [10, -20, 10],
          x: [8, -12, 8],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[15%] right-[12%] w-2 h-2 bg-zinc-400/30 rounded-full blur-[0.5px]"
      />

      {/* Subtle Warm Amber Dust particle */}
      <motion.div
        animate={{
          y: [-30, 30, -30],
          x: [10, -10, 10],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[60%] left-[20%] w-2 h-2 bg-orange-400/30 rounded-full blur-[1px]"
      />
    </div>
  );
}
