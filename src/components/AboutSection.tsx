import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { propertyAboutData } from '../data/propertyData';
import { CustomImages } from '../types';

interface AboutSectionProps {
  images: CustomImages;
}

const techFeatures = [
  {
    index: '01',
    title: 'Scanare Interior & Exterior',
    subtitle: 'Fără limitări în lumina soarelui',
    description:
      'Curți, grădini, terase și fațade captate impecabil în lumina soarelui, fără erori de reflexie sau limitări infraroșu.',
  },
  {
    index: '02',
    title: 'Riglă Digitală de Măsurare',
    subtitle: 'Cote verificate în browser',
    description:
      'Cumpărătorii pot măsura pereții, tocurile ușilor și spațiul de mobilier direct din browser cu precizie milimetrică.',
  },
  {
    index: '03',
    title: 'Player White-Label 100%',
    subtitle: 'Dedicare exclusivă agenției',
    description:
      'Fără sigle sau branding terț. Playerul 3D este personalizat exclusiv cu identitatea vizuală a agenției partenere.',
  },
  {
    index: '04',
    title: 'Model Dollhouse & Planuri 2D',
    subtitle: 'Vedere secțională & releveu',
    description:
      'Vedere volumetrică 3D secțională pe niveluri și planuri 2D cotate schematice cu suprafețele utile ale fiecărei camere.',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ images }) => {
  return (
    <section id="about" className="relative py-16 md:py-24 bg-canvas overflow-hidden border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Editorial Header + Symmetrical Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gpu-smooth grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 sm:pb-12 mb-10 sm:mb-14 border-b border-stone-200"
        >
          {/* Left Header Column: Eyebrow, Main Title & Primary Lead */}
          <div className="lg:col-span-7 space-y-3 text-center sm:text-left">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block">
              {propertyAboutData.sectionBadge}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight [text-wrap:balance]">
              Digitalizare Imobiliară de Precizie la <span className="text-bronze-dark">Rezoluție 8K</span>
            </h2>

            <p className="font-sans text-sm sm:text-base lg:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto sm:mx-0">
              {propertyAboutData.paragraph1}
            </p>
          </div>

          {/* Right Header Column: Clean Architectural 3-Column Metrics */}
          <div className="lg:col-span-5 w-full">
            <div className="grid grid-cols-3 divide-x divide-stone-200/90 bg-white rounded-xl border border-stone-200/80 py-4 sm:py-5 px-2 shadow-xs text-center">
              {propertyAboutData.stats.map((stat, idx) => (
                <div key={idx} className="px-2 sm:px-4 space-y-1">
                  <div className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="font-sans text-[11px] sm:text-xs font-medium text-stone-500 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Symmetrical 12-Column Visual & Technical Grid (Height-Matched) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column (5 cols): Dual Visual Showcase (Camera Capture + Dollhouse 3D Output) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="gpu-smooth lg:col-span-5 flex flex-col justify-between gap-5 sm:gap-6"
          >
            {/* Visual Card 1: Insta X5 8K Studio Hardware */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm border border-stone-200/80 bg-stone-950 group">
              <img
                src={images.aboutGear}
                alt="Insta X5 8K Cameră Profesională Tururi Virtuale 3D"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-transparent to-transparent pointer-events-none" />

              {/* Clean Minimal Equipment Caption Bar */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white text-xs">
                <span className="bg-stone-950/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/15 font-medium tracking-wide">
                  Echipament Insta X5 8K HDR
                </span>
                <span className="text-[11px] font-medium text-stone-200 bg-stone-950/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  Calibrare 360°
                </span>
              </div>
            </div>

            {/* Visual Card 2: Volumetric Dollhouse 3D Reconstruction Preview */}
            <div className="rounded-xl bg-stone-950 text-stone-100 border border-stone-800/90 shadow-sm overflow-hidden flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch flex-1">
              <div className="relative sm:w-5/12 lg:w-full xl:w-5/12 aspect-[16/10] sm:aspect-auto lg:aspect-[16/9] xl:aspect-auto min-h-[145px] bg-stone-900 overflow-hidden">
                <img
                  src={images.aboutDollhouse}
                  alt="Model Volumetric Dollhouse 3D Metareal Stage"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-bronze-light block">
                    Model Volumetric 3D
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-semibold text-white leading-snug">
                    Vedere Dollhouse & Plan Cotat
                  </h3>
                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    Fiecare scanare 8K este reconstruită spațial într-un model 3D interactiv cu vedere secțională pe niveluri și măsurători directe.
                  </p>
                </div>

                <a
                  href="#demo-tour"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-200 hover:text-white transition-colors pt-1"
                >
                  <span>Explorează demonstrația 3D mai jos</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-bronze-light" strokeWidth={1.75} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Editorial Narrative + Clean Numbered 2x2 Architectural Grid */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="gpu-smooth lg:col-span-7 flex flex-col justify-between gap-5 sm:gap-6"
          >
            {/* Editorial Narrative Paragraph */}
            <div className="rounded-xl bg-white border border-stone-200/80 shadow-xs p-5 sm:p-6">
              <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                {propertyAboutData.paragraph2}
              </p>
            </div>

            {/* 4 Technology Pillars in a Symmetrical 2x2 Architectural Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 flex-1">
              {techFeatures.map((feat) => (
                <div
                  key={feat.index}
                  className="p-5 sm:p-6 rounded-xl bg-white border border-stone-200/80 hover:border-stone-300 shadow-xs transition-colors flex flex-col justify-between gap-2.5"
                >
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-between gap-2 pb-2 border-b border-stone-100">
                      <span className="font-sans text-xs font-bold tracking-widest text-bronze-dark tabular-nums">
                        {feat.index}
                      </span>
                      <span className="font-sans text-[11px] font-medium text-stone-400">
                        {feat.subtitle}
                      </span>
                    </div>

                    <h3 className="font-sans text-base sm:text-lg font-semibold text-stone-900 tracking-tight leading-snug pt-0.5">
                      {feat.title}
                    </h3>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};


