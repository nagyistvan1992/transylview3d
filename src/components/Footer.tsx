import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Shield, FileText, Cookie } from 'lucide-react';
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
    <footer className="bg-stone-950 text-stone-300 pt-20 pb-12 border-t border-stone-800 relative overflow-hidden select-none">
      {/* Background Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-bronze/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/6 w-[400px] h-[400px] bg-stone-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-stone-800/80">
          
          {/* Column 1: Brand Logo & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Seamless Embedded Logo */}
            <div
              onClick={handleLogoClick}
              className="relative inline-block cursor-pointer group"
              title="TransylView 3D (Faceți 3 clicuri pentru managerul de imagini)"
            >
              {/* Subtle ambient warm radiance that blends the logo with the dark canvas */}
              <div className="absolute -inset-3 bg-gradient-to-r from-bronze/20 via-stone-400/10 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

              <div className="relative space-y-2">
                <img
                  src="/images/logo_clean_gold.png"
                  alt="TransylView 3D Logo"
                  className="h-20 sm:h-28 w-auto max-w-[240px] sm:max-w-[300px] object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-102 transition-transform duration-300"
                />
                
                <div className="flex items-center gap-2 pl-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.26em] text-bronze uppercase">
                    TURURI VIRTUALE 8K & DIGITAL TWINS
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Standardul de excelență în digitalizarea proprietăților imobiliare din Satu Mare și Transilvania. Tehnologie Insta X5 8K, planuri 2D cotate și modele secționale Dollhouse 3D.
            </p>

            <div className="pt-1">
              <button
                onClick={onBookCall}
                className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs tracking-wider uppercase transition-all shadow-md"
              >
                SOLICITĂ OFERTĂ & PROGRAMARE
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display text-xs font-bold tracking-[0.22em] text-white uppercase border-b border-stone-800 pb-2">
              Navigare Rapidă
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li><a href="#home" className="hover:text-bronze transition-colors">Acasă</a></li>
              <li><a href="#about" className="hover:text-bronze transition-colors">Despre Noi & Tehnologie</a></li>
              <li><a href="#demo-tour" className="hover:text-bronze transition-colors">Demo 3D Interactiv</a></li>
              <li><a href="#portfolio" className="hover:text-bronze transition-colors">Portofoliu</a></li>
              <li><a href="#pricing" className="hover:text-bronze transition-colors">Pachete & Prețuri</a></li>
              <li><a href="#location" className="hover:text-bronze transition-colors">Zonă de Acoperire</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold tracking-[0.22em] text-white uppercase border-b border-stone-800 pb-2">
              Contact & Sediu
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-bronze flex-shrink-0 mt-0.5" />
                <span>{contactData.address} (Deplasare pe 100 km)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-bronze flex-shrink-0" />
                <a
                  href={contactData.phoneHref}
                  className="font-mono text-stone-200 hover:text-bronze transition-colors font-semibold text-sm"
                >
                  {contactData.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-bronze flex-shrink-0" />
                <a
                  href={contactData.emailHref}
                  className="font-mono text-stone-200 hover:text-bronze transition-colors font-semibold text-xs sm:text-sm"
                >
                  {contactData.email}
                </a>
              </li>
              <li className="pt-1 text-[11px] text-stone-400 font-mono">
                {contactData.schedule}
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Disclosures & Official ANPC / Comisia Europeana Badges (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold tracking-[0.22em] text-white uppercase border-b border-stone-800 pb-2">
              Conformitate Legală & ANPC
            </h4>
            
            <p className="text-[11px] text-stone-400 leading-snug">
              Conform legislației din România privind protecția consumatorilor (Ordinul ANPC nr. 449/2022):
            </p>

            {/* Official ANPC SAL & Comisia Europeana SOL Badges */}
            <div className="space-y-2.5 pt-1">
              {/* SAL (Soluționarea Alternativă a Litigiilor - ANPC) */}
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity border border-stone-700/60 shadow-md"
                title="ANPC — Soluționarea Alternativă a Litigiilor"
              >
                <img
                  src="/images/anpc-sal.svg"
                  alt="ANPC SAL - Soluționarea Alternativă a Litigiilor"
                  className="w-full h-auto block"
                />
              </a>

              {/* SOL (Soluționarea Online a Litigiilor - Comisia Europeană) */}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity border border-stone-700/60 shadow-md"
                title="Comisia Europeană — Soluționarea Online a Litigiilor"
              >
                <img
                  src="/images/anpc-sol.svg"
                  alt="Comisia Europeană SOL - Soluționarea Online a Litigiilor"
                  className="w-full h-auto block"
                />
              </a>

              {/* ANPC Official Link */}
              <a
                href="https://anpc.ro/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[10px] text-stone-400 hover:text-bronze transition-colors pt-1 font-mono"
              >
                Autoritatea Națională pentru Protecția Consumatorilor (ANPC) • Tel: 021 9551
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Sub-Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="text-center md:text-left">
            <span>© {new Date().getFullYear()} TransylView 3D. Toate drepturile rezervate. Conform GDPR & Legislației din România.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center text-stone-400">
            <button
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-bronze underline transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Termeni și Condiții</span>
            </button>

            <button
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-bronze underline transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Politica GDPR & Confidențialitate</span>
            </button>

            <button
              onClick={() => onOpenLegal?.('cookies')}
              className="hover:text-bronze underline transition-colors flex items-center gap-1.5"
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Politica de Cookies</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
