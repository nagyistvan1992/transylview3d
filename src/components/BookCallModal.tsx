import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle, Building, Calendar, Phone, Mail, User, MapPin } from 'lucide-react';
import { pricingPackages } from '../data/propertyData';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  onOpenLegal?: (doc: 'terms' | 'privacy' | 'cookies') => void;
}

export const BookCallModal: React.FC<BookCallModalProps> = ({
  isOpen,
  onClose,
  defaultPackage,
  onOpenLegal,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Satu Mare');
  const [propertyType, setPropertyType] = useState('Apartament');
  const [approxSurface, setApproxSurface] = useState('60-120 m²');
  const [selectedPkg, setSelectedPkg] = useState('Pachet Premium');
  const [preferredDate, setPreferredDate] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (defaultPackage) {
      setSelectedPkg(defaultPackage);
    }
  }, [defaultPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-luxury-floating border border-stone-700/60 overflow-hidden my-8"
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold tracking-widest text-stone-300 uppercase mb-1.5">
                    Pachet Selectat
                  </label>
                  <select
                    value={selectedPkg}
                    onChange={(e) => setSelectedPkg(e.target.value)}
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
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
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
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
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
                      value={approxSurface}
                      onChange={(e) => setApproxSurface(e.target.value)}
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-bronze rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Mandatory GDPR Consent Checkbox (Romanian & EU Law) */}
              <div className="flex items-start gap-2.5 pt-1.5">
                <input
                  type="checkbox"
                  id="gdpr-consent"
                  required
                  checked={gdprConsent}
                  onChange={(e) => setGdprConsent(e.target.checked)}
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
                  disabled={!gdprConsent}
                  className="w-full py-3.5 rounded-xl bg-bronze hover:bg-bronze-dark disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-bronze/20 hover:scale-101"
                >
                  TRIMITE SOLICITAREA DE TUR 3D
                </button>
                <p className="mt-2 text-center text-[10px] text-stone-500">
                  Răspuns garantat în maxim 2 ore cu detalii complete.
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-bronze/20 text-bronze mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              Solicitare Înregistrată cu Succes!
            </h3>
            <p className="text-stone-300 text-sm max-w-sm mx-auto leading-relaxed">
              Vă mulțumim, <span className="text-white font-bold">{fullName}</span>. Echipa TransylView 3D vă va contacta la <span className="text-bronze font-semibold">{phone}</span> pentru a confirma detaliile pentru <span className="text-white font-semibold">{selectedPkg}</span> în <span className="text-bronze font-semibold">{city}</span>.
            </p>
            <div className="pt-4">
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
