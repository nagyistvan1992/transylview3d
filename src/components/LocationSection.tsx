import React from 'react';
import { motion } from 'framer-motion';

export const LocationSection: React.FC = () => {
  const cities = [
    { name: 'Satu Mare (Sediu Central)', distance: '0 KM', detail: 'Deplasare gratuită în municipiu și zona metropolitană' },
    { name: 'Carei & Tășnad', distance: '35 KM', detail: 'Deplasare rapidă în aceeași zi' },
    { name: 'Baia Mare & Maramureș', distance: '60 KM', detail: 'Acoperire completă pentru imobile, pensiuni și hoteluri' },
    { name: 'Zalău & Județul Sălaj', distance: '90 KM', detail: 'Scanări 3D rezidențiale și spații comerciale' },
    { name: 'Oradea & Județul Bihor', distance: '110 KM', detail: 'Disponibil pentru proiecte medii, mari și ansambluri' },
  ];

  return (
    <section id="location" className="py-20 sm:py-32 bg-canvas overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center gap-2 text-bronze text-xs sm:text-sm font-bold tracking-[0.28em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
              <span>ZONĂ DE DEPLASARE & ACOPERIRE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-stone-950 font-normal">
              Satu Mare & 100km în Transilvania
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-stone-600 text-xs sm:text-base leading-relaxed">
              Ne deplasăm cu laboratorul mobil complet (Insta X5 8K, trepiezi de carbon și calibrare optică de studio) oriunde în Satu Mare și pe o rază de 100 km în județele învecinate din Transilvania.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Terrace View Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury-card border border-stone-300 group">
            <img
              src="/images/retreat_terrace.jpg"
              alt="TransylView 3D Acoperire Satu Mare și Transilvania"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-bronze uppercase">
                  DEPLASARE MOBILĂ RAPIDĂ
                </div>
                <div className="font-display font-bold text-base sm:text-xl">
                  Satu Mare • Baia Mare • Oradea • Carei • Zalău
                </div>
              </div>
              <div className="bg-stone-900/80 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 text-xs font-semibold tracking-wider self-start sm:self-auto">
                <span>ECHIPAMENT INSTA X5 8K</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Bespoke Minimalist City Cards (No Generic Clutter Icons) */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            {cities.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                className="gpu-smooth p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-bronze transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-bronze transition-colors flex-shrink-0" />
                  <div>
                    <h4 className="font-display text-xs sm:text-sm font-bold text-stone-900 tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-medium">{item.detail}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pl-2">
                  <span className="font-mono text-[11px] sm:text-xs font-bold text-stone-700 tracking-wider bg-stone-100 group-hover:bg-bronze/15 group-hover:text-bronze px-2.5 py-1 rounded-full transition-colors">
                    {item.distance}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
