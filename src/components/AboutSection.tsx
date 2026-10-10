import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Layers, Ruler, Sun, ShieldCheck } from 'lucide-react';
import { propertyAboutData } from '../data/propertyData';
import { CustomImages } from '../types';

interface AboutSectionProps {
  images: CustomImages;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-canvas overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gpu-smooth mb-10 sm:mb-12"
        >
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            {propertyAboutData.sectionBadge}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Full Uncropped Camera Gear Photo & Technical Specifications */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Insta X5 Camera Gear Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="gpu-smooth relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-stone-200/80 bg-stone-950 flex items-center justify-center group"
            >
              <img
                src={images.aboutGear}
                alt="Insta X5 8K Cameră Profesională Tururi Virtuale 3D"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-xs font-medium">
                <span className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15 flex items-center gap-1.5 shadow-sm text-xs font-medium">
                  <Camera className="w-3.5 h-3.5 text-stone-300" strokeWidth={1.5} />
                  <span>Insta X5 8K</span>
                </span>
                <span className="bg-stone-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-md border border-white/15 text-xs text-stone-300 font-medium">
                  Calitate de studio
                </span>
              </div>
            </motion.div>

            {/* Key Metric Numbers - Definition List Style */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="gpu-smooth grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-stone-200"
            >
              {propertyAboutData.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="font-sans text-xs text-stone-500 leading-normal tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Editorial Narrative & Specifications */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="gpu-smooth space-y-4"
            >
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
                Digitalizare Imobiliară de Precizie la Rezoluție 8K
              </h2>
              <p className="font-sans text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
                {propertyAboutData.paragraph1}
              </p>
            </motion.div>

            {/* Secondary Paragraph & Feature List */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="gpu-smooth space-y-6 pt-6 border-t border-stone-200"
            >
              <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {propertyAboutData.paragraph2}
              </p>

              {/* 4 Feature Showcase Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-2">
                <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-stone-700 mb-1">
                    <Sun className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
                      Scanare Interior & Exterior
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Curți, grădini, terase și fațade captate impecabil în lumina soarelui, fără erori de reflexie sau limitări infraroșu.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-stone-700 mb-1">
                    <Ruler className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
                      Riglă Digitală de Măsurare
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Cumpărătorii pot măsura pereții, tocurile ușilor și spațiul de mobilier direct din browser cu precizie milimetrică.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-stone-700 mb-1">
                    <ShieldCheck className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
                      Player White-Label 100%
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Fără sigle sau branding terț. Playerul 3D este personalizat exclusiv cu identitatea vizuală a agenției partenere.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white border border-stone-200/80 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-stone-700 mb-1">
                    <Layers className="w-4 h-4 text-stone-700" strokeWidth={1.5} />
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug">
                      Model Dollhouse & Planuri 2D
                    </h3>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    Vedere volumetrică 3D secțională pe niveluri și planuri 2D cotate schematice cu suprafețele utile ale fiecărei camere.
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
