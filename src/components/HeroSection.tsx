import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowDown, ChevronDown, Menu, X } from 'lucide-react';
import { propertyHeroData } from '../data/propertyData';

interface HeroSectionProps {
  heroImage: string;
  onBookCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Motion value for scroll-locked progression (0 = start, 1 = fully assembled)
  const progress = useMotionValue(0);
  const progressRef = useRef(0);
  const isCompletedRef = useRef(false);

  // Ultra-smooth, deliberate spring for a calm, luxurious architectural progression
  const smoothProgress = useSpring(progress, {
    stiffness: 90,
    damping: 20,
    restDelta: 0.0003,
  });

  // Keep refs in sync with state for zero-latency event listener checks
  useEffect(() => {
    isCompletedRef.current = isCompleted;
  }, [isCompleted]);

  // Unlock hero immediately when user triggers an explicit navigation or action
  const handleUnlock = () => {
    progress.set(1);
    progressRef.current = 1;
    setIsCompleted(true);
    isCompletedRef.current = true;
  };

  // 1. Background Image Transformations (continuous subtle zoom/contrast throughout)
  const bgScale = useTransform(smoothProgress, [0, 0.75, 1], [1.10, 1.03, 1.0]);
  const bgDarken = useTransform(smoothProgress, [0, 0.65, 1], [0.20, 0.45, 0.62]);

  // 2. Stage 1: Left Stats Badges (Loads first in micro-steps with blur & scale pop effects)
  const statsOpacity = useTransform(smoothProgress, [0.03, 0.14], [0, 1]);
  const statsX = useTransform(smoothProgress, [0.03, 0.14], [-22, 0]);
  const statsScale = useTransform(smoothProgress, [0.03, 0.14], [0.94, 1]);
  const statsFilter = useTransform(smoothProgress, [0.03, 0.14], ['blur(6px)', 'blur(0px)']);

  // Stat 1: 8K Ultra-HD
  const stat1Scale = useTransform(smoothProgress, [0.05, 0.16], [0.92, 1]);
  const stat1Opacity = useTransform(smoothProgress, [0.05, 0.16], [0, 1]);
  const stat1Filter = useTransform(smoothProgress, [0.05, 0.16], ['blur(4px)', 'blur(0px)']);

  // Divider 1 draws from left with animated expansion
  const divider1Scale = useTransform(smoothProgress, [0.14, 0.24], [0, 1]);
  const divider1Opacity = useTransform(smoothProgress, [0.14, 0.24], [0, 1]);

  // Stat 2: 100 KM
  const stat2Opacity = useTransform(smoothProgress, [0.22, 0.32], [0, 1]);
  const stat2Y = useTransform(smoothProgress, [0.22, 0.32], [10, 0]);
  const stat2Scale = useTransform(smoothProgress, [0.22, 0.32], [0.94, 1]);
  const stat2Filter = useTransform(smoothProgress, [0.22, 0.32], ['blur(4px)', 'blur(0px)']);

  // Divider 2 draws
  const divider2Scale = useTransform(smoothProgress, [0.30, 0.39], [0, 1]);
  const divider2Opacity = useTransform(smoothProgress, [0.30, 0.39], [0, 1]);

  // Stat 3: 24 - 48 ORE
  const stat3Opacity = useTransform(smoothProgress, [0.37, 0.47], [0, 1]);
  const stat3Y = useTransform(smoothProgress, [0.37, 0.47], [10, 0]);
  const stat3Scale = useTransform(smoothProgress, [0.37, 0.47], [0.94, 1]);
  const stat3Filter = useTransform(smoothProgress, [0.37, 0.47], ['blur(4px)', 'blur(0px)']);

  // 3. Stage 2: Bottom Title Block (Line-by-line staggered emergence with blur to sharp optical clarity)
  // Line 1: "DESCHIDE UȘA PROPRIETĂȚII TALE."
  const title1Y = useTransform(smoothProgress, [0.46, 0.58], [28, 0]);
  const title1Opacity = useTransform(smoothProgress, [0.46, 0.58], [0, 1]);
  const title1Filter = useTransform(smoothProgress, [0.46, 0.58], ['blur(6px)', 'blur(0px)']);

