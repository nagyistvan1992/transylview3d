import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, RefreshCw, Check, Sparkles, Copy } from 'lucide-react';
import { CustomImages } from '../types';
import { initialImages } from '../data/propertyData';

interface ImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: CustomImages;
  onUpdateImages: (updated: CustomImages) => void;
}

export const ImageManagerModal: React.FC<ImageManagerModalProps> = ({
  isOpen,
  onClose,
  images,
  onUpdateImages,
}) => {
  const [formData, setFormData] = useState<CustomImages>(images);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  if (!isOpen) return null;

  const imageFields: { key: keyof CustomImages; label: string; section: string }[] = [
    { key: 'hero3dTour', label: 'Tur Virtual 3D Hero Interior', section: 'Secțiunea Hero' },
    { key: 'aboutGear', label: 'Cameră Profesională Insta X5 8K', section: 'Despre Noi & Tehnologie' },
    { key: 'aboutDollhouse', label: 'Model Secțional Dollhouse 3D', section: 'Despre Noi & Tehnologie' },
    { key: 'aboutInterior', label: 'Interior Tur Virtual 360', section: 'Despre Noi & Tehnologie' },
    { key: 'retreatCourtyard', label: 'Vilă Rezidențială & Curte', section: 'Portofoliu 3D' },
    { key: 'retreatKitchen', label: 'Bucătărie & Living Gourmet', section: 'Portofoliu 3D' },
    { key: 'retreatSpaBath', label: 'Baie Spa din Travertin', section: 'Portofoliu 3D' },
    { key: 'retreatLounge', label: 'Lounge Scufundat cu Șemineu', section: 'Portofoliu 3D' },
    { key: 'retreatTerrace', label: 'Terasă Panoramică Penthouse', section: 'Portofoliu 3D' },
    { key: 'retreatNicheDetail', label: 'Detalii Tactile & Finisaje', section: 'Portofoliu 3D' },
  ];

  const handleTextChange = (key: keyof CustomImages, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFileUpload = (key: keyof CustomImages, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setFormData((prev) => ({ ...prev, [key]: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onUpdateImages(formData);
    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
      onClose();
    }, 800);
  };

  const handleResetToDefault = () => {
    setFormData(initialImages);
    onUpdateImages(initialImages);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 shadow-luxury-floating border border-stone-700/60 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-start justify-between border-b border-stone-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-bronze text-xs font-bold tracking-[0.2em] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PERSONALIZARE IMAGINI PORTOFOLIU</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
              Schimbă Imaginile Site-ului
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-1">
              Înlocuiți cu ușurință randările implicite cu propriile fotografii de proiect sau link-uri directe.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageFields.map(({ key, label, section }) => (
              <div
                key={key}
                className="p-4 rounded-2xl bg-stone-950/80 border border-stone-800/80 hover:border-stone-700 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-stone-900 border border-stone-800 flex-shrink-0">
                    <img
                      src={formData[key]}
                      alt={label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold tracking-widest text-bronze uppercase block">
                      {section}
                    </span>
                    <h4 className="font-medium text-xs text-white truncate">{label}</h4>
                    <span className="text-[10px] text-stone-500 font-mono block mt-0.5 truncate">
                      {formData[key]}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={formData[key]}
                      onChange={(e) => handleTextChange(key, e.target.value)}
                      placeholder="Lipește URL imagine..."
                      className="flex-1 bg-stone-900 border border-stone-800 focus:border-bronze rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-stone-600 focus:outline-none transition-colors"
                    />
                    <label className="cursor-pointer p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors" title="Încarcă fișier de pe calculator">
                      <Upload className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(key, e)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-stone-800 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToDefault}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resetează la Imagini Inițiale</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiat!' : 'Copiază Config JSON'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold text-stone-400 hover:text-white transition-colors"
            >
              Anulează
            </button>
            <button
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-bronze hover:bg-bronze-dark text-stone-950 text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              {savedFeedback ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              <span>{savedFeedback ? 'Salvat!' : 'Aplică Modificările'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
