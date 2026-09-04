import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Minimize2, ExternalLink, MapPin, Building, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { VirtualTourItem } from '../types';

interface VirtualTourViewerModalProps {
  tour: VirtualTourItem | null;
  onClose: () => void;
  onRequestQuote: (propertyType?: string) => void;
}

export const VirtualTourViewerModal: React.FC<VirtualTourViewerModalProps> = ({
  tour,
  onClose,
  onRequestQuote,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Lock background body scroll when viewer is open
  useEffect(() => {
    if (tour) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && tour) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tour, onClose]);

  if (!tour) return null;

  // Format Matterport / Kuula URL for clean embedded playback
  let cleanEmbedUrl = tour.embedUrl;
  if (cleanEmbedUrl.includes('matterport.com') && !cleanEmbedUrl.includes('&play=1')) {
    cleanEmbedUrl = cleanEmbedUrl.includes('?') ? `${cleanEmbedUrl}&play=1&qs=1` : `${cleanEmbedUrl}?play=1&qs=1`;
  }

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-stone-950/90 backdrop-blur-xl flex flex-col justify-between p-2 sm:p-4 md:p-6 overflow-y-auto select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.25 }}
        className={`relative w-full max-w-7xl mx-auto bg-stone-900 text-stone-100 rounded-2xl sm:rounded-3xl border border-stone-750/90 shadow-2xl flex flex-col overflow-hidden my-auto ${
          isFullscreen ? 'fixed inset-2 z-[70] max-w-none h-[calc(100vh-1rem)]' : 'min-h-[80vh] max-h-[92vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-0.5 max-w-xl pr-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-stone-300 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>{tour.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-stone-400">
                <MapPin className="w-3 h-3 text-bronze" />
                {tour.city}
              </span>
              {tour.surface && (
                <>
                  <span>•</span>
                  <span className="text-stone-300 font-mono">{tour.surface}</span>
                </>
              )}
            </div>
            <h3 className="font-serif text-base sm:text-xl text-white font-semibold truncate">
              {tour.title}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={tour.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-colors"
              title="Deschide în filă nouă"
            >
              <ExternalLink className="w-3.5 h-3.5 text-bronze" />
              <span>Fereastră Nouă</span>
            </a>

            <button
              onClick={toggleFullscreen}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title={isFullscreen ? 'Micșorează' : 'Ecran Complet'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Ieșire Fullscreen' : 'Fullscreen'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-white/15 transition-all flex items-center justify-center cursor-pointer active:scale-95 ml-1"
              aria-label="Închide"
              title="Închide"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Center: 3D Interactive Iframe Player */}
        <div className="relative flex-1 w-full bg-black min-h-[380px] sm:min-h-[460px]">
          <iframe
            src={cleanEmbedUrl}
            title={tour.title}
            allow="fullscreen; xr-spatial-tracking; accelerometer; gyroscope"
            className="w-full h-full border-0 absolute inset-0"
            loading="lazy"
          />
        </div>

        {/* Bottom Details & Call to Action Bar */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-stone-950/95 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1 max-w-2xl">
            <p className="text-stone-300 text-xs sm:text-sm line-clamp-1 sm:line-clamp-2">
              {tour.description}
            </p>
            {tour.features && tour.features.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
                {tour.features.map((feat, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900 border border-stone-800 text-[10px] text-stone-300 font-mono"
                  >
                    <span className="text-bronze">●</span>
                    {feat}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto pt-1 sm:pt-0">
            <button
              onClick={() => {
                onClose();
                onRequestQuote(tour.category);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer hover:scale-102"
            >
              <span>SOLICITĂ TUR PENTRU PROPRIETATEA TA</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
