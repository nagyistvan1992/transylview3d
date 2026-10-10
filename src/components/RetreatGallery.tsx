import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { retreatSectionData, getRetreatGalleryItems } from '../data/propertyData';
import { CustomImages, GalleryItem } from '../types';

interface RetreatGalleryProps {
  images: CustomImages;
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.25 },
    },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 350, damping: 32 },
      opacity: { duration: 0.2 },
    },
  }),
};

export const RetreatGallery: React.FC<RetreatGalleryProps> = ({ images }) => {
  const galleryItems = getRetreatGalleryItems(images);
  const [activeItem, setActiveItem] = useState<GalleryItem>(galleryItems[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0);

  // Swipe gesture tracking for mobile touch
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // References for auto-scrolling mobile thumbnail strip
  const mobileThumbRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const mobileStripRef = useRef<HTMLDivElement | null>(null);

  const currentIndex = galleryItems.findIndex((item) => item.id === activeItem.id);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setActiveItem(galleryItems[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setActiveItem(galleryItems[nextIndex]);
  };

  const handleSelect = (item: GalleryItem, idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setActiveItem(item);
  };

  // Auto-scroll the active mobile thumbnail into center view
  useEffect(() => {
    const activeEl = mobileThumbRefs.current[activeItem.id];
    const container = mobileStripRef.current;
    if (activeEl && container) {
      const scrollLeft = activeEl.offsetLeft - (container.clientWidth / 2) + (activeEl.clientWidth / 2);
      container.scrollTo({
        left: Math.max(0, scrollLeft),
        behavior: 'smooth',
      });
    }
  }, [activeItem.id]);

  // Touch Swipe Handlers for mobile enlarged view
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section id="portfolio" className="relative py-16 md:py-24 bg-stone-100 overflow-hidden border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gpu-smooth mb-10 sm:mb-16"
        >
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block mb-3">
            {retreatSectionData.sectionBadge}
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
                {retreatSectionData.title}
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="font-sans text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
                {retreatSectionData.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* MOBILE LAYOUT (< lg): Large Image + Side-by-side Thumbnails Under */}
        {/* ----------------------------------------------------------------- */}
        <div className="block lg:hidden space-y-4">
          
          {/* Main Showcase Viewport on Mobile */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative aspect-[16/10] w-full rounded-xl overflow-hidden shadow-sm bg-stone-950 border border-stone-300 group select-none touch-pan-y"
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeItem.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/20" />
              </motion.div>
            </AnimatePresence>

            {/* Top Bar: Active Counter & Fullscreen Toggle */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 text-[11px] font-sans text-stone-200 tracking-wider uppercase flex items-center gap-1.5 tabular-nums">
                <span>
                  {currentIndex + 1} / {galleryItems.length}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-stone-300 font-medium">{activeItem.category}</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="p-2 rounded-md bg-stone-950/80 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-colors shadow-sm pointer-events-auto active:scale-95"
                title="Extinde pe tot ecranul"
                aria-label="Extinde pe tot ecranul"
              >
                <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>

            {/* Left / Right Navigation Arrow Buttons on Mobile */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-sm transition-colors"
              aria-label="Elementul precedent"
              title="Elementul precedent"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-sm transition-colors"
              aria-label="Elementul următor"
              title="Elementul următor"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
            </button>

            {/* Bottom Floating Title on Image */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
              <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-sm truncate">
                {activeItem.title}
              </h3>
            </div>
          </div>

          {/* Small Side-by-Side Thumbnails Row */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium uppercase tracking-wider text-stone-500">
                Alege tipul de spațiu:
              </span>
              <span className="text-xs font-medium text-stone-600 flex items-center gap-1">
                <span>Glisează</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
              </span>
            </div>

            <div
              ref={mobileStripRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-0.5 scrollbar-none snap-x snap-mandatory touch-pan-x"
            >
              {galleryItems.map((item, idx) => {
                const isActive = activeItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => (mobileThumbRefs.current[item.id] = el)}
                    type="button"
                    onClick={() => handleSelect(item, idx)}
                    className={`flex-shrink-0 snap-start relative w-28 sm:w-32 aspect-[4/3] rounded-lg overflow-hidden cursor-pointer transition-all duration-200 select-none ${
                      isActive
                        ? 'border-2 border-stone-900 shadow-sm z-10'
                        : 'opacity-80 hover:opacity-100 border border-stone-300'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 z-10">
                        <span className="w-4 h-4 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] shadow-sm">
                          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                        </span>
                      </div>
                    )}

                    <div className="absolute bottom-1.5 inset-x-1.5 z-10 text-left">
                      <span className="text-[10px] font-medium text-stone-300 uppercase block tracking-wider truncate">
                        {item.category}
                      </span>
                      <h4 className="text-white text-[11px] font-semibold tracking-wide truncate leading-tight">
                        {item.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Details Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                {activeItem.category}
              </span>
              <span className="font-sans text-xs text-stone-500 tabular-nums">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            </div>

            <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
              {activeItem.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
              {activeItem.caption}
            </p>

            <div className="pt-2 text-xs font-sans text-stone-500 border-t border-stone-100 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              <span>{activeItem.specs}</span>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP LAYOUT (lg:grid): Clean Two-Column Editorial Gallery  */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: 6 Thumbnail Cards (2 cols x 3 rows) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
            {galleryItems.map((item, idx) => {
              const isActive = activeItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`gpu-smooth group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'border-2 border-stone-900 shadow-sm z-10'
                      : 'opacity-85 hover:opacity-100 border border-stone-300/80'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  
                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      isActive
                        ? 'bg-gradient-to-t from-stone-950/85 via-transparent to-transparent opacity-90'
                        : 'bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-90'
                    }`}
                  />

                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-medium tracking-wider text-stone-200 uppercase bg-stone-950/80 px-2 py-0.5 rounded-sm border border-white/10">
                        {item.category}
                      </span>
                      {isActive && (
                        <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] shadow-sm">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-semibold tracking-wide drop-shadow-sm leading-tight line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Main Showcase Viewport on Desktop */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-sm bg-stone-950 border border-stone-300 group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full cursor-pointer"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Fullscreen Expand & Nav Buttons */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-md bg-stone-950/80 hover:bg-stone-900 text-white backdrop-blur-md border border-white/20 transition-colors flex items-center justify-center shadow-sm"
                  title="Elementul precedent"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-md bg-stone-950/80 hover:bg-stone-900 text-white backdrop-blur-md border border-white/20 transition-colors flex items-center justify-center shadow-sm"
                  title="Elementul următor"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 rounded-md bg-stone-950/80 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-colors shadow-sm"
                  title="Extinde pe tot ecranul"
                >
                  <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Floating Glass Info Overlay on Desktop */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-2 max-w-xl"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      {activeItem.category}
                    </div>

                    <h3 className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-semibold tracking-tight">
                      {activeItem.title}
                    </h3>

                    <p className="font-sans text-stone-300 text-xs sm:text-sm leading-relaxed">
                      {activeItem.caption}
                    </p>

                    <div className="pt-2 flex items-center gap-2 text-xs font-sans text-stone-400 border-t border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                      <span>{activeItem.specs}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop Helper Navigation Prompt */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-stone-500" strokeWidth={1.5} />
                Treceți cu cursorul sau faceți clic pe o imagine pentru previzualizare
              </span>
              <span className="font-sans text-xs tabular-nums text-stone-500">
                Proiect {currentIndex + 1} din {galleryItems.length}
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
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-xl border border-white/20"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                {activeItem.category}
              </div>
              <h3 className="font-sans text-lg sm:text-xl font-semibold">{activeItem.title}</h3>
              <p className="font-sans text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
