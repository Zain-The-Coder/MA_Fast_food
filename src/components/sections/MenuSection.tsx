"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Star, Utensils, BookOpen, Flame, Clock } from "lucide-react";
import { menuCategories, menuItems, MenuItem, MenuCategory } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [showOriginalMenuModal, setShowOriginalMenuModal] = useState<string | null>(null);
  const { addItem } = useCart();

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addItem(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-[#080706] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-orange-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-amber-500/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>Full Flavor Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight">
              EXPLORE OUR <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">MENU</span>
            </h2>
          </div>

          {/* Real Menu Book Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowOriginalMenuModal(siteConfig.brandAssets.realMenu1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Original Menu Card</span>
            </button>
            <button
              onClick={() => setShowOriginalMenuModal(siteConfig.brandAssets.realMenu2)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white transition-all shadow-sm"
            >
              <Flame className="w-4 h-4 text-red-400" />
              <span>Chinese Specials Card</span>
            </button>
          </div>
        </div>

        {/* Sticky Category Tabs */}
        <div className="sticky top-20 z-30 py-4 bg-[#080706]/90 backdrop-blur-xl border-y border-white/5 -mx-4 px-4 sm:px-6 lg:px-8 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-white shadow-[0_0_20px_rgba(255,75,18,0.4)]"
                      : "text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5"
                  }`}
                >
                  {/* Animated Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid with Framer Motion Layout Animation */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const isAdded = addedId === item.id;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  data-cursor="ORDER"
                  className="group relative rounded-3xl bg-[#120e0c] border border-white/10 hover:border-orange-500/50 p-4 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(255,75,18,0.2)] flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area with Badge & Price */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                        {item.badge && (
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md shadow-md ${
                              item.badge === "Spicy"
                                ? "bg-red-600/90 text-white"
                                : item.badge === "Bestseller"
                                ? "bg-orange-600/90 text-white"
                                : "bg-amber-500/90 text-black font-extrabold"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Prep Time Tag */}
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-semibold text-zinc-300 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-400" />
                        <span>{item.prepTime}</span>
                      </div>

                      {/* Original Price Strikethrough if on discount */}
                      {item.originalPrice && (
                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] text-zinc-400 line-through">
                          Rs. {item.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Header info */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl font-black text-white group-hover:text-orange-400 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-400 font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-amber-400/90 font-medium mb-2">
                      {item.tagline}
                    </p>

                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer & Add to Order */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-400 block">Price</span>
                      <span className="font-display text-xl font-black text-white">Rs. {item.price}</span>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-md ${
                        isAdded
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_#10b981]"
                          : "bg-orange-600 hover:bg-orange-500 text-white shadow-[0_0_20px_rgba(255,75,18,0.4)]"
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal for viewing the shop's physical physical menu cards */}
      <AnimatePresence>
        {showOriginalMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOriginalMenuModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] h-full flex flex-col items-center">
              <button
                onClick={() => setShowOriginalMenuModal(null)}
                className="absolute -top-12 right-0 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20"
              >
                Close (ESC)
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black">
                <Image
                  src={showOriginalMenuModal}
                  alt="Original Shop Menu Card"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
