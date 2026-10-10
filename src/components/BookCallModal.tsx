import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  CheckCircle2,
  Building,
  Calendar,
  Phone,
  Mail,
  User,
  MapPin,
  Loader2,
  AlertCircle,
  Clock,
  ArrowRight,
  Info,
  Check,
  Ruler,
  Cloud,
} from 'lucide-react';
import { pricingPackages } from '../data/propertyData';
import { LegalDocType } from './LegalModal';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  onOpenLegal?: (doc: LegalDocType) => void;
}

interface BookCallFormData {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  propertyType: string;
  approxSurface: string;
  selectedPkg: string;
  preferredDate: string;
  preferredTime: string;
  wantsPlan2D: boolean;
  gdprConsent: boolean;
}

const FORM_DRAFT_KEY = 'transylview_quote_form_draft_v3';

const DEFAULT_FORM_DATA: BookCallFormData = {
  fullName: '',
  phone: '',
  email: '',
  city: 'Satu Mare',
  propertyType: 'Apartament',
  approxSurface: 'Sub 60 mp',
  selectedPkg: 'Pachet Esențial 3D',
  preferredDate: '',
  preferredTime: 'Dimineața (09:00 - 11:30)',
  wantsPlan2D: false,
  gdprConsent: false,
};

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  onOpenLegal,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Load saved draft from localStorage, ensuring surface and package correspond logically
  const [formData, setFormData] = useState<BookCallFormData>(() => {
    try {
      const saved = localStorage.getItem(FORM_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const surface = parsed.approxSurface || DEFAULT_FORM_DATA.approxSurface;
        let pkg = parsed.selectedPkg || DEFAULT_FORM_DATA.selectedPkg;
        const propType = parsed.propertyType || DEFAULT_FORM_DATA.propertyType;

        // If not B2B, ensure package doesn't violate surface ceiling (Esențial cannot cover >60 m²)
        if (!pkg.includes('B2B')) {
          if (surface === '60-120 mp' && pkg === 'Pachet Esențial 3D') pkg = 'Pachet Premium 3D';
          else if (surface === '120-250 mp' && (pkg === 'Pachet Esențial 3D' || pkg === 'Pachet Premium 3D')) pkg = 'Pachet Exclusiv 3D';
          else if (surface === 'Peste 250 mp') pkg = 'Personalizat';
        }

        return {
          ...DEFAULT_FORM_DATA,
          ...parsed,
          selectedPkg: pkg,
          approxSurface: surface,
          propertyType: propType,
        };
      }
    } catch (e) {
      console.error('Failed to parse draft form data', e);
    }
    return DEFAULT_FORM_DATA;
  });

  const [packageNotice, setPackageNotice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Sync when opened with a specific package (e.g. from PricingSection or Case Study)
  useEffect(() => {
    if (defaultPackage) {
      const pkgLower = defaultPackage.toLowerCase();
      if (pkgLower.includes('esențial') || pkgLower.includes('esential')) {
        setFormData((prev) => ({
          ...prev,
          selectedPkg: 'Pachet Esențial 3D',
          approxSurface: 'Sub 60 mp',
        }));
      } else if (pkgLower.includes('premium')) {
        setFormData((prev) => ({
          ...prev,
          selectedPkg: 'Pachet Premium 3D',
          approxSurface: prev.approxSurface === '120-250 mp' || prev.approxSurface === 'Peste 250 mp' ? '60-120 mp' : prev.approxSurface,
        }));
      } else if (pkgLower.includes('exclusiv')) {
        setFormData((prev) => ({
          ...prev,
          selectedPkg: 'Pachet Exclusiv 3D',
          // Client can keep their surface (e.g. 60 m² villa wanting Exclusiv package)
          approxSurface: prev.approxSurface === 'Peste 250 mp' ? '120-250 mp' : prev.approxSurface,
        }));
      } else if (pkgLower.includes('b2b')) {
        setFormData((prev) => ({
          ...prev,
          selectedPkg: 'Parteneriat B2B (Primul Tur Gratuit - 10+ Proprietăți)',
        }));
      } else if (defaultPackage === 'Personalizat') {
        setFormData((prev) => ({
          ...prev,
          selectedPkg: 'Personalizat',
          approxSurface: 'Peste 250 mp',
        }));
      } else if (defaultPackage.includes('Comercial')) {
        setFormData((prev) => ({
          ...prev,
          propertyType: 'Spatiu Comercial',
          selectedPkg: 'Pachet Exclusiv 3D',
        }));
      } else if (defaultPackage.includes('Vilă') || defaultPackage.includes('Casa')) {
        setFormData((prev) => ({
          ...prev,
          propertyType: 'Casa/Vila',
        }));
      }
      setPackageNotice('');
    }
  }, [defaultPackage]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const saveDraft = (data: BookCallFormData) => {
    try {
      localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  };

  // 1. Reactive Property Type Handler - does not alter the surface-linked price
  const handlePropertyTypeChange = (newType: string) => {
    setFormData((prev) => {
      setPackageNotice('');
      const updated = { ...prev, propertyType: newType };
      saveDraft(updated);
      return updated;
    });
  };

  // 2. Reactive Surface Handler - adjusts baseline package when surface changes
  const handleSurfaceChange = (newSurface: string) => {
    setFormData((prev) => {
      let newPkg = prev.selectedPkg;

      if (newSurface === 'Sub 60 mp') {
        newPkg = 'Pachet Esențial 3D';
      } else if (newSurface === '60-120 mp') {
        newPkg = 'Pachet Premium 3D';
      } else if (newSurface === '120-250 mp') {
        newPkg = 'Pachet Exclusiv 3D';
      } else if (newSurface === 'Peste 250 mp') {
        newPkg = 'Personalizat';
      }

      setPackageNotice('');
      const updated = { ...prev, approxSurface: newSurface, selectedPkg: newPkg };
      saveDraft(updated);
      return updated;
    });
  };

  // 3. Reactive Package Handler - allows clients with smaller properties (e.g. 60 m²) to freely select higher packages!
  const handlePackageChange = (newPkg: string) => {
    setFormData((prev) => {
      let currentSurface = prev.approxSurface;
      let notice = '';

      if (newPkg === 'Pachet Esențial 3D') {
        // Pachet Esențial is capped strictly at 60 m²
        if (currentSurface !== 'Sub 60 mp') {
          currentSurface = 'Sub 60 mp';
          notice = 'Pachetul Esențial este destinat proprietăților de până la 60 m² (suprafața a fost adaptată).';
        }
      } else if (newPkg === 'Pachet Premium 3D') {
        // Pachet Premium covers up to 120 m²
        // If currentSurface is Sub 60 mp, client can keep it and enjoy Premium benefits!
        if (currentSurface === '120-250 mp' || currentSurface === 'Peste 250 mp') {
          currentSurface = '60-120 mp';
          notice = 'Suprafața a fost ajustată la 60–120 m² conform specificațiilor Pachetului Premium.';
        } else if (currentSurface === 'Sub 60 mp') {
          notice = 'Ați selectat Pachetul Premium 3D (include Plan 2D cotat, poze HDR și 3 luni găzduire cloud inclusă).';
        }
      } else if (newPkg === 'Pachet Exclusiv 3D') {
        // Pachet Exclusiv covers up to 250 m²
        // Clients with Sub 60 mp or 60-120 mp (e.g. small villas/boutique houses) can freely choose Exclusiv!
        if (currentSurface === 'Peste 250 mp') {
          currentSurface = '120-250 mp';
        } else {
          notice = 'Ați selectat Pachetul Exclusiv 3D. Beneficiați de prioritate maximă la procesare și predare, scanare completă curte/fațadă, White-Label și 6 luni găzduire gratuită!';
        }
      } else if (newPkg === 'Personalizat') {
        if (currentSurface === 'Sub 60 mp') {
          currentSurface = 'Peste 250 mp';
        }
      } else if (newPkg.includes('B2B')) {
        notice = 'Parteneriat B2B: Primul tur 3D este gratuit, include găzduire activă nelimitată pe durata colaborării.';
      }

      setPackageNotice(notice);
      const updated = { ...prev, selectedPkg: newPkg, approxSurface: currentSurface };
      saveDraft(updated);
      return updated;
    });
  };

  const updateSimpleField = (field: keyof BookCallFormData, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      saveDraft(updated);
      return updated;
    });

    if (field === 'phone') {
      const cleanPhone = value.replace(/[\s\-\.\(\)]/g, '');
      if (cleanPhone.length > 0 && !/^07[0-9]{8}$/.test(cleanPhone)) {
        if (cleanPhone.length < 10) {
          setPhoneError(`Numărul are ${cleanPhone.length}/10 cifre. Introduceți 10 cifre (ex: 07xxxxxxxx).`);
        } else if (cleanPhone.length > 10) {
          setPhoneError(`Numărul are ${cleanPhone.length} cifre (maximul este 10).`);
        } else if (!cleanPhone.startsWith('07')) {
          setPhoneError('Numărul trebuie să înceapă cu 07.');
        }
      } else {
        setPhoneError(null);
      }
    }
  };

  const isPlan2DIncluded = formData.selectedPkg?.includes('Premium') || formData.selectedPkg?.includes('Exclusiv');
  const isCustomOrB2B = formData.selectedPkg?.includes('B2B') || formData.selectedPkg === 'Personalizat';

  // Package Specifications & Inclusions Directory with Cloud Hosting Architecture
  const getPackageInfo = (pkgName: string) => {
    if (pkgName === 'Pachet Esențial 3D') {
      const effectivePrice = formData.wantsPlan2D ? 599 : 499;
      return {
        price: `${effectivePrice} RON`,
        priceSubtitle: formData.wantsPlan2D ? 'Include Plan 2D (+100 RON)' : 'Preț fix complet',
        bracket: 'Suprafață: Până la 60 m²',
        hostingBadge: '2 Luni Cloud Inclus',
        hostingDesc: '2 luni găzduire cloud Metareal gratuită inclusă (apoi opțional 29 RON/lună dacă anunțul rămâne activ)',
        features: [
          'Tur volumetric 3D interactiv 8K (Metareal Stage)',
          'Model secțional Dollhouse 3D per nivel',
          'Riglă digitală integrată pentru măsurători milimetrice',
          'Link partajabil securizat (WhatsApp, Storia, OLX, Social Media)',
          formData.wantsPlan2D ? 'Plan 2D cotat cu dimensiuni detaliate (Adăugat)' : 'Plan 2D cotat opțional (+100 RON)',
        ],
      };
    }
    if (pkgName === 'Pachet Premium 3D') {
      return {
        price: '699 RON',
        priceSubtitle: 'Preț complet recomandat',
        bracket: 'Suprafață: Până la 120 m²',
        hostingBadge: '3 Luni Cloud Inclus',
        hostingDesc: '3 luni găzduire cloud Metareal gratuită inclusă (apoi opțional 29 RON/lună dacă anunțul rămâne activ)',
        features: [
          'Toate beneficiile din Pachetul Esențial',
          'Plan schematic 2D cotat inclus (0 RON)',
          'Scanare exterior primar: terasă, balcon spațios sau acces exterior',
          'Pachet fotografii HDR de înaltă rezoluție extrase din model',
          'Compatibilitate imersivă WebVR pentru ochelari virtuali',
        ],
      };
    }
    if (pkgName === 'Pachet Exclusiv 3D') {
      return {
        price: '899 RON',
        priceSubtitle: 'Pachet complet VIP',
        bracket: 'Suprafață: Până la 250 m²',
        hostingBadge: '6 Luni Cloud VIP Gratuit',
        hostingDesc: '6 luni găzduire cloud Metareal VIP inclusă cadou (apoi opțional 29 RON/lună dacă anunțul rămâne activ)',
        features: [
          'Toate beneficiile din Pachetul Premium',
          'Procesare & livrare prioritară (prioritate maximă la randare și predare)',
          'Scanare completă exterior: curte, grădină, foișor și fațadă clădire',
          'Plan schematic 2D cotat inclus (0 RON)',
          'Personalizare White-Label 100%: branding exclusiv al agenției/dezvoltatorului',
          'Puncte de interes interactive (Info-Hotspots) pentru dotări și finisaje',
          'Opțiune publicare directă în Google Street View',
        ],
      };
    }
    if (pkgName.includes('B2B')) {
      return {
        price: 'Primul Tur Gratuit',
        priceSubtitle: 'Portofoliu 10+ proprietăți',
        bracket: 'Parteneriat B2B',
        hostingBadge: 'Hosting Nelimitat B2B',
        hostingDesc: 'Găzduire cloud activă garantată pe întreaga durată a parteneriatului comercial',
        features: [
          'Primul tur virtual 3D oferit 100% gratuit pentru testarea calității',
          'Contract cadru cu tarif negociat de volum mult mai avantajos',
          'Găzduire cloud activă pe toată durata colaborării',
          'Prioritate de scanare și livrare rapidă în 24-48h',
          'Branding exclusiv agenție pe toate tururile livrate',
        ],
      };
    }
    return {
      price: 'Ofertă Personalizată',
      priceSubtitle: 'Calculat la cerere',
      bracket: 'Peste 250 m²',
      hostingBadge: 'Găzduire Adaptată',
      hostingDesc: 'Găzduire cloud adaptată proiectului și numărului de spații',
      features: [
        'Scanare dedicată pentru suprafețe atipice, showroom-uri sau domenii',
        'Planificare tehnică la fața locului și găzduire cloud dedicată',
        'Cotație transparentă comunicată în maximum 2 ore lucrătoare',
      ],
    };
  };

  const currentPkgInfo = getPackageInfo(formData.selectedPkg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate 10-digit Romanian phone number strictly
    const cleanPhone = formData.phone.replace(/[\s\-\.\(\)]/g, '');
    if (!/^07[0-9]{8}$/.test(cleanPhone)) {
      setPhoneError('Numărul de telefon trebuie să conțină exact 10 cifre și să înceapă cu 07 (ex: 07xxxxxxxx).');
      setErrorMessage('Vă rugăm să corectați numărul de telefon (exact 10 cifre).');
      return;
    }

    if (!formData.preferredTime) {
      setErrorMessage('Vă rugăm să alegeți un interval orar aproximativ.');
      return;
    }

    if (!formData.gdprConsent) {
      setErrorMessage('Trebuie să bifați acordul GDPR pentru a putea trimite solicitarea.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: cleanPhone,
          wantsPlan2D: isPlan2DIncluded ? true : Boolean(formData.wantsPlan2D),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        try {
          localStorage.removeItem(FORM_DRAFT_KEY);
        } catch (e) {}
      } else {
        setErrorMessage(data.error || 'Nu am putut trimite mesajul. Vă rugăm să ne apelați la 0751 801 025.');
      }
    } catch (err) {
      console.error('Error submitting quote form:', err);
      setErrorMessage('A apărut o problemă de conexiune la trimiterea solicitării. Vă rugăm să încercați din nou sau să ne apelați direct la 0751 801 025.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMessage(null);
    setPhoneError(null);
    onClose();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 md:p-6 overflow-y-auto cursor-pointer select-none touch-smooth"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#fbfaf8] text-stone-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl border border-stone-200 my-auto cursor-default max-h-[92vh] overflow-y-auto overscroll-contain touch-smooth"
      >
        {/* Minimalist Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer flex items-center justify-center active:scale-95"
          aria-label="Închide"
          title="Închide"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {!submitted ? (
          <div>
            {/* Header & Hierarchy */}
            <div className="mb-4 sm:mb-6 pr-8">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-stone-500 mb-1.5 block">
                Estimare rapidă & consultanță tehnică
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900 leading-tight mb-2">
                Solicită Ofertă Personalizată
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Configurați detaliile imobilului pentru a calcula pachetul optim și a primi o cotație exactă pentru scanare 3D în Satu Mare sau regiune.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* PASUL 1: CONFIGURARE PROPRIETATE */}
              <div className="rounded-xl border border-stone-200 bg-white/80 p-3.5 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                      1
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                      Configurare Proprietate
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Prețul se adaptează automat la suprafață
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  {/* Tip Proprietate */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                      Tip Proprietate *
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      <select
                        value={formData.propertyType}
                        onChange={(e) => handlePropertyTypeChange(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all cursor-pointer"
                      >
                        <option value="Apartament">Apartament / Penthouse</option>
                        <option value="Casa/Vila">Casă / Vilă Rezidențială</option>
                        <option value="Spatiu Comercial">Spațiu Comercial / Birouri</option>
                        <option value="Pensiune/Hotel">Pensiune / Hotel / Horeca</option>
                        <option value="Hala/Industrial">Hală Industrială / Showroom</option>
                      </select>
                    </div>
                  </div>

                  {/* Suprafață Estimată - ONLY SQUARE METERS */}
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                      Suprafață Estimată *
                    </label>
                    <div className="relative">
                      <Ruler className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      <select
                        value={formData.approxSurface}
                        onChange={(e) => handleSurfaceChange(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all cursor-pointer font-sans"
                      >
                        <option value="Sub 60 mp">Sub 60 m²</option>
                        <option value="60-120 mp">60 – 120 m²</option>
                        <option value="120-250 mp">120 – 250 m²</option>
                        <option value="Peste 250 mp">Peste 250 m²</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Oraș / Localitate */}
                <div className="mt-3 sm:mt-3.5 pt-3 sm:pt-3.5 border-t border-stone-100">
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                    Oraș / Zonă Imobil
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                    <select
                      value={formData.city}
                      onChange={(e) => updateSimpleField('city', e.target.value)}
                      className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all cursor-pointer"
                    >
                      <option value="Satu Mare">Satu Mare</option>
                      <option value="Carei">Carei & Județ Satu Mare</option>
                      <option value="Baia Mare">Baia Mare & Maramureș</option>
                      <option value="Oradea">Oradea & Județ Bihor</option>
                      <option value="Zalau">Zalău & Județ Sălaj</option>
                      <option value="Alta Locatie">Altă Localitate (Transilvania)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* PASUL 2: PACHET SERVICIU & LIVRABILE */}
              <div className="rounded-xl border border-stone-200 bg-white/80 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                      2
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                      Pachet Recomandat & Livrabile
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Puteți alege oricând un pachet superior
                  </span>
                </div>

                {/* Package Quick Select Pills */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1.5">
                    {pricingPackages.map((p) => {
                      const isSelected = formData.selectedPkg === p.name;
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => handlePackageChange(p.name)}
                          className={`text-xs font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'border border-stone-900 bg-stone-900 text-white shadow-xs'
                              : 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                          }`}
                        >
                          <span>{p.name}</span>
                          <span className={`text-[10px] tabular-nums ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                            ({p.price} RON)
                          </span>
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => handlePackageChange('Parteneriat B2B (Primul Tur Gratuit - 10+ Proprietăți)')}
                      className={`text-xs font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                        formData.selectedPkg.includes('Parteneriat B2B')
                          ? 'border border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      Parteneriat B2B
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePackageChange('Personalizat')}
                      className={`text-xs font-medium py-1.5 px-3 rounded-md transition-all cursor-pointer ${
                        formData.selectedPkg === 'Personalizat'
                          ? 'border border-stone-900 bg-stone-900 text-white shadow-xs'
                          : 'border border-stone-200 bg-white text-stone-700 hover:border-stone-300'
                      }`}
                    >
                      Personalizat
                    </button>
                  </div>
                </div>

                {/* Dynamic Contextual Feedback Notice */}
                {packageNotice && (
                  <div className="mb-3.5 p-3 rounded-lg bg-stone-100 border border-stone-200/90 text-stone-800 text-xs flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-stone-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="leading-relaxed">{packageNotice}</span>
                  </div>
                )}

                {/* Structured Package Preview Card */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-stone-50 border border-stone-200/80 mb-3.5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-stone-200/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-sans text-sm font-semibold text-stone-900">
                          {formData.selectedPkg}
                        </h4>
                        <span className="text-[11px] font-medium text-stone-600 bg-stone-200/70 px-2 py-0.5 rounded-sm">
                          {currentPkgInfo.bracket}
                        </span>
                      </div>
                      <span className="text-xs text-stone-500 font-normal mt-0.5 block">
                        {currentPkgInfo.priceSubtitle}
                      </span>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="font-sans text-xl font-bold tracking-tight text-stone-900 tabular-nums">
                        {currentPkgInfo.price}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Inclusions */}
                  <ul className="mt-3 space-y-1.5">
                    {currentPkgInfo.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-stone-900 flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Dedicated Cloud Hosting Value Callout */}
                  <div className="mt-3.5 pt-3 border-t border-stone-200/70 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-white/70 p-2.5 rounded-lg border border-stone-200/60">
                    <div className="flex items-start sm:items-center gap-2 text-xs text-stone-800">
                      <Cloud className="w-4 h-4 text-stone-700 flex-shrink-0 mt-0.5 sm:mt-0" strokeWidth={1.5} />
                      <div>
                        <span className="font-semibold text-stone-900 mr-1.5">Găzduire Cloud:</span>
                        <span className="text-stone-600">{currentPkgInfo.hostingDesc}</span>
                      </div>
                    </div>
                    <span className="self-start sm:self-auto text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-stone-900 text-white whitespace-nowrap shadow-2xs">
                      {currentPkgInfo.hostingBadge}
                    </span>
                  </div>
                </div>

                {/* 2D Plan Deliverable / Add-on Checkbox */}
                <div className="p-3.5 rounded-lg bg-white border border-stone-200 flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="plan2d-addon"
                    checked={isPlan2DIncluded ? true : Boolean(formData.wantsPlan2D)}
                    disabled={isPlan2DIncluded || isCustomOrB2B}
                    onChange={(e) => updateSimpleField('wantsPlan2D', e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900 cursor-pointer flex-shrink-0 disabled:opacity-75"
                  />
                  <label htmlFor="plan2d-addon" className="text-xs text-stone-800 leading-snug cursor-pointer select-none">
                    <span className="font-semibold text-stone-900">Plan 2D Cotat / Releveu Schematic</span>
                    {isPlan2DIncluded ? (
                      <span className="text-stone-700 text-[11px] block sm:inline sm:ml-2 font-semibold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        Inclus în pachetul selectat (0 RON)
                      </span>
                    ) : isCustomOrB2B ? (
                      <span className="text-stone-700 text-[11px] block sm:inline sm:ml-2 font-semibold bg-stone-100 px-2 py-0.5 rounded border border-stone-200">
                        Inclus în cotație
                      </span>
                    ) : (
                      <span className="text-stone-700 text-[11px] block sm:inline sm:ml-2 font-medium bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200">
                        +100 RON opțional la Pachetul Esențial
                      </span>
                    )}
                    <span className="block text-stone-500 text-[11px] mt-1 font-normal leading-relaxed">
                      Măsurători tehnice de precizie, cote și calculul suprafețelor utile per încăpere generat direct din modelul volumetric 3D.
                    </span>
                  </label>
                </div>
              </div>

              {/* PASUL 3: PROGRAMARE & DISPONIBILITATE */}
              <div className="rounded-xl border border-stone-200 bg-white/80 p-4 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                      3
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                      Programare Scanare
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Estimare de preferință
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                      Data Dorită Scanare *
                    </label>
                    <div
                      className="relative cursor-pointer"
                      onClick={() => {
                        try {
                          dateInputRef.current?.showPicker?.();
                        } catch (e) {}
                      }}
                    >
                      <Calendar className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      <input
                        ref={dateInputRef}
                        type="date"
                        required
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={(e) => updateSimpleField('preferredDate', e.target.value)}
                        onClick={(e) => {
                          try {
                            (e.target as HTMLInputElement).showPicker?.();
                          } catch (err) {}
                        }}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                      Interval Orar Preferat *
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      <select
                        required
                        value={formData.preferredTime}
                        onChange={(e) => updateSimpleField('preferredTime', e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all cursor-pointer"
                      >
                        <option value="Dimineața (09:00 - 11:30)">Dimineața (09:00 - 11:30)</option>
                        <option value="Prânz (11:30 - 14:30)">Prânz (11:30 - 14:30)</option>
                        <option value="După-amiază (14:30 - 17:30)">După-amiază (14:30 - 17:30)</option>
                        <option value="Seară / Golden Hour (17:30 - 19:30)">Seară / Golden Hour (17:30 - 19:30)</option>
                        <option value="Oricând în timpul zilei">Oricând în timpul zilei</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* PASUL 4: DATE DE CONTACT & CONFIRMARE */}
              <div className="rounded-xl border border-stone-200 bg-white/80 p-3.5 sm:p-5 shadow-xs">
                <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-stone-100">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] font-semibold">
                      4
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                      Date de Contact & Transmitere
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-medium">
                    Pentru confirmarea cotației oficiale
                  </span>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                        Nume & Prenume *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateSimpleField('fullName', e.target.value)}
                          placeholder="Numele dumneavoastră"
                          className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-medium uppercase tracking-wider text-stone-700">
                          Telefon (10 cifre) *
                        </label>
                        <span className="text-xs font-sans tabular-nums text-stone-500">
                          {formData.phone.replace(/[\s\-\.\(\)]/g, '').length}/10
                        </span>
                      </div>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                        <input
                          type="tel"
                          required
                          maxLength={14}
                          value={formData.phone}
                          onChange={(e) => updateSimpleField('phone', e.target.value)}
                          placeholder="07xxxxxxxx"
                          className={`w-full rounded-lg border pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none transition-all ${
                            phoneError
                              ? 'border-red-500 bg-red-50/30 focus:border-red-600 focus:ring-1 focus:ring-red-600'
                              : 'border-stone-200 bg-stone-50/50 focus:border-stone-900 focus:ring-1 focus:ring-stone-900'
                          }`}
                        />
                      </div>
                      {phoneError && (
                        <p className="mt-1 text-xs text-red-600 leading-snug">{phoneError}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-700 mb-1.5">
                      Adresă Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[1.5]" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => updateSimpleField('email', e.target.value)}
                        placeholder="adresa@email.com"
                        className="w-full rounded-lg border border-stone-200 bg-stone-50/50 pl-10 pr-3.5 py-2.5 text-base sm:text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 transition-all"
                      />
                    </div>
                  </div>

                  {/* Mandatory GDPR Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="gdpr-consent"
                      required
                      checked={formData.gdprConsent}
                      onChange={(e) => updateSimpleField('gdprConsent', e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900 accent-stone-900 cursor-pointer flex-shrink-0"
                    />
                    <label htmlFor="gdpr-consent" className="text-xs text-stone-600 leading-normal cursor-pointer select-none">
                      Sunt de acord cu prelucrarea datelor mele conform{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal?.('privacy')}
                        className="text-stone-900 underline underline-offset-2 hover:text-stone-700 font-medium cursor-pointer"
                      >
                        Politicii de Confidențialitate (GDPR)
                      </button>{' '}
                      și accept{' '}
                      <button
                        type="button"
                        onClick={() => onOpenLegal?.('terms')}
                        className="text-stone-900 underline underline-offset-2 hover:text-stone-700 font-medium cursor-pointer"
                      >
                        Termenii și Condițiile
                      </button>{' '}
                      pentru procesarea ofertei de tur 3D.
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={!formData.gdprConsent || isSubmitting || !!phoneError}
                  className="w-full py-3.5 px-6 rounded-lg bg-stone-900 text-white hover:bg-stone-800 active:scale-[0.99] font-medium text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" strokeWidth={1.5} />
                      <span>Se trimite solicitarea...</span>
                    </>
                  ) : (
                    <>
                      <span>Trimite Solicitarea de Cotație</span>
                      <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                    </>
                  )}
                </button>
                <p className="text-center font-sans text-xs text-stone-500 leading-normal tracking-wide mt-2.5">
                  Răspuns garantat în maximum 2 ore lucrătoare cu detalii tehnice complete.
                </p>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation View */
          <div className="py-8 sm:py-10 text-center">
            <CheckCircle2 className="w-12 h-12 text-stone-900 mx-auto mb-4 stroke-[1.5]" />
            
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mb-2 leading-tight">
              Solicitare Recepționată cu Succes
            </h2>
            
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6 font-normal">
              Vă mulțumim, <span className="font-semibold text-stone-900">{formData.fullName}</span>. Un email oficial de confirmare a fost transmis la adresa <span className="font-semibold text-stone-900">{formData.email}</span>. Vă vom contacta în maxim 2 ore lucrătoare pentru a confirma disponibilitatea și detaliile de scanare.
            </p>

            {/* Structured Summary Card */}
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 max-w-md mx-auto leading-relaxed mb-6 text-left space-y-2">
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Pachet:</span>
                <span className="font-semibold text-stone-900">{formData.selectedPkg}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Proprietate:</span>
                <span className="font-semibold text-stone-900">{formData.propertyType} ({formData.approxSurface})</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Găzduire Cloud:</span>
                <span className="font-semibold text-stone-900">{currentPkgInfo.hostingBadge}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Plan 2D:</span>
                <span className="font-semibold text-stone-900">
                  {isPlan2DIncluded ? 'Inclus în pachet' : formData.wantsPlan2D ? 'Solicitat (+100 RON)' : 'Nu este inclus'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Oraș:</span>
                <span className="font-semibold text-stone-900">{formData.city}</span>
              </div>
              <div className="flex justify-between items-center pb-1.5 border-b border-stone-200/60">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Programare:</span>
                <span className="font-semibold text-stone-900">{formData.preferredDate} ({formData.preferredTime})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500 uppercase tracking-wider font-medium text-[11px]">Telefon:</span>
                <span className="font-semibold text-stone-900">{formData.phone}</span>
              </div>
            </div>

            <div>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm font-medium hover:bg-stone-50 transition-all cursor-pointer"
              >
                Închide fereastra
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
