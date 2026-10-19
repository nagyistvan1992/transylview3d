import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, Maximize2, Minimize2, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';

interface LiveTourSectionProps {
  onBookCall: () => void;
}

// Technical specification rows
const techSpecs: { label: string; value: string; note: string }[] = [
  { label: 'Rezoluție captură', value: '8K HDR', note: 'Echipament Insta X5 8K, imagini panoramice calibrate' },
  { label: 'Motor volumetric', value: 'Metareal Stage', note: 'Reconstrucție spațială 3D pentru interior și exterior' },
  { label: 'Acoperire spațială', value: 'Interior & Exterior', note: 'Curți, terase și grădini în plin soare, fără limitări laser' },
  { label: 'Model volumetric', value: 'Dollhouse 3D', note: 'Vizualizare secțională completă și perspectivă pe nivele' },
  { label: 'Plan de etaj', value: 'Plan 2D cotat', note: 'Releveu schematic cu cote și suprafețe utile integrate' },
  { label: 'Măsurători', value: 'Riglă digitală milimetrică', note: 'Măsurarea pereților și a mobilierului direct în browser' },
  { label: 'Personalizare', value: 'White-Label 100%', note: 'Fără branding terț, dedicat exclusiv agenției tale' },
  { label: 'Termen de predare', value: '24–72 ore', note: 'În funcție de suprafață · Prioritate Pachet Exclusiv' },
];

