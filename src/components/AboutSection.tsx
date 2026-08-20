import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Camera, Layers, Clock } from 'lucide-react';
import { propertyAboutData } from '../data/propertyData';
import { CustomImages } from '../types';

interface AboutSectionProps {
  images: CustomImages;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-canvas overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-12 sm:mb-16"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-stone-800 uppercase">
            {propertyAboutData.sectionBadge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Full Camera Gear Photo (Uncropped, Full Height) & Metrics */}
          <div className="lg:col-span-5 space-y-10 sm:space-y-12">
            {/* Insta X5 Camera Gear Card - Full uncropped portrait display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury-card border border-stone-300/80 bg-stone-950 flex items-center justify-center group"
            >
              <img
                src={images.aboutGear}
                alt="Insta X5 8K Cameră Profesională Tururi Virtuale 3D"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Subtle bottom gradient to highlight badge */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-medium tracking-wider">
                <span className="bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow-lg">
                  <Camera className="w-3.5 h-3.5 text-bronze" />
                  <span>INSTA X5 8K GEAR</span>
                </span>
                <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 font-mono text-[10px] text-stone-300">
                  CALITATE DE STUDIO
                </span>
              </div>
            </motion.div>

            {/* Key Metric Numbers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-3 gap-6 pt-4 border-t border-stone-300/80"
            >
              {propertyAboutData.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1 group">
                  <div className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-stone-900 tracking-tight group-hover:text-bronze transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-stone-600 uppercase leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Narrative & Dual 3D Showcase */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-lg sm:text-xl md:text-2xl font-serif italic text-stone-800 leading-relaxed">
                "{propertyAboutData.paragraph1}"
              </p>
              <p className="text-sm sm:text-base font-normal text-stone-600 leading-relaxed">
                {propertyAboutData.paragraph2}
              </p>
            </motion.div>

            {/* Dual Photo Showcase: Dollhouse & 3D Interior */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4"
            >
              {/* Tile 1: Dollhouse Model */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-soft border border-stone-300/50 group">
                <img
                  src={images.aboutDollhouse}
                  alt="Model Secțional 3D Dollhouse"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.16em] text-stone-900 uppercase flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-bronze" />
                      <span>VEDERE DOLLHOUSE 3D</span>
                    </div>
                    <div className="text-[10px] text-stone-600">Perspectivă Secțională Completă</div>
                  </div>
                </div>
              </div>

              {/* Tile 2: Interior Scan */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury-soft border border-stone-300/50 group sm:translate-y-6">
                <img
                  src={images.aboutInterior}
                  alt="Tur Virtual Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold tracking-[0.16em] text-stone-900 uppercase flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-bronze" />
                      <span>PREDARE ÎN 24-48H</span>
                    </div>
                    <div className="text-[10px] text-stone-600">Optimizat Web, Mobil & VR</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
