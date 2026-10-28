"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, MessageSquare, Clock, Send, CheckCircle2, Navigation } from "lucide-react";
import { siteConfig, getWhatsAppOrderUrl } from "@/data/site";

export default function ContactSection() {
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    setIsOpenNow(siteConfig.hours.isOpenNow());
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", phone: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-[#080706] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Us Or Order Direct</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight">
            GET IN <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">TOUCH</span>
          </h2>

          <p className="mt-4 text-zinc-400 max-w-xl text-sm sm:text-base font-medium">
            Craving fresh smash burgers or have a question? Message us directly on WhatsApp, give us a ring, or swing by our shop on Food Street.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (5 cols): Contact Cards & Hours */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Open Status Card */}
            <div className="p-6 rounded-3xl bg-[#140f0c] border border-white/10 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-3">
                <span className={`w-3.5 h-3.5 rounded-full ${isOpenNow ? "bg-emerald-400 animate-pulse shadow-[0_0_12px_#34d399]" : "bg-red-500"}`} />
                <div>
                  <h3 className="font-display text-lg font-black text-white">
                    {isOpenNow ? "WE ARE CURRENTLY OPEN" : "WE ARE CURRENTLY CLOSED"}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    {isOpenNow ? "Serving hot & fresh until 02:00 AM tonight" : "Reopening at 12:00 PM for lunch"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Ordering Banner */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ORDER"
              className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#0d2818] to-[#071d11] border border-emerald-500/30 hover:border-emerald-400 transition-all flex items-center justify-between group shadow-[0_10px_30px_rgba(16,185,129,0.15)] hover:shadow-[0_15px_40px_rgba(16,185,129,0.3)]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block">Instant WhatsApp Chat</span>
                  <span className="font-display text-xl font-black text-white">Order on WhatsApp</span>
                </div>
              </div>
              <span className="w-9 h-9 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>

            {/* Contact Details Card */}
            <div className="p-6 rounded-3xl bg-[#140f0c] border border-white/10 flex flex-col gap-5 shadow-xl">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Call Us Directly</span>
                  <span className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    {siteConfig.contact.displayPhone}
                  </span>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Physical Location</span>
                  <span className="text-sm font-semibold text-zinc-200">
                    {siteConfig.contact.address.full}
                  </span>
                  <a
                    href={siteConfig.contact.maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-orange-400 hover:text-orange-300 font-bold mt-1"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Get Directions in Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Weekly Schedule</span>
                  <div className="flex flex-col gap-1 text-xs">
                    {siteConfig.hours.schedule.map((slot, idx) => (
                      <div key={idx} className="flex justify-between text-zinc-300">
                        <span className="font-medium">{slot.days}</span>
                        <span className="font-bold text-amber-400">{slot.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Embedded Google Map & Contact Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Embedded Google Map */}
            <div className="w-full h-64 sm:h-72 rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-xl relative">
              <iframe
                title="MA Fast Food Location Map"
                src={siteConfig.contact.maps.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) contrast(120%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-white flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-orange-500" />
                <span>MA Fast Food • Food Street</span>
              </div>
            </div>

            {/* Quick Contact / Table Reservation Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#140f0c] border border-white/10 shadow-xl">
              <h3 className="font-display text-2xl font-black text-white mb-2">
                DROP US A MESSAGE
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Have an inquiry or special catering order? Fill out the details below and we will get back to you shortly.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Message Received!</h4>
                    <p className="text-xs text-zinc-300">Thank you. Our kitchen team will reach out to you shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-[11px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="block text-[11px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:bg-white/[0.08] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-[11px] uppercase font-bold tracking-wider text-zinc-400 mb-1">
                      Message / Special Request
                    </label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what's on your mind or request a bulk event booking..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:bg-white/[0.08] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-max px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(255,75,18,0.4)] flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
