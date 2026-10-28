"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems, GalleryItem } from "@/data/gallery";

export default function GallerySection() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const nextLightbox = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % galleryItems.length);
  };

  const prevLightbox = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-[#080706] text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-black uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Behind The Counter</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight">
            THE MA <span className="bg-gradient-to-r from-orange-500 via-amber-300 to-yellow-500 bg-clip-text text-transparent">GALLERY</span>
          </h2>

          <p className="mt-4 text-zinc-400 max-w-2xl text-sm sm:text-base font-medium">
            A visual glimpse inside our shop, the sizzle on our flat tops, and the mouthwatering orders leaving our kitchen every day.
          </p>
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => openLightbox(index)}
              data-cursor="VIEW"
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-black/40 border border-white/10 hover:border-orange-500/50 transition-all duration-300 shadow-lg aspect-[4/3]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Hover Dark Vignette & Caption Reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-white">{item.title}</h3>
                <p className="text-xs text-zinc-300 mt-1 line-clamp-1">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-zinc-400">
                  {selectedImageIndex + 1} / {galleryItems.length}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black">
                  {galleryItems[selectedImageIndex].title}
                </h3>
              </div>

              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image Display */}
            <div className="relative flex-1 w-full max-h-[75vh] my-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full max-w-5xl rounded-2xl overflow-hidden"
                >
                  <Image
                    src={galleryItems[selectedImageIndex].src}
                    alt={galleryItems[selectedImageIndex].title}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="text-center text-xs text-zinc-400 border-t border-white/10 pt-3">
              <p>{galleryItems[selectedImageIndex].caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
