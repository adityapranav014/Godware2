import { Menu, ChevronDown, ChevronRight, X, Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

// Data and constants
import { CATEGORIES } from "../../data";
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from "../../constants";

// UI Components
import { Logo } from "../ui";

// Custom hooks
import { useMobileMenu } from "../../hooks";

const activeLinkClasses = "bg-accent text-white";

const Navbar = ({ activeSection, onNavClick, onCategorySelect, selectedCategory }) => {
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
    const [isMobileShopExpanded, setIsMobileShopExpanded] = useState(false);
    
    // Use custom hook for mobile menu management
    const { isMobileMenuOpen, openMenu, closeMenu } = useMobileMenu();

    const handleCategoryClick = (categoryName) => {
        onCategorySelect(categoryName);
        setIsShopDropdownOpen(false);
    };

    const handleMobileCategoryClick = (categoryName) => {
        onCategorySelect(categoryName);
        closeMenu();
        setIsMobileShopExpanded(false);
    };

    const handleMobileNavClick = (sectionName) => {
        if (sectionName === "Shop") {
            setIsMobileShopExpanded(!isMobileShopExpanded);
        } else {
            onNavClick(sectionName);
            closeMenu();
            setIsMobileShopExpanded(false);
        }
    };

    return (
        <header className="w-full sticky top-0 z-50">
            {/* Announcement Bar */}
            {/* <div className="bg-zinc-900 text-white text-center text-xs py-2">
                Super Deal! Directly buy from Flipkart.
            </div> */}

            {/* Navbar */}
            <div className="bg-ink/90 backdrop-blur-md p-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center border border-white/10 bg-ink/80 rounded-2xl p-4">

                    {/* Logo */}
                    <button 
                        onClick={() => onNavClick('Home')}
                        className="flex items-center justify-between gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                        {/* Icon */}
                        <img src={`${import.meta.env.BASE_URL}images/logo.webp`} alt="GOD WEAR" className="h-6 sm:h-7 md:h-8 lg:h-9 w-auto object-contain" />

                        {/* Text */}
                        <div className="text-2xl impact tracking-tight text-gold">
                            GOD WEAR <sup>®</sup>
                        </div>
                    </button>

                    {/* Nav */}
                    <div className="hidden md:flex space-x-3 text-sm font-semibold items-center">
                        {
                            NAV_LINKS.map((link) => (
                                link.name === "Shop" ? (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => setIsShopDropdownOpen(true)}
                                        onMouseLeave={() => setIsShopDropdownOpen(false)}
                                    >
                                        <button
                                            onClick={() => onNavClick(link.name)}
                                            className={`${activeSection === link.name
                                                ? activeLinkClasses
                                                : 'bg-transparent text-white/70 hover:bg-accent hover:text-white'
                                                } cursor-pointer py-2.5 px-4 rounded-full
                                            transition-all duration-200 ease-in flex items-center gap-1`}
                                        >
                                            {link.name}
                                            <ChevronDown
                                                size={16}
                                                className={`transition-transform duration-200 ${isShopDropdownOpen ? 'rotate-180' : ''}`}
                                            />
                                        </button>

                                        {/* Dropdown */}
                                        {isShopDropdownOpen && (
                                            <div className="absolute top-full left-0 pt-2">
                                                <div className="bg-ink border border-white/10 rounded-2xl shadow-lg min-w-[200px] py-2">
                                                    {CATEGORIES.map((category) => (
                                                        <button
                                                            key={category.name}
                                                            onClick={() => handleCategoryClick(category.name)}
                                                            className={`w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors flex items-center justify-between group
                                                                ${selectedCategory === category.name ? 'bg-accent/15 text-white' : 'text-white/70'}`}
                                                        >
                                                            <span className="font-medium">{category.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs px-2 py-0.5 rounded-full
                                                                    ${selectedCategory === category.name
                                                                        ? 'bg-accent text-white'
                                                                        : 'bg-white/10 text-white/70 group-hover:bg-white/20'}`}>
                                                                    {category.count}
                                                                </span>
                                                                {selectedCategory === category.name && (
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                                                )}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <button
                                        key={link.name}
                                        onClick={() => onNavClick(link.name)}
                                        className={`${activeSection === link.name
                                            ? activeLinkClasses
                                            : 'bg-transparent text-white/70 hover:bg-accent hover:text-white'
                                            } cursor-pointer py-2.5 px-4 rounded-full
                                        transition-all duration-200 ease-in`}
                                    >
                                        {link.name}
                                    </button>
                                )
                            ))
                        }
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center space-x-6 md:hidden">
                        <button 
                            onClick={openMenu}
                            className="text-white/70 hover:text-white transition-colors cursor-pointer"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-50 md:hidden"
                    onClick={closeMenu}
                />
            )}

            {/* Mobile Menu Drawer */}
            <div className={`fixed top-0 right-0 h-full w-[85%] max-w-sm z-50 md:hidden
                transform transition-transform duration-300 ease-out shadow-2xl
                ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex min-h-full flex-col bg-gradient-to-b from-[#050505] via-[#0f0b11] to-[#050505] border-l border-white/5">

                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                        <button 
                            onClick={() => {
                                onNavClick('Home');
                                closeMenu();
                            }}
                            className="flex items-center gap-3 cursor-pointer transition-opacity hover:opacity-80"
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
                            onClick={() => closeMenu()}
                            className="p-2 rounded-full bg-white/5 transition hover:bg-white/10"
                            aria-label="Close menu"
                        >
                            <X size={24} className="text-white/80" />
                        </button>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className="flex flex-1 flex-col overflow-hidden">
                        <nav className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
                            {NAV_LINKS.map((link) => (
                                <div key={link.name}>
                                    {link.name === "Shop" ? (
                                        <div className="space-y-3">
                                            <button
                                                onClick={() => handleMobileNavClick(link.name)}
                                                className={`w-full flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-lg font-semibold transition-all duration-200
                                                    ${activeSection === link.name ? 'border-accent text-white' : 'text-white/80 hover:border-accent hover:text-white'}`}
                                            >
                                                <span>{link.name}</span>
                                                <ChevronRight 
                                                    size={20} 
                                                    className={`transition-transform duration-200
                                                        ${isMobileShopExpanded ? 'rotate-90 text-accent' : 'text-white/60'}`}
                                                />
                                            </button>

                                            <div className={`space-y-2 overflow-hidden transition-all duration-300
                                                ${isMobileShopExpanded ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                {CATEGORIES.map((category) => (
                                                    <button
                                                        key={category.name}
                                                        onClick={() => handleMobileCategoryClick(category.name)}
                                                        className={`w-full rounded-2xl border px-4 py-3 transition-all duration-200 text-left font-medium
                                                            ${selectedCategory === category.name 
                                                                ? 'border-accent bg-accent/10 text-white' 
                                                                : 'border-white/5 text-white/70 hover:border-white/30 hover:text-white'}`}
                                                    >
                                                        <div className="flex items-center justify-between gap-3">
                                                            <span>{category.name}</span>
                                                            <span className="text-xs font-semibold tracking-wide text-white/60">{category.count}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleMobileNavClick(link.name)}
                                            className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-lg font-semibold transition-all duration-200
                                                ${activeSection === link.name 
                                                    ? 'border-accent text-white' 
                                                    : 'text-white/80 hover:border-accent hover:text-white'}`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span>{link.name}</span>
                                                {activeSection === link.name && (
                                                    <div className="w-2 h-2 rounded-full bg-white"></div>
                                                )}
                                            </div>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Contact & Social Icons */}
                    <div className="px-6 pb-10">
                        <p className="font-semibold text-sm uppercase tracking-wide text-white/70 mb-3">Connect</p>
                        <div className="grid grid-cols-4 gap-3">
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
                                href={`tel:${CONTACT_INFO.phone.replace(/\s|-/g, '')}`}
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
                            <a
                                href={SOCIAL_LINKS.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-2xl border border-white/10 bg-purple-500/90 p-3 text-white transition hover:shadow-lg hover:scale-[1.02]"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Navbar