  // Line 2: "ORICÂND. DE ORIUNDE." (Golden illumination accent)
  const title2Y = useTransform(smoothProgress, [0.54, 0.64], [22, 0]);
  const title2Opacity = useTransform(smoothProgress, [0.54, 0.64], [0, 1]);
  const title2Scale = useTransform(smoothProgress, [0.54, 0.64], [0.95, 1]);
  const title2Filter = useTransform(smoothProgress, [0.54, 0.64], ['blur(5px)', 'blur(0px)']);

  // 4. Stage 3: CTA Buttons & Right Narrative Subtitle
  const btnY = useTransform(smoothProgress, [0.63, 0.74], [18, 0]);
  const btnOpacity = useTransform(smoothProgress, [0.63, 0.74], [0, 1]);
  const btnScale = useTransform(smoothProgress, [0.63, 0.74], [0.94, 1]);
  const btnFilter = useTransform(smoothProgress, [0.63, 0.74], ['blur(4px)', 'blur(0px)']);

  const subtitleOpacity = useTransform(smoothProgress, [0.70, 0.80], [0, 1]);
  const subtitleY = useTransform(smoothProgress, [0.70, 0.80], [14, 0]);
  const subtitleFilter = useTransform(smoothProgress, [0.70, 0.80], ['blur(4px)', 'blur(0px)']);

  // 5. GRAND FINALE: Giant Typography "TRANSYLVIEW" in the Sky
  // Appears ONLY at the very end after all other information is loaded
  const brandY = useTransform(smoothProgress, [0.80, 0.96], [32, 0]);
  const brandOpacity = useTransform(smoothProgress, [0.80, 0.96], [0, 0.38]);
  const brandScale = useTransform(smoothProgress, [0.80, 0.96], [0.93, 1]);
  const brandFilter = useTransform(smoothProgress, [0.80, 0.94], ['blur(8px)', 'blur(0px)']);

