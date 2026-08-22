import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Building, Calendar, Phone, Mail, User, MapPin, Loader2, AlertCircle, Clock } from 'lucide-react';
import { pricingPackages } from '../data/propertyData';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'cookies') => void;
}

const FORM_DRAFT_KEY = 'transylview_quote_form_draft_v2';

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  onOpenLegal,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

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
      preferredTime: 'Dimineața (09:00 - 11:30)',
      gdprConsent: false,
    };
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate 10-digit phone number strictly
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
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        // Clear draft on successful submission
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
        // If clicking directly on the backdrop outside the modal card, close and preserve all data
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-start justify-center p-3 sm:p-6 min-h-[100dvh] cursor-pointer select-none"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-stone-900 text-stone-100 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-luxury-floating border border-stone-750/80 my-4 sm:my-8 cursor-default"
      >
        {/* Single Sleek Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-stone-800/90 text-stone-300 hover:text-white hover:bg-stone-700 transition-all border border-white/15 shadow-md cursor-pointer flex items-center justify-center active:scale-95"
          aria-label="Închide"
          title="Închide"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-1.5 sm:space-y-2 mb-5 sm:mb-6 pr-12">
              <div className="flex items-center gap-1.5 text-bronze-light text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
                <span>SOLICITĂ SCANARE & OFERTĂ 8K</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl text-white font-normal leading-tight">
                Programează Turul Virtual 3D
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
                Completați detaliile proprietății pentru a primi o cotație exactă și a stabili data scanării 3D.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
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
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Oraș / Zonă Imobil
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Suprafață Aproximativă
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
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
                <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                  Nume & Prenume *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    placeholder=""
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase">
                      Telefon (10 cifre) *
                    </label>
                    <span className="text-[10px] font-mono text-stone-400">
                      {formData.phone.replace(/[\s\-\.\(\)]/g, '').length}/10
                    </span>
                  </div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      maxLength={14}
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="07xxxxxxxx"
                      className={`w-full bg-stone-950 border rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white placeholder-stone-600 focus:outline-none transition-colors ${
                        phoneError ? 'border-red-600 focus:border-red-500' : 'border-stone-800 focus:border-bronze'
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="mt-1 text-[10px] text-red-400 leading-tight">{phoneError}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Adresă Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      placeholder=""
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Date and Mandatory Time Slot in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Data Scanării *
                  </label>
                  <div
                    className="relative cursor-pointer"
                    onClick={() => {
                      try {
                        dateInputRef.current?.showPicker?.();
                      } catch (e) {}
                    }}
                  >
                    <Calendar className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      ref={dateInputRef}
                      type="date"
                      required
                      min={todayStr}
                      value={formData.preferredDate}
                      onChange={(e) => updateField('preferredDate', e.target.value)}
                      onClick={(e) => {
                        try {
                          (e.target as HTMLInputElement).showPicker?.();
                        } catch (err) {}
                      }}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1">
                    Interval Orar Dorit *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      required
                      value={formData.preferredTime}
                      onChange={(e) => updateField('preferredTime', e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors cursor-pointer"
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

              {/* Mandatory GDPR Consent Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  required
                  checked={formData.gdprConsent}
                  onChange={(e) => updateField('gdprConsent', e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-stone-700 bg-stone-950 text-bronze focus:ring-bronze accent-bronze cursor-pointer flex-shrink-0"
                />
                <label htmlFor="gdpr-consent" className="text-[11px] text-stone-400 leading-snug cursor-pointer select-none">
                  Sunt de acord cu prelucrarea datelor mele conform{' '}
                  <button
                    type="button"
                    onClick={() => onOpenLegal?.('privacy')}
                    className="text-stone-300 underline hover:text-white"
                  >
                    Politicii GDPR
                  </button>{' '}
                  în scopul procesării ofertei de tur 3D.
                </label>
              </div>

              {/* Dual Action Buttons: Submit & Clear Close Button */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/3 py-3 sm:py-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold text-xs tracking-wider uppercase transition-colors text-center cursor-pointer border border-stone-700"
                >
                  ÎNCHIDE
                </button>
                <button
                  type="submit"
                  disabled={!formData.gdprConsent || isSubmitting || !!phoneError}
                  className="w-2/3 py-3 sm:py-3.5 rounded-xl bg-stone-100 hover:bg-white text-stone-950 font-bold text-xs tracking-[0.16em] sm:tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:scale-101 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                      <span>SE TRIMITE...</span>
                    </>
                  ) : (
                    <span>TRIMITE SOLICITAREA</span>
                  )}
                </button>
              </div>
              <p className="text-center text-[10px] text-stone-500">
                Răspuns garantat în maxim 2 ore cu detalii complete.
              </p>
            </form>
          </div>
        ) : (
          <div className="py-6 sm:py-8 text-center space-y-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-700/60 mx-auto flex items-center justify-center">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h3 className="font-serif text-xl sm:text-3xl text-white font-bold">
              Solicitare Înregistrată cu Succes!
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              Vă mulțumim, <span className="text-white font-bold">{formData.fullName}</span>! Un email oficial de confirmare a fost trimis la adresa <span className="text-stone-200 font-semibold">{formData.email}</span>.
            </p>
            <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800 text-xs text-stone-400 max-w-sm mx-auto">
              Echipa TransylView 3D vă va contacta la numărul <strong className="text-stone-200">{formData.phone}</strong> în maximum <strong>2 ore</strong> pentru a confirma data de <strong className="text-stone-200">{formData.preferredDate} ({formData.preferredTime})</strong> în <strong className="text-stone-200">{formData.city}</strong>.
            </div>
            <div className="pt-2">
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
