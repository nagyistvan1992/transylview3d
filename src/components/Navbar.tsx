import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCall }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 1.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'ACASĂ', href: '#home', onClick: handleScrollToTop },
    { name: 'DESPRE NOI', href: '#about' },
    { name: 'DEMO 3D', href: '#demo-tour' },
    { name: 'PORTOFOLIU', href: '#portfolio' },
    { name: 'PREȚURI', href: '#pricing' },
    { name: 'LOCAȚIE', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'translate-y-0 opacity-100 py-3.5 bg-canvas-light/95 backdrop-blur-md shadow-luxury-soft border-b border-stone-300/50'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between pointer-events-auto">
        {/* Brand Name with smooth scroll to top on click */}
        <a
          href="#home"
          onClick={handleScrollToTop}
          className="group flex items-center gap-2 transition-transform hover:scale-102 cursor-pointer"
          title="Mergi la începutul paginii"
        >
          <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.22em] text-stone-900">
            TRANSYLVIEW <span className="text-bronze font-medium text-sm sm:text-base">3D</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-bronze" />
        </a>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={link.onClick}
              className="text-xs font-semibold tracking-[0.22em] text-stone-700 hover:text-bronze transition-all duration-300 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-bronze hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button without generic sparkles */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onBookCall}
            className="px-5 py-2.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 bg-stone-900 text-stone-50 hover:bg-bronze hover:text-stone-950 shadow-sm"
          >
            SOLICITĂ OFERTĂ
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-stone-900"
          aria-label="Deschide meniul"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 mx-4 p-6 bg-canvas-light/98 backdrop-blur-xl rounded-2xl shadow-luxury-floating border border-stone-300/60 space-y-4">
          <div className="flex flex-col space-y-3">
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
                className="text-xs font-semibold tracking-[0.24em] text-stone-800 hover:text-bronze py-2 border-b border-stone-200/60"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookCall();
              }}
              className="w-full py-3 bg-stone-900 text-stone-50 rounded-full text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center"
            >
              SOLICITĂ SCANARE 3D
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
