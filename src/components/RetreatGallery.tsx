import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Sparkles, Maximize2, Check, ArrowRight } from 'lucide-react';
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
    <section id="portfolio" className="relative py-24 sm:py-32 bg-stone-100 overflow-hidden border-t border-stone-200">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-bronze/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-stone-800 uppercase">
            {retreatSectionData.sectionBadge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-14 sm:mb-18">
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-stone-950 font-normal leading-[1.1] tracking-tight"
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
              className="text-stone-600 text-sm sm:text-base leading-relaxed"
            >
              {retreatSectionData.description}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
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
                  className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-bronze ring-offset-2 ring-offset-stone-100 shadow-luxury-card scale-102 z-10'
                      : 'opacity-80 hover:opacity-100 hover:scale-101 border border-stone-300/60'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-90'
                        : 'bg-stone-950/30 group-hover:bg-stone-950/50'
                    }`}
                  />

                  <div className="absolute inset-0 p-2.5 sm:p-3 flex flex-col justify-between">
                    <div className="flex justify-end">
                      {isActive && (
                        <span className="w-5 h-5 rounded-full bg-bronze text-white flex items-center justify-center text-[10px] shadow-sm animate-pulse">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold tracking-widest text-bronze-light uppercase block">
                        {item.category}
                      </span>
                      <h4 className="text-white text-xs font-medium tracking-wide drop-shadow truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury-floating bg-stone-950 border border-stone-300/80 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/30" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-2">
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-950/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                  title="Extinde pe tot ecranul"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 bg-gradient-to-t from-stone-950/95 via-stone-950/60 to-transparent">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-2.5 max-w-xl"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-bronze uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
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

            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                Treceți cu cursorul sau atingeți o imagine pentru previzualizare
              </span>
              <span className="font-mono text-[11px]">
                PROIECT {galleryItems.findIndex((i) => i.id === activeItem.id) + 1} / {galleryItems.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col items-center">
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[80vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white">
              <h4 className="font-display text-xl font-bold">{activeItem.title}</h4>
              <p className="text-stone-400 text-sm">{activeItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
