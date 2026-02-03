import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { useMobileMenu } from "../../hooks";
import { gsap } from "gsap";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();
  const navRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide on scroll down, show on scroll up
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isVisible]);

  return (
    <>
      <header 
        ref={navRef}
        className="w-full fixed top-0 left-0 right-0 z-50 bg-black/80 md:bg-black/40 backdrop-blur-xl border-b border-white/20 md:border-white/10 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavClick("Home")}
            className="flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logo.webp`}
              alt="GOD WEAR"
              className="h-8 sm:h-10 md:h-12 object-contain group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300"
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-display bg-gold tracking-tight bg-clip-text text-transparent">
              GOD WEAR <sup className="text-xs">®</sup>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavClick(link.name)}
                className={`relative px-4 lg:px-6 py-2.5 rounded-full font-medium text-sm lg:text-base transition-all duration-300 ${
                  activeSection === link.name
                    ? "text-gold-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                {activeSection === link.name && (
                  <span className="absolute inset-0 bg-gold-500/10 rounded-full border border-gold-500/30 -z-10" />
                )}
                <span className="absolute inset-0 bg-white/5 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={openMenu}
            className="md:hidden p-2.5 rounded-full text-white hover:text-gold-500 hover:bg-white/10 active:scale-95 transition-all duration-200"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    {isMobileMenuOpen && (
      <div className="fixed inset-0 z-[60] md:hidden bg-black/95 backdrop-blur-2xl">
        <div className="flex flex-col h-dvh">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <img
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt="GOD WEAR"
                className="h-10 object-contain"
              />
              <div className="text-2xl font-display bg-gold bg-clip-text text-transparent">
                GOD WEAR <sup className="text-xs">®</sup>
              </div>
            </div>
            <button
              onClick={closeMenu}
              className="p-2.5 rounded-full text-white hover:text-gold-500 hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="flex-1 flex flex-col justify-center px-6 gap-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavClick(link.name);
                  closeMenu();
                }}
                className={`relative w-full text-left py-5 px-6 rounded-2xl text-2xl font-semibold transition-all duration-300 ${
                  activeSection === link.name
                    ? "bg-gold-500/10 text-gold-500 border border-gold-500/30"
                    : "text-white/90 hover:bg-white/5 active:bg-white/10"
                }`}
              >
                {link.name}
                {activeSection === link.name && (
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="px-6 py-6 border-t border-white/10">
            <p className="text-center text-white/50 text-sm">
              © 2026 GOD WEAR. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default Navbar;
