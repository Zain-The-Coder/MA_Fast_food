"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Plus, Check, Clock, Flame } from "lucide-react";
import { menuItems, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import TiltCard from "@/components/ui/TiltCard";
import FloatingIngredients from "@/components/ui/FloatingIngredients";

export default function SignatureDishes() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const signatureItems = menuItems.filter((item) => item.isSignature).slice(0, 4);

  const handleQuickAdd = (item: MenuItem) => {
    addItem(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="signatures" className="relative py-24 md:py-32 bg-[#090807] overflow-hidden">
      <FloatingIngredients />

      {/* Background glow spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-orange-600/10 via-amber-500/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>Chef's Masterpieces</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-white"
          >
            SIGNATURE <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">CRAVINGS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base font-medium"
          >
            Crafted without compromises. Every single burger, crust, and fry basket is engineered to deliver an explosion of taste and crunch.
          </motion.p>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {signatureItems.map((item, index) => {
            const isAdded = addedId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-cursor="ORDER"
              >
                <TiltCard className="h-full bg-gradient-to-b from-[#181310] to-[#120e0c] border border-white/10 hover:border-orange-500/40 shadow-xl hover:shadow-[0_15px_40px_rgba(255,75,18,0.25)] transition-all flex flex-col group">
                  <div className="p-5 flex flex-col h-full">
                    {/* Image Container with Zoom */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black/40 mb-5 border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Badge (Bestseller / Spicy) */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-wider text-amber-300 shadow-md">
                          {item.badge}
                        </div>
                      )}

                      {/* Price Tag Pill */}
                      <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-xl bg-orange-600/90 backdrop-blur-md text-white font-black text-xs shadow-[0_0_15px_rgba(255,75,18,0.5)]">
                        Rs. {item.price}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Prep Time */}
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star className="w-3.5 h-3.5 fill-amber-400" />
                            <span className="font-bold">{item.rating}</span>
                            <span className="text-[11px] text-zinc-500">({item.reviewsCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-zinc-400 text-[11px]">
                            <Clock className="w-3 h-3 text-orange-400" />
                            <span>{item.prepTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl font-black text-white group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </h3>

                        {/* Tagline / Ingredients */}
                        <p className="text-xs text-amber-400/90 font-semibold mt-1">
                          {item.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Add to Order Button */}
                      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-zinc-400 block">Total</span>
                          <span className="font-display text-lg font-black text-white">Rs. {item.price}</span>
                        </div>

                        <button
                          onClick={() => handleQuickAdd(item)}
                          className={`relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md ${
                            isAdded
                              ? "bg-emerald-600 text-white shadow-[0_0_15px_#10b981]"
                              : "bg-white/10 hover:bg-orange-600 text-white hover:shadow-[0_0_20px_rgba(255,75,18,0.5)]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
