"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Phone, MapPin } from "lucide-react";
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
    <footer className="relative bg-[#071333] text-white pt-20 pb-10 border-t border-white/10 overflow-hidden select-none">
      {/* Background flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#1E4FBF] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1E4FBF]/10 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link href="#hero" className="flex items-center mb-4 group">
              <Image
                src="/logo.png"
                alt={siteConfig.name}
                width={1320}
                height={709}
                className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_2px_12px_rgba(255,255,255,0.45)] transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <span className="font-display text-2xl md:text-3xl font-black uppercase tracking-wider text-white mb-2">
              {siteConfig.name}
            </span>

            <p className="text-sky-200/80 text-xs sm:text-sm max-w-sm leading-relaxed mb-6">
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
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-sky-200 hover:text-white hover:bg-[#1E4FBF] hover:border-sky-400 transition-all shadow-sm"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-display text-lg font-black tracking-wider uppercase text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-sky-200/70">
              <li>
                <Link href="/#hero" className="hover:text-white transition-colors">Home Slider</Link>
              </li>
              <li>
                <Link href="/#signatures" className="hover:text-white transition-colors">Signature Cravings</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition-colors text-sky-300 font-semibold">Full Food Menu</Link>
              </li>
              <li>
                <Link href="/#deals" className="hover:text-white transition-colors">Broast Family Feast</Link>
              </li>
              <li>
                <Link href="/#story" className="hover:text-white transition-colors">Kitchen Story</Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-white transition-colors">Food Photography</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white transition-colors">Opening Hours & Location</Link>
              </li>
            </ul>
          </div>

          {/* Contact Summary (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="font-display text-lg font-black tracking-wider uppercase text-white mb-4">
              Visit The Shop
            </h4>
            <div className="flex flex-col gap-3 text-xs text-sky-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 mt-2">
                <span className="text-[10px] uppercase font-bold text-sky-300 block mb-1">
                  Daily Fresh Hours
                </span>
                <span className="text-white font-semibold block">12:00 PM – 02:30 AM (Weekends)</span>
                <span className="text-sky-200/70 text-[11px] block">Late night hot delivery available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Giant Outlined Typographic Text with Hover Effect */}
        <div className="py-12 flex justify-center overflow-hidden">
          <h2
            onClick={scrollToTop}
            className="cursor-pointer text-4xl sm:text-6xl md:text-8xl lg:text-[10vw] font-black font-display tracking-tighter uppercase text-transparent transition-all duration-700 hover:text-[#1E4FBF]/20 hover:drop-shadow-[0_0_35px_rgba(30,79,191,0.5)] whitespace-nowrap text-center"
            style={{
              WebkitTextStroke: "1px rgba(255, 255, 255, 0.15)",
            }}
          >
            MASHAALLAH FAST FOODS
          </h2>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sky-200/60">
          <p>© 2026 {siteConfig.name}. All Rights Reserved. &quot;{siteConfig.tagline}&quot;</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sky-200 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
