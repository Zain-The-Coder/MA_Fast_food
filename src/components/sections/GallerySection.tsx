"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { galleryItems } from "@/data/gallery";

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
    <section id="gallery" className="relative py-24 md:py-32 bg-[#0A1A4A] text-white overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-sky-300 text-xs font-black uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Behind The Counter</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight">
            MASHAALLAH <span className="bg-gradient-to-r from-sky-400 via-blue-300 to-white bg-clip-text text-transparent">GALLERY</span>
          </h2>

          <p className="mt-4 text-sky-200/80 max-w-2xl text-sm sm:text-base font-medium">
            A visual glimpse inside our shop, the sizzle on our griddles, and the mouthwatering orders leaving our kitchen every day.
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
              className="group relative rounded-3xl overflow-hidden cursor-pointer bg-[#0D2260] border border-white/15 hover:border-sky-400/60 transition-all duration-300 shadow-xl aspect-[4/3]"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Hover Dark Vignette & Caption Reveal */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A4A]/95 via-[#0A1A4A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-300">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-black text-white">{item.title}</h3>
                <p className="text-xs text-sky-200 mt-1 line-clamp-1">{item.caption}</p>
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
            className="fixed inset-0 z-50 bg-[#0A1A4A]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-sky-200">
                  {selectedImageIndex + 1} / {galleryItems.length}
                </span>
                <h3 className="font-display text-lg sm:text-xl font-black">
                  {galleryItems[selectedImageIndex].title}
                </h3>
              </div>
              <button
                onClick={closeLightbox}
                aria-label="Close Lightbox"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Main Image in Lightbox */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <div className="relative max-w-5xl w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-black">
                <Image
                  src={galleryItems[selectedImageIndex].src}
                  alt={galleryItems[selectedImageIndex].title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Prev / Next Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevLightbox();
                }}
                aria-label="Previous Image"
                className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#1E4FBF] transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextLightbox();
                }}
                aria-label="Next Image"
                className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#1E4FBF] transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Caption in Lightbox */}
            <div className="text-center pt-3 border-t border-white/10">
              <p className="text-xs sm:text-sm text-sky-200 font-medium">
                {galleryItems[selectedImageIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
