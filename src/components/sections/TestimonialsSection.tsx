"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="reviews" className="relative py-24 md:py-32 bg-[#090807] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-600/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-orange-400" />
            <span>4.9 / 5.0 On Google Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-white">
            WORDS FROM OUR <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">FOODIES</span>
          </h2>

          <p className="mt-4 text-zinc-400 max-w-xl text-sm sm:text-base font-medium">
            Don't just take our word for it. Here is what real food lovers across the city have to say about MA Fast Food.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full rounded-3xl bg-[#140f0c] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Huge Watermark Quote */}
                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/[0.03] pointer-events-none rotate-12" />

                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
                  {/* Avatar */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-orange-500/50 shadow-lg shrink-0">
                    <Image
                      src={testimonials[activeIndex].avatar}
                      alt={testimonials[activeIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 text-center sm:text-left">
                    {/* Stars */}
                    <div className="flex items-center justify-center sm:justify-start gap-1 mb-3">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Quote Text */}
                    <p className="text-base sm:text-lg text-zinc-200 font-medium leading-relaxed italic">
                      "{testimonials[activeIndex].content}"
                    </p>

                    {/* Reviewer Details */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                          <h4 className="font-display text-lg font-black text-white">
                            {testimonials[activeIndex].name}
                          </h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-xs text-zinc-400">{testimonials[activeIndex].role}</p>
                      </div>

                      {/* Favorite Dish Badge */}
                      <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-orange-400 font-semibold">
                        Fav: {testimonials[activeIndex].favoriteDish}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous Review"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-orange-600 hover:border-orange-500 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Review ${idx + 1}`}
                  className={`h-2 transition-all rounded-full ${
                    activeIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next Review"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-orange-600 hover:border-orange-500 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
