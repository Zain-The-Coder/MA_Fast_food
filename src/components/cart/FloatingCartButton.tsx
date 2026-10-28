"use client";

import { motion } from "framer-motion";
import { ShoppingBag, MessageSquare } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getWhatsAppOrderUrl } from "@/data/site";

export default function FloatingActions() {
  const { totalItemsCount, openCart } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      {/* Floating Pulsing WhatsApp Button */}
      <motion.a
        href={getWhatsAppOrderUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-emerald-400/40 group"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25" />
        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />

        {/* Hover label */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#0A1A4A]/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/15 shadow-lg">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Floating Cart Button */}
      <motion.button
        onClick={openCart}
        aria-label="Open Food Cart"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1E4FBF] to-[#1640A0] text-white shadow-[0_0_25px_rgba(30,79,191,0.5)] border border-white/25 group"
      >
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />

        {/* Badge counter */}
        {totalItemsCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#D9381E] border-2 border-[#0A1A4A] text-white text-[11px] font-black flex items-center justify-center shadow-lg"
          >
            {totalItemsCount}
          </motion.span>
        )}

        {/* Hover label */}
        <span className="absolute right-16 px-3 py-1.5 rounded-xl bg-[#0A1A4A]/90 backdrop-blur-md text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/15 shadow-lg">
          View Cart ({totalItemsCount})
        </span>
      </motion.button>
    </div>
  );
}
