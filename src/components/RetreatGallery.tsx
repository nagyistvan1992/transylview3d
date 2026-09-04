import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Check, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
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

  // Auto-scroll the active mobile thumbnail into center view (container-only, never affects window scroll)
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

    // Detect predominantly horizontal swipe with at least 35px movement
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
    <section id="portfolio" className="relative py-16 sm:py-32 bg-stone-100 overflow-hidden border-t border-stone-200">
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-bronze/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          className="gpu-smooth mb-8 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-stone-800 uppercase">
              {retreatSectionData.sectionBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 items-start">
            <div className="lg:col-span-6">
              <h2 className="font-serif text-2xl sm:text-5xl lg:text-6xl text-stone-950 font-normal leading-[1.1] tracking-tight">
                {retreatSectionData.title}
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
                {retreatSectionData.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ----------------------------------------------------------------- */}
        {/* MOBILE LAYOUT (< lg): Large Image + Side-by-side Thumbnails Under */}
        {/* Everything stays in view, swipeable, and fully visible on tap     */}
        {/* ----------------------------------------------------------------- */}
        <div className="block lg:hidden space-y-3.5">
          
          {/* Main Showcase Viewport on Mobile with Direct Swipe & Arrow Controls */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-luxury-floating bg-stone-950 border border-stone-300/90 group select-none touch-pan-y"
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
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30" />
              </motion.div>
            </AnimatePresence>

            {/* Top Bar: Active Counter & Fullscreen Toggle */}
            <div className="absolute top-2.5 left-2.5 right-2.5 z-20 flex items-center justify-between pointer-events-none">
              <div className="bg-stone-950/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-[10px] font-mono text-stone-200 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                <span>
                  {currentIndex + 1} / {galleryItems.length}
                </span>
                <span className="text-white/40">•</span>
                <span className="text-bronze font-bold">{activeItem.category}</span>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(true);
                }}
                className="p-2 rounded-full bg-stone-950/80 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-all shadow-md pointer-events-auto active:scale-95"
                title="Extinde pe tot ecranul"
                aria-label="Extinde pe tot ecranul"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Left / Right Navigation Arrow Buttons on Mobile */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg active:scale-90 transition-transform"
              aria-label="Casa precedentă"
              title="Casa precedentă"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md shadow-lg active:scale-90 transition-transform"
              aria-label="Casa următoare"
              title="Casa următoare"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom Floating Title on Image */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 pointer-events-none">
              <h3 className="text-white text-sm font-semibold tracking-wide drop-shadow-md truncate">
                {activeItem.title}
              </h3>
            </div>
          </div>

          {/* Small Side-by-Side Thumbnails Row ("alatta kicsibe egymás mellett a többi amit ki tudok választani") */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">
                Alege Tipul de Casă / Spațiu:
              </span>
              <span className="text-[10px] font-mono text-bronze flex items-center gap-1 font-medium">
                <span>Glisează</span>
                <span>➔</span>
              </span>
            </div>

            <div
              ref={mobileStripRef}
              className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none snap-x snap-mandatory touch-pan-x"
            >
              {galleryItems.map((item, idx) => {
                const isActive = activeItem.id === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => (mobileThumbRefs.current[item.id] = el)}
                    type="button"
                    onClick={() => handleSelect(item, idx)}
                    className={`flex-shrink-0 snap-start relative w-28 sm:w-32 aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 select-none ${
                      isActive
                        ? 'ring-2 ring-bronze ring-offset-2 ring-offset-stone-100 shadow-luxury-card scale-102 z-10'
                        : 'opacity-75 hover:opacity-100 border border-stone-300/80'
                    }`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500"
                    />

                    {/* Subtle bottom vignette to ensure white text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/25 to-transparent" />

                    {/* Checkmark badge if Active */}
                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 z-10">
                        <span className="w-4 h-4 rounded-full bg-bronze text-white flex items-center justify-center text-[9px] shadow-sm animate-pulse">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      </div>
                    )}

                    {/* Bottom Title Label */}
                    <div className="absolute bottom-1.5 inset-x-1.5 z-10 text-left">
                      <span className="text-[8px] font-mono text-bronze uppercase block tracking-wider truncate">
                        {item.category}
                      </span>
                      <h5 className="text-white text-[10px] font-semibold tracking-wide drop-shadow truncate leading-tight">
                        {item.title}
                      </h5>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* White Details Card (Matching Screenshot 1) */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-[0.22em] text-bronze uppercase">
                {activeItem.category}
              </span>
              <span className="font-mono text-[10px] text-stone-400">
                {currentIndex + 1} / {galleryItems.length}
              </span>
            </div>

            <h4 className="font-serif text-base font-bold text-stone-900 tracking-tight leading-snug">
              {activeItem.title}
            </h4>

            <p className="text-stone-600 text-xs leading-relaxed font-light">
              {activeItem.caption}
            </p>

            <div className="pt-2 text-[10px] font-mono text-stone-500 border-t border-stone-100 flex items-center gap-1.5">
              <span className="text-bronze">●</span>
              <span>{activeItem.specs}</span>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP LAYOUT (lg:grid): Luxury Two-Column Editorial Gallery */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden lg:grid grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: 6 Luxury Thumbnail Cards (2 cols x 3 rows) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3.5 sm:gap-4">
            {galleryItems.map((item, idx) => {
              const isActive = activeItem.id === item.id;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                  onClick={() => setActiveItem(item)}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`gpu-smooth group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive
                      ? 'ring-2 ring-bronze ring-offset-2 ring-offset-stone-100 shadow-luxury-card scale-102 z-10'
                      : 'opacity-85 hover:opacity-100 hover:scale-101 border border-stone-300/70'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  />
                  
                  {/* Vignette */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-stone-950/85 via-transparent to-transparent opacity-90'
                        : 'bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-70 group-hover:opacity-90'
                    }`}
                  />

                  <div className="absolute inset-0 p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest text-bronze uppercase bg-stone-950/70 px-2 py-0.5 rounded-md border border-white/10">
                        {item.category}
                      </span>
                      {isActive && (
                        <span className="w-5 h-5 rounded-full bg-bronze text-white flex items-center justify-center text-[10px] shadow-sm animate-pulse">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-semibold tracking-wide drop-shadow leading-tight line-clamp-2">
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
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-luxury-floating bg-stone-950 border border-stone-300/80 group">
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
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Fullscreen Expand & Nav Buttons */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-stone-950/70 hover:bg-stone-900 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-md hover:scale-105"
                  title="Elementul anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-stone-950/70 hover:bg-stone-900 text-white backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-md hover:scale-105"
                  title="Elementul următor"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md border border-white/20 transition-all shadow-md hover:scale-105"
                  title="Extinde pe tot ecranul"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Floating Glass Info Overlay on Desktop */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
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

            {/* Desktop Helper Navigation Prompt */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-2">
              <span className="flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-bronze" />
                Treceți cu cursorul sau faceți clic pe o imagine pentru previzualizare
              </span>
              <span className="font-mono text-[11px]">
                PROIECT {currentIndex + 1} / {galleryItems.length}
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
              className="max-h-[75vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />
            <div className="mt-4 text-center text-white space-y-1">
              <div className="text-xs font-bold text-bronze tracking-widest uppercase">
                {activeItem.category}
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold">{activeItem.title}</h4>
              <p className="text-stone-300 text-xs sm:text-sm max-w-lg mx-auto">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

