import { Menu, X, Mail, Phone, MessageCircle } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO } from "../../constants";
import { useMobileMenu } from "../../hooks";

const Navbar = ({ activeSection, onNavClick }) => {
  const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-ink/90 backdrop-blur-md p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between border border-white/10 bg-ink/80 rounded-2xl p-4">
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
        className={`fixed inset-0 bg-black/60 z-50 md:hidden transition-opacity duration-200 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={closeMenu}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 md:hidden transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex min-h-full flex-col bg-gradient-to-b from-[#050505] via-[#0f0b11] to-[#050505] border-l border-white/5">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <button
              onClick={() => {
                onNavClick("Home");
                closeMenu();
              }}
              className="flex items-center gap-3 cursor-pointer transition hover:opacity-80"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/logo.webp`}
                alt="GOD WEAR"
                className="h-9 w-auto object-contain"
              />
              <div>
                <span className="text-lg impact tracking-tight text-gold block">GOD WEAR</span>
                <p className="text-xs tracking-[0.4em] uppercase text-white/50">crafted power</p>
              </div>
            </button>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
              aria-label="Close menu"
            >
              <X size={24} className="text-white/80" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  onNavClick(link.name);
                  closeMenu();
                }}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-lg font-semibold text-white/80 transition-all duration-200 hover:border-accent hover:text-white"
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {activeSection === link.name && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
              </button>
            ))}
          </nav>

          <div className="px-6 pb-10 space-y-3">
            <p className="font-semibold text-sm uppercase tracking-widest text-white/70">Connect</p>
            <div className="grid grid-cols-3 gap-3">
              <a
                href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-green-500/90 p-3 text-white transition hover:scale-[1.02]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, "")}`}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-accent hover:scale-[1.02]"
                aria-label="Call"
              >
                <Phone size={20} />
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-accent hover:scale-[1.02]"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
