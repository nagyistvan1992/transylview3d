import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, animate } from 'framer-motion';
import { ChevronRight, ArrowDown, Menu, X } from 'lucide-react';
import { propertyHeroData } from '../data/propertyData';

interface HeroSectionProps {
  heroImage: string;
  onBookCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Motion value for progression (0 = start, 1 = fully assembled)
  const progress = useMotionValue(0);
  const progressRef = useRef(0);
  const isCompletedRef = useRef(false);

  // Responsive, silky-smooth spring (zero GPU-heavy blur filters)
  const smoothProgress = useSpring(progress, {
    stiffness: 110,
    damping: 22,
    restDelta: 0.001,
  });

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

  // Pure GPU-composited transforms (transform + opacity only, no expensive CSS blur filters)
  // 1. Background Image Transformations
  const bgScale = useTransform(smoothProgress, [0, 0.75, 1], [1.08, 1.02, 1.0]);
  const bgDarken = useTransform(smoothProgress, [0, 0.65, 1], [0.3, 0.52, 0.7]);

  // 2. Stage 1: Stats Badges
  const statsOpacity = useTransform(smoothProgress, [0.02, 0.16], [0, 1]);
  const statsY = useTransform(smoothProgress, [0.02, 0.16], [14, 0]);
  const statsScale = useTransform(smoothProgress, [0.02, 0.16], [0.96, 1]);

  // Stat 1: 8K Ultra-HD
  const stat1Scale = useTransform(smoothProgress, [0.04, 0.18], [0.95, 1]);
  const stat1Opacity = useTransform(smoothProgress, [0.04, 0.18], [0, 1]);

  // Divider 1
  const divider1Scale = useTransform(smoothProgress, [0.14, 0.25], [0, 1]);
  const divider1Opacity = useTransform(smoothProgress, [0.14, 0.25], [0, 1]);

  // Stat 2: 100 KM
  const stat2Opacity = useTransform(smoothProgress, [0.20, 0.34], [0, 1]);
  const stat2Y = useTransform(smoothProgress, [0.20, 0.34], [8, 0]);

  // Divider 2
  const divider2Scale = useTransform(smoothProgress, [0.28, 0.39], [0, 1]);
  const divider2Opacity = useTransform(smoothProgress, [0.28, 0.39], [0, 1]);

  // Stat 3: 24 - 72 ORE
  const stat3Opacity = useTransform(smoothProgress, [0.35, 0.48], [0, 1]);
  const stat3Y = useTransform(smoothProgress, [0.35, 0.48], [8, 0]);

  // 3. Stage 2: Bottom Title Block
  const title1Y = useTransform(smoothProgress, [0.44, 0.58], [22, 0]);
  const title1Opacity = useTransform(smoothProgress, [0.44, 0.58], [0, 1]);

  const title2Y = useTransform(smoothProgress, [0.52, 0.65], [18, 0]);
  const title2Opacity = useTransform(smoothProgress, [0.52, 0.65], [0, 1]);
  const title2Scale = useTransform(smoothProgress, [0.52, 0.65], [0.97, 1]);

  // 4. Stage 3: CTA Buttons & Narrative Subtitle
  const btnY = useTransform(smoothProgress, [0.62, 0.76], [14, 0]);
  const btnOpacity = useTransform(smoothProgress, [0.62, 0.76], [0, 1]);
  const btnScale = useTransform(smoothProgress, [0.62, 0.76], [0.96, 1]);

  const subtitleOpacity = useTransform(smoothProgress, [0.68, 0.82], [0, 1]);
  const subtitleY = useTransform(smoothProgress, [0.68, 0.82], [12, 0]);

  // 5. GRAND FINALE: Giant Typography "TRANSYLVIEW" in the Sky
  const brandY = useTransform(smoothProgress, [0.78, 0.96], [24, 0]);
  const brandOpacity = useTransform(smoothProgress, [0.78, 0.96], [0, 0.58]);
  const brandScale = useTransform(smoothProgress, [0.78, 0.96], [0.95, 1]);