export const LiveTourSection: React.FC<LiveTourSectionProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [isMobileTouch, setIsMobileTouch] = useState(false);
  const [isTouchInteractive, setIsTouchInteractive] = useState(false);

  // Exact Metareal Stage 3D Showcase Space
  const metarealUrl =
    'https://tour.metareal.com/apps/player?asset=a6eb7cb7-206c-4dce-94d7-12e71246ea2a&position=-0.72x1.62y1.51z&rotation=0.00x255.81y0.00z';

  // Detect touch device so vertical page scrolling doesn't get hijacked by the 3D WebGL canvas
  useEffect(() => {
    const checkTouch = () => {
      const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      setIsMobileTouch(mobile);
      if (!mobile) {
        setIsTouchInteractive(true);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Lazy-mount the heavy 3D WebGL player when approaching the section
  useEffect(() => {
    const el = containerRef.current;
    if (!el || shouldLoadIframe) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadIframe(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadIframe(true);
          observer.disconnect();
        }
      },
      { rootMargin: '550px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoadIframe]);

  // Native Fullscreen API Handler
  const toggleFullscreen = async () => {
    setShouldLoadIframe(true);
    setIsTouchInteractive(true);
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current) {
          if (containerRef.current.requestFullscreen) {
            await containerRef.current.requestFullscreen();
          } else if ((containerRef.current as any).webkitRequestFullscreen) {
            await (containerRef.current as any).webkitRequestFullscreen();
          }
          setIsFullscreen(true);
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
        setIsFullscreen(false);
      }
    } catch (e) {
      console.error('Fullscreen toggle error:', e);
      setIsFullscreen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <section id="demo-tour" className="relative py-16 md:py-24 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gpu-smooth text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3 px-2"
        >
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 block">
            Demo 3D Interactiv · Tehnologie Metareal Stage
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-100 leading-tight [text-wrap:balance]">
            Explorează proprietatea <span className="text-bronze-light">direct în pagină</span>
          </h2>

          <p className="font-sans text-sm sm:text-base text-stone-300 font-normal leading-relaxed max-w-2xl mx-auto [text-wrap:balance]">
            Navigați liber prin fiecare încăpere la 360°, inspectați modelul secțional Dollhouse 3D și verificați măsurătorile milimetrice direct pe această pagină.
          </p>
        </motion.div>

        {/* Dedicated Top Controls Bar */}
        <div className="mb-3 flex items-center justify-between gap-3 bg-stone-900/70 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-stone-800 shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">
                Tur Virtual 3D Activ
              </span>
              <span className="text-[11px] sm:text-xs text-stone-400 truncate">
                · Metareal Stage 8K
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={metarealUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border border-stone-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              title="Deschide turul în filă nouă"
            >
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
              <span className="hidden sm:inline">Filă nouă</span>
            </a>

            <button
              onClick={toggleFullscreen}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-md bg-white text-stone-900 text-xs sm:text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer active:scale-[0.98]"
              title={isFullscreen ? 'Ieși din ecran complet' : 'Ecran complet'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" strokeWidth={1.5} /> : <Maximize2 className="w-4 h-4" strokeWidth={1.5} />}
              <span>{isFullscreen ? 'Ieșire' : 'Ecran complet'}</span>
            </button>
          </div>
        </div>

        {/* 3D Showcase Viewport: Embedded Direct Player */}
        <div
          ref={containerRef}
          className={`relative rounded-xl overflow-hidden bg-black border border-stone-800 shadow-2xl transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-0 z-[99999] rounded-none w-screen h-screen m-0 p-0 bg-black'
              : 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full min-h-[420px] sm:min-h-[560px] max-h-[780px]'
          }`}
        >
          {/* In Fullscreen mode: Floating Exit button */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-stone-900/90 hover:bg-stone-800 text-white border border-white/30 text-sm font-semibold shadow-xl transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" strokeWidth={1.5} />
                <span>Ieși din ecran complet</span>
              </button>
            </div>
          )}

          {/* Mobile Touch Scroll-Guard Overlay: prevents accidental scroll trapping while gliding down the page */}
          {isMobileTouch && !isFullscreen && !isTouchInteractive && (
            <div
              onClick={() => {
                setShouldLoadIframe(true);
                setIsTouchInteractive(true);
              }}
              className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-6 sm:pb-8 bg-gradient-to-t from-stone-950/80 via-stone-950/15 to-transparent touch-pan-y cursor-pointer"
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShouldLoadIframe(true);
                  setIsTouchInteractive(true);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-950/90 text-white border border-white/25 shadow-xl backdrop-blur-md text-xs font-semibold tracking-wide active:scale-95 transition-transform"
              >
                <Compass className="w-4 h-4 text-bronze-light" strokeWidth={1.75} />
                <span>Atinge pentru a explora 3D în pagină</span>
              </button>
            </div>
          )}

          {/* Mobile Active 3D Lock Button: lets user easily resume smooth vertical page scrolling */}
          {isMobileTouch && !isFullscreen && isTouchInteractive && (
            <div className="absolute top-3 left-3 z-30">
              <button
                type="button"
                onClick={() => setIsTouchInteractive(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-950/85 text-stone-200 border border-white/20 shadow-md backdrop-blur-md text-[11px] font-medium active:scale-95"
              >
                <span>Blochează 3D pt. derulare pagină</span>
              </button>
            </div>
          )}

          {/* Authentic Loading Screen Overlay with Real Metareal Screenshot */}
          {!isIframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-950 transition-opacity duration-500">
              <img
                src="/images/metareal_showcase_cover.jpg"
                alt="Tur Virtual 3D Metareal Stage - Previzualizare"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-sm" />
              <div className="relative z-20 flex flex-col items-center gap-3 text-center px-4 max-w-sm">
                <Loader2 className="w-7 h-7 text-white animate-spin" strokeWidth={2} />
                <div className="space-y-1">
                  <span className="font-serif text-base sm:text-lg font-semibold text-white block">
                    Încărcare Tur Virtual 3D...
                  </span>
                  <p className="font-sans text-xs text-stone-300">
                    Pregătim motorul volumetric Metareal Stage
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* The Live Interactive Metareal Stage Player Iframe */}
          {shouldLoadIframe && (
            <iframe
              src={metarealUrl}
              className={`w-full h-full border-0 absolute inset-0 ${
                isMobileTouch && !isFullscreen && !isTouchInteractive ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
              allow="fullscreen; accelerometer; gyroscope; vr; xr; xr-spatial-tracking"
              title="TransylView 3D — Tur Virtual Interactiv Metareal Stage"
              onLoad={() => setIsIframeLoaded(true)}
            />
          )}
        </div>

        {/* Interactive Usage Hints: Clean 3-column typographic steps */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-baseline gap-3 p-3.5 bg-stone-900/50 rounded-lg border border-stone-800/80">
            <span className="font-sans text-xs font-bold tracking-widest text-bronze-light tabular-nums flex-shrink-0">
              01
            </span>
            <span className="font-sans text-xs text-stone-300 leading-snug">
              Clic și trage pentru a roti perspectiva la 360° în orice direcție
            </span>
          </div>

          <div className="flex items-baseline gap-3 p-3.5 bg-stone-900/50 rounded-lg border border-stone-800/80">
            <span className="font-sans text-xs font-bold tracking-widest text-bronze-light tabular-nums flex-shrink-0">
              02
            </span>
            <span className="font-sans text-xs text-stone-300 leading-snug">
              Comută între perspectiva Dollhouse 3D și navigarea pas cu pas
            </span>
          </div>

          <div className="flex items-baseline gap-3 p-3.5 bg-stone-900/50 rounded-lg border border-stone-800/80">
            <span className="font-sans text-xs font-bold tracking-widest text-bronze-light tabular-nums flex-shrink-0">
              03
            </span>
            <span className="font-sans text-xs text-stone-300 leading-snug">
              Măsoară pereții și mobilierul cu rigla digitală integrată
            </span>
          </div>
        </div>

        {/* Technical Specifications + CTA */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 block mb-4">
              Specificații tehnice
            </span>
            <dl className="divide-y divide-stone-800 border-t border-b border-stone-800">
              {techSpecs.map((spec) => (
                <div key={spec.label} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-6 py-4">
                  <dt className="sm:col-span-4 text-xs font-medium uppercase tracking-wider text-stone-400 sm:pt-1">
                    {spec.label}
                  </dt>
                  <dd className="sm:col-span-8 space-y-0.5">
                    <span className="block font-sans text-base sm:text-lg font-semibold text-stone-100 tracking-tight">
                      {spec.value}
                    </span>
                    <span className="block font-sans text-xs text-stone-500 leading-normal tracking-wide">
                      {spec.note}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-5 bg-stone-900/60 border border-stone-800 rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="font-sans text-lg sm:text-xl font-semibold text-stone-100 tracking-tight leading-snug">
              Scanare 3D la acest standard pentru proprietatea dumneavoastră
            </h3>
            <p className="font-sans text-sm sm:text-base text-stone-400 leading-relaxed font-normal">
              Ne deplasăm în Satu Mare și în toată Transilvania cu echipamentul Insta X5 8K. Predare în 24–72h în funcție de suprafață (prioritate la procesare pentru Pachetul Exclusiv).
            </p>
            <button
              onClick={onBookCall}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors active:scale-[0.98] cursor-pointer"
            >
              <span>Solicită ofertă și scanare 3D</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
