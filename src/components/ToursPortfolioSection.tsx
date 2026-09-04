import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Search,
  ArrowRight,
  Eye,
  ChevronLeft,
  ChevronRight,
  Camera,
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

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleSelectDot = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setCurrentImgIndex(index);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group flex flex-col justify-between space-y-4"
    >
      {/* Image Frame with Multi-Image Slider */}
      <div className="space-y-3">
        <div
          onClick={() => onOpenTourViewer(tour)}
          className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-950 border border-stone-800/80 cursor-pointer select-none"
        >
          {/* Active Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={images[currentImgIndex]}
              src={images[currentImgIndex]}
              alt={`${tour.title} - Foto ${currentImgIndex + 1}`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
            />
          </AnimatePresence>

          {/* Quiet Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/80 via-transparent to-[#11100F]/20 opacity-60 pointer-events-none" />

          {/* Top Minimalist Data Pill */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="font-mono text-[10px] tracking-widest text-stone-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase">
              {projectIndex} • {tour.city}
            </span>

            {/* Photo Counter Pill (e.g. 1 / 4 FOTO) */}
            <span className="font-mono text-[10px] tracking-widest text-stone-300 bg-stone-950/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase flex items-center gap-1.5">
              <Camera className="w-3 h-3 text-bronze" />
              <span>
                {currentImgIndex + 1} / {images.length}
              </span>
            </span>
          </div>

          {/* Previous / Next Arrow Controls (Visible on hover & touch) */}
          {images.length > 1 && (
            <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-all duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Imaginea anterioară"
                title="Imaginea anterioară"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full bg-stone-950/80 hover:bg-stone-900 text-stone-200 hover:text-white border border-white/15 flex items-center justify-center pointer-events-auto transition-all duration-200 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer shadow-lg"
                aria-label="Imaginea următoare"
                title="Imaginea următoare"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Bottom Pagination Dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-stone-950/70 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => handleSelectDot(e, i)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === currentImgIndex
                      ? 'w-4 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Sari la fotografia ${i + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bottom Right Floating Badge */}
          <div className="absolute bottom-3 right-3 pointer-events-none">
            <div className="px-3 py-1.5 rounded-full bg-stone-950/85 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-wider text-stone-200 uppercase flex items-center gap-1.5 shadow-lg group-hover:border-stone-400 transition-colors">
              <Eye className="w-3 h-3 text-bronze" />
              <span>TUR INTERACTIV</span>
            </div>
          </div>
        </div>

        {/* Metadata & Title */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
            {tour.surface && <span>{tour.surface}</span>}
            {tour.surface && tour.rooms && <span>•</span>}
            {tour.rooms && <span>{tour.rooms}</span>}
            {tour.category && (
              <>
                <span>•</span>
                <span className="text-stone-300">{tour.category}</span>
              </>
            )}
          </div>

          <h3
            onClick={() => onOpenTourViewer(tour)}
            className="font-serif text-xl sm:text-2xl text-stone-100 font-normal leading-snug cursor-pointer group-hover:text-bronze transition-colors"
          >
            {tour.title}
          </h3>

          <p className="text-xs text-stone-400 font-light leading-relaxed line-clamp-2">
            {tour.description}
          </p>
        </div>
      </div>

      {/* Editorial Actions */}
      <div className="pt-3 border-t border-stone-850 flex items-center justify-between">
        <button
          onClick={() => onOpenTourViewer(tour)}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-200 hover:text-white transition-colors cursor-pointer group/btn"
        >
          <span>Vizionează Turul 3D</span>
          <ArrowRight className="w-3.5 h-3.5 text-bronze group-hover/btn:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => onRequestQuote(tour.category)}
          className="text-xs text-stone-400 hover:text-stone-200 transition-colors cursor-pointer font-light"
        >
          Cotație similară
        </button>
      </div>
    </motion.article>
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

  // Extract unique categories and cities
  const categories = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return ['Toate', ...Array.from(set)];
  }, [tours]);

  const cities = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((t) => {
      if (t.city) set.add(t.city);
    });
    return ['Toate', ...Array.from(set)];
  }, [tours]);

  // Filtered tours
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const matchCat = selectedCategory === 'Toate' || tour.category === selectedCategory;
      const matchCity = selectedCity === 'Toate' || tour.city === selectedCity;
      const matchSearch =
        !searchQuery.trim() ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchCity && matchSearch;
    });
  }, [tours, selectedCategory, selectedCity, searchQuery]);

  return (
    <section id="virtual-tours" className="relative py-24 sm:py-36 bg-[#11100F] text-stone-100 overflow-hidden border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 pb-8 border-b border-stone-800/60">
          <div className="space-y-4 max-w-3xl">
            
            {/* Subtle Badge with Hidden Owner Trigger */}
            <div className="flex items-center gap-3">
              <span
                onClick={handleSecretTrigger}
                className="w-2 h-2 rounded-full bg-bronze/80 cursor-pointer hover:scale-150 transition-transform"
                title="TransylView 3D"
              />
              <span className="text-[11px] font-mono tracking-[0.3em] text-stone-400 uppercase">
                01 / ARHIVĂ DIGITALĂ & TURURI 3D
              </span>
            </div>

            <h2
              onDoubleClick={handleSecretTrigger}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-stone-100 tracking-tight leading-[1.1]"
            >
              Colecție de Spații & Proprietăți 8K
            </h2>

            <p className="text-stone-400 text-sm sm:text-base font-light leading-relaxed max-w-2xl">
              Fiecare proiect include tur 3D interactiv complet și o galerie foto de înaltă rezoluție. Răsfoiți fotografiile sau lansați turul virtual la 360° pentru a păși direct în spațiu.
            </p>
          </div>

          {/* Architectural Project Counter */}
          <div className="flex items-baseline gap-2 font-mono text-stone-500">
            <span className="text-2xl sm:text-3xl text-stone-200 font-serif">
              {String(filteredTours.length).padStart(2, '0')}
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400">
              / {String(tours.length).padStart(2, '0')} PROIECTE DISPONIBILE
            </span>
          </div>
        </div>

        {/* Minimalist Editorial Filter Bar */}
        <div className="mb-14 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-stone-850">
            
            {/* Horizontal Text Filter Tabs */}
            <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative py-2 text-xs sm:text-sm tracking-wider uppercase font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      isActive ? 'text-stone-100' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-stone-300"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* City & Search Controls */}
            <div className="flex items-center gap-3">
              <div className="relative min-w-[140px]">
                <MapPin className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-stone-900/90 border border-stone-800 text-stone-300 focus:border-stone-600 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none transition-colors cursor-pointer"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'Toate' ? 'Toate Orașele' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative w-44 sm:w-56">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută în arhivă..."
                  className="w-full bg-stone-900/90 border border-stone-800 text-stone-200 placeholder-stone-500 focus:border-stone-600 rounded-xl pl-8 pr-3 py-2 text-xs focus:outline-none transition-colors"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Exhibition Case Studies Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredTours.map((tour, idx) => {
              const projectIndex = String(idx + 1).padStart(2, '0');
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
        ) : (
          <div className="py-20 text-center space-y-4 border border-stone-800/80 rounded-2xl bg-stone-900/30">
            <p className="text-stone-400 text-sm font-light">
              Nu am găsit niciun proiect care să corespundă criteriilor selectate.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Toate');
                setSelectedCity('Toate');
                setSearchQuery('');
              }}
              className="px-5 py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono tracking-wider uppercase transition-colors"
            >
              Resetează Căutarea
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
