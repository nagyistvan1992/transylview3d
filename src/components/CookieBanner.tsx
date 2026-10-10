import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck } from 'lucide-react';
import { LegalDocType } from './LegalModal';

interface CookieBannerProps {
  onOpenLegal: (doc: LegalDocType) => void;
}

const COOKIE_STORAGE_KEY = 'transylview_cookie_consent_v1';

export const CookieBanner: React.FC<CookieBannerProps> = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ necessary: true, analytics: true, functional: true, timestamp: Date.now() }));
    setIsVisible(false);
  };

  const handleAcceptEssentialOnly = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ necessary: true, analytics: false, functional: false, timestamp: Date.now() }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-stone-900 text-stone-100 p-5 sm:p-6 rounded-xl border border-stone-800 shadow-xl"
        >
          <div className="flex items-start gap-3.5 mb-3.5">
            <div className="p-2 rounded-md bg-stone-800 text-stone-300 flex-shrink-0 mt-0.5">
              <Cookie className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-stone-400 text-xs font-semibold tracking-wider uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Confidențialitate & Cookie-uri</span>
              </div>
              <h4 className="font-serif text-sm sm:text-base font-semibold text-white leading-snug">
                Respectăm confidențialitatea datelor dumneavoastră
              </h4>
            </div>
          </div>

          <p className="font-sans text-xs text-stone-300 leading-relaxed mb-4">
            Utilizăm cookie-uri proprii și de la terți pentru funcționarea tehnică a site-ului, redarea fluidă a tururilor virtuale 3D și analiza traficului, în conformitate cu GDPR (Regulamentul UE 2016/679).
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-4 rounded-md bg-white hover:bg-stone-100 text-stone-900 font-sans font-semibold text-xs tracking-wider transition-colors text-center cursor-pointer"
            >
              Acceptă toate
            </button>

            <button
              onClick={handleAcceptEssentialOnly}
              className="py-2 px-4 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold tracking-wider transition-colors text-center border border-stone-700 cursor-pointer"
            >
              Doar esențiale
            </button>
          </div>

          {/* Legal policy links */}
          <div className="mt-3.5 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-sans">
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-stone-200 underline transition-colors cursor-pointer"
            >
              Politica de Cookie-uri
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-stone-200 underline transition-colors cursor-pointer"
            >
              Politica GDPR
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-stone-200 underline transition-colors cursor-pointer"
            >
              Termeni și Condiții
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
