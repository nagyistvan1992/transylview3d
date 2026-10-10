import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Info, Building2, Gift, BadgePercent, Layers, PhoneCall, Cloud } from 'lucide-react';
import { pricingPackages } from '../data/propertyData';

interface PricingSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-canvas overflow-hidden border-t border-stone-300/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            Pachete & Tarife Servicii
          </span>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-stone-900 leading-tight">
            Prețuri transparente, fără costuri ascunse
          </h2>

          <p className="font-sans text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Pachete calibrate pentru piața imobiliară din România. Oferta finală se adaptează în funcție de suprafața exactă și cerințele fiecărei proprietăți.
          </p>
        </div>

        {/* 3 Pricing Cards Grid - Perfectly Symmetrical & Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-stretch pt-6 sm:pt-4">
          {pricingPackages.map((pkg, idx) => {
            const isPopular = pkg.isPopular;

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
                className={`gpu-smooth relative rounded-xl bg-white p-5 sm:p-7 md:p-8 transition-colors flex flex-col justify-between ${
                  isPopular
                    ? 'border-2 border-stone-900 shadow-md ring-1 ring-stone-900/5'
                    : 'border border-stone-200/80 shadow-sm'
                }`}
              >
                {/* Popular Overline Tag — POSITIONED OUTSIDE THE CARD BORDER FOR PERFECT SYMMETRY */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-900 bg-white px-3 py-1 rounded-full border border-stone-900 shadow-xs whitespace-nowrap">
                      Recomandat pentru vânzare
                    </span>
                  </div>
                )}

                {/* Top Info */}
                <div>
                  <div className="space-y-1 mb-5 sm:mb-6">
                    <h3 className="font-sans text-lg sm:text-xl font-semibold text-stone-900 tracking-tight leading-snug">
                      {pkg.name}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-500 font-normal">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-stone-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 tabular-nums">
                        {pkg.price}
                      </span>
                      <span className="font-sans text-sm font-semibold text-stone-700">
                        RON
                      </span>
                    </div>
                    <span className="font-sans text-xs text-stone-500 leading-normal tracking-wide mt-1 block">
                      {pkg.startingPriceLabel}
                    </span>
                  </div>

                  {/* Standardized Cloud Hosting Row (Same layout across all 3 cards) */}
                  <div className="mb-5 sm:mb-6 p-2.5 rounded-lg bg-stone-50 border border-stone-200/70 flex items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Cloud className="w-4 h-4 text-stone-700 flex-shrink-0" strokeWidth={1.5} />
                      <div className="min-w-0">
                        <span className="font-semibold text-stone-900 block leading-tight truncate">
                          {pkg.hostingDuration}
                        </span>
                        <span className="text-[10px] text-stone-500 block leading-tight truncate">
                          Găzduire Cloud Metareal
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-medium text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-200 tabular-nums flex-shrink-0 whitespace-nowrap">
                      {pkg.hostingAfterPrice}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 font-normal">
                        <Check className="w-4 h-4 text-stone-700 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <div>
                  <button
                    onClick={() => onSelectPackage(pkg.name)}
                    className={`w-full py-3 sm:py-3.5 rounded-md text-sm font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-stone-900 text-white hover:bg-stone-800 active:bg-stone-950'
                        : 'border border-stone-300 text-stone-800 hover:border-stone-900 hover:text-stone-900 active:bg-stone-100'
                    }`}
                  >
                    <span>{pkg.ctaLabel}</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Note for 2D Floor Plans & Cloud Hosting Policy */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-xl bg-stone-50 border border-stone-200/80 max-w-3xl mx-auto flex items-start gap-3.5 text-stone-800">
          <Info className="w-4 h-4 text-stone-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <div className="space-y-1 text-xs sm:text-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-700 block">
              Găzduire Cloud Metareal & Transparență Totală
            </span>
            <p className="font-sans text-stone-600 leading-relaxed font-normal">
              Fiecare tur 3D include găzduire de mare viteză fără costuri lunare pe perioada optimă de tranzacționare a proprietății: <strong className="font-semibold text-stone-900">2 luni gratuite</strong> (Esențial), <strong className="font-semibold text-stone-900">3 luni gratuite</strong> (Premium) și <strong className="font-semibold text-stone-900">6 luni gratuite</strong> (Exclusiv). Predarea se realizează în <strong className="font-semibold text-stone-900">24–72 de ore</strong> în funcție de suprafața imobilului, <strong className="font-semibold text-stone-900">Pachetul Exclusiv beneficiind de prioritate garantată</strong> la procesare și livrare. Planul 2D cotat este inclus direct în pachetele Premium și Exclusiv. Prelungirea opțională ulterioară este de doar 29 RON/lună.
            </p>
          </div>
        </div>

        {/* Dedicated B2B Section for Real Estate Agents & 10+ Property Portfolios */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="gpu-smooth mt-12 sm:mt-20 rounded-xl overflow-hidden bg-white border border-stone-200/80 shadow-sm p-6 sm:p-10 lg:p-12"
        >
          {/* Top row with badges */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-stone-600 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                Parteneriat B2B · Agenții & Dezvoltatori
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-sm bg-stone-100 border border-stone-300 text-stone-900 text-xs font-semibold tracking-wider uppercase w-fit">
              Primul tur 100% gratuit
            </span>
          </div>

          {/* Header Content */}
          <div className="max-w-3xl space-y-2 mb-8">
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-stone-900 tracking-tight leading-tight">
              Ești agent imobiliar sau administrezi un portofoliu de proprietăți?
            </h3>
            <p className="font-sans text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Testează standardul de calitate TransylView 3D fără niciun risc: <strong className="text-stone-900 font-semibold">primul tur virtual este 100% gratuit</strong>, fără costuri ascunse sau obligații contractuale preliminare.
            </p>
          </div>

          {/* 3 Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {/* Pillar 1 */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-md bg-stone-200 text-stone-900 flex items-center justify-center">
                  <Gift className="w-4 h-4 text-stone-800" strokeWidth={1.5} />
                </div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-stone-900 tracking-tight">
                  1. Primul Tur 3D Gratuit
                </h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  O scanare pilot completă pentru orice proprietate din portofoliu. Primești turul 3D interactiv 8K și fotografiile HDR gata de promovare.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-200 flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                <Check className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} /> Fără cost · Testezi calitatea
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-md bg-stone-200 text-stone-900 flex items-center justify-center">
                  <BadgePercent className="w-4 h-4 text-stone-800" strokeWidth={1.5} />
                </div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-stone-900 tracking-tight">
                  2. Reducere 15–25% de Volum
                </h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Pentru colaborări recurente sau portofolii mari, oferim tarife negociate de volum cu economii între 15% și 25% per proprietate.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-200 flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                <Check className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} /> Cost optimizat per unitate
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-5 rounded-lg bg-stone-50 border border-stone-200 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-md bg-stone-200 text-stone-900 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-stone-800" strokeWidth={1.5} />
                </div>
                <h4 className="font-sans text-sm sm:text-base font-semibold text-stone-900 tracking-tight">
                  3. White-Label 100% & Prioritate
                </h4>
                <p className="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  Player personalizat fără branding terț, cu datele de contact și logo-ul agenției tale. Livrare prioritară în 24–48 de ore.
                </p>
              </div>
              <div className="pt-3 mt-3 border-t border-stone-200 flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                <Check className="w-3.5 h-3.5 text-stone-700" strokeWidth={1.5} /> Livrare 24–48h · White-Label inclus
              </div>
            </div>
          </div>

          {/* Bottom Action Box */}
          <div className="p-6 rounded-lg bg-stone-900 text-stone-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-sans text-base sm:text-lg font-semibold text-white">
                Începe colaborarea cu un tur pilot gratuit
              </h4>
              <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                Trimite o solicitare pentru a programa primul tur gratuit sau contactează-ne direct pentru detalii.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onSelectPackage('Parteneriat B2B (Primul Tur Gratuit - 10+ Proprietăți)')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white text-stone-900 text-sm font-semibold hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <span>Solicită Turul Gratuit B2B</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <a
                href="tel:0751801025"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-stone-700 text-stone-200 hover:text-white hover:border-stone-500 text-sm font-medium transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
                <span>0751 801 025</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
