"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast simulated load progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        const step = Math.floor(Math.random() * 18) + 12;
        return Math.min(prev + step, 100);
      });
    }, 140);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#0A1A4A] text-white overflow-hidden select-none"
        >
          {/* Ambient royal blue glow */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#1E4FBF]/30 via-sky-500/15 to-transparent blur-[140px] pointer-events-none" />

          {/* Logo Reveal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-6 flex flex-col items-center"
          >
            <div className="mb-4 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={1320}
                height={709}
                priority
                className="h-20 md:h-28 w-auto object-contain drop-shadow-[0_4px_25px_rgba(255,255,255,0.45)]"
              />
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-wider uppercase font-display text-white">
              {siteConfig.name}
            </h1>
            <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-sky-200 mt-1">
              &quot;{siteConfig.tagline}&quot;
            </p>
          </motion.div>

          {/* Stacking Burger Animation */}
          <div className="relative w-48 h-28 flex flex-col items-center justify-end my-3">
            {/* Layer 5: Top Bun (drops last) */}
            <motion.div
              initial={{ y: -150, opacity: 0 }}
              animate={progress > 75 ? { y: 0, opacity: 1 } : { y: -150, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 20 }}
              className="w-28 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-t-full shadow-lg relative flex items-center justify-center"
            >
              {/* Sesame seeds dots */}
              <div className="absolute top-1 left-6 w-1 h-0.5 bg-amber-100 rounded-full rotate-12" />
              <div className="absolute top-2 left-12 w-1 h-0.5 bg-amber-100 rounded-full -rotate-12" />
              <div className="absolute top-1 right-8 w-1 h-0.5 bg-amber-100 rounded-full rotate-45" />
            </motion.div>

            {/* Layer 4: Crisp Lettuce */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={progress > 60 ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="w-32 h-2.5 bg-emerald-500 rounded-full -mt-1 shadow-sm border border-emerald-400/50"
            />

            {/* Layer 3: Melted Cheddar */}
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={progress > 45 ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 450, damping: 24 }}
              className="w-30 h-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded -mt-0.5 shadow-md transform -rotate-1"
            />

            {/* Layer 2: Crispy Fillet / Patty */}
            <motion.div
              initial={{ y: -60, opacity: 0 }}
              animate={progress > 25 ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="w-32 h-5 bg-gradient-to-b from-amber-700 to-amber-900 rounded-md -mt-1 shadow-inner border border-amber-600/40"
            />

            {/* Layer 1: Bottom Bun */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={progress > 10 ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
              className="w-28 h-5 bg-gradient-to-t from-amber-600 to-amber-500 rounded-b-xl -mt-0.5 shadow-md"
            />
          </div>

          {/* Progress Bar & Percentage */}
          <div className="w-56 md:w-72 mt-3 flex flex-col items-center">
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1E4FBF] to-sky-400 rounded-full shadow-[0_0_12px_#1E4FBF]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            <div className="flex justify-between w-full mt-2 text-xs font-mono text-sky-200">
              <span className="uppercase tracking-widest text-[10px] text-sky-300">
                {progress < 40 ? "Frying to perfection..." : progress < 80 ? "Plating fresh..." : "Ready to serve!"}
              </span>
              <span className="font-semibold text-white">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
