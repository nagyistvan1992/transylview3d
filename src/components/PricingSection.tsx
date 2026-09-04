import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Info, Building2, Gift, BadgePercent, Sparkles, PhoneCall } from 'lucide-react';
import { pricingPackages } from '../data/propertyData';

interface PricingSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="pricing" className="py-20 sm:py-32 bg-canvas overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/80 border border-stone-300/80 text-stone-800 text-xs font-bold tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
            <span>PACHETE & TARIFE SERVICII</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-950 tracking-tight">
            Prețuri transparente, fără costuri ascunse
          </h2>

          <p className="text-stone-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2">
            Pachete calibrate competitiv pentru piața imobiliară din România. Prețurile sunt orientative; oferta finală se adaptează în funcție de suprafață și cerințele speciale.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPackages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`relative rounded-3xl bg-white p-6 sm:p-8 lg:p-9 transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'border-2 border-stone-900 shadow-[0_25px_60px_-15px_rgba(27,23,21,0.2)] md:-translate-y-3 z-10 ring-1 ring-stone-900/10'
                    : 'border border-stone-200/90 shadow-luxury-soft hover:shadow-luxury-card hover:border-stone-300'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-900 text-stone-100 text-[10px] font-mono tracking-widest px-3.5 py-1 rounded-full shadow-md uppercase whitespace-nowrap border border-stone-700">
                    <span>RECOMANDAT PENTRU VÂNZARE</span>
                  </div>
                )}

                {/* Top Info */}
                <div>
                  <div className="space-y-1 mb-6">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-stone-900">
                      {pkg.name}
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm font-medium">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-stone-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display font-extrabold text-4xl sm:text-5xl text-stone-950 tracking-tight">
                        {pkg.price}
                      </span>
                      <span className="font-display font-bold text-xl text-stone-900">
                        lei
                      </span>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase mt-1 block">
                      {pkg.startingPriceLabel}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3.5 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700 font-medium">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            isPopular
                              ? 'bg-[#556B2F]/15 text-[#556B2F]'
                              : 'bg-stone-100 text-stone-600'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <div>
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPopular
                        ? 'bg-[#556B2F] hover:bg-[#435424] text-white shadow-md hover:scale-102'
                        : 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm hover:scale-101'
                    }`}
                  >
                    <span>{pkg.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra Cost Disclaimer for 2D Floor Plans */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-amber-500/10 border border-amber-600/30 max-w-3xl mx-auto flex items-start gap-3.5 text-stone-800">
          <Info className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-amber-950 uppercase tracking-wide block font-mono text-[11px] sm:text-xs">
              Notă Importantă: Serviciul de Plan 2D Cotat (Releveu Tehnic)
            </span>
            <p className="text-stone-700 leading-relaxed font-light">
              Pachetele noastre de scanare 3D se concentrează pe experiența imersivă la 360°, turul virtual interactiv 8K și fotografiile HDR de înaltă rezoluție. 
              <strong className="font-semibold text-stone-900"> Generarea planului 2D cotat cu cote milimetrice este un serviciu opțional care implică un cost suplimentar</strong>, calculat în funcție de complexitatea și suprafața proprietății.
            </p>
          </div>
        </div>

        {/* Dedicated B2B Section for Real Estate Agents & 10+ Property Portfolios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 sm:mt-20 relative rounded-3xl sm:rounded-4xl overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 border border-stone-800 text-stone-100 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle background ambient accents */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#556B2F]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-bronze/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-10 lg:p-14">
            {/* Top row with badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/90 border border-stone-700 text-stone-300 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-mono">
                <Building2 className="w-3.5 h-3.5 text-bronze" />
                <span>PARTENERIAT B2B • AGENȚII & DEZVOLTATORI</span>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono shadow-sm">
                🎁 Primul Tur 100% Gratuit
              </span>
            </div>

            {/* Header Content */}
            <div className="max-w-3xl space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Ești Agent Imobiliar sau Deții Peste 10 Proprietăți?
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light">
                Îți oferim ocazia să testezi eficiența scanărilor noastre 3D la cele mai înalte standarde: <strong className="text-white font-semibold underline decoration-bronze underline-offset-4">primul tur virtual este 100% GRATUIT</strong>, fără niciun cost ascuns sau obligație contractuală preliminară.
              </p>
            </div>

            {/* 3 Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
              {/* Pillar 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800/90 flex flex-col justify-between hover:border-stone-700 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Gift className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                    1. Primul Tur 3D Gratuit
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                    O scanare pilot completă pentru orice apartament sau casă din portofoliul tău. Primești turul 3D interactiv 8K și fotografiile HDR gata de promovare imediată.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Fără cost • Testezi calitatea
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800/90 flex flex-col justify-between hover:border-stone-700 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <BadgePercent className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                    2. Tarife Personalizate de Volum
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                    La semnarea unui contract cadru pentru mai multe proprietăți, primești un tarif avantajos de volum, mult mai rentabil per unitate decât prețurile standard.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center gap-2 text-[11px] font-mono text-amber-300">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Cost optimizat per proprietate
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-stone-900/90 border border-stone-800/90 flex flex-col justify-between hover:border-stone-700 transition-colors">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                    3. Prioritate & Co-Branding Agenție
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
                    Integrare directă a siglei agenției, numărului de telefon și link-urilor de contact în tur. Scanare și livrare prioritară în 24h pentru listările urgente.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-800/80 flex items-center gap-2 text-[11px] font-mono text-sky-300">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" /> Livrare 24h • Branding integrat
                </div>
              </div>
            </div>

            {/* CTA Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-stone-900/95 border border-stone-800 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center lg:text-left">
                <h5 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Pregătit să transformi prezentarea proprietăților tale?
                </h5>
                <p className="text-xs sm:text-sm text-stone-400 font-light max-w-xl">
                  Trimite-ne o solicitare rapidă pentru a programa primul tur gratuit sau contactează-ne direct pentru a discuta un pachet personalizat de volum.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => onSelectPackage('Parteneriat B2B (Primul Tur Gratuit - 10+ Proprietăți)')}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-[#556B2F] hover:bg-[#435424] text-white font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-black/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Solicită Turul Gratuit B2B</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:0751801025"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs tracking-wider transition-colors border border-stone-700/60"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-bronze" />
                  <span>0751 801 025</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Commercial & Big Complexes Secondary Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-500 font-light">
            Deții un hotel, showroom auto, spațiu industrial sau ansamblu rezidențial mare?{' '}
            <button
              onClick={() => onSelectPackage('Pachet Personalizat / Complex Rezidențial')}
              className="font-medium text-stone-700 hover:text-bronze underline underline-offset-2 transition-colors ml-1"
            >
              Solicită o ofertă dedicată pentru spații mari →
            </button>
          </p>
        </div>

      </div>
    </section>
  );
};
