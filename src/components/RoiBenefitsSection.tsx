import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, TrendingUp, Maximize2, ArrowRight } from 'lucide-react';

export const RoiBenefitsSection: React.FC = () => {
  const stats = [
    {
      metric: '-45%',
      title: 'Vizionări Neconcludente',
      description: 'Eficiență maximă: eliminarea vizionărilor necalificate. La fața locului ajung doar cumpărători care cunosc deja compartimentarea și dimensiunile reale.',
      icon: CheckCircle2,
    },
    {
      metric: '24-72h',
      title: 'Timp de Livrare',
      description: 'Predare în 24–72h în funcție de suprafața imobilului. Pachetul Exclusiv beneficiază de prioritate maximă la procesare și predare accelerată.',
      icon: Clock,
    },
    {
      metric: '+300%',
      title: 'Timp Petrecut pe Anunț',
      description: 'Cumpărătorii și chiriașii petrec în medie de trei ori mai mult timp explorând un anunț care include un tur volumetric 3D.',
      icon: TrendingUp,
    },
  ];

  const benefits = [
    {
      title: 'Filtrare tehnică zero: Încărcare instantanee pe mobil',
      description: 'Turul rulează direct în browserul oricărui smartphone, optimizat pentru cumpărătorii care accesează linkul din Storia, OLX sau Facebook fără aplicații dedicate.',
    },
    {
      title: 'Avantaj decisiv pentru contracte de reprezentare exclusivă',
      description: 'Agențiile partenere obțin mai ușor mandate exclusive demonstrând vânzătorilor o prezentare premium cu scanare volumetrică, exterior și planuri cotate.',
    },
    {
      title: 'Acces direct pentru cumpărătorii din diasporă',
      description: 'Persoanele din alte orașe sau din străinătate pot evalua proprietatea la scară reală și măsura pereții cu rigla digitală fără deplasare.',
    },
    {
      title: 'Investiție amortizată din prima tranzacție',
      description: 'Un pachet de 499 – 899 RON reprezintă sub 0,2% din valoarea unei tranzacții obișnuite, accelerând considerabil semnarea contractului.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-canvas-light overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            Rentabilitate și rezultate
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight [text-wrap:balance]">
            De ce un tur virtual 3D? <span className="text-bronze-dark">Rezultate măsurabile.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl">
            Un tur virtual 3D nu este un element decorativ, ci un instrument de marketing imobiliar care reduce timpul de vânzare pentru proprietari, agenții și dezvoltatori.
          </p>
        </div>

        {/* Headline Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                className="gpu-smooth p-6 sm:p-8 bg-white border border-stone-200/80 rounded-xl shadow-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
                    {item.metric}
                  </span>
                  <Icon className="w-5 h-5 text-bronze" strokeWidth={1.5} aria-hidden="true" />
                </div>

                <h3 className="font-sans text-lg sm:text-xl font-semibold text-stone-900 tracking-tight leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Secondary Benefits — definition-style list */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 border-t border-stone-200">
          {benefits.map((item) => (
            <div key={item.title} className="flex items-start gap-3 py-5 border-b border-stone-200">
              <Maximize2 className="w-4 h-4 text-stone-500 flex-shrink-0 mt-1" strokeWidth={1.5} aria-hidden="true" />
              <div className="space-y-1">
                <h4 className="font-sans text-base font-semibold text-stone-900 tracking-tight">
                  {item.title}
                </h4>
                <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-xl bg-stone-900 border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-sans text-lg sm:text-xl font-semibold text-stone-100 tracking-tight leading-snug">
              Pregătit să îți prezinți proprietatea la standarde 8K?
            </h4>
            <p className="font-sans text-sm sm:text-base text-stone-400 leading-relaxed">
              Programăm deplasarea în Satu Mare și pe o rază de 100 km în Transilvania în cel mai scurt timp.
            </p>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors flex-shrink-0"
          >
            Vezi pachetele de preț
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>

      </div>
    </section>
  );
};
