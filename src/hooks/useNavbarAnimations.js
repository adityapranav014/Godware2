import { useEffect, useRef } from "react";
import gsap from "gsap";
import { EASE, isMobile, getResponsiveDuration } from "../utils/animations";

export const useNavbarAnimations = (isMobileMenuOpen, isVisible, preloaderComplete = true) => {
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const navLinksRef = useRef([]);
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Initial entrance animation — gated behind preloader completion
    useEffect(() => {
        if (!preloaderComplete) return; // Wait for preloader to finish

        const ctx = gsap.context(() => {
            const mobile = isMobile();
            const tl = gsap.timeline({
                defaults: { ease: EASE.circ },
                delay: 0.15
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

            // Nav links stagger — clip-path reveal with blur
            const links = navLinksRef.current.filter(Boolean);
            if (links.length > 0 && !mobile) {
                tl.fromTo(
                    links,
                    {
                        y: -20,
                        opacity: 0,
                        filter: 'blur(8px)',
                        clipPath: 'inset(0 0 100% 0)',
                        willChange: 'transform, opacity, filter, clip-path',
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        clipPath: 'inset(0 0 0% 0)',
                        duration: getResponsiveDuration('medium'),
                        stagger: 0.08,
                        ease: EASE.expo,
                        clearProps: 'willChange,filter,clipPath',
                    },
                    '-=0.35'
                );
            }
        }, navRef);

        return () => ctx.revert();
    }, [preloaderComplete]);

    // Hide/show animation — translate only (no opacity), agency-grade eases
    useEffect(() => {
        if (!navRef.current) return;
        if (isVisible) {
            // Snap back down — expo.out feels like a spring release
            gsap.to(navRef.current, {
                y: 0,
                duration: 0.55,
                ease: "expo.out",
                overwrite: true,
            });
        } else {
            // Slide up and away — power4.in accelerates like a curtain pulling up
            gsap.to(navRef.current, {
                y: "-110%",
                duration: 0.38,
                ease: "power4.in",
                overwrite: true,
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
                        duration: 1.2, // Slightly longer
                        ease: "premium", // Agency custom ease
                    }
                );

                // 2. Links Stagger - Follow-through
                const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
                tl.fromTo(
                    links,
                    {
                        y: 80,
                        opacity: 0,
                        skewY: 8,
                        scale: 0.9,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        skewY: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.06,
                        ease: "premium",
                    },
                    "-=0.6"
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
                // Exit Animation - Anticipation squeeze then fly up
                const tl = gsap.timeline();

                // Links fly up first
                const links = mobileMenuRef.current.querySelectorAll('.mobile-nav-link');
                tl.to(links, {
                    y: -40,
                    opacity: 0,
                    skewY: -4,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: "power2.in"
                });

                tl.to(mobileMenuRef.current, {
                    clipPath: "inset(0 0 100% 0)",
                    duration: 0.8,
                    ease: "anticipation", // Anticipation ease
                }, "-=0.2");
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
