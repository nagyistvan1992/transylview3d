import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { LiveTourSection } from './components/LiveTourSection';
import { RetreatGallery } from './components/RetreatGallery';
import { RoiBenefitsSection } from './components/RoiBenefitsSection';
import { PricingSection } from './components/PricingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookCallModal } from './components/BookCallModal';
import { ImageManagerModal } from './components/ImageManagerModal';
import { CookieBanner } from './components/CookieBanner';
import { LegalModal, LegalDocType } from './components/LegalModal';
import { CustomImages } from './types';
import { initialImages } from './data/propertyData';

const LOCAL_STORAGE_KEY = 'transylview_custom_images_v2';

export function App() {
  const [images, setImages] = useState<CustomImages>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached images', e);
      }
    }
    return initialImages;
  });

  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [imageManagerOpen, setImageManagerOpen] = useState(false);
  const [legalDocOpen, setLegalDocOpen] = useState<LegalDocType>(null);

  // Secret admin triggers (Keyboard shortcut + URL hash listener)
  useEffect(() => {
    // 1. URL Hash trigger (e.g. localhost:3000/#images or #admin or #terms or #privacy)
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#images' || hash === '#admin' || hash === '#manager') {
        setImageManagerOpen(true);
      } else if (hash === '#terms' || hash === '#termeni') {
        setLegalDocOpen('terms');
      } else if (hash === '#privacy' || hash === '#gdpr' || hash === '#confidentialitate') {
        setLegalDocOpen('privacy');
      } else if (hash === '#cookies' || hash === '#cookie') {
        setLegalDocOpen('cookies');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);

    // 2. Keyboard shortcut trigger (Ctrl+Shift+I or Alt+I or Ctrl+Alt+I)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'U' || e.key === 'u')) ||
        (e.altKey && (e.key === 'i' || e.key === 'I')) ||
        (e.ctrlKey && e.altKey && (e.key === 'i' || e.key === 'I'))
      ) {
        e.preventDefault();
        setImageManagerOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleUpdateImages = (updated: CustomImages) => {
    setImages(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleOpenBookCall = (packageName?: string) => {
    setSelectedPackage(packageName);
    setBookCallOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas text-stone-900 selection:bg-bronze selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar
        onBookCall={() => handleOpenBookCall()}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section 1: Hero Section with Scroll-Driven 8K Tour Visual */}
        <HeroSection
          heroImage={images.hero3dTour}
          onBookCall={() => handleOpenBookCall()}
        />

        {/* Section 2: About & Camera Technology (Insta X5 8K, Dollhouse 3D) */}
        <AboutSection images={images} />

        {/* Section 3: Live Real Matterport 3D Tour (Exact Link: YFWgEekGLHm) */}
        <LiveTourSection
          onBookCall={() => handleOpenBookCall()}
        />

        {/* Section 4: Interactive 3D Portfolio (Mosaic Room Switcher) */}
        <RetreatGallery images={images} />

        {/* Section 5: Real Estate ROI, Statistics & Benefits */}
        <RoiBenefitsSection />

        {/* Section 6: Transparent Pricing Packages (Calibrated for Romanian Market) */}
        <PricingSection
          onSelectPackage={(pkgName) => handleOpenBookCall(pkgName)}
        />

        {/* Section 7: Coverage Area (Satu Mare & 100km in Transylvania) */}
        <LocationSection />
      </main>

      {/* Footer with High-Res Clean Logo, ANPC Badges, and Legal Compliance Links */}
      <Footer
        onBookCall={() => handleOpenBookCall()}
        onSecretOpenImageManager={() => setImageManagerOpen(true)}
        onOpenLegal={(doc) => setLegalDocOpen(doc)}
      />

      {/* Booking & Quote Modal with Mandatory GDPR Consent Checkbox */}
      <BookCallModal
        isOpen={bookCallOpen}
        onClose={() => setBookCallOpen(false)}
        defaultPackage={selectedPackage}
        onOpenLegal={(doc) => setLegalDocOpen(doc)}
      />

      {/* Secret Image & Asset Customizer Modal */}
      <ImageManagerModal
        isOpen={imageManagerOpen}
        onClose={() => setImageManagerOpen(false)}
        images={images}
        onUpdateImages={handleUpdateImages}
      />

      {/* GDPR Compliant Interactive Cookie Consent Banner */}
      <CookieBanner
        onOpenLegal={(doc) => setLegalDocOpen(doc)}
      />

      {/* Complete Legal Documents Modal (Terms, GDPR Privacy Policy, Cookie Policy) */}
      <LegalModal
        activeDoc={legalDocOpen}
        onClose={() => setLegalDocOpen(null)}
        onSelectDoc={(doc) => setLegalDocOpen(doc)}
      />
    </div>
  );
}

export default App;
