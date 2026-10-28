"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, MessageSquare, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";
import { siteConfig, getWhatsAppOrderUrl } from "@/data/site";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItemsCount,
    subtotal,
    deliveryFee,
    grandTotal,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");

  const freeDeliveryProgress = Math.min(
    100,
    Math.round((subtotal / siteConfig.delivery.freeDeliveryThreshold) * 100)
  );

  const handleCheckoutWhatsApp = () => {
    if (items.length === 0) return;

    // Trigger confetti celebration!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff4500", "#f59e0b", "#10b981", "#ffffff"],
      });
    } catch {
      // Ignore confetti issues if canvas not supported
    }

    // Build the WhatsApp message
    let msg = `*NEW ORDER - MA FAST FOOD*\n`;
    if (customerName) msg += `*Customer:* ${customerName}\n`;
    if (customerAddress) msg += `*Delivery Address:* ${customerAddress}\n`;
    msg += `---------------------------\n`;
    msg += `*ITEMS:*\n`;

    items.forEach((item, index) => {
      msg += `${index + 1}. ${item.menuItem.name} x${item.quantity} - Rs. ${item.menuItem.price * item.quantity}\n`;
    });

    msg += `---------------------------\n`;
    msg += `*Subtotal:* Rs. ${subtotal}\n`;
    msg += `*Delivery:* ${deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}\n`;
    msg += `*Total Amount:* Rs. ${grandTotal}\n`;
    if (notes) msg += `*Notes:* ${notes}\n`;
    msg += `\nPlease confirm my order and share estimated delivery time!`;

    const url = getWhatsAppOrderUrl(msg);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-md"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[9991] w-full max-w-md bg-[#120e0c] border-l border-white/10 flex flex-col justify-between shadow-2xl text-white select-none"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-black">YOUR TASTE CART</h3>
                  <span className="text-xs text-zinc-400 font-medium">
                    {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} selected
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Free Delivery Bar */}
            <div className="px-5 py-3 bg-white/[0.02] border-b border-white/5">
              <div className="flex justify-between text-xs mb-1.5 font-semibold">
                <span className="text-zinc-300">
                  {subtotal >= siteConfig.delivery.freeDeliveryThreshold ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Free Delivery Unlocked!
                    </span>
                  ) : (
                    `Add Rs. ${siteConfig.delivery.freeDeliveryThreshold - subtotal} more for FREE delivery`
                  )}
                </span>
                <span className="text-orange-400">{freeDeliveryProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-emerald-400 transition-all duration-300 rounded-full"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16 text-zinc-400">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-zinc-500">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-lg font-black text-white">Your cart is hungry!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mt-1">
                    Add our famous smash burgers, artisan pizza, or crispy fries to get started.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-6 px-6 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3"
                  >
                    {/* Item Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-black/40 shrink-0">
                      <Image
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-black text-white truncate">
                        {item.menuItem.name}
                      </h4>
                      <span className="text-xs font-semibold text-amber-400">
                        Rs. {item.menuItem.price * item.quantity}
                      </span>
                      <span className="text-[10px] text-zinc-500 ml-1.5">
                        (Rs. {item.menuItem.price} each)
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1.5 bg-black/40 rounded-xl p-1 border border-white/5">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, -1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, 1)}
                        className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-300"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete Item */}
                    <button
                      onClick={() => removeItem(item.menuItem.id)}
                      className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-white/10 bg-[#0d0a08] flex flex-col gap-3">
                {/* Optional Customer Inputs */}
                <div className="flex flex-col gap-2 mb-1">
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Ali)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Delivery Address / Table #"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-orange-500"
                  />
                </div>

                {/* Bill Breakdown */}
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">Rs. {subtotal}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-emerald-400">
                      {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                    <span>Total Amount</span>
                    <span className="font-display text-lg text-orange-400 font-black">
                      Rs. {grandTotal}
                    </span>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to WhatsApp (1-Click)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <div className="flex justify-between items-center text-[10px] text-zinc-500">
                  <span>Fast delivery in ~30 mins</span>
                  <button onClick={clearCart} className="hover:text-red-400 underline">
                    Clear cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
