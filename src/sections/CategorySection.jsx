import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { filterButtonsData, productData } from "../assets/data";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

gsap.registerPlugin(ScrollTrigger);

const CategorySection = ({ selectedCategory, setSelectedCategory }) => {
    const activeFilter = selectedCategory;
    const setActiveFilter = setSelectedCategory;

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const tabsWrapRef = useRef(null);
    const gridRef = useRef(null);
    const impactRef = useRef(null);
    const swipeAreaRef = useRef(null);
    const productsContainerRef = useRef(null);
    const tabsContainerRef = useRef(null);
    const tabButtonsRef = useRef([]);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Filter products based on active category
    const filteredProducts = activeFilter === "All"
        ? productData
        : productData.filter(product => product.name === activeFilter);

    // Count products by category
    const getCategoryCount = (categoryName) => {
        if (categoryName === "All") return productData.length;
        return productData.filter(p => p.name === categoryName).length;
    };

    // Swipe gesture handlers for mobile category switching
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (isAnimating) return;

        const swipeThreshold = 50;
        const swipeDistance = touchStartX.current - touchEndX.current;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            const currentIndex = filterButtonsData.findIndex(btn => btn.name === activeFilter);

            if (swipeDistance > 0) {
                // Swipe left - next category
                const nextIndex = Math.min(currentIndex + 1, filterButtonsData.length - 1);
                if (nextIndex !== currentIndex) {
                    animateCategoryChange(filterButtonsData[nextIndex].name, 'left');
                }
            } else {
                // Swipe right - previous category
                const prevIndex = Math.max(currentIndex - 1, 0);
                if (prevIndex !== currentIndex) {
                    animateCategoryChange(filterButtonsData[prevIndex].name, 'right');
                }
            }
        }

        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    // Animate category change
    const animateCategoryChange = (newCategory, direction) => {
        setIsAnimating(true);
        
        // Change category immediately
        setActiveFilter(newCategory);
        
        // Scroll to top of products grid
        if (productsContainerRef.current) {
            const elementPosition = productsContainerRef.current.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset for navbar
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Reset animation state after a short delay
        setTimeout(() => {
            setIsAnimating(false);
            // Scroll the active tab into view
            scrollActiveTabIntoView(newCategory);
        }, 300);
    };

    // Scroll active tab into view smoothly
    const scrollActiveTabIntoView = (categoryName) => {
        if (!tabsContainerRef.current) return;

        const activeIndex = filterButtonsData.findIndex(btn => btn.name === categoryName);
        const activeButton = tabButtonsRef.current[activeIndex];

        if (activeButton && tabsContainerRef.current) {
            const container = tabsContainerRef.current;
            const button = activeButton;

            // Calculate scroll position to center the button
            const containerWidth = container.offsetWidth;
            const buttonLeft = button.offsetLeft;
            const buttonWidth = button.offsetWidth;

            // Center the button in the container
            const targetScroll = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);

            // Smooth scroll animation with native scrollTo
            container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    // Scroll active tab into view on initial render and category change
    useEffect(() => {
        scrollActiveTabIntoView(activeFilter);
    }, [activeFilter]);

    useGSAP(() => {
        if (!sectionRef.current) return;

        gsap.fromTo(
            headerRef.current,
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        );

        gsap.fromTo(
            tabsWrapRef.current,
            { y: 16, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        );

        if (gridRef.current) {
            const items = gridRef.current.querySelectorAll(".product-item");
            gsap.fromTo(
                items,
                { y: 24, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 80%"
                    }
                }
            );
        }

        gsap.fromTo(
            impactRef.current,
            { y: 24, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: impactRef.current,
                    start: "top 85%"
                }
            }
        );
    }, { scope: sectionRef });

    return (
        <Section background="dark" padding="large">
            <div ref={sectionRef} className="space-y-12">
                <div ref={headerRef}>
                    <SectionHeader
                        title="Shop Our Collection"
                        subtitle="Premium training gear created for athletes who chase the extra rep."
                        align="center"
                        titleClassName="text-white font-machina"
                        subtitleClassName="text-white/70 font-manrope"
                    />
                </div>

                <div
                    ref={tabsWrapRef}
                    className="rounded-[34px] border border-white/10 bg-white/5 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                >
                    <div
                        ref={tabsContainerRef}
                        className="flex flex-wrap gap-3 overflow-x-auto scrollbar-hide px-1 py-1"
                    >
                        {filterButtonsData.map((btn, index) => (
                            <button
                                key={btn.name}
                                ref={(el) => (tabButtonsRef.current[index] = el)}
                                onClick={() => {
                                    if (!isAnimating && btn.name !== activeFilter) {
                                        const currentIndex = filterButtonsData.findIndex(b => b.name === activeFilter);
                                        const newIndex = filterButtonsData.findIndex(b => b.name === btn.name);
                                        const direction = newIndex > currentIndex ? 'left' : 'right';
                                        animateCategoryChange(btn.name, direction);
                                    }
                                }}
                                className={`${activeFilter === btn.name
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'bg-white/10 text-white/70 hover:bg-accent hover:text-white'
                                    } cursor-pointer md:text-lg impact px-4 py-2 rounded-full transition-all duration-200 ease-in text-nowrap border border-white/10`}
                            >
                                {btn.name}
                                <sub className={`${activeFilter === btn.name ? 'text-white/70' : 'text-white/50'} text-[0.55rem] font-semibold uppercase tracking-[0.3em] ml-2`}>
                                    {getCategoryCount(btn.name)}
                                </sub>
                            </button>
                        ))}
                    </div>
                </div>

                <div
                    ref={(el) => {
                        swipeAreaRef.current = el;
                        productsContainerRef.current = el;
                    }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="space-y-8"
                >
                    <div ref={gridRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <div key={index} className="product-item group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                                    <a
                                        href={product.flipkartLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`block relative ${product.imgHeight} overflow-hidden`}
                                    >
                                        <div className={`absolute inset-0 ${product.bgUrl} bg-cover bg-center transition-transform duration-500 group-hover:scale-105`} />

                                        {product.tag && (
                                            <span className="absolute top-4 left-4 z-10 rounded-full bg-gradient-to-r from-accent to-[#ff8b4b] px-4 py-1 text-xs uppercase tracking-[0.3em] font-semibold text-black">
                                                {product.tag}
                                            </span>
                                        )}

                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                                            <button className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-[0.4em] flex items-center gap-2">
                                                Buy Now
                                            </button>
                                        </div>
                                    </a>

                                    <div className="p-6 space-y-3">
                                        <p className="text-xl md:text-2xl impact text-white line-clamp-2">{product.description}</p>
                                        <div className="flex flex-wrap items-baseline gap-3">
                                            <span className="text-3xl font-semibold text-gold">{product.priceAfterDiscount}</span>
                                            <span className="text-sm line-through text-white/60">{product.price}</span>
                                            {product.discount && (
                                                <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">{product.discount}</span>
                                            )}
                                        </div>
                                        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Direct from Flipkart</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-16 space-y-4">
                                <img
                                    src={`${import.meta.env.BASE_URL}images/coming-soon.png`}
                                    alt="Coming Soon"
                                    className="w-64 h-64 object-contain"
                                />
                                <p className="text-white/60 text-sm text-center">Products in this category will be available soon.</p>
                                <button
                                    onClick={() => setActiveFilter("All")}
                                    className="px-6 py-3 rounded-full border border-white/30 text-xs uppercase tracking-[0.4em] text-white/80 hover:text-white hover:border-white transition"
                                >
                                    View All Products
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div ref={impactRef} className="grid gap-6 md:grid-cols-3">
                    {[
                        {
                            title: "Breathable Mesh",
                            copy: "Airflow panels keep your core temperature balanced during intense training."
                        },
                        {
                            title: "Compression Support",
                            copy: "Precision cuts hug the muscles, so fatigue stays low and focus stays high."
                        },
                        {
                            title: "Sweat-Ready Fabric",
                            copy: "Quick-dry yarns keep the fabric light and odor-free even after brutal sets."
                        }
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="glass-card glow-border rounded-3xl p-6 text-white bg-ink/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
                        >
                            <h3 className="text-2xl impact uppercase text-white">{item.title}</h3>
                            <p className="mt-3 text-white/70 text-sm leading-relaxed">{item.copy}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

export default CategorySection;
