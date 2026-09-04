import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { LiveTourSection } from './components/LiveTourSection';
import { ToursPortfolioSection } from './components/ToursPortfolioSection';
import { RetreatGallery } from './components/RetreatGallery';
import { RoiBenefitsSection } from './components/RoiBenefitsSection';
import { PricingSection } from './components/PricingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { LegalDocType } from './components/LegalModal';
import { CustomImages, VirtualTourItem } from './types';
import { initialImages, initialVirtualTours } from './data/propertyData';

// Lazy-loaded modal components for fast initial mobile rendering
const BookCallModal = lazy(() => import('./components/BookCallModal').then((m) => ({ default: m.BookCallModal })));
const VirtualTourViewerModal = lazy(() => import('./components/VirtualTourViewerModal').then((m) => ({ default: m.VirtualTourViewerModal })));
const TourManagerModal = lazy(() => import('./components/TourManagerModal').then((m) => ({ default: m.TourManagerModal })));
const ImageManagerModal = lazy(() => import('./components/ImageManagerModal').then((m) => ({ default: m.ImageManagerModal })));
const LegalModal = lazy(() => import('./components/LegalModal').then((m) => ({ default: m.LegalModal })));

const LOCAL_STORAGE_IMAGES_KEY = 'transylview_custom_images_v5';
const LOCAL_STORAGE_TOURS_KEY = 'transylview_virtual_tours_v5';

export function App() {
  // 1. Custom Images State
  const [images, setImages] = useState<CustomImages>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_IMAGES_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cached images', e);
      }
    }
    return initialImages;
  });

  // 2. Virtual Tours Portfolio State (with persistent LocalStorage and multi-device parity)
  const [virtualTours, setVirtualTours] = useState<VirtualTourItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_TOURS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialVirtualTours.length) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse cached virtual tours', e);
      }
    }
    return initialVirtualTours;
  });

  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | undefined>(undefined);
  const [activeTourViewer, setActiveTourViewer] = useState<VirtualTourItem | null>(null);
  const [tourManagerOpen, setTourManagerOpen] = useState(false);
  const [imageManagerOpen, setImageManagerOpen] = useState(false);
  const [legalDocOpen, setLegalDocOpen] = useState<LegalDocType>(null);

  // Secret admin triggers (Keyboard shortcut + URL hash listener)
  useEffect(() => {
    // 1. URL Hash trigger (e.g. localhost:3000/#tours or #admin or #images or #terms)
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#tours' || hash === '#admin' || hash === '#manager') {
        setTourManagerOpen(true);
      } else if (hash === '#images') {
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

    // 2. Keyboard shortcut trigger (Ctrl+Shift+T for Tours, Ctrl+Shift+I for Images)
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        return;
      }

      if (
        (e.ctrlKey && e.shiftKey && (e.key === 'T' || e.key === 't')) ||
        (e.altKey && (e.key === 't' || e.key === 'T'))
      ) {
        e.preventDefault();
        setTourManagerOpen((prev) => !prev);
      } else if (
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'U' || e.key === 'u')) ||
        (e.altKey && (e.key === 'i' || e.key === 'I'))
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
    localStorage.setItem(LOCAL_STORAGE_IMAGES_KEY, JSON.stringify(updated));
  };

  const handleUpdateVirtualTours = (updatedTours: VirtualTourItem[]) => {
    setVirtualTours(updatedTours);
    localStorage.setItem(LOCAL_STORAGE_TOURS_KEY, JSON.stringify(updatedTours));
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

        {/* Section 3: Live Real Matterport 3D Tour Embed */}
        <LiveTourSection
          onBookCall={() => handleOpenBookCall()}
        />

        {/* Section 4: NEW - 3D Virtual Tours Portfolio Showcase (Custom Uploads & Projects) */}
        <ToursPortfolioSection
          tours={virtualTours}
          onOpenTourViewer={(tour) => setActiveTourViewer(tour)}
          onRequestQuote={(propertyType) => handleOpenBookCall(propertyType)}
          onOpenTourManager={() => setTourManagerOpen(true)}
        />

        {/* Section 5: Interactive 3D Room Switcher Gallery */}
        <RetreatGallery images={images} />

        {/* Section 6: Real Estate ROI, Statistics & Benefits */}
        <RoiBenefitsSection />

        {/* Section 7: Transparent Pricing Packages (Calibrated for Romanian Market) */}
        <PricingSection
          onSelectPackage={(pkgName) => handleOpenBookCall(pkgName)}
        />

        {/* Section 8: Coverage Area (Satu Mare & 100km in Transylvania) */}
        <LocationSection />
      </main>

      {/* Footer with High-Res Clean Logo, ANPC Badges, and Legal Compliance Links */}
      <Footer
        onBookCall={() => handleOpenBookCall()}
        onSecretOpenImageManager={() => setTourManagerOpen(true)}
        onOpenLegal={(doc) => setLegalDocOpen(doc)}
      />

      {/* Lazy-Loaded Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {/* Booking & Quote Modal with Mandatory GDPR Consent Checkbox */}
        {bookCallOpen && (
          <BookCallModal
            isOpen={bookCallOpen}
            onClose={() => setBookCallOpen(false)}
            defaultPackage={selectedPackage}
            onOpenLegal={(doc) => setLegalDocOpen(doc)}
          />
        )}

        {/* 3D Interactive Virtual Tour Fullscreen Modal Player */}
        {activeTourViewer && (
          <VirtualTourViewerModal
            tour={activeTourViewer}
            onClose={() => setActiveTourViewer(null)}
            onRequestQuote={(propType) => handleOpenBookCall(propType)}
          />
        )}

        {/* Tour Manager Admin Modal (Upload, Edit, Delete, Export 3D Tours) */}
        {tourManagerOpen && (
          <TourManagerModal
            isOpen={tourManagerOpen}
            onClose={() => setTourManagerOpen(false)}
            tours={virtualTours}
            onUpdateTours={handleUpdateVirtualTours}
            onPreviewTour={(tour) => setActiveTourViewer(tour)}
          />
        )}

        {/* Image & Asset Customizer Modal */}
        {imageManagerOpen && (
          <ImageManagerModal
            isOpen={imageManagerOpen}
            onClose={() => setImageManagerOpen(false)}
            images={images}
            onUpdateImages={handleUpdateImages}
          />
        )}

        {/* Complete Legal Documents Modal (Terms, GDPR Privacy Policy, Cookie Policy) */}
        {legalDocOpen && (
          <LegalModal
            activeDoc={legalDocOpen}
            onClose={() => setLegalDocOpen(null)}
            onSelectDoc={(doc) => setLegalDocOpen(doc)}
          />
        )}
      </Suspense>

      {/* GDPR Compliant Interactive Cookie Consent Banner */}
      <CookieBanner
        onOpenLegal={(doc) => setLegalDocOpen(doc)}
      />
    </div>
  );
}

export default App;
