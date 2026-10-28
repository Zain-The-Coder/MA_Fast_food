"use client";

import Image from "next/image";
import Link from "next/link";
import { Flame, ArrowUp, Phone, MapPin, Heart } from "lucide-react";
import { siteConfig } from "@/data/site";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#050403] text-white pt-20 pb-10 border-t border-white/10 overflow-hidden select-none">
      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-orange-600/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="#hero" className="flex items-center gap-3 mb-4 group">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src={siteConfig.brandAssets.logo}
                  alt={siteConfig.name}
                  fill
                  className="object-contain drop-shadow-[0_0_20px_rgba(255,75,18,0.5)]"
                />
              </div>
              <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-white via-amber-200 to-orange-400 bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
              {siteConfig.description}
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { name: "Instagram", href: siteConfig.socials.instagram, icon: InstagramIcon },
                { name: "Facebook", href: siteConfig.socials.facebook, icon: FacebookIcon },
              ].map((soc) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={soc.name}
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.name}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-orange-600 hover:border-orange-500 transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg font-black tracking-wider uppercase text-amber-300 mb-4">
              Quick Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-zinc-400">
              <li>
                <a href="#hero" className="hover:text-orange-400 transition-colors">Home Slider</a>
              </li>
              <li>
                <a href="#signatures" className="hover:text-orange-400 transition-colors">Signature Smash Burgers</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">Full Food Menu</a>
              </li>
              <li>
                <a href="#deals" className="hover:text-orange-400 transition-colors">Combos & Specials</a>
              </li>
              <li>
                <a href="#story" className="hover:text-orange-400 transition-colors">Kitchen Story</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-orange-400 transition-colors">Food Photography</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition-colors">Opening Hours & Location</a>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-lg font-black tracking-wider uppercase text-amber-300 mb-4">
              Visit The Shop
            </h4>
            <div className="flex flex-col gap-3 text-xs text-zinc-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 mt-2">
                <span className="text-[10px] uppercase font-bold text-orange-400 block mb-1">
                  Daily Fresh Hours
                </span>
                <span className="text-zinc-200 font-semibold block">12:00 PM – 02:30 AM (Weekends)</span>
                <span className="text-zinc-400 text-[11px] block">Late night hot delivery available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Outlined Typographic Text with Hover Effect */}
        <div className="py-12 flex justify-center overflow-hidden">
          <h2
            onClick={scrollToTop}
            className="cursor-pointer text-5xl sm:text-7xl md:text-9xl lg:text-[13vw] font-black font-display tracking-tighter uppercase text-transparent transition-all duration-700 hover:text-orange-500/10 hover:drop-shadow-[0_0_35px_rgba(255,75,18,0.4)] whitespace-nowrap"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.12)",
            }}
          >
            MA FAST FOOD
          </h2>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {siteConfig.name}. All Rights Reserved. Crafted with pure flavor.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