  // 6. Scroll Prompts Opacity
  const desktopScrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.92, 0.99], [1, 1, 0]);
  const scrollIndicatorWidth = useTransform(smoothProgress, [0, 1], ['8%', '100%']);

  // On mobile/touch devices: auto-play the Hero entrance smoothly so native touch scrolling is NEVER blocked!
  // On desktop: use a responsive wheel progression and immediately remove the listener once completed!
  useEffect(() => {
    if (isCompleted) return;

    const isMobileOrTouch =
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches;

    if (isMobileOrTouch) {
      // Smoothly animate progress from 0 to 1 on mobile without blocking native touch scroll
      const controls = animate(progress, 1, {
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (v) => {
          progressRef.current = v;
        },
        onComplete: () => {
          progressRef.current = 1;
          setIsCompleted(true);
          isCompletedRef.current = true;
        },
      });
      return () => controls.stop();
    }

    const handleWheel = (e: WheelEvent) => {
      if (isCompletedRef.current || window.scrollY > 10) return;

      if (e.deltaY > 0) {
        if (progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          // Smooth, responsive desktop wheel step (~12-15 notches for full reveal)
          const rawStep = Math.abs(e.deltaY) / 1600;
          const step = Math.min(0.08, Math.max(0.025, rawStep));
          const next = Math.min(1, progressRef.current + step);
          progress.set(next);
          progressRef.current = next;

          if (next >= 1) {
            setIsCompleted(true);
            isCompletedRef.current = true;
          }
        }
      } else if (e.deltaY < 0) {
        if (progressRef.current > 0 && progressRef.current < 1) {
          if (e.cancelable) e.preventDefault();
          const rawStep = Math.abs(e.deltaY) / 1600;
          const step = Math.min(0.08, Math.max(0.025, rawStep));
          const next = Math.max(0, progressRef.current - step);
          progress.set(next);
          progressRef.current = next;
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isCompletedRef.current || window.scrollY > 10) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (progressRef.current < 1) {
          e.preventDefault();
          const next = Math.min(1, progressRef.current + 0.12);
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
          const next = Math.max(0, progressRef.current - 0.12);
          progress.set(next);
          progressRef.current = next;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [progress, isCompleted]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="home"
      ref={containerRef}
      className="relative h-screen h-[100svh] w-full overflow-hidden flex flex-col justify-between select-none bg-stone-950"
    >
      {/* Fullscreen Viewport Container */}
      <div className="h-full w-full overflow-hidden flex flex-col justify-between select-none relative">
        
        {/* Layer 1: Fullscreen Background 3D Tour / Interior Image */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden gpu-smooth"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/35 to-black/65" />
        </motion.div>

        {/* Layer 2: Subtle Sky Watermark Typography "TRANSYLVIEW" */}
        <div className="absolute inset-x-0 top-16 sm:top-24 flex items-center justify-center z-10 pointer-events-none px-4">
          <motion.h1
            style={{
              y: brandY,
              opacity: brandOpacity,
              scale: brandScale,
            }}
            className="gpu-smooth font-display font-extrabold text-[8vw] sm:text-[6.5vw] lg:text-[5.5vw] tracking-[0.1em] sm:tracking-[0.18em] text-white uppercase leading-none text-center whitespace-nowrap [text-shadow:0_8px_32px_rgba(0,0,0,0.95)] max-w-full origin-center"
          >
            {propertyHeroData.brandName}
          </motion.h1>
        </div>

        {/* Layer 3: Top Navigation Bar (Clean typography, no logo image in Hero) */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-16 pt-4 sm:pt-7 flex items-center justify-between pointer-events-auto">
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="group flex items-baseline gap-1.5 sm:gap-2 transition-transform hover:scale-102 cursor-pointer"
            title="Mergi la începutul paginii"
          >
            <span className="font-display text-base sm:text-2xl font-bold tracking-[0.16em] sm:tracking-[0.22em] text-white uppercase [text-shadow:0_2px_12px_rgba(0,0,0,0.9)] inline-flex items-baseline">
              TRANSYLVIEW
              <span className="-ml-0.5 sm:-ml-1 font-sans font-extrabold text-[1.22em] sm:text-[1.28em] tracking-tight text-[#F5D08A] group-hover:text-white transition-colors">
                3D
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D08A] self-center group-hover:scale-125 transition-transform" />
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-bold tracking-[0.22em] text-white uppercase [text-shadow:0_2px_10px_rgba(0,0,0,0.9)]">
            <a href="#home" onClick={handleScrollToTop} className="text-white hover:text-[#F5D08A] transition-colors">ACASĂ</a>
            <a href="#about" onClick={handleUnlock} className="hover:text-[#F5D08A] transition-colors">DESPRE NOI</a>
            <a href="#demo-tour" onClick={handleUnlock} className="hover:text-white transition-colors text-[#F5D08A] font-extrabold">DEMO 3D</a>
            <a href="#virtual-tours" onClick={handleUnlock} className="hover:text-[#F5D08A] transition-colors">PORTOFOLIU 3D</a>
            <a href="#pricing" onClick={handleUnlock} className="hover:text-[#F5D08A] transition-colors">PREȚURI</a>
            <a href="#location" onClick={handleUnlock} className="hover:text-[#F5D08A] transition-colors">ZONĂ & CONTACT</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                handleUnlock();
                onBookCall();
              }}
              className="text-[10px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.24em] text-white uppercase bg-stone-950/85 hover:bg-[#F5D08A] hover:text-stone-950 px-3.5 py-2 sm:px-4 sm:py-2 rounded-full border border-white/25 backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              SOLICITĂ TUR
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setHeroMenuOpen(!heroMenuOpen)}
              className="md:hidden min-w-[36px] min-h-[36px] p-2 rounded-full bg-stone-950/85 hover:bg-stone-800 text-white border border-white/25 backdrop-blur-md transition-all flex items-center justify-center active:scale-95 cursor-pointer"
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
                transition={{ duration: 0.18 }}
                style={{ backgroundColor: 'rgba(17, 16, 15, 0.98)' }}
                className="md:hidden absolute top-full left-4 right-4 mt-2 p-5 bg-stone-950/95 backdrop-blur-xl rounded-2xl border border-stone-800 shadow-2xl space-y-3 z-50 pointer-events-auto"
              >
                <div className="flex flex-col space-y-2.5 text-xs font-bold tracking-[0.2em] uppercase font-mono">
                  <a
                    href="#home"
                    onClick={(e) => {
                      handleScrollToTop(e);
                      setHeroMenuOpen(false);
                    }}
                    className="text-white hover:text-[#F5D08A] py-2 border-b border-stone-800/60"
                  >
                    ACASĂ
                  </a>
                  <a
                    href="#about"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-white hover:text-[#F5D08A] py-2 border-b border-stone-800/60"
                  >
                    DESPRE NOI & TEHNOLOGIE
                  </a>
                  <a
                    href="#demo-tour"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-[#F5D08A] hover:text-white py-2 border-b border-stone-800/60"
                  >
                    DEMO 3D INTERACTIV
                  </a>
                  <a
                    href="#virtual-tours"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-white hover:text-[#F5D08A] py-2 border-b border-stone-800/60"
                  >
                    PORTOFOLIU 3D
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-white hover:text-[#F5D08A] py-2 border-b border-stone-800/60"
                  >
                    PACHETE & PREȚURI
                  </a>
                  <a
                    href="#location"
                    onClick={() => {
                      handleUnlock();
                      setHeroMenuOpen(false);
                    }}
                    className="text-white hover:text-[#F5D08A] py-2"
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
                    className="w-full py-3 rounded-full bg-[#F5D08A] hover:bg-white text-stone-950 font-bold text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer"
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
              y: statsY,
              scale: statsScale,
            }}
            className="gpu-smooth w-full max-w-[360px] sm:max-w-[250px] pointer-events-auto bg-stone-950/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/20 shadow-2xl"
          >
            {/* Mobile View: Symmetrical 3-Column Stats Grid */}
            <div className="grid grid-cols-3 divide-x divide-white/20 text-center items-center sm:hidden">
              <motion.div
                style={{
                  scale: stat1Scale,
                  opacity: stat1Opacity,
                }}
                className="px-1.5 space-y-0.5"
              >
                <div className="font-display font-bold text-xs text-white leading-tight">
                  8K ULTRA-HD
                </div>
                <div className="text-[8px] font-bold tracking-[0.12em] text-[#F5D08A] uppercase">
                  CLARITATE INSTA X5
                </div>
              </motion.div>

              <motion.div
                style={{
                  opacity: stat2Opacity,
                  y: stat2Y,
                }}
                className="px-1.5 space-y-0.5"
              >
                <div className="font-display font-bold text-xs text-white leading-tight">
                  100 KM
                </div>
                <div className="text-[8px] font-bold tracking-[0.12em] text-[#F5D08A] uppercase">
                  TRANSILVANIA
                </div>
              </motion.div>

              <motion.div
                style={{
                  opacity: stat3Opacity,
                  y: stat3Y,
                }}
                className="px-1.5 space-y-0.5"
              >
                <div className="font-display font-bold text-xs text-white leading-tight">
                  24 - 72 ORE
                </div>
                <div className="text-[8px] font-bold tracking-[0.12em] text-[#F5D08A] uppercase">
                  PREDARE RAPIDĂ
                </div>
              </motion.div>
            </div>

            {/* Desktop View: Architectural Vertical Stack */}
            <div className="hidden sm:block space-y-3">
              {/* Stat 1: 8K Ultra-HD */}
              <motion.div
                style={{
                  scale: stat1Scale,
                  opacity: stat1Opacity,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  8K ULTRA-HD
                </div>
                <div className="text-[9px] font-bold tracking-[0.16em] text-[#F5D08A] uppercase mt-0.5">
                  CLARITATE INSTA X5
                </div>
              </motion.div>

              {/* Divider 1 */}
              <motion.div
                style={{
                  scaleX: divider1Scale,
                  opacity: divider1Opacity,
                }}
                className="w-10 h-[1px] bg-white/35 origin-left gpu-smooth"
              />

              {/* Stat 2: 100 km */}
              <motion.div
                style={{
                  opacity: stat2Opacity,
                  y: stat2Y,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  100 KM
                </div>
                <div className="text-[9px] font-bold tracking-[0.16em] text-[#F5D08A] uppercase mt-0.5">
                  RAZĂ DEPLASARE TRANSILVANIA
                </div>
              </motion.div>

              {/* Divider 2 */}
              <motion.div
                style={{
                  scaleX: divider2Scale,
                  opacity: divider2Opacity,
                }}
                className="w-10 h-[1px] bg-white/35 origin-left gpu-smooth"
              />

              {/* Stat 3: 24-72h */}
              <motion.div
                style={{
                  opacity: stat3Opacity,
                  y: stat3Y,
                }}
                className="group cursor-default gpu-smooth origin-left"
              >
                <div className="font-display font-bold text-base sm:text-xl text-white tracking-tight leading-tight">
                  24 - 72 ORE
                </div>
                <div className="text-[9px] font-bold tracking-[0.16em] text-[#F5D08A] uppercase mt-0.5">
                  PREDARE ÎN FUNCȚIE DE SUPRAFAȚĂ
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Layer 5: Bottom Title, Tagline & Action Buttons */}
        <div className="relative z-30 px-4 sm:px-8 lg:px-16 pb-6 sm:pb-12 pt-1 sm:pt-2 flex flex-col md:flex-row items-center sm:items-start md:items-end justify-between gap-3 sm:gap-6 pointer-events-auto">
          
          <div className="space-y-2.5 sm:space-y-4 max-w-xl lg:max-w-2xl w-full text-center sm:text-left">
            {/* Title */}
            <div className="overflow-hidden">
              <h2 className="gpu-smooth font-display font-extrabold text-lg sm:text-3xl md:text-4xl lg:text-[2.5rem] text-white uppercase leading-[1.15] sm:leading-[1.08] tracking-[0.03em] sm:tracking-[0.05em] [text-shadow:0_4px_24px_rgba(0,0,0,0.95),0_2px_6px_rgba(0,0,0,0.95)]">
                <motion.span
                  style={{
                    y: title1Y,
                    opacity: title1Opacity,
                  }}
                  className="block gpu-smooth text-white"
                >
                  DESCHIDE UȘA PROPRIETĂȚII TALE.
                </motion.span>
                <motion.span
                  style={{
                    y: title2Y,
                    opacity: title2Opacity,
                    scale: title2Scale,
                  }}
                  className="block text-[#F5D08A] gpu-smooth origin-center sm:origin-left"
                >
                  ORICÂND. DE ORIUNDE.
                </motion.span>
              </h2>
            </div>

            {/* Mobile Tagline: High-contrast dark glass card on mobile */}
            <motion.div
              style={{
                opacity: subtitleOpacity,
                y: subtitleY,
              }}
              className="gpu-smooth block md:hidden text-center mx-auto max-w-sm pt-0.5"
            >
              <p className="text-[10.5px] font-medium tracking-[0.08em] text-white leading-relaxed bg-stone-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/15 shadow-lg">
                {propertyHeroData.tagline}
              </p>
            </motion.div>

            {/* Responsive Action Buttons */}
            <motion.div
              style={{
                y: btnY,
                opacity: btnOpacity,
                scale: btnScale,
              }}
              className="gpu-smooth flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 pt-1 flex-wrap sm:flex-nowrap origin-center sm:origin-left"
            >
              <button
                onClick={() => {
                  handleUnlock();
                  onBookCall();
                }}
                className="inline-flex items-center gap-1.5 sm:gap-3 px-4 sm:px-7 py-2.5 sm:py-3 rounded-full bg-white text-stone-950 font-bold text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.22em] uppercase shadow-[0_15px_35px_rgba(0,0,0,0.75)] hover:bg-[#F5D08A] hover:scale-103 active:scale-95 transition-all duration-200 group cursor-pointer"
              >
                <span>PROGRAMEAZĂ SCANARE 3D</span>
                <span className="flex items-center text-stone-600 group-hover:text-stone-950 group-hover:translate-x-1.5 transition-transform">
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 -mr-1 stroke-[2.5]" />
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2.5]" />
                </span>
              </button>

              <a
                href="#demo-tour"
                onClick={handleUnlock}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-stone-950/90 hover:bg-stone-800 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase border border-white/25 backdrop-blur-md active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <span>VEZI DEMO 3D</span>
              </a>
            </motion.div>
          </div>

          {/* Desktop Tagline: High-contrast dark glass card on wide screens */}
          <motion.div
            style={{
              opacity: subtitleOpacity,
              y: subtitleY,
            }}
            className="gpu-smooth max-w-xs sm:max-w-md md:text-right hidden md:block"
          >
            <p className="text-xs sm:text-[13px] font-medium tracking-wide text-white leading-relaxed bg-stone-950/80 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/15 shadow-xl">
              {propertyHeroData.tagline}
            </p>
          </motion.div>

        </div>

        {/* Bottom Scroll Progress Bar - Desktop */}
        <motion.div
          style={{
            opacity: desktopScrollIndicatorOpacity,
          }}
          onClick={handleUnlock}
          className="gpu-smooth hidden sm:flex absolute bottom-2 sm:bottom-3 inset-x-0 mx-auto w-fit z-40 items-center gap-2 sm:gap-3 bg-stone-950/90 backdrop-blur-md px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/20 text-white cursor-pointer shadow-lg"
        >
          <ArrowDown className="w-3 h-3 text-[#F5D08A] animate-bounce" />
          <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
            DERULEAZĂ PENTRU A DESCOPERI
          </span>
          <div className="w-12 sm:w-16 h-1 bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              style={{ width: scrollIndicatorWidth }}
              className="h-full bg-[#F5D08A] rounded-full"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};
