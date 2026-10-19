import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { LegalDocType } from './LegalModal';
import { contactData } from '../data/propertyData';

interface FooterProps {
  onBookCall: () => void;
  onSecretOpenImageManager?: () => void;
  onOpenLegal?: (doc: LegalDocType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookCall, onSecretOpenImageManager, onOpenLegal }) => {
  const [clickCount, setClickCount] = React.useState(0);

  const handleLogoClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setClickCount(0);
      onSecretOpenImageManager?.();
    }
  };

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 sm:pt-20 pb-12 border-t border-stone-800/80 relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-stone-800/80">
          
          {/* Column 1: Brand Logo & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div
              onClick={handleLogoClick}
              className="relative inline-block cursor-pointer group"
              title="TransylView 3D · Digitalizare Imobiliară"
            >
              <div className="space-y-2">
                <img
                  src="/images/transylview_logo_clean.png"
                  alt="TransylView 3D Logo Satu Mare"
                  loading="lazy"
                  decoding="async"
                  className="h-16 sm:h-20 w-auto max-w-[220px] sm:max-w-[260px] object-contain group-hover:opacity-90 transition-opacity"
                />
                
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 block">
                  Scanare 8K · Digital Twins · Tururi 3D
                </span>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Standardul de precizie în digitalizarea proprietăților imobiliare din Satu Mare și Transilvania. Tehnologie volumetrică Insta X5 8K, tururi virtuale 360° fluide și planuri 2D cotate pentru tranzacții sigure și rapide.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={onBookCall}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-stone-900 font-sans text-xs sm:text-sm font-semibold hover:bg-stone-100 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Solicită Ofertă</span>
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <a
                href={contactData.phoneHref}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-stone-800 text-stone-300 hover:text-white hover:border-stone-700 text-xs sm:text-sm font-medium transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-stone-400" strokeWidth={1.5} />
                <span className="tabular-nums">{contactData.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 border-b border-stone-800/80 pb-2">
              Navigare
            </h3>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-stone-400 font-medium">
              <li><a href="#home" className="hover:text-white transition-colors block">Acasă</a></li>
              <li><a href="#about" className="hover:text-white transition-colors block">Despre Noi & Tehnologie</a></li>
              <li><a href="#demo-tour" className="hover:text-white transition-colors block">Demo 3D Interactiv</a></li>
              <li><a href="#virtual-tours" className="hover:text-white transition-colors block">Portofoliu Tururi 3D</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors block">Pachete & Prețuri</a></li>
              <li><a href="#location" className="hover:text-white transition-colors block">Zonă de Acoperire</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Legal Identity Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 border-b border-stone-800/80 pb-2">
              Contact & Sediu
            </h3>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <span className="text-stone-300 block">{contactData.address}</span>
                  <span className="text-[11px] text-stone-500">Deplasare în Satu Mare & 100 km în Transilvania</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={contactData.phoneHref}
                  className="font-sans text-stone-200 hover:text-white transition-colors font-medium tabular-nums"
                >
                  {contactData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
                <a
                  href={contactData.emailHref}
                  className="font-sans text-stone-200 hover:text-white transition-colors font-medium"
                >
                  {contactData.email}
                </a>
              </li>
              <li className="pt-1 text-xs text-stone-500 font-sans border-t border-stone-900">
                Program: {contactData.schedule}
              </li>
              <li className="text-[11px] text-stone-500 font-sans leading-tight">
                Operator economic: <strong className="text-stone-400 font-medium">TransylView 3D</strong>
                <span className="block mt-0.5">Facturare în RON · Conform Legii nr. 227/2015</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Official ANPC Badges & Romanian Consumer Compliance (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-300 border-b border-stone-800/80 pb-2">
              Conformitate Legală & ANPC
            </h3>
            
            <p className="font-sans text-xs text-stone-400 leading-relaxed">
              Conform legislației din România privind protecția consumatorilor (Ordinul ANPC nr. 449/2022):
            </p>

            {/* Official ANPC SAL & Comisia Europeana SOL Visual Badges */}
            <div className="space-y-2 pt-0.5">
              <a
                href={contactData.salUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900 transition-all p-1 shadow-xs"
                title="ANPC — Soluționarea Alternativă a Litigiilor (SAL)"
              >
                <img
                  src="/images/anpc-sal.svg"
                  alt="ANPC SAL - Soluționarea Alternativă a Litigiilor"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block rounded"
                />
              </a>

              <a
                href={contactData.solUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-lg overflow-hidden border border-stone-800 bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900 transition-all p-1 shadow-xs"
                title="Comisia Europeană — Soluționarea Online a Litigiilor (SOL)"
              >
                <img
                  src="/images/anpc-sol.svg"
                  alt="Comisia Europeană SOL - Soluționarea Online a Litigiilor"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block rounded"
                />
              </a>
            </div>

            {/* Quick ANPC & Authority Links */}
            <div className="pt-1 flex flex-col gap-1 text-[11px] text-stone-500 font-sans">
              <div className="flex items-center justify-between">
                <a
                  href={contactData.anpcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>Portal ANPC România</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" strokeWidth={1.5} />
                </a>
                <a
                  href={contactData.anpcPhoneHref}
                  className="hover:text-stone-300 transition-colors font-mono"
                  title="Telefonul Consumatorului"
                >
                  Tel: {contactData.anpcPhone}
                </a>
              </div>
              
              <div className="flex items-center justify-between pt-0.5">
                <a
                  href={contactData.anspdcpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-stone-300 transition-colors inline-flex items-center gap-1"
                >
                  <span>ANSPDCP (Date Personale)</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" strokeWidth={1.5} />
                </a>
                <button
                  type="button"
                  onClick={() => onOpenLegal?.('anpc')}
                  className="text-stone-400 hover:text-stone-200 transition-colors underline cursor-pointer"
                >
                  Ghid SAL/SOL
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Romanian Fiscal & Legal Transparency Reassurance Strip */}
        <div className="my-8 p-4 sm:p-5 rounded-lg bg-stone-900/50 border border-stone-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-stone-400 font-sans">
          <p className="leading-relaxed">
            <strong className="text-stone-200 font-semibold">Transparență și Conformitate Legală în România:</strong> Prețurile afișate sunt în RON. Livrare în 24–72h în funcție de suprafață (cu prioritate la procesare și predare pentru Pachetul Exclusiv). Serviciile de scanare 3D, tururi virtuale și planuri 2D sunt furnizate cu contract și factură fiscală conform Codului Fiscal (Legea 227/2015). Datele personale sunt prelucrate în deplină conformitate cu GDPR (Regulamentul UE 2016/679).
          </p>
          <div className="flex items-center flex-wrap gap-2 flex-shrink-0 text-[11px] text-stone-400 font-medium">
            <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700/80">Livrare 24–72h</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700/80">Prioritate Exclusiv</span>
            <span className="px-2 py-0.5 rounded bg-stone-800 border border-stone-700/80">ANPC 449/2022</span>
          </div>
        </div>

        {/* Bottom Legal Sub-Footer */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 font-sans text-xs text-stone-500">
          <div className="text-center lg:text-left">
            <span>© {new Date().getFullYear()} TransylView 3D. Toate drepturile rezervate. Conform Legislației din România & GDPR.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-stone-400">
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-stone-200 transition-colors cursor-pointer py-1"
            >
              <span>Termeni și Condiții</span>
            </button>

            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-stone-200 transition-colors cursor-pointer py-1"
            >
              <span>Politica GDPR & Confidențialitate</span>
            </button>

            <button
              onClick={() => onOpenLegal?.('cookies')}
              className="hover:text-stone-200 transition-colors cursor-pointer py-1"
            >
              <span>Politica de Cookies</span>
            </button>

            <button
              onClick={() => onOpenLegal?.('anpc')}
              className="hover:text-stone-200 transition-colors cursor-pointer py-1"
            >
              <span>Protecția Consumatorilor (SAL/SOL)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
