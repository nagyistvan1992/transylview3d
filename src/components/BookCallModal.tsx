import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Building, Calendar, Phone, Mail, User, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { pricingPackages } from '../data/propertyData';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'cookies') => void;
}

const FORM_DRAFT_KEY = 'transylview_quote_form_draft_v1';

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  onOpenLegal,
}) => {
  // Load saved draft from localStorage if available
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(FORM_DRAFT_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse draft form data', e);
    }
    return {
      fullName: '',
      phone: '',
      email: '',
      city: 'Satu Mare',
      propertyType: 'Apartament',
      approxSurface: '60-120 m²',
      selectedPkg: 'Pachet Premium',
      preferredDate: '',
      gdprConsent: false,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Sync defaultPackage if selected from pricing section
  useEffect(() => {
    if (defaultPackage) {
      setFormData((prev: any) => ({ ...prev, selectedPkg: defaultPackage }));
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

  // Save changes to localStorage on any input change so data is NEVER lost
  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => {
      const updated = { ...prev, [field]: value };
      try {
        localStorage.setItem(FORM_DRAFT_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save draft', e);
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.gdprConsent) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
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
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        // If clicking directly on the backdrop outside the modal card, close and preserve all data
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md cursor-pointer select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-luxury-floating border border-stone-700/70 overflow-hidden my-8 cursor-default"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          aria-label="Închide"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-1.5 text-bronze text-xs font-bold tracking-[0.2em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                <span>SOLICITĂ SCANARE & OFERTĂ 8K</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                Programează Turul Virtual 3D
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Completați detaliile proprietății pentru a primi o cotație exactă și a stabili data scanării 3D.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Pachet Selectat
                  </label>
                  <select
                    value={formData.selectedPkg}
                    onChange={(e) => updateField('selectedPkg', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  >
                    {pricingPackages.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.price} lei)
                      </option>
                    ))}
                    <option value="Personalizat">Pachet Personalizat / Complex</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Tip Proprietate
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => updateField('propertyType', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  >
                    <option value="Apartament">Apartament / Penthouse</option>
                    <option value="Casa/Vila">Casă / Vilă Rezidențială</option>
                    <option value="Spatiu Comercial">Spațiu Comercial / Birouri</option>
                    <option value="Pensiune/Hotel">Pensiune / Hotel / Horeca</option>
                    <option value="Hala/Industrial">Hală Industrială / Showroom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Oraș / Zonă Imobil
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
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

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Suprafață Aproximativă
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <select
                      value={formData.approxSurface}
                      onChange={(e) => updateField('approxSurface', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Sub 60 mp">Sub 60 m² (Garsonieră / 2 camere)</option>
                      <option value="60-120 mp">60 – 120 m² (3-4 camere / Vilă mică)</option>
                      <option value="120-250 mp">120 – 250 m² (Vilă mare / Duplex)</option>
                      <option value="Peste 250 mp">Peste 250 m² (Domeniu / Comercial)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                  Nume & Prenume
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder="Numele dumneavoastră"
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Telefon / WhatsApp
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="0751 801 025"
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Adresă Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder="transylview3d@gmail.com"
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                  Data Preferată pentru Filmare / Scanare
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => updateField('preferredDate', e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Mandatory GDPR Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1.5">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  required
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-stone-700 bg-stone-950 text-bronze focus:ring-bronze accent-[#556B2F] cursor-pointer flex-shrink-0"
                />
                <label htmlFor="gdpr-consent" className="text-[11px] text-stone-400 leading-snug cursor-pointer select-none">
                  Sunt de acord cu prelucrarea datelor mele cu caracter personal conform{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal?.('privacy')}
                    className="text-bronze underline hover:text-white"
                  >
                    Politicii de Confidențialitate (GDPR)
                  </button>{' '}
                  în scopul procesării ofertei și programării turului 3D.
                </label>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={!formData.gdprConsent || isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-bronze hover:bg-bronze-dark disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-bronze/20 hover:scale-101 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>SE TRIMITE SOLICITAREA...</span>
                    </>
                  ) : (
                    <span>TRIMITE SOLICITAREA DE TUR 3D</span>
                  )}
                </button>
                <p className="mt-2 text-center text-[10px] text-stone-500">
                  Răspuns garantat în maxim 2 ore cu detalii complete.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
              Solicitare Înregistrată cu Succes!
            </h3>
            <p className="text-stone-300 text-sm max-w-sm mx-auto leading-relaxed">
              Vă mulțumim, <span className="text-white font-bold">{formData.fullName}</span>! Un email oficial de confirmare a fost trimis la adresa <span className="text-bronze font-semibold">{formData.email}</span>.
            </p>
            <div className="p-3.5 rounded-2xl bg-stone-950/60 border border-stone-800 text-xs text-stone-400 max-w-sm mx-auto">
              Echipa TransylView 3D vă va contacta la numărul <strong className="text-stone-200">{formData.phone}</strong> în maximum <strong>2 ore</strong> pentru a confirma data și detaliile scanării 3D în <strong className="text-stone-200">{formData.city}</strong>.
            </div>
            <div className="pt-3">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold tracking-widest uppercase transition-colors"
              >
                ÎNAPOI LA SITE
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
