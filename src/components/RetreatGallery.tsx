import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { retreatSectionData, getRetreatGalleryItems } from '../data/propertyData';
import { CustomImages } from '../types';

interface RetreatGalleryProps {
  images: CustomImages;
  onRequestQuote?: (propertyType?: string) => void;
}

export const RetreatGallery: React.FC<RetreatGalleryProps> = ({ images, onRequestQuote }) => {
  const galleryItems = getRetreatGalleryItems(images);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeItem = galleryItems[currentIndex] || galleryItems[0];

  // Swipe gesture tracking for mobile touch
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

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
    <section
      id="portfolio"
      className="relative py-16 md:py-24 bg-[#11100F] text-stone-100 overflow-hidden border-t border-stone-800/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header (matches ToursPortfolioSection) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12 pb-8 border-b border-stone-800">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-600" />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 block">
                {retreatSectionData.sectionBadge}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-100 leading-tight [text-wrap:balance]">
              {retreatSectionData.title}
            </h2>

            <p className="font-sans text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              {retreatSectionData.description}
            </p>
          </div>

          {/* Active Item Counter */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="font-sans text-xs text-stone-500 leading-normal tracking-wide tabular-nums">
              din {String(galleryItems.length).padStart(2, '0')} aplicații 3D
            </span>
          </div>
        </div>

        {/* Minimalist Monochrome Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-3 sm:mb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory touch-pan-x">
          {galleryItems.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`snap-start flex-shrink-0 px-3 sm:px-3.5 py-2 rounded-lg text-[11px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.14em] transition-colors cursor-pointer border ${
                  isActive
                    ? 'bg-white text-stone-950 font-semibold border-white'
                    : 'bg-stone-900/50 text-stone-400 hover:text-stone-200 border-stone-800/90 hover:border-stone-700 font-medium'
                }`}
              >
                <span className="tabular-nums mr-1.5 opacity-60">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>

        {/* Architectural Showcase Sheet (Flush Left & Right Columns) */}
        <div className="rounded-2xl bg-stone-900/40 border border-stone-800/90 p-4 sm:p-8 lg:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 lg:items-stretch">
            {/* Left Column (Desktop: 7 cols): Main Visual + Full-Width 5-Thumbnail Strip */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-2.5 sm:gap-3.5">
              <div
                onClick={() => setLightboxOpen(true)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800 cursor-pointer select-none group touch-pan-y"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.title}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0.85 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.85 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-stone-950/25 pointer-events-none" />

                {/* Top Minimalist Metadata Overlay */}
                <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-medium text-stone-200 bg-stone-950/85 px-2.5 py-1 sm:px-3 sm:py-1 rounded border border-white/10 backdrop-blur-md">
                    {activeItem.category}
                  </span>

                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-stone-200 bg-stone-950/85 px-2 py-1 sm:px-2.5 sm:py-1 rounded border border-white/10 backdrop-blur-md tabular-nums">
                    {currentIndex + 1} / {galleryItems.length}
                  </span>
                </div>

                {/* Previous / Next Arrow Controls */}
                <div className="absolute inset-y-0 inset-x-2 sm:inset-x-3 flex items-center justify-between pointer-events-none">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                    aria-label="Spațiul anterior"
                  >
                    <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                    aria-label="Spațiul următor"
                  >
                    <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>

                {/* Bottom Bar: Pagination Dots + Fullscreen Indicator */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 bg-stone-950/85 px-2 py-1.5 sm:px-2.5 rounded border border-white/10 backdrop-blur-md">
                    {galleryItems.map((item, i) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex(i);
                        }}
                        className={`h-1 rounded-full transition-all cursor-pointer ${
                          i === currentIndex ? 'w-4 sm:w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/75'
                        }`}
                        aria-label={`Selectează ${item.title}`}
                      />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded bg-stone-950/85 text-stone-100 group-hover:bg-white group-hover:text-stone-950 border border-white/15 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] backdrop-blur-md transition-colors pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Extinde 8K</span>
                  </span>
                </div>
              </div>

              {/* Full-Width 5-Thumbnail Strip Spanning 100% of Main Image */}
              <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
                {galleryItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative aspect-[4/3] sm:aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden border transition-all cursor-pointer ${
                      currentIndex === idx
                        ? 'border-white opacity-100'
                        : 'border-stone-800 opacity-50 hover:opacity-85'
                    }`}
                    title={item.title}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column (Desktop: 5 cols): Flush Top-to-Bottom Editorial Specification Sheet */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              {/* Top Block: Flush with top of Main Image */}
              <div className="space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-stone-400 font-medium flex-wrap">
                  <span className="tabular-nums">
                    Aplicație {String(currentIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-300">{activeItem.category}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-3xl font-normal tracking-tight text-white leading-[1.2] sm:leading-[1.18] [text-wrap:balance]">
                  {activeItem.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-normal pt-0.5 sm:pt-1">
                  {activeItem.caption}
                </p>
              </div>

              {/* Middle Block: Clean Hairline Architectural Specification Table */}
              <dl className="divide-y divide-stone-800/90 border-t border-b border-stone-800/90 my-5 sm:my-6">
                <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                    Tipologie spațiu
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-white sm:text-right leading-snug">
                    {activeItem.category}
                  </dd>
                </div>

                <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                    Tehnologie captură
                  </dt>
                  <dd className="text-sm sm:text-base font-medium text-white sm:text-right leading-snug">
                    Insta X5 8K HDR · Metareal Stage
                  </dd>
                </div>

                <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                    Specificații cheie
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-stone-200 sm:text-right leading-snug">
                    {activeItem.specs.replace(/\s*•\s*/g, ' · ')}
                  </dd>
                </div>

                <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
                  <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                    Livrare & acces
                  </dt>
                  <dd className="text-xs sm:text-sm font-medium text-stone-200 sm:text-right leading-snug">
                    24–72h · Desktop · Mobil · WebVR
                  </dd>
                </div>
              </dl>

              {/* Bottom Block: Flush with bottom of Thumbnail Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="h-11 sm:h-12 px-4 sm:px-5 rounded-lg bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
                >
                  <span>Extinde Imaginea 8K</span>
                  <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onRequestQuote
                      ? onRequestQuote(activeItem.category)
                      : handleNext()
                  }
                  className="h-11 sm:h-12 px-4 sm:px-5 rounded-lg bg-transparent hover:bg-stone-800/80 text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 text-xs font-medium uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
                >
                  <span>Solicită Ofertă</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 select-none cursor-pointer"
          onClick={() => setLightboxOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Închide previzualizarea"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>

          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Imaginea anterioară"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white border border-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Imaginea următoare"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.image}
              alt={activeItem.title}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-xl border border-stone-800"
            />
            <div className="mt-4 sm:mt-5 text-center text-white space-y-1.5 px-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-400">
                {activeItem.category}
              </div>
              <h3 className="font-serif text-lg sm:text-2xl font-normal text-white">
                {activeItem.title}
              </h3>
              <p className="font-sans text-stone-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