  // 6. Scroll Prompts Opacity
  const mobileScrollPromptOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const desktopScrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.94, 0.99], [1, 1, 0]);

  // Scroll Progress Bar percentage
  const scrollIndicatorWidth = useTransform(smoothProgress, [0, 1], ['6%', '100%']);

  // EXTENDED DELIBERATE SCROLL BLOCKING: Requires sustained scrolling to reveal each detail
  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If hero animation is fully completed or page is scrolled down, allow native scroll
      if (isCompletedRef.current || window.scrollY > 10) return;

      if (e.deltaY > 0) {
        // Scrolling downwards: block page scroll and advance hero animation slowly
        if (progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          // Calibrated deliberate step: ~1.5% to 2.4% per notch, requiring ~45-50 notches
          const rawStep = Math.abs(e.deltaY) / 5400;
          const step = Math.min(0.024, Math.max(0.006, rawStep));
          const next = Math.min(1, progressRef.current + step);
          progress.set(next);
          progressRef.current = next;

          if (next >= 1) {
            setIsCompleted(true);
            isCompletedRef.current = true;
          }
        }
      } else if (e.deltaY < 0) {
        // Scrolling upwards before completion: smoothly reverse hero animation
        if (progressRef.current > 0 && progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          const rawStep = Math.abs(e.deltaY) / 5400;
          const step = Math.min(0.024, Math.max(0.006, rawStep));
          const next = Math.max(0, progressRef.current - step);
          progress.set(next);
          progressRef.current = next;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isCompletedRef.current || window.scrollY > 10) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // positive = swiping up (scrolling down)

      if (deltaY > 0) {
        // User swiping to scroll down: advance hero animation responsively
        if (progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          const step = Math.min(0.08, Math.max(0.02, deltaY / (window.innerHeight * 1.5)));
          const next = Math.min(1, progressRef.current + step);
          progress.set(next);
          progressRef.current = next;
          touchStartY = currentY;

          if (next >= 1) {
            setIsCompleted(true);
            isCompletedRef.current = true;
          }
        }
      } else if (deltaY < 0) {
        // User swiping down (scrolling up)
        if (progressRef.current > 0 && progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          const step = Math.min(0.08, Math.max(0.02, Math.abs(deltaY) / (window.innerHeight * 1.5)));
          const next = Math.max(0, progressRef.current - step);
          progress.set(next);
          progressRef.current = next;
          touchStartY = currentY;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompletedRef.current || window.scrollY > 10) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (progressRef.current < 1) {
          e.preventDefault();
          const next = Math.min(1, progressRef.current + 0.05);
          progress.set(next);
          progressRef.current = next;
          if (next >= 1) {
            setIsCompleted(true);
            isCompletedRef.current = true;
          }
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (progressRef.current > 0 && progressRef.current < 1) {
          e.preventDefault();
          const next = Math.max(0, progressRef.current - 0.05);
          progress.set(next);
          progressRef.current = next;
        }
      }
    };

    const containerEl = containerRef.current;
    if (containerEl) {
      containerEl.addEventListener('wheel', handleWheel, { passive: false });
    }
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (containerEl) {
        containerEl.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [progress]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none bg-stone-950"
    >
      {/* Fullscreen Viewport Container */}
      <div className="h-full w-full overflow-hidden flex flex-col justify-between select-none relative">
        
        {/* Layer 1: Fullscreen Background 3D Tour / Interior Image */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          <img
            src={heroImage}
            alt="TransylView 3D Tururi Virtuale 8K Satu Mare"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
          {/* Lighting & Contrast Overlays */}
          <motion.div
            style={{ opacity: bgDarken }}
            className="absolute inset-0 bg-black"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/30 to-stone-950/60" />
        </motion.div>

        {/* Layer 2: Subtle Sky Watermark Typography "TRANSYLVIEW" — FINALE: Loads at the very end */}
        <div className="absolute inset-x-0 top-14 sm:top-24 flex items-center justify-center z-10 pointer-events-none px-4">
          <motion.h1
            style={{
              y: brandY,
              opacity: brandOpacity,
              scale: brandScale,
              filter: brandFilter,
            }}
            className="gpu-smooth font-display font-extrabold text-[7.5vw] sm:text-[6.5vw] lg:text-[5.5vw] tracking-[0.08em] sm:tracking-[0.18em] text-stone-100 uppercase leading-none text-center whitespace-nowrap drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] max-w-full origin-center"
          >
            {propertyHeroData.brandName}
          </motion.h1>
        </div>

        {/* Layer 3: Top Navigation Bar */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-16 pt-3.5 sm:pt-7 flex items-center justify-between pointer-events-auto">
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="group flex items-baseline gap-1.5 sm:gap-2 transition-transform hover:scale-102 cursor-pointer"
            title="Mergi la începutul paginii"
          >
            <span className="font-display text-base sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.22em] text-white uppercase drop-shadow-md inline-flex items-baseline">
              TRANSYLVIEW
              <span className="-ml-0.5 sm:-ml-1 font-sans font-extrabold text-[1.22em] sm:text-[1.28em] tracking-tight text-bronze-light group-hover:text-white transition-colors">
                3D
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-bronze self-center group-hover:scale-125 transition-transform" />
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-bold tracking-[0.22em] text-stone-200 uppercase drop-shadow">
            <a href="#home" onClick={handleScrollToTop} className="text-white hover:text-bronze transition-colors">ACASĂ</a>
            <a href="#about" onClick={handleUnlock} className="hover:text-white transition-colors">DESPRE NOI</a>
            <a href="#demo-tour" onClick={handleUnlock} className="hover:text-bronze transition-colors text-bronze-light font-bold">DEMO 3D</a>
            <a href="#virtual-tours" onClick={handleUnlock} className="hover:text-white transition-colors">PORTOFOLIU 3D</a>
            <a href="#pricing" onClick={handleUnlock} className="hover:text-white transition-colors">PREȚURI</a>
            <a href="#location" onClick={handleUnlock} className="hover:text-white transition-colors">ZONĂ & CONTACT</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleUnlock();
                onBookCall();
              }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.24em] text-white uppercase bg-stone-900/70 hover:bg-bronze hover:text-stone-950 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95 cursor-pointer"
            >
              SOLICITĂ TUR
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setHeroMenuOpen(!heroMenuOpen)}
              className="md:hidden min-w-[34px] min-h-[34px] p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/20 backdrop-blur-md transition-all flex items-center justify-center active:scale-95 cursor-pointer"
              aria-label={heroMenuOpen ? "Închide meniul" : "Deschide meniul"}
            >
              {heroMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Hero Dropdown Menu */}
          <AnimatePresence>
            {heroMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-stone-950/95 backdrop-blur-xl rounded-2xl border border-stone-800/90 shadow-2xl space-y-3 z-50 pointer-events-auto"
              >
                <div className="flex flex-col space-y-2.5 text-xs font-bold tracking-[0.2em] uppercase font-mono">
                  <a
                    href="#home"
                    onClick={(e) => {
                      handleScrollToTop(e);
                      setHeroMenuOpen(false);
                    }}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    ACASĂ
                  </a>
                  <a
                    href="#about"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    DESPRE NOI & TEHNOLOGIE
                  </a>
                  <a
                    href="#demo-tour"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-bronze-light hover:text-white py-2 border-b border-stone-800/60"
                  >
                    DEMO 3D INTERACTIV
                  </a>
                  <a
                    href="#virtual-tours"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    PORTOFOLIU 3D
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    PACHETE & PREȚURI
                  </a>
                  <a
                    href="#location"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-stone-300 hover:text-white py-2"
                  >
                    ZONĂ & CONTACT
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                      onBookCall();
                    }}
                    className="w-full py-3 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
                  >
                    PROGRAMEAZĂ SCANARE 3D
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Layer 4: Stats Card (Symmetrical 3-Column on Mobile, Architectural Vertical on Desktop) */}
        <div className="relative z-30 px-4 sm:px-8 lg:px-16 pt-2 pb-2 my-auto flex justify-center sm:justify-start">
          <motion.div
            style={{
              opacity: statsOpacity,
              x: statsX,
              scale: statsScale,
              filter: statsFilter,
            }}
            className="gpu-smooth w-full max-w-[360px] sm:max-w-[240px] pointer-events-auto bg-stone-950/85 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/15 shadow-2xl"
          >
            {/* Mobile View: Symmetrical 3-Column Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-white/15 text-center items-center sm:hidden">
              <motion.div
                style={{
                  scale: stat1Scale,
                  opacity: stat1Opacity,
                  filter: stat1Filter,
                }}
                className="px-1 space-y-0.5"
              >
                <div className="font-display font-bold text-[11px] text-white leading-tight">
                  8K ULTRA-HD
                </div>
                <div className="text-[7.5px] font-bold tracking-[0.14em] text-stone-300 uppercase">
                  CLARITATE INSTA X5
                </div>
              </motion.div>

              <motion.div
                style={{
                  opacity: stat2Opacity,
                  y: stat2Y,
                  scale: stat2Scale,
                  filter: stat2Filter,
                }}
                className="px-1 space-y-0.5"
              >
                <div className="font-display font-bold text-[11px] text-white leading-tight">
                  100 KM
                </div>
                <div className="text-[7.5px] font-bold tracking-[0.14em] text-stone-300 uppercase">
                  TRANSILVANIA
                </div>
              </motion.div>

              <motion.div
                style={{
                  opacity: stat3Opacity,
                  y: stat3Y,
                  scale: stat3Scale,
                  filter: stat3Filter,
                }}
                className="px-1 space-y-0.5"
              >
                <div className="font-display font-bold text-[11px] text-white leading-tight">
                  24 - 72 ORE
                </div>
                <div className="text-[7.5px] font-bold tracking-[0.14em] text-stone-300 uppercase">
                  PREDARE RAPIDĂ
                </div>
              </motion.div>
            </div>

            {/* Desktop View: Architectural Vertical Stack */}
            <div className="hidden sm:block space-y-3">
              {/* Stat 1: 8K Ultra-HD with scale & optical focus pop */}
              <motion.div
                style={{
                  scale: stat1Scale,
                  opacity: stat1Opacity,
                  filter: stat1Filter,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  8K ULTRA-HD
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                  CLARITATE INSTA X5
                </div>
              </motion.div>

              {/* Divider 1 with smooth scaleX draw */}
              <motion.div
                style={{
                  scaleX: divider1Scale,
                  opacity: divider1Opacity,
                }}
                className="w-10 h-[1px] bg-white/30 origin-left gpu-smooth"
              />

              {/* Stat 2: 100 km with slide, scale & blur reveal */}
              <motion.div
                style={{
                  opacity: stat2Opacity,
                  y: stat2Y,
                  scale: stat2Scale,
                  filter: stat2Filter,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  100 KM
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                  RAZĂ DEPLASARE TRANSILVANIA
                </div>
              </motion.div>

              {/* Divider 2 with smooth scaleX draw */}
              <motion.div
                style={{
                  scaleX: divider2Scale,
                  opacity: divider2Opacity,
                }}
                className="w-10 h-[1px] bg-white/30 origin-left gpu-smooth"
              />

              {/* Stat 3: 24-72h with slide, scale & blur reveal */}
              <motion.div
                style={{
                  opacity: stat3Opacity,
                  y: stat3Y,
                  scale: stat3Scale,
                  filter: stat3Filter,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  24 - 72 ORE
                </div>
                <div className="text-[8px] sm:text-[9px] font-bold tracking-[0.16em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                  PREDARE ÎN FUNCȚIE DE SUPRAFAȚĂ
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Layer 5: Bottom Title, Tagline & Action Buttons */}
        <div className="relative z-30 px-4 sm:px-8 lg:px-16 pb-4 sm:pb-12 pt-1 sm:pt-2 flex flex-col md:flex-row items-center sm:items-start md:items-end justify-between gap-3 sm:gap-6 pointer-events-auto">
          
          <div className="space-y-2.5 sm:space-y-4 max-w-xl lg:max-w-2xl w-full text-center sm:text-left">
            {/* Title with staggered line emergence */}
            <div className="overflow-hidden">
              <h2 className="gpu-smooth font-display font-extrabold text-lg sm:text-3xl md:text-4xl lg:text-[2.5rem] text-white uppercase leading-[1.15] sm:leading-[1.08] tracking-[0.03em] sm:tracking-[0.05em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                <motion.span
                  style={{
                    y: title1Y,
                    opacity: title1Opacity,
                    filter: title1Filter,
                  }}
                  className="block gpu-smooth"
                >
                  DESCHIDE UȘA PROPRIETĂȚII TALE.
                </motion.span>
                <motion.span
                  style={{
                    y: title2Y,
                    opacity: title2Opacity,
                    scale: title2Scale,
                    filter: title2Filter,
                  }}
                  className="block text-bronze-light gpu-smooth origin-center sm:origin-left"
                >
                  ORICÂND. DE ORIUNDE.
                </motion.span>
              </h2>
            </div>

            {/* Mobile Tagline: Symmetrically centered on mobile so no information is lost */}
            <motion.div
              style={{
                opacity: subtitleOpacity,
                y: subtitleY,
                filter: subtitleFilter,
              }}
              className="gpu-smooth block md:hidden text-center mx-auto max-w-sm pt-0.5"
            >
              <p className="text-[9.5px] font-medium tracking-[0.16em] text-stone-300 uppercase leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
                {propertyHeroData.tagline}
              </p>
            </motion.div>

            {/* Responsive Action Buttons */}
            <motion.div
              style={{
                y: btnY,
                opacity: btnOpacity,
                scale: btnScale,
                filter: btnFilter,
              }}
              className="gpu-smooth flex items-center justify-center sm:justify-start gap-2 sm:gap-3 pt-0.5 sm:pt-1 flex-wrap sm:flex-nowrap origin-center sm:origin-left"
            >
              <button
                onClick={() => {
                  handleUnlock();
                  onBookCall();
                }}
                className="inline-flex items-center gap-1.5 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-stone-950 font-bold text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.22em] uppercase shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:bg-stone-100 hover:scale-103 transition-all duration-300 group cursor-pointer"
              >
                <span>PROGRAMEAZĂ SCANARE 3D</span>
                <span className="flex items-center text-stone-500 group-hover:text-stone-950 group-hover:translate-x-1.5 transition-transform">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 -mr-1 stroke-[2.5]" />
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </button>

              <a
                href="#demo-tour"
                onClick={handleUnlock}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <span>VEZI DEMO 3D</span>
              </a>
            </motion.div>
          </div>

          {/* Desktop Tagline: Right aligned on wide screens */}
          <motion.div
            style={{
              opacity: subtitleOpacity,
              y: subtitleY,
              filter: subtitleFilter,
            }}
            className="gpu-smooth max-w-xs sm:max-w-md md:text-right hidden md:block"
          >
            <p className="text-xs sm:text-[13px] font-medium tracking-wider text-stone-200 uppercase leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
              {propertyHeroData.tagline}
            </p>
          </motion.div>

        </div>

        {/* Mobile Animated Scroll Prompt Indicator */}
        <motion.div
          style={{
            opacity: mobileScrollPromptOpacity,
          }}
          onClick={handleUnlock}
          className="gpu-smooth sm:hidden absolute bottom-5 sm:bottom-6 inset-x-0 mx-auto w-fit max-w-[92vw] z-40 flex flex-col items-center justify-center text-center cursor-pointer select-none px-2"
        >
          {/* Luminous Symmetrical Text Pill */}
          <div className="inline-flex items-center justify-center gap-2 bg-stone-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-bronze/40 shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_15px_rgba(205,162,116,0.3)]">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-ping" />
            <span className="text-[9.5px] font-mono font-bold tracking-[0.2em] text-white uppercase text-center pl-0.5">
              DERULEAZĂ ÎN JOS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-bronze animate-pulse" />
          </div>

          {/* Eye-Catching Animated Mouse / Touch Capsule + Synchronized Arrow */}
          <div className="mt-1.5 flex flex-col items-center justify-center">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-5 h-9 rounded-full border-2 border-white/70 bg-stone-950/70 backdrop-blur-sm flex items-start justify-center pt-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.7)] ring-1 ring-bronze/40"
            >
              <motion.div
                animate={{
                  y: [0, 14, 0],
                  opacity: [1, 0.2, 1],
                  scaleY: [1, 1.35, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-amber-200 to-bronze shadow-[0_0_10px_rgba(205,162,116,1)]"
              />
            </motion.div>

            {/* Cascading Synchronized Bouncing Arrow */}
            <motion.div
              animate={{
                y: [0, 4, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
                delay: 0.15,
              }}
              className="-mt-0.5"
            >
              <ChevronDown className="w-4 h-4 text-bronze stroke-[2.5]" />
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Scroll Progress Bar - Desktop */}
        <motion.div
          style={{
            opacity: desktopScrollIndicatorOpacity,
          }}
          onClick={handleUnlock}
          className="gpu-smooth hidden sm:flex absolute bottom-2 sm:bottom-3 inset-x-0 mx-auto w-fit z-40 items-center gap-2 sm:gap-3 bg-stone-950/80 backdrop-blur-md px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 text-stone-400 cursor-pointer"
        >
          <ArrowDown className="w-3 h-3 text-bronze animate-bounce" />
          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-stone-300">
            DERULEAZĂ PENTRU A DESCOPERI
          </span>
          <div className="w-12 sm:w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              style={{ width: scrollIndicatorWidth }}
              className="h-full bg-bronze rounded-full"
            />
          </div>
        </motion.div>

      </div>

    </div>
  );
};
