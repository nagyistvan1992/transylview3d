import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, Cookie, Scale, ExternalLink } from 'lucide-react';

export type LegalDocType = 'terms' | 'privacy' | 'cookies' | null;

interface LegalModalProps {
  activeDoc: LegalDocType;
  onClose: () => void;
  onSelectDoc: (doc: LegalDocType) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ activeDoc, onClose, onSelectDoc }) => {
  useEffect(() => {
    if (activeDoc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeDoc]);

  if (!activeDoc) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md cursor-pointer select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-700/80 overflow-hidden my-6 max-h-[90vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-bronze/10 text-bronze">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-[0.25em] text-bronze uppercase block">
                CONFORMITATE LEGALĂ & GDPR ROMÂNIA
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                Informații Juridice & Protecția Datelor
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
            aria-label="Închide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-3 border-b border-stone-800/80 overflow-x-auto no-scrollbar flex-shrink-0">
          <button
            onClick={() => onSelectDoc('terms')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeDoc === 'terms'
                ? 'bg-bronze text-stone-950 font-bold shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Termeni și Condiții</span>
          </button>

          <button
            onClick={() => onSelectDoc('privacy')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeDoc === 'privacy'
                ? 'bg-bronze text-stone-950 font-bold shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Politica de Confidențialitate (GDPR)</span>
          </button>

          <button
            onClick={() => onSelectDoc('cookies')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
              activeDoc === 'cookies'
                ? 'bg-bronze text-stone-950 font-bold shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Politica de Cookie-uri</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          
          {/* 1. TERMENI ȘI CONDIȚII */}
          {activeDoc === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-2">
                Termeni și Condiții de Utilizare a Serviciilor
              </h4>
              <p className="text-[11px] text-stone-400 font-mono">
                Ultima actualizare: {new Date().toLocaleDateString('ro-RO')} • Conform Legii nr. 365/2002 și OUG nr. 34/2014
              </p>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  1. Date de Identificare a Prestatorului
                </h5>
                <p>
                  Site-ul web <strong className="text-white">TransylView 3D</strong> este operat de echipa TransylView 3D, cu sediul profesional în Municipiul Satu Mare, Județul Satu Mare, România. Email contact: <a href="mailto:transylview3d@gmail.com" className="text-bronze font-mono hover:underline">transylview3d@gmail.com</a>, Telefon: <a href="tel:0751801025" className="text-bronze font-mono hover:underline">0751 801 025</a>.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  2. Obiectul Serviciilor
                </h5>
                <p>
                  TransylView 3D oferă servicii specializate de digitalizare imobiliară, incluzând: realizarea de tururi virtuale 3D interactive, fotografii de înaltă rezoluție 8K la 360°, planuri 2D cotate (relevee), modele secționale 3D Dollhouse și găzduire cloud.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  3. Comandă, Prețuri și Modalități de Plată
                </h5>
                <p>
                  Prețurile afișate pe site sunt exprimate în Lei (RON) și reprezintă tarife de pornire orientative. Oferta finală și fermă se stabilește de comun acord înaintea prestării serviciilor, în funcție de suprafața exactă a spațiului (m²), localitate și cerințe speciale. Plata se efectuează prin transfer bancar sau numerar, pe baza facturii fiscale emise conform legislației din România.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  4. Drepturi de Proprietate Intelectuală și Licențiere
                </h5>
                <p>
                  Toate drepturile de autor asupra scanărilor 3D, fotografiilor și materialelor grafice produse aparțin TransylView 3D. Clientul primește o licență de utilizare neexclusivă, pe termen nelimitat (sau pe durata contractată), pentru promovarea imobilului pe portaluri imobiliare, website-uri proprii și rețele sociale.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  5. Anulări și Dreptul de Retragere (OUG 34/2014)
                </h5>
                <p>
                  Conform art. 16 lit. a din OUG 34/2014, dreptul de retragere în 14 zile nu se aplică contractelor de prestări de servicii după executarea completă a serviciilor, dacă executarea a început cu acordul prealabil expres al consumatorului. Programările se pot reprograma gratuit cu cel puțin 24 de ore înainte de ora stabilită pentru scanare.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  6. Litigii și Protecția Consumatorilor
                </h5>
                <p>
                  Eventualele neînțelegeri se vor rezolva pe cale amiabilă. Consumatorii au dreptul de a apela la procedurile de Soluționare Alternativă a Litigiilor (SAL) oferite de ANPC (<a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className="text-bronze underline">anpc.ro/ce-este-sal/</a>) sau la instanțele judecătorești competente din România.
                </p>
              </div>
            </div>
          )}

          {/* 2. POLITICA DE CONFIDENȚIALITATE GDPR */}
          {activeDoc === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-2">
                Politica de Confidențialitate și Prelucrare a Datelor (GDPR)
              </h4>
              <p className="text-[11px] text-stone-400 font-mono">
                Conform Regulamentului (UE) 2016/679 (GDPR) și Legii nr. 190/2018
              </p>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  1. Operatorul de Date
                </h5>
                <p>
                  Operatorul responsabil pentru prelucrarea datelor este <strong className="text-white">TransylView 3D</strong>, Satu Mare, România, e-mail: <a href="mailto:transylview3d@gmail.com" className="text-bronze font-mono hover:underline">transylview3d@gmail.com</a>.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  2. Ce Date Colectăm și în ce Scop
                </h5>
                <ul className="list-disc pl-5 space-y-1 text-stone-300">
                  <li><strong>Date de contact:</strong> Nume, prenume, număr de telefon, adresă de e-mail (pentru răspunsul la solicitări de ofertă și programări).</li>
                  <li><strong>Date despre proprietate:</strong> Localitate, tip imobil, suprafață estimată (pentru dimensionarea corectă a pachetului tehnic).</li>
                  <li><strong>Date tehnice automate:</strong> Adresă IP anonimizată, tip browser, rezoluție ecran (colectate prin module cookie pentru funcționarea tehnică a site-ului).</li>
                </ul>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  3. Temeiul Legal al Prelucrării
                </h5>
                <p>
                  Prelucrarea se bazează pe: (a) Consimțământul dumneavoastră liber exprimat la completarea formularului (Art. 6 alin. 1 lit. a din GDPR); (b) Demersuri necesare încheierii sau executării contractului de servicii (Art. 6 alin. 1 lit. b din GDPR); (c) Îndeplinirea obligațiilor legale fiscale și contabile din România (Art. 6 alin. 1 lit. c din GDPR).
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  4. Durata de Păstrare a Datelor
                </h5>
                <p>
                  Datele din formularele de contact sunt păstrate pe durata necesară finalizării ofertei sau pe perioada contractuală. Datele aferente facturării se păstrează conform termenului legal de arhivare de 5-10 ani prevăzut de legislația fiscală din România.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  5. Drepturile Dumneavoastră conform GDPR
                </h5>
                <p>
                  Aveți dreptul de: acces la date, rectificare, ștergere („dreptul de a fi uitat”), restricționarea prelucrării, portabilitatea datelor, opoziție și dreptul de a vă retrage oricând consimțământul. Pentru exercitarea drepturilor, trimiteți un e-mail la <a href="mailto:transylview3d@gmail.com" className="text-bronze font-mono hover:underline">transylview3d@gmail.com</a>.
                </p>
                <p>
                  De asemenea, aveți dreptul de a depune plângere la autoritatea de supraveghere: <strong>Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong> — <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-bronze underline">www.dataprotection.ro</a>, B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, București.
                </p>
              </div>
            </div>
          )}

          {/* 3. POLITICA DE COOKIE-URI */}
          {activeDoc === 'cookies' && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-white border-b border-stone-800 pb-2">
                Politica privind Utilizarea Modulelor Cookie
              </h4>
              <p className="text-[11px] text-stone-400 font-mono">
                Conform Directivei ePrivacy 2002/58/CE și Legii nr. 506/2004
              </p>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  1. Ce sunt Cookie-urile?
                </h5>
                <p>
                  Un modul cookie este un fișier text de mici dimensiuni stocat pe dispozitivul dumneavoastră (computer, telefon, tabletă) atunci când vizitați site-ul TransylView 3D. Cookie-urile nu conțin cod executabil și nu pot accesa documentele de pe dispozitivul dumneavoastră.
                </p>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  2. Categoriile de Cookie-uri Utilizate
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-300">
                  <li>
                    <strong>Cookie-uri Strict Necesare:</strong> Esențiale pentru navigarea de bază, reținerea preferințelor de confidențialitate și încărcarea securizată a elementelor 3D. Acestea nu necesită consimțământ prealabil.
                  </li>
                  <li>
                    <strong>Cookie-uri Funcționale și Media 3D:</strong> Folosite pentru a permite redarea interactivă a tururilor virtuale 3D și reținerea setărilor de afișare.
                  </li>
                  <li>
                    <strong>Cookie-uri Analitice (Opționale):</strong> Măsoară anonim traficul și performanța paginilor pentru a ne ajuta să optimizăm viteza de încărcare pe mobil.
                  </li>
                </ul>

                <h5 className="font-bold text-white text-xs uppercase tracking-wider text-bronze">
                  3. Cum puteți Controla Cookie-urile?
                </h5>
                <p>
                  Puteți modifica în orice moment opțiunile privind cookie-urile prin intermediul bannerului nostru de consimțământ sau prin configurarea browserului dumneavoastră (Chrome, Safari, Firefox, Edge) pentru a bloca sau șterge cookie-urile existente.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="border-t border-stone-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-[11px] text-stone-400">
            TransylView 3D respectă integral legislația din România și Uniunea Europeană.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 text-xs font-bold uppercase transition-all shadow-sm"
          >
            Am Înțeles / Închide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
