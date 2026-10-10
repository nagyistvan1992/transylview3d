import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Shield, FileText, Cookie, Scale, ExternalLink, Phone, CheckCircle2 } from 'lucide-react';
import { contactData } from '../data/propertyData';

export type LegalDocType = 'terms' | 'privacy' | 'cookies' | 'anpc' | null;

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
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-xl p-5 sm:p-8 shadow-2xl border border-stone-800 overflow-hidden my-6 max-h-[90vh] flex flex-col cursor-default"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-stone-800 text-stone-300">
              <Scale className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-400 block">
                Conformitate Legală & GDPR România
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-semibold">
                Informații Juridice, Fiscale & Protecția Datelor
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors cursor-pointer"
            aria-label="Închide fereastra legală"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 pt-4 pb-3 border-b border-stone-800 overflow-x-auto scrollbar-none flex-shrink-0">
          <button
            onClick={() => onSelectDoc('terms')}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeDoc === 'terms'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Termeni și Condiții</span>
          </button>

          <button
            onClick={() => onSelectDoc('privacy')}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeDoc === 'privacy'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Politica GDPR & Confidențialitate</span>
          </button>

          <button
            onClick={() => onSelectDoc('cookies')}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeDoc === 'cookies'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Politica de Cookies</span>
          </button>

          <button
            onClick={() => onSelectDoc('anpc')}
            className={`px-3.5 py-2 rounded-md text-xs font-semibold tracking-wider transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeDoc === 'anpc'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Protecția Consumatorilor (ANPC SAL/SOL)</span>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto py-5 pr-2 space-y-6 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
          
          {/* 1. TERMENI ȘI CONDIȚII */}
          {activeDoc === 'terms' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Termeni și Condiții de Furnizare a Serviciilor
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Cadru legal aplicabil: Legea nr. 365/2002 privind comerțul electronic, O.U.G. nr. 34/2014 privind drepturile consumatorilor, Ordinul ANPC nr. 449/2022, Legea nr. 8/1996 privind dreptul de autor și Legea nr. 227/2015 privind Codul Fiscal.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    1. Date de Identificare ale Prestatorului (Legea 365/2002, art. 5)
                  </h5>
                  <p className="text-stone-300">
                    Prezentul website este operat de <strong className="text-white">TransylView 3D</strong>, furnizor de servicii specializate de scanare volumetrică 3D și digitalizare imobiliară, cu sediul profesional în Municipiul Satu Mare, Județul Satu Mare, România.
                  </p>
                  <ul className="list-disc pl-5 mt-1 space-y-0.5 text-stone-400">
                    <li>Email de contact oficial: <a href={`mailto:${contactData.email}`} className="text-stone-200 underline">{contactData.email}</a></li>
                    <li>Telefon de contact oficial: <a href={contactData.phoneHref} className="text-stone-200 underline">{contactData.phone}</a></li>
                    <li>Sediul activității: {contactData.address}</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    2. Descrierea Serviciilor Oferite
                  </h5>
                  <p className="text-stone-300">
                    TransylView 3D realizează tururi virtuale interactive 3D de înaltă rezoluție (8K), fotografii panoramice 360°, modele secționale 3D Dollhouse, relevee și planuri 2D cotate (Floor Plans), precum și găzduire securizată pe servere de mare viteză (Cloud Metareal) pentru proprietăți rezidențiale, comerciale și portofolii imobiliare.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    3. Procedura de Comandă și Formarea Contractului
                  </h5>
                  <p className="text-stone-300">
                    Completarea și transmiterea formularului de contact de pe site constituie o cerere precontractuală de ofertă neangajantă din partea utilizatorului. Contractul de prestări servicii se consideră încheiat numai în momentul confirmării telefonice sau scrise (prin email/mesaj) a ofertei convenite, stabilirii datei de scanare la fața locului și acceptării exprese a tarifelor de către ambele părți.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    4. Politica de Prețuri, Monedă și Facturare Fiscală
                  </h5>
                  <p className="text-stone-300">
                    Toate prețurile afișate pe platformă sunt exprimate în <strong className="text-white">Lei (RON)</strong> și reprezintă tarife de referință calculate în funcție de suprafața construită/utilă a imobilului. Prețul final este confirmat înainte de prestarea serviciului. Pentru toate serviciile prestate se emite factură fiscală în deplină conformitate cu Legea nr. 227/2015 privind Codul Fiscal. Plata se realizează prin transfer bancar sau numerar, conform legislației române în vigoare.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    5. Termene de Livrare și Formatul Predării
                  </h5>
                  <p className="text-stone-300">
                    Turul virtual 3D este procesat și livrat în termen standard de <strong className="text-white">24 până la 72 de ore lucrătoare</strong> de la finalizarea sesiunii de captură fizică în imobil, în funcție de suprafața construită și complexitatea spațiului. Comenzile contractate în cadrul <strong className="text-white">Pachetului Exclusiv 3D</strong> beneficiază de prioritate maximă la procesare și predare accelerată. Predarea se efectuează digital prin link securizat gata de partajare (WhatsApp, e-mail, portaluri imobiliare Storia, OLX, Imobiliare.ro) și cod iFrame embed integrabil pe orice site.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    6. Politica de Anulare și Dreptul de Retragere (O.U.G. nr. 34/2014)
                  </h5>
                  <p className="text-stone-300">
                    Beneficiarul are dreptul de a reprograma sau anula gratuit sesiunea de scanare cu cel puțin <strong className="text-white">24 de ore</strong> înainte de ora stabilită.
                  </p>
                  <p className="text-stone-300 mt-1">
                    Conform art. 16 lit. a și lit. m din O.U.G. nr. 34/2014 privind drepturile consumatorilor, dreptul de retragere în termen de 14 zile nu se aplică contractelor de prestări de servicii după ce serviciul a fost executat complet la cererea expresă a clientului, nici livrării de conținut digital personalizat nefurnizat pe suport material odată ce executarea a început cu acordul prealabil expres al consumatorului.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    7. Drepturi de Proprietate Intelectuală (Legea nr. 8/1996)
                  </h5>
                  <p className="text-stone-300">
                    Toate scanările digitale, fișierele 3D, fotografiile HDR și planurile 2D sunt protejate conform Legii nr. 8/1996 privind dreptul de autor și drepturile conexe. Clientul beneficiază de o licență neexclusivă de utilizare pe durata contractată pentru promovarea comercială a imobilului respectiv.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    8. Soluționarea Litigiilor și Legea Aplicabilă
                  </h5>
                  <p className="text-stone-300">
                    Orice diferend va fi soluționat cu prioritate pe cale amiabilă. Consumatorii au la dispoziție mecanismul de Soluționare Alternativă a Litigiilor (SAL) oferit de ANPC (<a href={contactData.salUrl} target="_blank" rel="noopener noreferrer" className="text-stone-200 underline">anpc.ro/ce-este-sal/</a>) și platforma europeană SOL (<a href={contactData.solUrl} target="_blank" rel="noopener noreferrer" className="text-stone-200 underline">ec.europa.eu/consumers/odr</a>). În caz de nerezolvare pe cale amiabilă, competența revine instanțelor judecătorești competente din România.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 2. POLITICA DE CONFIDENȚIALITATE GDPR */}
          {activeDoc === 'privacy' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Politica de Confidențialitate & Prelucrare a Datelor (GDPR)
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Elaborată conform Regulamentului (UE) 2016/679 al Parlamentului European și al Consiliului (GDPR) și Legii nr. 190/2018.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    1. Operatorul de Date cu Caracter Personal
                  </h5>
                  <p className="text-stone-300">
                    Operatorul responsabil pentru colectarea și prelucrarea datelor este <strong className="text-white">TransylView 3D</strong>, Satu Mare, România. Punct de contact dedicat pentru protecția datelor: <a href={`mailto:${contactData.email}`} className="text-stone-200 underline">{contactData.email}</a>.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    2. Categoriile de Date Colectate și Scopul Prelucrării
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-stone-300">
                    <li><strong className="text-white">Date de identificare și contact:</strong> nume, prenume, număr de telefon, adresă de e-mail — colectate prin formularul de solicitare ofertă exclusiv pentru contactarea directă, stabilirea detaliilor tehnice și emiterea documentelor fiscale.</li>
                    <li><strong className="text-white">Date privind proprietatea:</strong> localitate, tip de imobil, suprafață estimată — colectate strict pentru dimensionarea corectă a pachetului de scanare 3D și ofertare.</li>
                    <li><strong className="text-white">Date tehnice de navigare:</strong> adrese IP anonimizate, identificatori de sesiune și preferințe de cookie-uri — utilizate pentru securitatea site-ului și redarea tururilor 3D.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    3. Temeiul Juridic al Prelucrării (Art. 6 din GDPR)
                  </h5>
                  <ul className="list-disc pl-5 space-y-1 text-stone-300">
                    <li><strong>Art. 6 alin. (1) lit. (b) GDPR:</strong> Demersuri la cererea persoanei vizate înainte de încheierea unui contract (solicitare ofertă, programare tur).</li>
                    <li><strong>Art. 6 alin. (1) lit. (c) GDPR:</strong> Îndeplinirea unei obligații legale care îi revine operatorului (evidențe contabile și fiscale conform Codului Fiscal).</li>
                    <li><strong>Art. 6 alin. (1) lit. (a) GDPR:</strong> Consimțământul liber exprimat la trimiterea formularului sau la acceptarea modulelor cookie opționale.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    4. Termenul de Stocare a Datelor
                  </h5>
                  <p className="text-stone-300">
                    Datele colectate în scopul ofertării sunt păstrate pe durata necesară finalizării ofertei sau a colaborării (maxim 12 luni în absența unui contract încheiat). Datele aferente tranzacțiilor și facturilor emise se păstrează conform termenelor legale obligatorii de arhivare de 5–10 ani prevăzute de legislația contabilă din România.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    5. Drepturile Dumneavoastră conform Art. 15–22 din GDPR
                  </h5>
                  <p className="text-stone-300 mb-1.5">
                    În calitate de persoană vizată, beneficiați de următoarele drepturi garantate prin lege:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul de acces (art. 15):</strong> Confirmarea dacă vă sunt prelucrate date și accesul la acestea.
                    </div>
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul la rectificare (art. 16):</strong> Corectarea datelor inexacte sau incomplete.
                    </div>
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul la ștergere (art. 17):</strong> „Dreptul de a fi uitat”, în condițiile legii.
                    </div>
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul la restricționare (art. 18):</strong> Limitarea prelucrării în cazurile prevăzute de lege.
                    </div>
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul la portabilitate (art. 20):</strong> Primirea datelor într-un format structurat.
                    </div>
                    <div className="p-2.5 rounded bg-stone-800/60 border border-stone-800">
                      <strong className="text-white block">Dreptul la opoziție (art. 21):</strong> Opoziția la prelucrare în baza unui interes legitim.
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    6. Dreptul de a Depune Plângere la Autoritatea Națională (ANSPDCP)
                  </h5>
                  <p className="text-stone-300">
                    Pentru exercitarea oricărui drept, ne puteți contacta prin email la <a href={`mailto:${contactData.email}`} className="text-stone-200 underline">{contactData.email}</a>. De asemenea, aveți dreptul de a sesiza autoritatea națională de supraveghere:
                  </p>
                  <div className="mt-2 p-3 rounded-lg bg-stone-800/80 border border-stone-700/80 text-stone-300">
                    <strong className="text-white block">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</strong>
                    <span>B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București, România</span><br />
                    <span>Website: <a href={contactData.anspdcpUrl} target="_blank" rel="noopener noreferrer" className="text-stone-100 underline">www.dataprotection.ro</a> · Tel: +40.318.059.211 · E-mail: anspdcp@dataprotection.ro</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. POLITICA DE COOKIE-URI */}
          {activeDoc === 'cookies' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Politica privind Utilizarea Modulelor Cookie
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Conform Directivei ePrivacy 2002/58/CE transpusă prin Legea nr. 506/2004 privind prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    1. Ce sunt Modulele Cookie?
                  </h5>
                  <p className="text-stone-300">
                    Un cookie este un mic fișier text stocat de browserul dumneavoastră pe dispozitivul utilizat. Cookie-urile nu conțin cod executabil, nu sunt viruși și nu pot accesa alte date de pe calculatorul sau telefonul dumneavoastră.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    2. Categorii de Cookie-uri și Tehnologii de Stocare
                  </h5>
                  <ul className="list-disc pl-5 space-y-1.5 text-stone-300">
                    <li>
                      <strong className="text-white">Strict Necesare (Esențiale):</strong> Permit navigarea pe site, securitatea formularelor și memorarea opțiunii dumneavoastră de consimțământ. Nu necesită acord prealabil conform art. 4 alin. 5 din Legea 506/2004.
                    </li>
                    <li>
                      <strong className="text-white">Funcționale și Media 3D:</strong> Asigură randarea performantă și fluidă a tururilor virtuale 3D și păstrarea parametrilor de navigare virtuală.
                    </li>
                    <li>
                      <strong className="text-white">Stocare Locală (localStorage):</strong> Reține starea ciornei formularului de cotare pentru a nu pierde datele dacă reîncărcați pagina din greșeală.
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    3. Cum puteți Controla și Șterge Cookie-urile?
                  </h5>
                  <p className="text-stone-300">
                    Puteți oricând refuza sau șterge cookie-urile direct din setările browserului dumneavoastră (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge). Dezactivarea completă a cookie-urilor strict necesare poate afecta redarea corectă a anumitor componente interactive.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 4. PROTECȚIA CONSUMATORILOR (ANPC & SAL/SOL) */}
          {activeDoc === 'anpc' && (
            <div className="space-y-4">
              <div className="border-b border-stone-800 pb-3">
                <h4 className="font-serif text-lg sm:text-xl font-semibold text-white">
                  Protecția Consumatorilor & Soluționarea Litigiilor (ANPC SAL / SOL)
                </h4>
                <p className="text-xs text-stone-400 font-sans mt-1">
                  Informații publicate în deplină conformitate cu Ordinul Președintelui ANPC nr. 449/2022 și legislația privind protecția consumatorilor din România.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-stone-800/80 border border-stone-700/80 space-y-2">
                  <div className="flex items-center gap-2 text-stone-200 font-semibold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" strokeWidth={1.5} />
                    <span>Angajamentul de Transparență TransylView 3D</span>
                  </div>
                  <p className="text-stone-300 text-xs leading-relaxed">
                    Punem pe primul loc corectitudinea, transparența totală a costurilor și satisfacția partenerilor noștri. Încurajăm dialogul direct și deschis pentru rezolvarea oricărei neclarități legate de comenzi, scanări sau livrarea tururilor virtuale.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    1. SAL — Soluționarea Alternativă a Litigiilor
                  </h5>
                  <p className="text-stone-300 mb-2">
                    Procedura SAL reprezintă o modalitate extrajudiciară, rapidă și gratuită de soluționare a oricărui diferend dintre consumator și operatorul economic, prin intermediul Direcției de Soluționare Alternativă a Litigiilor din cadrul ANPC.
                  </p>
                  <a
                    href={contactData.salUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium border border-stone-700 transition-colors"
                  >
                    <span>Accesează Portalul ANPC — Ce este SAL</span>
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    2. SOL — Soluționarea Online a Litigiilor (Comisia Europeană)
                  </h5>
                  <p className="text-stone-300 mb-2">
                    Platforma SOL a Comisiei Europene este un instrument digital dedicat consumatorilor din statele membre UE pentru soluționarea litigiilor apărute în urma contractelor încheiate online.
                  </p>
                  <a
                    href={contactData.solUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-stone-800 hover:bg-stone-700 text-white text-xs font-medium border border-stone-700 transition-colors"
                  >
                    <span>Platforma ODR / SOL a Comisiei Europene</span>
                    <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </a>
                </div>

                <div>
                  <h5 className="font-semibold text-stone-100 text-xs uppercase tracking-wider mb-1">
                    3. Contact Direct ANPC România
                  </h5>
                  <p className="text-stone-300 mb-2">
                    Dacă doriți să contactați direct Autoritatea Națională pentru Protecția Consumatorilor:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-300">
                    <div className="p-3 rounded bg-stone-800/60 border border-stone-800 flex items-center gap-3">
                      <Phone className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <span className="text-xs text-stone-400 block">Telefonul Consumatorului</span>
                        <a href={contactData.anpcPhoneHref} className="text-sm font-semibold text-white hover:underline tabular-nums">
                          {contactData.anpcPhone} (tarif normal)
                        </a>
                      </div>
                    </div>
                    <div className="p-3 rounded bg-stone-800/60 border border-stone-800 flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <span className="text-xs text-stone-400 block">Website Oficial</span>
                        <a href={contactData.anpcUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:underline">
                          anpc.ro
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="border-t border-stone-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-stone-400 font-sans">
            TransylView 3D · Conformitate integrală cu legislația din România și Uniunea Europeană.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-md bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Am înțeles / Închide
          </button>
        </div>
      </motion.div>
    </div>
  );
};
