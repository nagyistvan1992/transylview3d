import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { propertyAboutData } from '../data/propertyData';
import { CustomImages } from '../types';

interface AboutSectionProps {
  images: CustomImages;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  return (
    <section id="about" className="relative py-20 sm:py-32 bg-canvas overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-bronze/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-10 sm:mb-16"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
          <span className="text-xs sm:text-sm font-bold tracking-[0.28em] text-stone-800 uppercase">
            {propertyAboutData.sectionBadge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Full Uncropped Camera Gear Photo */}
          <div className="lg:col-span-5 space-y-8 sm:space-y-12">
            
            {/* Insta X5 Camera Gear Card - Complete uncropped portrait display showing full height from lens to tripod base */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury-card border border-stone-300/80 bg-stone-950 flex items-center justify-center p-3 sm:p-4 group"
            >
              <img
                src={images.aboutGear}
                alt="Insta X5 8K Cameră Profesională Tururi Virtuale 3D"
                className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-102"
              />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-xs font-medium tracking-wider">
                <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 flex items-center gap-1.5 shadow-lg text-[11px] sm:text-xs">
                  <Camera className="w-3.5 h-3.5 text-bronze" />
                  <span>INSTA X5 8K GEAR</span>
                </span>
                <span className="bg-stone-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/15 font-mono text-[9px] sm:text-[10px] text-stone-300">
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
              className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 border-t border-stone-300/80"
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

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6"
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-950 leading-[1.12] tracking-tight">
                Digitalizare Imobiliară de Precizie la Rezoluție 8K
              </h2>
              <p className="text-base sm:text-lg text-stone-700 leading-relaxed font-light">
                {propertyAboutData.paragraph1}
              </p>
            </motion.div>

            {/* Secondary Paragraph & Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6 pt-6 border-t border-stone-300/80"
            >
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {propertyAboutData.paragraph2}
              </p>

              {/* 2 Feature Showcase Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
                  <div className="w-2 h-2 rounded-full bg-bronze" />
                  <h4 className="font-display text-sm font-bold text-stone-900">
                    Model 3D Dollhouse Secțional
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Vedere tridimensională completă care permite cumpărătorilor să înțeleagă fluxul spațiului și etajele.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
                  <div className="w-2 h-2 rounded-full bg-bronze" />
                  <h4 className="font-display text-sm font-bold text-stone-900">
                    Măsurători Interactive Direct în 3D
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Cumpărătorii pot măsura pereții și spațiile direct în turul 3D interactiv (planurile 2D cotate sunt disponibile opțional, ca serviciu extra).
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
