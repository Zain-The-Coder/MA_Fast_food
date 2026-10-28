"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ShoppingBag, Phone, Menu as MenuIcon, X, Clock } from "lucide-react";
import { siteConfig } from "@/data/site";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "Signatures", href: "#signatures" },
  { name: "Menu", href: "#menu" },
  { name: "Combos", href: "#deals" },
  { name: "Our Story", href: "#story" },
  { name: "Gallery", href: "#gallery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { totalItemsCount, openCart } = useCart();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  useEffect(() => {
    setIsOpenNow(siteConfig.hours.isOpenNow());
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#090807]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Name */}
          <Link href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteConfig.brandAssets.logo}
                alt={siteConfig.name}
                fill
                priority
                className="object-contain drop-shadow-[0_0_15px_rgba(255,75,18,0.5)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-amber-100 to-orange-400 bg-clip-text text-transparent group-hover:to-orange-500 transition-all">
                {siteConfig.name}
              </span>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className={`w-2 h-2 rounded-full ${isOpenNow ? "bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" : "bg-red-500"}`} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  {isOpenNow ? "Open Now • Till 2 AM" : "Opens at 12 PM"}
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-5 py-2 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors relative group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-orange-500 transition-all duration-300 -translate-x-1/2 group-hover:w-3/4 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Quick Call */}
            <a
              href={`tel:${siteConfig.contact.phone}`}
              aria-label="Call MA Fast Food"
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              aria-label="View Cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-200 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-[11px] font-black text-white flex items-center justify-center shadow-[0_0_10px_#ff4500]"
                >
                  {totalItemsCount}
                </motion.span>
              )}
            </button>

            {/* Glowing Order Now CTA Button */}
            <button
              onClick={openCart}
              className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-full animate-gradient-x group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-[#120e0c] transition-colors group-hover:bg-[#1a1411]">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  Order Now
                </span>
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            >
              <MenuIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden bg-black/80 backdrop-blur-xl flex flex-col justify-between p-6"
          >
            {/* Header in Drawer */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                  <Image
                    src={siteConfig.brandAssets.logo}
                    alt={siteConfig.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-display text-xl font-black text-white">
                  {siteConfig.name}
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 py-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-black uppercase tracking-wider text-zinc-200 hover:text-orange-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Footer in Drawer */}
            <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(255,75,18,0.5)]"
              >
                View Cart ({totalItemsCount})
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-orange-400" />
                <span>Open: 12:00 PM – 02:30 AM</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
