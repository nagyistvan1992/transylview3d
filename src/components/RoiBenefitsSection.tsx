import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Eye, Filter, Globe2, DollarSign, ShieldCheck, Sparkles } from 'lucide-react';

export const RoiBenefitsSection: React.FC = () => {
  const stats = [
    {
      metric: '+300%',
      title: 'Timp Petrecut pe Anunț',
      description: 'Cumpărătorii și chiriașii petrec în medie de 3 ori mai mult timp explorând o proprietate care dispune de un tur virtual 3D.',
      icon: Clock,
      highlight: 'Atenție maximă a clienților',
    },
    {
      metric: '+87%',
      title: 'Mai Multe Vizualizări',
      description: 'Algoritmii portalurilor imobiliare și rețelelor sociale favorizează anunțurile cu conținut media 3D imersiv.',
      icon: Eye,
      highlight: 'Prioritate în căutări',
    },
    {
      metric: '-50%',
      title: 'Vizionări Inutile Eliminate',
      description: 'Filtrează clienții nehotărâți. La fața locului ajung doar cumpărători calificați, care știu exact cum arată fiecare cameră.',
      icon: Filter,
      highlight: 'Economie majoră de timp',
    },
    {
      metric: '+31%',
      title: 'Vânzare sau Închiriere mai Rapidă',
      description: 'Transparența totală oferită de turul 3D elimină dubiile și accelerează luarea deciziei de cumpărare.',
      icon: TrendingUp,
      highlight: 'Cicluri scurte de vânzare',
    },
    {
      metric: '24/7',
      title: 'Deschis pentru Clienții din Diasporă',
      description: 'Persoanele din alte orașe sau din străinătate pot viziona proprietatea la scară reală fără a fi nevoie de deplasare fizică.',
      icon: Globe2,
      highlight: 'Acces global nelimitat',
    },
    {
      metric: '100x',
      title: 'Rentabilitate Imediată a Investiției (ROI)',
      description: 'Un pachet de 499 – 899 lei reprezintă sub 0.2% dintr-o tranzacție și se amortizează instantaneu la prima semnare.',
      icon: DollarSign,
      highlight: 'Investiție minimă, impact maxim',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-canvas-light overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/90 border border-stone-300/80 text-stone-800 text-xs font-bold tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>RENTABILITATE & STATISTICI IMOBILIARE</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 tracking-tight">
            De ce un Tur Virtual 3D?
            <br />
            <span className="text-bronze-dark font-normal">Impact Real & Rezultate Dovedite</span>
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Un tur virtual 3D nu este un simplu element decorativ, ci cel mai eficient instrument de marketing imobiliar pentru proprietari, agenții și dezvoltatori.
          </p>
        </div>

        {/* 6 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-luxury-soft hover:shadow-luxury-card hover:border-bronze/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="font-display font-black text-3xl sm:text-4xl text-stone-950 tracking-tight group-hover:text-bronze transition-colors">
                      {item.metric}
                    </div>
                    <div className="p-3 rounded-2xl bg-stone-100 text-stone-700 group-hover:bg-bronze group-hover:text-stone-950 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-lg font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-bronze" />
                  <span>{item.highlight}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-display text-base sm:text-lg font-bold">
              Pregătit să îți prezinți proprietatea la standarde 8K?
            </h4>
            <p className="text-xs sm:text-sm text-stone-400">
              Programăm deplasarea în Satu Mare și pe o rază de 100 km în Transilvania în cel mai scurt timp.
            </p>
          </div>
          <a
            href="#pricing"
            className="px-6 py-3 rounded-full bg-white text-stone-950 font-bold text-xs tracking-wider uppercase hover:bg-stone-100 transition-all flex-shrink-0 shadow-md"
          >
            Vezi Pachetele de Preț →
          </a>
        </div>

      </div>
    </section>
  );
};
