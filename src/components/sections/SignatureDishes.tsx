"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Plus, Check, Clock, Sparkles, ArrowRight } from "lucide-react";
import { menuItems, MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import TiltCard from "@/components/ui/TiltCard";

export default function SignatureDishes() {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);

  const preferredIds = ["jumbo-zinger", "broast-full", "creamy-pasta", "club-sandwich"];
  const signatureItems = preferredIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));

  const handleQuickAdd = (item: MenuItem) => {
    addItem(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="signatures" className="relative py-24 md:py-32 bg-[#F7FAFF] text-[#0A1A4A] overflow-hidden select-none">
      {/* Background soft ambient blue light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#1E4FBF]/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4FBF]/10 border border-[#1E4FBF]/20 text-[#1E4FBF] text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E4FBF]" />
            <span>Chef&apos;s Masterpieces</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-[#0A1A4A]"
          >
            SIGNATURE <span className="bg-gradient-to-r from-[#1E4FBF] via-blue-600 to-[#0A1A4A] bg-clip-text text-transparent">CRAVINGS</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-slate-600 max-w-2xl text-sm sm:text-base font-medium"
          >
            Crafted without compromises. Every crispy broast piece, giant zinger burger, rich creamy alfredo pasta, and toasted club sandwich is prepared fresh to deliver maximum flavor and crunch.
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
              >
                <TiltCard className="h-full bg-white border border-[#E2E8F5] hover:border-[#1E4FBF]/50 shadow-[0_10px_30px_rgba(10,26,74,0.06)] hover:shadow-[0_20px_45px_rgba(30,79,191,0.18)] transition-all flex flex-col group rounded-3xl">
                  <div className="p-5 flex flex-col h-full">
                    {/* Image Container with Zoom */}
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      />

                      {/* Badge */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-[#0A1A4A]/80 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                          {item.badge}
                        </div>
                      )}

                      {/* Price Tag Pill */}
                      <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-xl bg-[#1E4FBF] text-white font-black text-xs shadow-md">
                        Rs. {item.price}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Prep Time */}
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <div className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span className="font-bold">{item.rating}</span>
                            <span className="text-[11px] text-slate-400">({item.reviewsCount})</span>
                          </div>
                          <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                            <Clock className="w-3 h-3 text-[#1E4FBF]" />
                            <span>{item.prepTime}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-display text-xl font-black text-[#0A1A4A] group-hover:text-[#1E4FBF] transition-colors leading-snug">
                          {item.name}
                        </h3>

                        {/* Tagline */}
                        <p className="text-xs text-[#1E4FBF] font-semibold mt-1">
                          {item.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Add to Order Button */}
                      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total</span>
                          <span className="font-display text-lg font-black text-[#0A1A4A]">Rs. {item.price}</span>
                        </div>

                        <button
                          onClick={() => handleQuickAdd(item)}
                          className={`relative px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md ${
                            isAdded
                              ? "bg-emerald-600 text-white shadow-[0_0_15px_#10b981]"
                              : "bg-[#1E4FBF] hover:bg-[#1640A0] text-white hover:shadow-[0_0_20px_rgba(30,79,191,0.4)]"
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Add to Order</span>
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

        {/* Explore Full Menu CTA */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#1E4FBF] text-white font-black text-sm uppercase tracking-wider hover:bg-[#1640A0] shadow-[0_10px_30px_rgba(30,79,191,0.35)] hover:shadow-[0_15px_40px_rgba(30,79,191,0.5)] transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-sky-200" />
            <span>Explore Full Menu (40+ Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
