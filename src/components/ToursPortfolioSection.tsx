import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { VirtualTourItem } from '../types';

interface ToursPortfolioSectionProps {
  tours: VirtualTourItem[];
  onOpenTourViewer: (tour: VirtualTourItem) => void;
  onRequestQuote: (propertyType?: string) => void;
  onOpenTourManager?: () => void;
}

// Individual Project Card with interactive multi-image paging (up to 10 images)
const ProjectCard: React.FC<{
  tour: VirtualTourItem;
  projectIndex: string;
  onOpenTourViewer: (tour: VirtualTourItem) => void;
  onRequestQuote: (category?: string) => void;
}> = ({ tour, projectIndex, onOpenTourViewer, onRequestQuote }) => {
  // Collect images: prioritize tour.images, fallback to [tour.coverImage]
  const images = useMemo(() => {
    if (tour.images && tour.images.length > 0) {
      return tour.images.slice(0, 10);
    }
    return tour.coverImage ? [tour.coverImage] : ['/images/retreat_courtyard.jpg'];
  }, [tour.images, tour.coverImage]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImgIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || images.length <= 1) return;
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
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="gpu-smooth group flex flex-col justify-between space-y-4"
    >
      {/* Image Frame with Multi-Image Slider */}
      <div className="space-y-4">
        <div
          onClick={() => onOpenTourViewer(tour)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800 cursor-pointer select-none touch-pan-y"
        >
          {/* Active Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImgIndex]}
              src={images[currentImgIndex]}
              alt={`${tour.title} - Foto ${currentImgIndex + 1}`}
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </AnimatePresence>

          {/* Quiet Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/70 via-transparent to-transparent opacity-70 pointer-events-none" />

          {/* Top: Project index & photo counter */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="text-[11px] font-medium uppercase tracking-wider text-stone-200 bg-stone-950/80 px-2 py-0.5 rounded-sm border border-white/10 tabular-nums">
              Nr. {projectIndex}
            </span>

            <span className="text-[11px] font-medium tracking-wider text-stone-200 bg-stone-950/80 px-2 py-0.5 rounded-sm border border-white/10 tabular-nums">
              {currentImgIndex + 1} / {images.length}
            </span>
          </div>

          {/* Previous / Next Arrow Controls (Visible on hover & touch) */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                aria-label="Imaginea anterioară"
                title="Imaginea anterioară"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                aria-label="Imaginea următoare"
                title="Imaginea următoare"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          )}

          {/* Bottom Pagination Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-stone-950/70 px-2 py-1.5 rounded-sm border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => handleSelectDot(e, i)}
                  className={`h-1 rounded-full transition-all cursor-pointer ${
                    i === currentImgIndex
                      ? 'w-4 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Sari la fotografia ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Right: interactive tour label */}
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <div className="px-2 py-0.5 rounded-sm bg-stone-950/80 border border-white/15 text-[11px] font-medium tracking-wider text-stone-200 uppercase flex items-center gap-1.5 group-hover:border-stone-400 transition-colors">
              <Eye className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
              <span>Tur interactiv</span>
            </div>
          </div>
        </div>

        {/* Tags, Title & Metadata */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-stone-400 font-medium">
            <span>Proiect Finalizat</span>
            {tour.category && (
              <>
                <span className="text-stone-600">·</span>
                <span className="text-stone-300">{tour.category}</span>
              </>
            )}
          </div>

          <h3
            onClick={() => onOpenTourViewer(tour)}
            className="font-serif text-xl font-normal text-white tracking-tight leading-snug cursor-pointer group-hover:text-stone-300 transition-colors [text-wrap:balance]"
          >
            {tour.title}
          </h3>

          <p className="font-sans text-sm text-stone-400 leading-relaxed font-normal">
            {tour.description}
          </p>

          {/* Minimalist Hairline Specification Table */}
          <dl className="divide-y divide-stone-800/90 border-t border-b border-stone-800/90">
            <div className="py-2.5 flex items-baseline justify-between gap-3">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-400">
                Suprafață
              </dt>
              <dd className="text-xs sm:text-sm font-medium text-white tabular-nums text-right">
                {tour.surface || '—'}
              </dd>
            </div>
            <div className="py-2.5 flex flex-col xs:flex-row sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-400">
                Compartimentare
              </dt>
              <dd className="text-xs sm:text-sm font-medium text-white sm:text-right">
                {tour.rooms || '—'}
              </dd>
            </div>
            <div className="py-2.5 flex flex-col xs:flex-row sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <dt className="text-[11px] uppercase tracking-[0.14em] text-stone-400">
                Localizare
              </dt>
              <dd className="text-xs sm:text-sm font-medium text-white sm:text-right">
                {tour.city || '—'}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenTourViewer(tour)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-white hover:text-stone-300 transition-colors cursor-pointer"
        >
          <span>Explorează Turul 3D</span>
          <ArrowRight className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
        </button>

        <button
          onClick={() => onRequestQuote(tour.category)}
          className="text-xs uppercase tracking-[0.14em] font-medium text-stone-400 hover:text-white transition-colors cursor-pointer"
        >
          Solicită Ofertă
        </button>
      </div>
    </motion.article>
  );
};

// Featured Architectural Case Study Layout (Norm Architects / Foster + Partners Hairline Grid)
const FeaturedCaseStudy: React.FC<{
  tour: VirtualTourItem;
  onOpenTourViewer: (tour: VirtualTourItem) => void;
  onRequestQuote: (propertyType?: string) => void;
}> = ({ tour, onOpenTourViewer, onRequestQuote }) => {
  const images = useMemo(() => {
    if (tour.images && tour.images.length > 0) {
      return tour.images.slice(0, 10);
    }
    return tour.coverImage ? [tour.coverImage] : ['/images/retreat_terrace.jpg'];
  }, [tour.images, tour.coverImage]);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || images.length <= 1) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const thumbColsClass =
    images.length === 2
      ? 'grid-cols-2'
      : images.length === 3
      ? 'grid-cols-3'
      : 'grid-cols-4';

  return (
    <div className="rounded-2xl bg-stone-900/40 border border-stone-800/90 p-4 sm:p-8 lg:p-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 lg:items-stretch">
        {/* Left Column (Desktop: 7 cols): Main Visual + Full-Width Thumbnail Strip */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-2.5 sm:gap-3.5">
          <div
            onClick={() => onOpenTourViewer(tour)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-stone-950 border border-stone-800 cursor-pointer select-none group touch-pan-y"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={images[currentImgIndex]}
                src={images[currentImgIndex]}
                alt={`${tour.title} - Foto ${currentImgIndex + 1}`}
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.85 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/25 pointer-events-none" />

            {/* Top Minimalist Metadata Overlay */}
            <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.16em] font-medium text-stone-200 bg-stone-950/85 px-2.5 py-1 sm:px-3 sm:py-1 rounded border border-white/10 backdrop-blur-md">
                Studiu de caz · 01
              </span>

              <span className="text-[10px] sm:text-[11px] font-medium tracking-wider text-stone-200 bg-stone-950/85 px-2 py-1 sm:px-2.5 sm:py-1 rounded border border-white/10 backdrop-blur-md tabular-nums">
                {currentImgIndex + 1} / {images.length}
              </span>
            </div>

            {/* Slider Controls */}
            {images.length > 1 && (
              <div className="absolute inset-y-0 inset-x-2 sm:inset-x-3 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                  aria-label="Imaginea anterioară"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-colors duration-200 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer"
                  aria-label="Imaginea următoare"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            )}

            {/* Bottom Bar: Pagination Dots + Clean Launch Indicator */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
              {images.length > 1 ? (
                <div className="flex items-center gap-1.5 bg-stone-950/85 px-2 py-1.5 sm:px-2.5 rounded border border-white/10 backdrop-blur-md">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImgIndex(i);
                      }}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        i === currentImgIndex ? 'w-4 sm:w-5 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/75'
                      }`}
                      aria-label={`Fotografia ${i + 1}`}
                    />
                  ))}
                </div>
              ) : (
                <span />
              )}

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded bg-stone-950/85 text-stone-100 group-hover:bg-white group-hover:text-stone-950 border border-white/15 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.12em] sm:tracking-[0.14em] backdrop-blur-md transition-colors pointer-events-none">
                <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Tur 3D Interactiv</span>
              </span>
            </div>
          </div>

          {/* Thumbnail preview strip spanning 100% width of main image */}
          {images.length > 1 && (
            <div className={`grid ${thumbColsClass} gap-2 sm:gap-3`}>
              {images.slice(0, 4).map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImgIndex(idx)}
                  className={`relative aspect-[16/9] rounded-md sm:rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    currentImgIndex === idx
                      ? 'border-white opacity-100'
                      : 'border-stone-800 opacity-50 hover:opacity-85'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniatură ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (Desktop: 5 cols): Flush Top-to-Bottom Editorial Specification Sheet */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {/* Top Block: Flush with top of Main Image */}
          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-stone-400 font-medium flex-wrap">
              <span>Studiu de caz</span>
              {tour.category && (
                <>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-300">{tour.category}</span>
                </>
              )}
            </div>

            <h3 className="font-serif text-xl sm:text-3xl font-normal tracking-tight text-white leading-[1.2] sm:leading-[1.18] [text-wrap:balance]">
              {tour.title}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-normal pt-0.5 sm:pt-1">
              {tour.description}
            </p>
          </div>

          {/* Middle Block: Clean Hairline Architectural Specification Table */}
          <dl className="divide-y divide-stone-800/90 border-t border-b border-stone-800/90 my-5 sm:my-6">
            <div className="py-3 sm:py-3.5 flex items-baseline justify-between gap-4">
              <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                Suprafață utilă
              </dt>
              <dd className="text-sm sm:text-base font-medium text-white tabular-nums text-right">
                {tour.surface || '86 m²'}
              </dd>
            </div>

            <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                Compartimentare
              </dt>
              <dd className="text-sm sm:text-base font-medium text-white sm:text-right leading-snug">
                {tour.rooms || '3 Camere + Terasă Exterioară'}
              </dd>
            </div>

            <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                Localizare
              </dt>
              <dd className="text-sm sm:text-base font-medium text-white sm:text-right leading-snug">
                {tour.city || 'Satu Mare (Zonă Centrală)'}
              </dd>
            </div>

            <div className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <dt className="text-[11px] sm:text-xs uppercase tracking-[0.14em] text-stone-400 flex-shrink-0">
                Livrabile 3D
              </dt>
              <dd className="text-xs sm:text-sm font-medium text-stone-200 sm:text-right leading-snug">
                Scanare 8K · Dollhouse 3D · Plan 2D · Riglă
              </dd>
            </div>
          </dl>

          {/* Bottom Block: Flush with bottom of Thumbnail Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <button
              onClick={() => onOpenTourViewer(tour)}
              className="h-11 sm:h-12 px-4 sm:px-5 rounded-lg bg-white hover:bg-stone-200 text-stone-950 text-xs font-semibold uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
            >
              <span>Explorează Modelul 3D</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>

            <button
              onClick={() => onRequestQuote('Apartament Premium')}
              className="h-11 sm:h-12 px-4 sm:px-5 rounded-lg bg-transparent hover:bg-stone-800/80 text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 text-xs font-medium uppercase tracking-[0.12em] inline-flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-[0.99]"
            >
              <span>Solicită Ofertă</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ToursPortfolioSection: React.FC<ToursPortfolioSectionProps> = ({
  tours,
  onOpenTourViewer,
  onRequestQuote,
  onOpenTourManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate');
  const [selectedCity, setSelectedCity] = useState<string>('Toate');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Secret admin trigger via 3 rapid clicks on the discreet badge dot
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretTrigger = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      onOpenTourManager?.();
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 700);
    }
  };

  // Primary featured case study
  const featuredTour = tours[0] || null;
  const additionalTours = tours.length > 1 ? tours.slice(1) : [];

  // Extract unique categories and cities for additional projects if present
  const categories = useMemo(() => {
    const set = new Set<string>();
    additionalTours.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ['Toate', ...Array.from(set)];
  }, [additionalTours]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    additionalTours.forEach((t) => {
      if (t.city) set.add(t.city);
    });
    return ['Toate', ...Array.from(set)];
  }, [additionalTours]);

  // Filtered additional tours
  const filteredAdditionalTours = useMemo(() => {
    return additionalTours.filter((tour) => {
      const matchCat = selectedCategory === 'Toate' || tour.category === selectedCategory;
      const matchCity = selectedCity === 'Toate' || tour.city === selectedCity;
      const matchSearch =
        !searchQuery.trim() ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchCity && matchSearch;
    });
  }, [additionalTours, selectedCategory, selectedCity, searchQuery]);

  return (
    <section id="virtual-tours" className="relative py-16 md:py-24 bg-[#11100F] text-stone-100 overflow-hidden border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16 pb-8 border-b border-stone-800">
          <div className="space-y-4 max-w-3xl">
            
            {/* Eyebrow with Hidden Owner Trigger (3 rapid clicks) */}
            <div className="flex items-center gap-3">
              <span
                onClick={handleSecretTrigger}
                className="w-1.5 h-1.5 rounded-full bg-stone-600 cursor-pointer"
                title="TransylView 3D"
              />
              <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 block">
                Portofoliu · Tururi virtuale 3D
              </span>
            </div>

            <h2
              onDoubleClick={handleSecretTrigger}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-100 leading-tight [text-wrap:balance]"
            >
              Proprietăți digitalizate în rezoluție 8K
            </h2>

            <p className="font-sans text-base sm:text-lg text-stone-300 font-normal leading-relaxed max-w-2xl">
              Fiecare proiect include un tur volumetric 3D interactiv Metareal Stage complet și fotografii de catalog la rezoluție 8K. Explorați studiul nostru de caz de referință din Satu Mare.
            </p>
          </div>

          {/* Project Counter */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums">
              {String(tours.length).padStart(2, '0')}
            </span>
            <span className="font-sans text-xs text-stone-500 leading-normal tracking-wide tabular-nums">
              {tours.length === 1 ? 'proiect de referință' : `din ${tours.length} proiecte`}
            </span>
          </div>
        </div>

        {/* Featured Case Study Hero Showcase */}
        {featuredTour && (
          <FeaturedCaseStudy
            tour={featuredTour}
            onOpenTourViewer={onOpenTourViewer}
            onRequestQuote={onRequestQuote}
          />
        )}

        {/* Additional Projects (if more tours are added by Admin) */}
        {additionalTours.length > 0 && (
          <div className="mt-16 sm:mt-20 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-stone-800">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Alte proiecte din portofoliu
              </h3>

              {/* City & Search Controls */}
              <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial md:min-w-[150px]">
                  <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    aria-label="Filtrează după oraș"
                    className="w-full bg-stone-900/60 border border-stone-800 text-stone-300 focus:border-stone-600 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none transition-colors cursor-pointer"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city === 'Toate' ? 'Toate orașele' : city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1 md:flex-initial md:w-56">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Caută în portofoliu..."
                    aria-label="Caută în portofoliu"
                    className="w-full bg-stone-900/60 border border-stone-800 text-stone-200 placeholder-stone-500 focus:border-stone-600 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Additional Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredAdditionalTours.map((tour, idx) => {
                const projectIndex = String(idx + 2).padStart(2, '0');
                return (
                  <ProjectCard
                    key={tour.id}
                    tour={tour}
                    projectIndex={projectIndex}
                    onOpenTourViewer={onOpenTourViewer}
                    onRequestQuote={onRequestQuote}
                  />
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
