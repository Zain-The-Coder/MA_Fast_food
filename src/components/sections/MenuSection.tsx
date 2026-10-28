"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Check, Star, Utensils, BookOpen, Clock, Search, X } from "lucide-react";
import { menuCategories, menuItems, MenuItem, MenuCategory } from "@/data/menu";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState<string | null>(null);
  const [showOriginalMenuModal, setShowOriginalMenuModal] = useState<string | null>(null);
  const { addItem } = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (item: MenuItem) => {
    addItem(item, 1);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section id="menu" className="relative py-12 md:py-16 bg-[#0A1A4A] text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#1E4FBF]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-500/10 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-black uppercase tracking-widest mb-3">
              <Utensils className="w-3.5 h-3.5" />
              <span>Full Flavor Lineup</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight">
              EXPLORE OUR <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-white bg-clip-text text-transparent">MENU</span>
            </h2>
          </div>

          {/* Real Menu Book Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowOriginalMenuModal(siteConfig.brandAssets.realMenu1)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold uppercase tracking-wider text-sky-100 hover:text-white transition-all shadow-sm"
            >
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>Original Menu Card</span>
            </button>
            <button
              onClick={() => setShowOriginalMenuModal(siteConfig.brandAssets.realMenu2)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold uppercase tracking-wider text-sky-100 hover:text-white transition-all shadow-sm"
            >
              <Utensils className="w-4 h-4 text-sky-300" />
              <span>Special Cards</span>
            </button>
          </div>
        </div>

        {/* Sticky Category Tabs */}
        <div className="sticky top-20 z-30 py-4 bg-[#0A1A4A]/90 backdrop-blur-xl border-y border-white/10 -mx-4 px-4 sm:px-6 lg:px-8 mb-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? "text-white shadow-[0_0_20px_rgba(30,79,191,0.5)]"
                      : "text-sky-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {/* Animated Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#1E4FBF] to-[#1640A0] rounded-full -z-10"
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

        {/* Search Bar & Result Counter */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-300 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Zinger, Alfredo, Broast)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-white/10 border border-white/15 text-white placeholder-sky-200/60 text-xs focus:outline-none focus:border-sky-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <span className="text-xs font-semibold text-sky-200">
            Showing <strong className="text-white">{filteredItems.length}</strong> {filteredItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center rounded-3xl bg-white/[0.03] border border-white/10 my-8">
            <Utensils className="w-10 h-10 text-sky-300/40 mx-auto mb-3" />
            <h3 className="font-display text-xl font-bold text-white mb-1">No items found</h3>
            <p className="text-xs text-sky-200/70 mb-4">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot; in this section.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-[#1E4FBF] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#1640A0] transition-colors"
            >
              Reset Search & Filter
            </button>
          </div>
        )}

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
                  className="group relative rounded-3xl bg-[#0D2260] border border-white/10 hover:border-sky-400/50 p-4 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(30,79,191,0.25)] flex flex-col justify-between"
                >
                  <div>
                    {/* Image Area with Badge & Price */}
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-black/40 mb-4 border border-white/10">
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
                                ? "bg-[#D9381E] text-white"
                                : item.badge === "Bestseller"
                                ? "bg-[#1E4FBF] text-white"
                                : "bg-sky-400 text-[#0A1A4A] font-extrabold"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Prep Time Tag */}
                      <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-[#0A1A4A]/80 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-sky-100 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-sky-300" />
                        <span>{item.prepTime}</span>
                      </div>

                      {/* Original Price Strikethrough if on discount */}
                      {item.originalPrice && (
                        <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-lg bg-[#0A1A4A]/80 backdrop-blur-md text-[11px] text-sky-200 line-through">
                          Rs. {item.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Header info */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-display text-xl font-black text-white group-hover:text-sky-300 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-amber-300 font-bold shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-300" />
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs text-sky-300 font-medium mb-2">
                      {item.tagline}
                    </p>

                    <p className="text-xs text-sky-100/75 leading-relaxed line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer & Add to Order */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-sky-200 block">Price</span>
                      <span className="font-display text-xl font-black text-white">Rs. {item.price}</span>
                    </div>

                    <button
                      onClick={() => handleAdd(item)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 shadow-md ${
                        isAdded
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_#10b981]"
                          : "bg-[#1E4FBF] hover:bg-[#1640A0] text-white shadow-[0_0_20px_rgba(30,79,191,0.4)]"
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

      {/* Modal for viewing physical menu cards */}
      <AnimatePresence>
        {showOriginalMenuModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOriginalMenuModal(null)}
            className="fixed inset-0 z-50 bg-[#0A1A4A]/90 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-4xl w-full max-h-[90vh] h-full flex flex-col items-center">
              <button
                onClick={() => setShowOriginalMenuModal(null)}
                className="absolute -top-12 right-0 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20"
              >
                Close (ESC)
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-black">
                <Image
                  src={showOriginalMenuModal}
                  alt="Original Menu Card"
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
