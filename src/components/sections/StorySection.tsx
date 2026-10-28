"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Award, Flame, Heart, Sparkles, Users } from "lucide-react";
import { shopStats } from "@/data/testimonials";

function CounterItem({ target, suffix, label, icon }: { target: number; suffix: string; label: string; icon: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start * 10) / 10);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display text-3xl sm:text-4xl font-black text-white">
        {count}
        <span className="text-orange-500">{suffix}</span>
      </div>
      <div className="text-xs uppercase font-bold text-zinc-400 tracking-wider mt-1">
        {label}
      </div>
    </div>
  );
}

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 md:py-32 bg-[#090807] overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Layered Real Shop Photos */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Big Photo */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/50"
              >
                <Image
                  src="/assets/shop/image_1.webp"
                  alt="Inside MA Fast Food Kitchen"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-widest text-orange-400 font-bold">Open Kitchen Standard</span>
                  <p className="text-lg font-black text-white font-display">Where the magic sizzles fresh daily</p>
                </div>
              </motion.div>

              {/* Overlapping Secondary Photo */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="absolute -bottom-8 -right-4 sm:-right-8 w-3/5 aspect-square rounded-3xl overflow-hidden border-2 border-orange-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-black"
              >
                <Image
                  src="/assets/shop/image_2.webp"
                  alt="MA Fast Food Dining Area"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Floating Quality Stamp */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 p-0.5 shadow-xl hidden sm:flex items-center justify-center text-center"
              >
                <div className="w-full h-full bg-[#120e0c] rounded-full flex flex-col items-center justify-center p-2">
                  <Sparkles className="w-5 h-5 text-amber-400 mb-0.5" />
                  <span className="text-[9px] font-black tracking-widest uppercase text-white leading-tight">
                    100% FRESH
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/15 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-wider mb-4 w-max"
            >
              <Heart className="w-3.5 h-3.5 fill-orange-400" />
              <span>The Sizzle & The Story</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white leading-tight"
            >
              WE DON'T DO ORDINARY. <br />
              <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                WE DO OBSESSION.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-sm sm:text-base text-zinc-300 font-medium leading-relaxed"
            >
              MA Fast Food was founded with one stubborn belief: fast food shouldn't mean cutting corners. While others use frozen pre-formed patties, we smash fresh 100% prime beef onto blazing-hot 500° cast griddles until the lacy edges crackle with pure flavor.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 text-sm sm:text-base text-zinc-400 leading-relaxed"
            >
              From our 48-hour slow-fermented artisan sourdough pizza dough to our house-blended smokey sauces and double-fried crispy potatoes, every item on our counter is an homage to honest, soul-satisfying culinary craft.
            </motion.p>

            {/* Live Animated Counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-white/10"
            >
              {shopStats.map((stat, idx) => (
                <CounterItem
                  key={idx}
                  target={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
