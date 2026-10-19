import React from 'react';
import { motion } from 'framer-motion';

export const LocationSection: React.FC = () => {
  const cities = [
    { index: '01', name: 'Satu Mare (Sediu Central)', distance: '0 km', detail: 'Deplasare inclusă în municipiu și zona metropolitană' },
    { index: '02', name: 'Carei & Tășnad', distance: '35 km', detail: 'Deplasare rapidă în aceeași zi' },
    { index: '03', name: 'Baia Mare & Maramureș', distance: '60 km', detail: 'Acoperire completă pentru imobile, pensiuni și hoteluri' },
    { index: '04', name: 'Zalău & Județul Sălaj', distance: '90 km', detail: 'Scanări 3D rezidențiale și spații comerciale' },
    { index: '05', name: 'Oradea & Județul Bihor', distance: '110 km', detail: 'Disponibil pentru proiecte medii, mari și ansambluri' },
  ];

  return (
    <section id="location" className="py-16 md:py-24 bg-canvas overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block">
              Zonă de deplasare & acoperire
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
              Satu Mare & 100 km în Transilvania
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="font-sans text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
              Ne deplasăm cu laboratorul mobil complet (Insta X5 8K, trepiezi de carbon și calibrare optică de studio) oriunde în Satu Mare și pe o rază de 100 km în județele învecinate din Transilvania.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Terrace View Image */}
          <div className="lg:col-span-7 relative aspect-[16/10] rounded-xl overflow-hidden shadow-xs border border-stone-200/80 group">
            <img
              src="/images/retreat_terrace.jpg"
              alt="TransylView 3D Acoperire Satu Mare și Transilvania"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 block mb-1">
                  Deplasare mobilă rapidă
                </span>
                <div className="font-sans font-semibold text-base sm:text-lg text-white">
                  Satu Mare · Baia Mare · Oradea · Carei · Zalău
                </div>
              </div>
              <div className="bg-stone-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/15 text-xs font-medium tracking-wide self-start sm:self-auto">
                <span>Echipament Insta X5 8K</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Architectural City Cards */}
          <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
            {cities.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="gpu-smooth p-4 rounded-xl bg-white border border-stone-200/80 hover:border-stone-400 transition-colors flex items-center justify-between shadow-xs"
              >
                <div className="flex items-baseline gap-3.5 min-w-0">
                  <span className="font-sans text-xs font-bold tracking-widest text-bronze-dark tabular-nums flex-shrink-0">
                    {item.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-sans text-sm sm:text-base font-semibold text-stone-900 tracking-tight truncate">
                      {item.name}
                    </h3>
                    <p className="font-sans text-xs text-stone-500 leading-normal">{item.detail}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 pl-2">
                  <span className="font-sans text-xs font-semibold text-stone-700 tracking-wider bg-stone-100 px-2.5 py-1 rounded-sm tabular-nums">
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

