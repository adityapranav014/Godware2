import { Menu } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { useMobileMenu } from "../../hooks";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <header className="w-full sticky top-0 z-50 bg-dark-900/95 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Mobile optimized */}
          <button
            onClick={() => onNavClick("Home")}
            className="flex items-center gap-2 md:gap-3 transition-opacity hover:opacity-80 active:opacity-60"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logo.webp`}
              alt="GOD WEAR"
              className="h-7 sm:h-8 md:h-9 lg:h-10 object-contain"
            />
            <div className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-display tracking-tight text-gold-500">
              GOD WEAR <sup className="text-xs">®</sup>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavClick(link.name)}
                className={`px-4 lg:px-5 py-2.5 rounded-lg font-medium text-sm lg:text-base transition-all duration-200 ${activeSection === link.name
                  ? "bg-gold-500/10 text-gold-500 font-semibold"
                  : "text-white/70 hover:text-white hover:bg-dark-800"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button - Thumb-friendly */}
          <button
            onClick={openMenu}
            className="md:hidden p-3 -mr-3 rounded-lg text-white/80 hover:text-gold-500 hover:bg-dark-800 active:bg-dark-700 transition-all"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - Full Screen */}
      <div
        className={`fixed inset-0 bg-dark-900 z-50 md:hidden transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      >
        <div className="flex min-h-dvh  flex-col px-6 py-8 bg-dark-800">
          {/* Close Button - Top Right */}
          <div className="flex justify-end mb-12">
            <button
              onClick={closeMenu}
              className="p-4 -mr-4 rounded-lg text-white/80 hover:text-gold-500 active:bg-dark-800 transition-all"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links - Large, Thumb-friendly */}
          <nav className="flex-1 flex flex-col justify-center items-center space-y-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavClick(link.name);
                  closeMenu();
                }}
                className={`w-full max-w-xs text-center py-4 px-6 rounded-xl text-2xl font-semibold transition-all duration-200 ${activeSection === link.name
                  ? " text-gold-500 "
                  : "text-white/80"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
