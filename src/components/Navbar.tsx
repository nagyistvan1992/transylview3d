import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      const nextScrolled = window.scrollY >= window.innerHeight - 80;
      setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    updateScrolled();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Acasă', href: '#home', onClick: handleScrollToTop },
    { name: 'Despre noi', href: '#about' },
    { name: 'Demo 3D', href: '#demo-tour' },
    { name: 'Portofoliu', href: '#virtual-tours' },
    { name: 'Prețuri', href: '#pricing' },
    { name: 'Locație', href: '#location' },
  ];

  return (
    <header
      className={`gpu-smooth fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'translate-y-0 opacity-100 py-3 bg-canvas-light/95 backdrop-blur-md shadow-sm border-b border-stone-200'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
        <a
          href="#home"
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 sm:gap-2.5 cursor-pointer transition-transform hover:scale-102"
          title="Mergi la începutul paginii"
        >
          <img
            src="/images/transylview_icon.png"
            alt="TransylView 3D Icon"
            width={28}
            height={28}
            decoding="async"
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg shadow-xs border border-stone-800/10 object-contain flex-shrink-0"
          />
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-display text-base sm:text-lg font-bold tracking-[0.14em] sm:tracking-[0.18em] text-stone-900 uppercase inline-flex items-baseline">
              TRANSYLVIEW
              <span className="-ml-0.5 sm:-ml-1 font-sans font-extrabold text-[1.22em] sm:text-[1.28em] tracking-tight text-bronze-dark group-hover:text-stone-950 transition-colors">
                3D
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-bronze self-center group-hover:scale-125 transition-transform" />
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav aria-label="Navigare principală" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={link.onClick}
              className="font-sans text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBookCall}
            className="sm:hidden inline-flex items-center justify-center px-3 py-1.5 rounded-md font-sans text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors active:scale-[0.98] cursor-pointer"
          >
            Solicită tur
          </button>

          <button
            onClick={onBookCall}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2 rounded-md font-sans text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors active:scale-[0.98] cursor-pointer"
          >
            Solicită Ofertă
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[38px] min-h-[38px] p-2 rounded-md text-stone-900 flex items-center justify-center hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-5 bg-canvas-light/98 backdrop-blur-xl rounded-xl shadow-lg border border-stone-200 space-y-4">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.onClick) {
                    link.onClick(e);
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
                className="font-sans text-sm font-medium text-stone-700 hover:text-stone-900 py-2.5 border-b border-stone-200 last:border-b-0 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCall();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-stone-900 text-white font-sans text-sm font-semibold hover:bg-stone-800 transition-colors"
            >
              Solicită scanare 3D
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
