import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { navLinksData, filterButtonsData } from "../assets/data";

const NavbarButton = ({ label, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden cursor-pointer group text-left uppercase tracking-[0.2em] ${
      isActive ? "text-white" : "text-white/70"
    }`}
  >
    <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
      {label}
    </div>
    <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-hover:text-[#e8602e]">
      {label}
    </div>
  </button>
);

const Navbar = ({ activeSection, onNavClick, onCategorySelect, selectedCategory }) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopExpanded, setIsMobileShopExpanded] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (categoryName) => {
    onCategorySelect(categoryName);
    setIsShopDropdownOpen(false);
  };

  const handleMobileCategoryClick = (categoryName) => {
    onCategorySelect(categoryName);
    setIsMobileMenuOpen(false);
    setIsMobileShopExpanded(false);
  };

  const toggleMobileShop = () => {
    setIsMobileShopExpanded((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[99] transition-transform duration-300 font-manrope translate-y-0 backdrop-blur h-32 text-white">
      <div className="relative w-full h-full bg-black/70 border-b border-white/10">
        <div className="flex items-center justify-between h-full px-4 md:px-10 lg:px-20">
          <a
            href="/"
            data-discover="true"
            className="flex items-center h-full"
            onClick={(event) => {
              event.preventDefault();
              onNavClick("Home");
            }}
          >
            <img
              src="https://dfdx9u0psdezh.cloudfront.net/logos/full-logo.webp"
              alt="Logo"
              className="w-50 sm:w-54 h-auto object-contain"
              loading="eager"
            />
          </a>

          <div className="max-[850px]:hidden flex-1 flex justify-center">
            <div className="rounded-lg bg-gradient-to-l from-white/30 via-transparent to-white/30 p-[0.5px]">
              <div className="links py-4 rounded-lg px-8 flex gap-10 bg-gradient-to-b from-[#171212] to-[#100B0B] tracking-wide lg:text-[1.12rem] text-white/70">
                {navLinksData.map((link) =>
                  link.name === "Shop" ? (
                    <div
                      key={link.name}
                      className="relative flex flex-col"
                      onMouseEnter={() => setIsShopDropdownOpen(true)}
                      onMouseLeave={() => setIsShopDropdownOpen(false)}
                    >
                      <NavbarButton
                        label="Shop"
                        onClick={() => onNavClick("Shop")}
                        isActive={activeSection === "Shop"}
                      />
                      {isShopDropdownOpen && (
                        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 w-[220px] rounded-2xl border border-white/10 bg-black/90 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
                          {filterButtonsData.map((category) => (
                            <button
                              key={category.name}
                              onClick={() => handleCategoryClick(category.name)}
                              className={`w-full px-4 py-2 text-sm uppercase tracking-[0.2em] transition-colors ${
                                selectedCategory === category.name
                                  ? "text-[#e8602e]"
                                  : "text-white/60 hover:text-[#e8602e]"
                              }`}
                              style={{ textAlign: "left" }}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <NavbarButton
                      key={link.name}
                      label={link.name}
                      onClick={() => onNavClick(link.name)}
                      isActive={activeSection === link.name}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="max-[850px]:hidden flex items-center justify-end">
              <button className="hover:bg-accent px-4 transition rounded-lg py-2">
                <div className="relative overflow-hidden cursor-pointer group">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    <h1 className="text-lg font-manrope font-light text-white">Sign In</h1>
                  </div>
                  <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-hover:text-white">
                    <h1 className="text-lg font-manrope font-light text-white">Sign In</h1>
                  </div>
                </div>
              </button>
            </div>

            <div className="max-[850px]:block hidden">
              <div
                className="hamburger fixed z-[99999] top-1/2 -translate-y-1/2 right-10 flex flex-col justify-center items-center w-8 h-8 cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label="Open mobile menu"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="block absolute w-7 h-[2px] bg-white rounded transition-transform duration-300 ease-in-out -translate-y-2" />
                <span className="block absolute w-7 h-[2px] bg-white rounded transition-transform duration-300 ease-in-out translate-y-2" />
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-[98] bg-black/60"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="fixed top-32 left-0 right-0 z-[99] bg-black/90 px-6 py-10 space-y-6">
              <div className="flex items-center justify-between">
                <span className="tracking-[0.3em] uppercase text-white text-sm">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <X size={24} className="text-white" />
                </button>
              </div>
              {navLinksData.map((link) =>
                link.name === "Shop" ? (
                  <div key={link.name}>
                    <button
                      onClick={toggleMobileShop}
                      className="w-full text-left text-lg uppercase tracking-[0.2em] text-white flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronDown
                        size={20}
                        className={`transition-transform duration-200 ${
                          isMobileShopExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isMobileShopExpanded && (
                      <div className="mt-4 flex flex-col gap-2 pl-4">
                        {filterButtonsData.map((category) => (
                          <button
                            key={category.name}
                            onClick={() => handleMobileCategoryClick(category.name)}
                            className="text-white text-base tracking-[0.3em] uppercase"
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    key={link.name}
                    onClick={() => {
                      onNavClick(link.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-lg uppercase tracking-[0.2em] text-white"
                  >
                    {link.name}
                  </button>
                )
              )}
              <button className="text-left text-lg tracking-[0.2em] uppercase text-white">
                Sign In
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
