import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowDown, ChevronDown, Menu, X } from 'lucide-react';
import { propertyHeroData } from '../data/propertyData';

interface HeroSectionProps {
  heroImage: string;
  onBookCall: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage, onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroMenuOpen, setHeroMenuOpen] = useState(false);

  // Track scroll progression inside this 260vh pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ultra-responsive, smooth scroll progress (no spring lag, no subpixel oscillation/jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 36,
    restDelta: 0.0002,
  });

  // 1. Background Image Transformations
  const bgScale = useTransform(smoothProgress, [0, 0.4, 1], [1.08, 1.02, 1.0]);
  const bgDarken = useTransform(smoothProgress, [0, 0.45, 0.85], [0.25, 0.4, 0.6]);

  // 2. Giant Typography "TRANSYLVIEW" in the Sky
  const brandY = useTransform(smoothProgress, [0.04, 0.3], [30, 0]);
  const brandOpacity = useTransform(smoothProgress, [0.04, 0.28], [0, 0.35]);
  const brandScale = useTransform(smoothProgress, [0.04, 0.3], [0.97, 1]);

  // 3. Left Stats Badges
  const statsOpacity = useTransform(smoothProgress, [0.26, 0.48], [0, 1]);
  const statsX = useTransform(smoothProgress, [0.26, 0.48], [-15, 0]);
  const divider1Scale = useTransform(smoothProgress, [0.32, 0.44], [0, 1]);
  const divider2Scale = useTransform(smoothProgress, [0.38, 0.5], [0, 1]);

  // 4. Bottom Title - Using numeric pixel offsets instead of percentage strings to eliminate layout shifts
  const titleY = useTransform(smoothProgress, [0.5, 0.72], [32, 0]);
  const titleOpacity = useTransform(smoothProgress, [0.5, 0.72], [0, 1]);

  // 5. CTA Button & Right Subtitle
  const btnY = useTransform(smoothProgress, [0.66, 0.86], [16, 0]);
  const btnOpacity = useTransform(smoothProgress, [0.66, 0.86], [0, 1]);
  const subtitleOpacity = useTransform(smoothProgress, [0.68, 0.88], [0, 1]);
  const subtitleY = useTransform(smoothProgress, [0.68, 0.88], [12, 0]);

  // 6. Scroll Prompts Opacity
  // Mobile prompt is fully visible at start (1) and fades out smoothly as soon as user begins scrolling (by 0.08)
  const mobileScrollPromptOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const desktopScrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.88, 0.96], [1, 1, 0]);

  // Scroll Progress Bar percentage
  const scrollIndicatorWidth = useTransform(smoothProgress, [0, 1], ['12%', '100%']);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home" ref={containerRef} className="relative h-[210vh] sm:h-[260vh] bg-stone-950">
      
      {/* Sticky Fullscreen Viewport - using 100dvh for mobile viewport accuracy */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between select-none">
        
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

        {/* Layer 2: Subtle Sky Watermark Typography "TRANSYLVIEW" */}
        <div className="absolute inset-x-0 top-14 sm:top-24 flex items-center justify-center z-10 pointer-events-none px-4">
          <motion.h1
            style={{
              y: brandY,
              opacity: brandOpacity,
              scale: brandScale,
            }}
            className="gpu-smooth font-display font-extrabold text-[7.5vw] sm:text-[6.5vw] lg:text-[5.5vw] tracking-[0.08em] sm:tracking-[0.18em] text-stone-100 uppercase leading-none text-center whitespace-nowrap drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] max-w-full"
          >
            {propertyHeroData.brandName}
          </motion.h1>
        </div>

        {/* Layer 3: Top Navigation Bar */}
        <header className="relative z-30 w-full px-4 sm:px-8 lg:px-16 pt-3.5 sm:pt-7 flex items-center justify-between pointer-events-auto">
          <a
            href="#home"
            onClick={handleScrollToTop}
            className="group flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-102 cursor-pointer"
            title="Mergi la începutul paginii"
          >
            <span className="font-display text-base sm:text-2xl font-bold tracking-[0.18em] sm:tracking-[0.24em] text-white uppercase drop-shadow-md">
              TRANSYLVIEW <span className="text-bronze text-xs sm:text-base font-normal">3D</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          </a>

          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-xs font-bold tracking-[0.22em] text-stone-200 uppercase drop-shadow">
            <a href="#home" onClick={handleScrollToTop} className="text-white hover:text-bronze transition-colors">ACASĂ</a>
            <a href="#about" className="hover:text-white transition-colors">DESPRE NOI</a>
            <a href="#demo-tour" className="hover:text-bronze transition-colors text-bronze-light font-bold">DEMO 3D</a>
            <a href="#virtual-tours" className="hover:text-white transition-colors">PORTOFOLIU 3D</a>
            <a href="#pricing" className="hover:text-white transition-colors">PREȚURI</a>
            <a href="#location" className="hover:text-white transition-colors">ZONĂ & CONTACT</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onBookCall}
              className="text-[10px] sm:text-xs font-bold tracking-[0.16em] sm:tracking-[0.24em] text-white uppercase bg-stone-900/70 hover:bg-bronze hover:text-stone-950 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95"
            >
              SOLICITĂ TUR
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setHeroMenuOpen(!heroMenuOpen)}
              className="md:hidden min-w-[34px] min-h-[34px] p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-200 hover:text-white border border-white/20 backdrop-blur-md transition-all flex items-center justify-center active:scale-95"
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
                    onClick={() => setHeroMenuOpen(false)}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    DESPRE NOI & TEHNOLOGIE
                  </a>
                  <a
                    href="#demo-tour"
                    onClick={() => setHeroMenuOpen(false)}
                    className="text-bronze-light hover:text-white py-2 border-b border-stone-800/60"
                  >
                    DEMO 3D INTERACTIV
                  </a>
                  <a
                    href="#virtual-tours"
                    onClick={() => setHeroMenuOpen(false)}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    PORTOFOLIU 3D
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setHeroMenuOpen(false)}
                    className="text-stone-300 hover:text-white py-2 border-b border-stone-800/60"
                  >
                    PACHETE & PREȚURI
                  </a>
                  <a
                    href="#location"
                    onClick={() => setHeroMenuOpen(false)}
                    className="text-stone-300 hover:text-white py-2"
                  >
                    ZONĂ & CONTACT
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setHeroMenuOpen(false);
                      onBookCall();
                    }}
                    className="w-full py-3 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs uppercase tracking-widest shadow-md transition-all"
                  >
                    PROGRAMEAZĂ SCANARE 3D
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Layer 4: Upper-Left Stats Card (Compact on mobile) */}
        <div className="relative z-30 px-4 sm:px-8 lg:px-16 pt-2 pb-2 my-auto flex items-start">
          <motion.div
            style={{
              opacity: statsOpacity,
              x: statsX,
            }}
            className="gpu-smooth space-y-1.5 sm:space-y-3 max-w-[150px] sm:max-w-[240px] pointer-events-auto bg-stone-950/80 backdrop-blur-md p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/15 shadow-2xl"
          >
            {/* Stat 1: 8K Ultra-HD */}
            <div className="group cursor-default">
              <div className="font-display font-bold text-xs sm:text-xl text-white tracking-tight leading-tight">
                8K ULTRA-HD
              </div>
              <div className="text-[7px] sm:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                CLARITATE INSTA X5
              </div>
            </div>

            {/* Divider 1 */}
            <motion.div
              style={{ scaleX: divider1Scale }}
              className="w-6 sm:w-10 h-[1px] bg-white/30 origin-left"
            />

            {/* Stat 2: 100 km Rază Satu Mare & Transilvania */}
            <div className="group cursor-default">
              <div className="font-display font-bold text-xs sm:text-xl text-white tracking-tight leading-tight">
                100 KM
              </div>
              <div className="text-[7px] sm:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                RAZĂ DEPLASARE TRANSILVANIA
              </div>
            </div>

            {/* Divider 2 */}
            <motion.div
              style={{ scaleX: divider2Scale }}
              className="w-6 sm:w-10 h-[1px] bg-white/30 origin-left"
            />

            {/* Stat 3: 24-48h Livrare Rapidă */}
            <div className="group cursor-default">
              <div className="font-display font-bold text-xs sm:text-xl text-white tracking-tight leading-tight">
                24 - 48 ORE
              </div>
              <div className="text-[7px] sm:text-[9px] font-bold tracking-[0.14em] sm:tracking-[0.18em] text-stone-300 uppercase mt-0.5">
                LIVRARE TUR GATA DE VÂNZARE
              </div>
            </div>
          </motion.div>
        </div>

        {/* Layer 5: Bottom Left Title & Right Narrative (Zero Overlap with Bottom Elements) */}
        <div className="relative z-30 px-4 sm:px-8 lg:px-16 pb-4 sm:pb-12 pt-1 sm:pt-2 flex flex-col md:flex-row items-start md:items-end justify-between gap-3 sm:gap-6 pointer-events-auto">
          
          <div className="space-y-2 sm:space-y-4 max-w-xl lg:max-w-2xl w-full sm:w-auto">
            <div className="overflow-hidden">
              <motion.h2
                style={{
                  y: titleY,
                  opacity: titleOpacity,
                }}
                className="gpu-smooth font-display font-extrabold text-base sm:text-3xl md:text-4xl lg:text-[2.5rem] text-white uppercase leading-[1.18] sm:leading-[1.08] tracking-[0.03em] sm:tracking-[0.05em] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
              >
                DESCHIDE UȘA PROPRIETĂȚII TALE.
                <br />
                <span className="text-bronze-light">ORICÂND. DE ORIUNDE.</span>
              </motion.h2>
            </div>

            {/* Responsive Action Buttons */}
            <motion.div
              style={{
                y: btnY,
                opacity: btnOpacity,
              }}
              className="gpu-smooth flex items-center gap-2 sm:gap-3 pt-0.5 sm:pt-1 flex-wrap sm:flex-nowrap"
            >
              <button
                onClick={onBookCall}
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
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase border border-white/20 backdrop-blur-sm transition-colors cursor-pointer"
              >
                <span>VEZI DEMO 3D</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            style={{
              opacity: subtitleOpacity,
              y: subtitleY,
            }}
            className="gpu-smooth max-w-xs sm:max-w-md md:text-right hidden sm:block"
          >
            <p className="text-xs sm:text-[13px] font-medium tracking-wider text-stone-200 uppercase leading-relaxed drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]">
              {propertyHeroData.tagline}
            </p>
          </motion.div>

        </div>

        {/* Mobile Animated Scroll Prompt Indicator - Perfectly Centered via inset-x-0 mx-auto w-fit */}
        <motion.div
          style={{
            opacity: mobileScrollPromptOpacity,
          }}
          className="gpu-smooth sm:hidden absolute bottom-5 sm:bottom-6 inset-x-0 mx-auto w-fit max-w-[92vw] z-40 flex flex-col items-center justify-center text-center pointer-events-none select-none px-2"
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

        {/* Bottom Scroll Progress Bar - Desktop - Perfectly Centered via inset-x-0 mx-auto w-fit */}
        <motion.div
          style={{
            opacity: desktopScrollIndicatorOpacity,
          }}
          className="gpu-smooth hidden sm:flex absolute bottom-2 sm:bottom-3 inset-x-0 mx-auto w-fit z-40 items-center gap-2 sm:gap-3 bg-stone-950/80 backdrop-blur-md px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-white/10 text-stone-400 pointer-events-none"
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
