import { Menu, X, } from "lucide-react";
import { NAV_LINKS } from "../../constants";
import { useMobileMenu } from "../../hooks";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-black backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between border border-white/10 rounded-2xl p-4">
          <button
            onClick={() => onNavClick("Home")}
            className="flex items-center gap-3 cursor-pointer transition hover:opacity-80"
          >
            <img
              src={`${import.meta.env.BASE_URL}images/logo.webp`}
              alt="GOD WEAR"
              className="h-6 sm:h-7 md:h-8 lg:h-9 object-contain"
            />
            <div className="text-2xl impact tracking-tight text-gold">
              GOD WEAR <sup>®</sup>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-3 text-sm font-semibold">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => onNavClick(link.name)}
                className={`py-2.5 px-4 rounded-full transition-all duration-200 ${activeSection === link.name
                  ? "bg-accent text-white"
                  : "bg-transparent text-white/70 hover:bg-accent hover:text-white"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-6 md:hidden">
            <button
              onClick={openMenu}
              className="text-white/70 hover:text-white transition"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black z-50 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex items-center justify-end px-6 py-5">
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
              aria-label="Close menu"
            >
              <X size={24} className="text-white" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center items-center px-6 py-12 space-y-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavClick(link.name);
                  closeMenu();
                }}
                className={`text-center text-3xl transition-all duration-200 ${activeSection === link.name
                  ? "text-accent"
                  : "text-white/60 hover:text-white"
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
