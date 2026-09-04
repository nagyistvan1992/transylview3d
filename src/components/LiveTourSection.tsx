import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Compass, Maximize2, Minimize2, ExternalLink, Layers, MousePointerClick, Ruler } from 'lucide-react';

interface LiveTourSectionProps {
  onBookCall: () => void;
}

export const LiveTourSection: React.FC<LiveTourSectionProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Exact Matterport space: https://discover.matterport.com/space/YFWgEekGLHm
  const matterportModelId = 'YFWgEekGLHm';
  const embedUrl = `https://my.matterport.com/show/?m=${matterportModelId}&play=1&brand=0&mls=1&wh=0`;
  const directUrl = `https://my.matterport.com/show/?m=${matterportModelId}`;

  // Native Fullscreen API Handler
  const toggleFullscreen = async () => {
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
    <section id="demo-tour" className="relative py-20 sm:py-28 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800 select-none">
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-bronze/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 text-xs font-mono tracking-[0.25em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>EXEMPLU DEMO DIGITAL TWIN 3D</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight px-2"
          >
            Experiență Interactivă Matterport 3D
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-stone-400 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed px-4"
          >
            Navigați liber prin fiecare încăpere la 360°, inspectați modelul secțional Dollhouse 3D și verificați măsurătorile de precizie direct în spațiu.
          </motion.p>
        </div>

        {/* Dedicated Top Controls Bar */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 bg-stone-900/90 backdrop-blur-md px-4 sm:px-6 py-3 rounded-2xl border border-stone-800/80 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-bronze" />
            <span className="text-xs font-mono tracking-widest text-stone-300 uppercase flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-bronze flex-shrink-0" />
              <span>TERMINAL VIZUALIZARE 3D MATTEPORT</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all border border-stone-700 shadow-sm"
              title="Deschide în filă nouă"
            >
              <ExternalLink className="w-3.5 h-3.5 text-bronze" />
              <span>Deschide Separat</span>
            </a>

            <button
              onClick={toggleFullscreen}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title={isFullscreen ? 'Ieși din ecran complet' : 'Ecran complet'}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Ieșire Ecran Complet' : 'Ecran Complet'}</span>
            </button>
          </div>
        </div>

        {/* 3D Showcase Viewport Container */}
        <div
          ref={containerRef}
          className={`relative rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-stone-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-0 z-[99999] rounded-none w-screen h-screen m-0 p-0 bg-black'
              : 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] w-full min-h-[420px] max-h-[720px]'
          }`}
        >
          {/* In Fullscreen mode: Floating Exit button */}
          {isFullscreen && (
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={toggleFullscreen}
                className="px-4 py-2 rounded-full bg-stone-900/90 hover:bg-stone-800 text-white border border-white/20 backdrop-blur-md text-xs font-bold flex items-center gap-2 shadow-2xl transition-all"
              >
                <Minimize2 className="w-4 h-4 text-bronze" />
                <span>Ieși din Ecran Complet</span>
              </button>
            </div>
          )}

          {/* Embedded Real Matterport 3D Tour Iframe */}
          <iframe
            key={matterportModelId}
            src={embedUrl}
            title="TransylView 3D Matterport Virtual Tour"
            className="w-full h-full border-0 block bg-black"
            allowFullScreen
            allow="autoplay; fullscreen; web-share; xr-spatial-tracking; accelerometer; gyroscope; magnetometer"
            loading="lazy"
          />
        </div>

        {/* Interactive Feature Hints */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-stone-900/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-800/80 text-stone-300 text-xs flex items-center gap-2.5">
            <MousePointerClick className="w-4 h-4 text-bronze flex-shrink-0 animate-bounce" />
            <span>Faceți clic pe cercurile de pe podea pentru a naviga pas cu pas</span>
          </div>

          <div className="bg-stone-900/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-800/80 text-stone-300 text-xs flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-bronze flex-shrink-0" />
            <span>Apăsați pictograma Dollhouse din stânga-jos pentru modelul 3D</span>
          </div>

          <div className="bg-stone-900/70 backdrop-blur-md px-4 py-2.5 rounded-xl border border-stone-800/80 text-stone-300 text-xs flex items-center gap-2.5">
            <Ruler className="w-4 h-4 text-bronze flex-shrink-0" />
            <span>Măsurați pereții și spațiile cu rigla integrată Matterport</span>
          </div>
        </div>

        {/* Action bar below tour */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-stone-900/70 border border-stone-800 shadow-lg">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Vrei o scanare 3D la acest standard pentru proprietatea ta?</h4>
            <p className="text-xs text-stone-400">Ne deplasăm în Satu Mare și în toată Transilvania cu echipamentul Insta X5 8K. Predare în 24-48h.</p>
          </div>

          <button
            onClick={onBookCall}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 flex-shrink-0"
          >
            <Eye className="w-4 h-4" />
            <span>SOLICITĂ OFERTĂ & SCANARE 3D</span>
          </button>
        </div>

      </div>
    </section>
  );
};
