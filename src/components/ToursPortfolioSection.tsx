import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  MapPin,
  Building,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  Search,
  PlusCircle,
  Eye,
  Check,
  ChevronRight,
} from 'lucide-react';
import { VirtualTourItem } from '../types';

interface ToursPortfolioSectionProps {
  tours: VirtualTourItem[];
  onOpenTourViewer: (tour: VirtualTourItem) => void;
  onRequestQuote: (propertyType?: string) => void;
  onOpenTourManager?: () => void;
}

export const ToursPortfolioSection: React.FC<ToursPortfolioSectionProps> = ({
  tours,
  onOpenTourViewer,
  onRequestQuote,
  onOpenTourManager,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toate');
  const [selectedCity, setSelectedCity] = useState<string>('Toate');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    <section id="virtual-tours" className="relative py-20 sm:py-32 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-850">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-bronze/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Admin Quick Access */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-bronze uppercase">
                PORTOFOLIU & TURURI VIRTUALE 3D
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.12]"
            >
              Proiecte 3D Realizate în Transilvania
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-stone-400 text-xs sm:text-sm leading-relaxed"
            >
              Explorați tururile virtuale 8K realizate pentru clienții noștri: vile rezidențiale, apartamente de lux, penthouse-uri, showroom-uri comerciale și locații HoReCa.
            </motion.p>
          </div>

          {/* Admin Tour Manager Trigger Button */}
          {onOpenTourManager && (
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenTourManager}
                className="px-4 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-700/80 text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-md cursor-pointer hover:border-bronze"
                title="Deschide panoul de administrare pentru adăugare și editare tururi"
              >
                <PlusCircle className="w-4 h-4 text-bronze" />
                <span>Gestionează / Adaugă Tururi</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-stone-900/80 p-3 sm:p-4 rounded-2xl border border-stone-800 backdrop-blur-md">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-stone-100 text-stone-950 shadow-md'
                      : 'bg-stone-950/70 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* City Dropdown & Search Input */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <div className="relative min-w-[140px] flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-8 pr-3 py-2 text-xs text-stone-200 focus:outline-none cursor-pointer"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city === 'Toate' ? 'Toate Orașele' : city}
                    </option>
                  ))}
                </select>
              </div>

              <div className="relative flex-1 lg:w-48">
                <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Caută proprietate..."
                  className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-stone-600 focus:outline-none"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Tours Cards Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTours.map((tour, idx) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group rounded-3xl bg-stone-900/90 border border-stone-800 hover:border-stone-700/80 shadow-luxury-card overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl"
              >
                {/* Card Top: Cover Image with Interactive Overlay */}
                <div>
                  <div
                    onClick={() => onOpenTourViewer(tour)}
                    className="relative aspect-[16/10] w-full overflow-hidden cursor-pointer bg-stone-950"
                  >
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-106"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-stone-950/30 group-hover:opacity-80 transition-opacity" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/15 text-[10px] font-bold tracking-wider text-stone-200 uppercase flex items-center gap-1.5 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>3D TOUR 8K</span>
                      </span>

                      <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-bronze uppercase shadow-md">
                        {tour.city}
                      </span>
                    </div>

                    {/* Center Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-13 h-13 rounded-full bg-white/95 text-stone-950 flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] group-hover:scale-110 group-hover:bg-bronze transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    {/* Bottom Specs Pill */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-stone-300 font-medium tracking-wide">
                      <span className="bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                        {tour.category}
                      </span>
                      {tour.surface && (
                        <span className="bg-stone-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-mono text-white">
                          {tour.surface}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body Details */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="space-y-1">
                      <h3
                        onClick={() => onOpenTourViewer(tour)}
                        className="font-serif text-lg sm:text-xl text-white font-semibold leading-tight line-clamp-1 group-hover:text-bronze-light transition-colors cursor-pointer"
                      >
                        {tour.title}
                      </h3>
                      {tour.rooms && (
                        <p className="text-[11px] font-mono text-stone-400">
                          {tour.rooms}
                        </p>
                      )}
                    </div>

                    <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">
                      {tour.description}
                    </p>

                    {/* Key Feature Chips */}
                    {tour.features && tour.features.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {tour.features.slice(0, 3).map((feat, fIdx) => (
                          <span
                            key={fIdx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-stone-400 font-mono"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-2 border-t border-stone-850 flex items-center gap-2.5">
                  <button
                    onClick={() => onOpenTourViewer(tour)}
                    className="flex-1 py-2.5 rounded-xl bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-101"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>EXPLOREAZĂ 3D</span>
                  </button>

                  <button
                    onClick={() => onRequestQuote(tour.category)}
                    className="px-3.5 py-2.5 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-750 text-xs font-semibold uppercase transition-colors cursor-pointer"
                    title="Solicită un tur similar"
                  >
                    Ofertă
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center space-y-3 bg-stone-900/40 rounded-3xl border border-stone-800">
            <p className="text-stone-400 text-sm">
              Nu am găsit niciun tur virtual care să corespundă filtrelor selectate.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Toate');
                setSelectedCity('Toate');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-stone-800 text-white text-xs font-semibold uppercase"
            >
              Resetează Filtrele
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
