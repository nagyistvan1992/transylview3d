import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    lastScrollY.current = window.scrollY;

    const updateNavbar = () => {
      const currentY = window.scrollY;
      const pastHero = currentY >= window.innerHeight - 80;
      const delta = currentY - lastScrollY.current;

      if (!pastHero) {
        // Inside Hero section: keep floating header hidden so Hero's own top bar is unobstructed
        setVisible(false);
        setMobileMenuOpen(false);
      } else if (delta > 6) {
        // Scrolling down: hide navbar completely
        setVisible(false);
        setMobileMenuOpen(false);
      } else if (delta < -6) {
        // Scrolling up: reveal navbar smoothly
        setVisible(true);
      }

      lastScrollY.current = currentY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

  const isShown = visible || mobileMenuOpen;

  return (
    <header
      style={{
        backgroundColor: isShown ? 'rgba(17, 16, 15, 0.96)' : 'transparent',
      }}
      className={`gpu-smooth fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isShown
          ? 'translate-y-0 opacity-100 py-3 bg-stone-950/95 backdrop-blur-md shadow-xl border-b border-stone-800'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between pointer-events-auto">
        <a
          href="#home"
          onClick={handleScrollToTop}
          className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer"
          title="Mergi la începutul paginii"
        >
          <img
            src="/images/transylview_icon.png"
            alt="TransylView 3D Icon"
            width={34}
            height={34}
            decoding="async"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-white/15 shadow-sm object-contain flex-shrink-0"
          />
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <span className="font-display text-sm sm:text-base font-bold tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase inline-flex items-baseline">
              TRANSYLVIEW
              <span className="-ml-0.5 sm:-ml-1 font-sans font-extrabold text-[1.22em] sm:text-[1.28em] tracking-tight text-[#F5D08A] group-hover:text-white transition-colors">
                3D
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5D08A] self-center group-hover:scale-125 transition-transform" />
          </div>
        </a>

        {/* Center Desktop Navigation */}
        <nav aria-label="Navigare principală" className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={link.onClick}
              className="font-sans text-sm font-medium text-stone-100 hover:text-[#F5D08A] transition-colors py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons & Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onBookCall}
            className="sm:hidden inline-flex items-center justify-center px-3.5 py-1.5 rounded-md font-sans text-xs font-semibold bg-[#F5D08A] text-stone-950 hover:bg-white transition-colors active:scale-[0.98] cursor-pointer shadow-xs"
          >
            Solicită tur
          </button>

          <button
            onClick={onBookCall}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-md font-sans text-xs sm:text-sm font-semibold bg-[#F5D08A] text-stone-950 hover:bg-white transition-colors active:scale-[0.98] cursor-pointer shadow-xs"
          >
            Solicită Ofertă
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden min-w-[38px] min-h-[38px] p-2 rounded-md text-white flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{ backgroundColor: 'rgba(17, 16, 15, 0.98)' }}
          className="md:hidden mt-2.5 mx-4 p-5 bg-stone-950/95 backdrop-blur-xl rounded-xl shadow-2xl border border-stone-800 space-y-4"
        >
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
                className="font-sans text-sm font-medium text-stone-100 hover:text-[#F5D08A] py-2.5 border-b border-stone-800 last:border-b-0 transition-colors"
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
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#F5D08A] text-stone-950 font-sans text-sm font-semibold hover:bg-white transition-colors"
            >
              Solicită scanare 3D
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

