import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE, isMobile, getResponsiveDuration } from "../utils/animations";

export const useNavbarAnimations = (isMobileMenuOpen, isVisible) => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Initial entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            const mobile = isMobile();
            const tl = gsap.timeline({
                defaults: { ease: EASE.circ },
                delay: 0.1
            });

            // Navbar slides down
            tl.fromTo(
                navRef.current,
                {
                    y: -100,
                    opacity: 0,
                    filter: mobile ? 'blur(5px)' : 'blur(10px)',
                    willChange: 'transform, opacity, filter',
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: getResponsiveDuration('slow'),
                    ease: EASE.expo,
                    clearProps: 'willChange',
                }
            );

            // Logo scales in
            tl.fromTo(
                logoRef.current,
                {
                    scale: 0.85,
                    opacity: 0,
                    willChange: 'transform, opacity',
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: getResponsiveDuration('medium'),
                    ease: EASE.backGentle,
                    clearProps: 'willChange',
                },
                '-=0.45'
            );

            // Mobile menu button
            if (menuButtonRef.current) {
                tl.fromTo(
                    menuButtonRef.current,
                    {
                        scale: 0.85,
                        opacity: 0,
                        willChange: 'transform, opacity',
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: getResponsiveDuration('medium'),
                        ease: EASE.backGentle,
                        clearProps: 'willChange',
                    },
                    '-=0.3'
                );
            }

            // Nav links stagger
            const links = navLinksRef.current.filter(Boolean);
            if (links.length > 0 && !mobile) {
                tl.fromTo(
                    links,
                    {
                        y: -15,
                        opacity: 0,
                        willChange: 'transform, opacity',
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: getResponsiveDuration('fast'),
                        stagger: 0.06,
                        ease: EASE.circ,
                        clearProps: 'willChange',
                    },
                    '-=0.35'
                );
            }
        }, navRef);

        return () => ctx.revert();
    }, []);

    // Hide/show animation
    useEffect(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                y: isVisible ? 0 : -100,
                autoAlpha: isVisible ? 1 : 0,
                duration: 0.6,
                ease: isVisible ? "power3.out" : "power3.in",
            });
        }
    }, [isVisible]);

    // Mobile menu animations
    useEffect(() => {
        if (!mobileMenuRef.current) return;

        const ctx = gsap.context(() => {
            if (isMobileMenuOpen) {
                const tl = gsap.timeline();

                // 1. Overlay Entrance
                tl.fromTo(
                    mobileMenuRef.current,
                    { clipPath: "inset(0 0 100% 0)" },
                    {
                        clipPath: "inset(0 0 0% 0)",
                        duration: 1,
                        ease: "expo.inOut",
                    }
                );

                // 2. Links Stagger
                const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
                tl.fromTo(
                    links,
                    {
                        y: 50,
                        opacity: 0,
                        skewY: 5,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        skewY: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

                // 3. Footer Stagger
                const bottomContent = mobileMenuRef.current.querySelectorAll('.mobile-menu-footer');
                tl.fromTo(
                    bottomContent,
                    { y: 20, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.05,
                        ease: "power2.out",
                    },
                    "-=0.6"
                );

            } else {
                // Exit Animation
                gsap.to(mobileMenuRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    duration: 0.8,
                    ease: "expo.inOut",
                });
            }
        }, mobileMenuRef);

        return () => ctx.revert();
    }, [isMobileMenuOpen]);

    return {
        navRef,
        logoRef,
        navLinksRef,
        mobileMenuRef,
        menuButtonRef
    };
};
