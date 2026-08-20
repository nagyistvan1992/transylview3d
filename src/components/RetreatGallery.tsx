import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Check, ArrowRight } from 'lucide-react';
import { retreatSectionData, getRetreatGalleryItems } from '../data/propertyData';
import { CustomImages, GalleryItem } from '../types';

interface RetreatGalleryProps {
  images: CustomImages;
}

export const RetreatGallery: React.FC<RetreatGalleryProps> = ({ images }) => {
  const galleryItems = getRetreatGalleryItems(images);
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 bg-stone-100 overflow-hidden border-t border-stone-200">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-bronze/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6 sm:mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-stone-800 uppercase">
            {retreatSectionData.sectionBadge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start mb-10 sm:mb-18">
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-950 font-normal leading-[1.1] tracking-tight"
            >
              {retreatSectionData.title}
            </motion.h2>
          </div>

          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-stone-600 text-xs sm:text-base leading-relaxed"
            >
              {retreatSectionData.description}
            </motion.p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Column: 6 Thumbnail Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-4 order-2 lg:order-1">
            {galleryItems.map((item, idx) => {
              const isActive = activeItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-bronze ring-offset-2 ring-offset-stone-100 shadow-luxury-card scale-102 z-10'
                      : 'opacity-85 hover:opacity-100 hover:scale-101 border border-stone-300/70'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  
                  {/* Subtle vignette only at bottom to preserve photo clarity */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-90'
                        : 'bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-90'
                    }`}
                  />

                  <div className="absolute inset-0 p-2 sm:p-3 flex flex-col justify-between">
                    <div className="flex justify-end">
                      {isActive && (
                        <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-bronze text-white flex items-center justify-center text-[9px] sm:text-[10px] shadow-sm animate-pulse">
                          <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-[11px] sm:text-xs font-semibold tracking-wide drop-shadow leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Main Showcase Viewport */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-3">
            <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury-floating bg-stone-950 border border-stone-300/80 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Subtle desktop gradient, invisible or light on mobile */}
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Fullscreen Expand Button */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-2">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 sm:p-2.5 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-all shadow-md"
                  title="Extinde pe tot ecranul"
                >
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Desktop-only Overlay: Floating glass info card at bottom */}
              <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-2 max-w-xl"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-bronze uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                      <span>{activeItem.category}</span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-white font-bold tracking-wide">
                      {activeItem.title}
                    </h3>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                      {activeItem.caption}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-stone-400 border-t border-white/15">
                      <span className="text-bronze">●</span>
                      <span>{activeItem.specs}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile-optimized Info Card: Positioned cleanly BELOW the photo so the entire image is 100% visible */}
            <div className="block sm:hidden p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-[0.22em] text-bronze uppercase">
                  {activeItem.category}
                </span>
                <span className="font-mono text-[10px] text-stone-400">
                  {galleryItems.findIndex((i) => i.id === activeItem.id) + 1} / {galleryItems.length}
                </span>
              </div>

              <h3 className="font-display text-sm font-bold text-stone-900">
                {activeItem.title}
              </h3>

              <p className="text-stone-600 text-xs leading-relaxed">
                {activeItem.caption}
              </p>

              <div className="pt-2 text-[10px] font-mono text-stone-500 border-t border-stone-100 flex items-center gap-1.5">
                <span className="text-bronze">●</span>
                <span>{activeItem.specs}</span>
              </div>
            </div>

            {/* Desktop Helper Note */}
            <div className="hidden sm:flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                Treceți cu cursorul sau faceți clic pe o imagine pentru previzualizare
              </span>
              <span className="font-mono text-[11px]">
                PROIECT {galleryItems.findIndex((i) => i.id === activeItem.id) + 1} / {galleryItems.length}
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none cursor-pointer"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center cursor-default" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <div className="text-xs font-bold text-bronze tracking-widest uppercase">{activeItem.category}</div>
              <h4 className="font-display text-lg sm:text-xl font-bold">{activeItem.title}</h4>
              <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
