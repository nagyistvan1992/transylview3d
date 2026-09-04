import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Info } from 'lucide-react';
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

        {/* Custom Project Note */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-stone-100 border border-stone-300/80 text-center max-w-2xl mx-auto space-y-2.5">
          <h4 className="font-display text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wider">
            Ai un proiect comercial, hotelier sau ansamblu rezidențial mare?
          </h4>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Oferim soluții dedicate cu scanare 360° la sol a spațiilor exterioare, planuri tehnice detaliate, virtual staging avansat și integrare completă pe website.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectPackage('Pachet Personalizat / Complex Rezidențial')}
              className="text-xs font-bold tracking-widest text-bronze-dark uppercase hover:underline"
            >
              Cere ofertă personalizată →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
