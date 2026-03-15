/**
 * SEOHomepageCopy — FAQ Accordion
 *
 * Crawlable, keyword-rich FAQ section for Google indexability.
 * 300+ words | 12+ internal links | Multiple H2s | Accordion layout
 * Title keywords: compression, t-shirts, athletes, India, GOD WEAR
 *
 * Section IDs linked: #Home | #Shop | #comparison | #testimonials | #About | #cta | #Contact
 */

import { useState, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import Section from '../components/layout/Section';
import Badge from '../components/ui/Badge';
import { EASE, getResponsiveDuration, isMobile } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const linkClass =
    'text-gold-500 underline underline-offset-4 decoration-gold-500/40 hover:decoration-gold-500 hover:text-gold-400 transition-colors duration-300';

const faqItems = [
    {
        question: "What is GOD WEAR®?",
        answer: (
            <>
                <p className="mb-4">
                    GOD WEAR® is India&apos;s leading{' '}
                    <a href="#Shop" className={linkClass}>compression t-shirt</a>{' '}
                    brand, built for athletes who train without limits. Every compression t-shirt
                    we create is engineered to feel like your second layer of skin, locking muscles
                    in place, reducing fatigue, and wicking sweat away the moment it forms.
                </p>
                <p>
                    Whether you are a bodybuilder, crossfit athlete, runner, or cricket player, our
                    compression t-shirts deliver the performance edge you need to push harder, recover
                    faster, and train with total confidence across India.
                </p>
            </>
        ),
    },
    {
        question: "Why Do Athletes Across India Choose GOD WEAR?",
        answer: (
            <>
                <p className="mb-4">
                    Our compression t-shirts are precision-engineered with 4-way stretch fabric that
                    adapts to every movement, from heavy deadlifts to explosive sprints. The advanced
                    moisture-wicking technology keeps athletes dry and focused through even the toughest
                    training sessions. Unlike ordinary gym t-shirts, GOD WEAR{' '}
                    <a href="#comparison" className={linkClass}>compression tees provide targeted muscle support</a>{' '}
                    that reduces vibration and improves blood circulation during high-intensity workouts.
                </p>
                <p>
                    Discover why{' '}
                    <a href="#testimonials" className={linkClass}>10,000+ athletes across India</a>{' '}
                    trust GOD WEAR for their daily training. From the gym floor to outdoor training
                    grounds, our compression t-shirts stay locked in through every rep, every set,
                    and every personal best, making them the ultimate second layer of skin for
                    serious athletes.
                </p>
            </>
        ),
    },
    {
        question: "What Makes Our Compression T-Shirts Different?",
        answer: (
            <>
                <p className="mb-4">
                    Every GOD WEAR compression t-shirt is rigorously tested by professional athletes
                    across cardio, strength, and combat disciplines. Our fabric technology combines
                    breathable mesh panels with reinforced compression zones to deliver a fit that
                    sculpts the upper body while maintaining full range of motion. The flatlock
                    stitching eliminates chafing during long training sessions, and the quick-dry
                    finish means your compression tee is ready for back-to-back workouts.
                </p>
                <p>
                    Learn more about{' '}
                    <a href="#About" className={linkClass}>our story and mission</a>{' '}
                    to understand why we built GOD WEAR, a compression t-shirt brand born from
                    discipline, designed in India, and trusted by athletes who refuse to settle
                    for ordinary training gear.
                </p>
            </>
        ),
    },
    {
        question: "How Can I Shop & Get Free Shipping Across India?",
        answer: (
            <>
                <p className="mb-4">
                    With a 4.5★ average rating, free shipping pan-India, and up to 69% off, GOD WEAR
                    is the compression t-shirt brand that athletes trust when performance is
                    non-negotiable. Browse our{' '}
                    <a href="#Shop" className={linkClass}>full compression t-shirt range</a>,{' '}
                    check out our{' '}
                    <a href="#comparison" className={linkClass}>performance feature comparison</a>,{' '}
                    or{' '}
                    <a href="#Contact" className={linkClass}>get in touch</a>{' '}
                    with our team for sizing help.
                </p>
                <p>
                    Ready to upgrade your training?{' '}
                    <a href="#cta" className={linkClass}>Shop now</a>{' '}
                    and experience compression t-shirts that thousands of Indian athletes call
                    their second layer of skin.
                </p>
            </>
        ),
    },
];

/* ── Accordion Item ─────────────────────────────── */
const AccordionItem = ({ item, index, isOpen, onToggle }) => (
    <div
        className="faq-item group"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
    >
        {/* Question Row */}
        <button
            onClick={onToggle}
            className="w-full flex items-center gap-5 sm:gap-7 py-6 sm:py-7 lg:py-8 text-left cursor-pointer"
            aria-expanded={isOpen}
        >
            {/* Numbered index */}
            <span
                className="editorial-label-gold shrink-0 tabular-nums select-none"
                style={{ minWidth: '1.75rem' }}
            >
                0{index + 1}
            </span>

            {/* Question */}
            <h2 className="flex-1 font-display font-semibold text-base sm:text-lg lg:text-xl xl:text-2xl text-white/90 uppercase tracking-tight group-hover:text-gold-400 transition-colors duration-300 leading-snug">
                {item.question}
            </h2>

            {/* Chevron toggle */}
            <div
                className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-500 ${isOpen
                    ? 'bg-gold-500/10 border-gold-500/25 rotate-180'
                    : 'border-dark-700 group-hover:border-dark-500'
                    }`}
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
                <ChevronDown
                    className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-gold-500' : 'text-white/40'
                        }`}
                    strokeWidth={1.5}
                />
            </div>
        </button>

        {/* Collapsible Answer — CSS grid-rows trick for smooth height */}
        <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
            <div className="overflow-hidden min-h-0">
                <div className="pl-12 sm:pl-14 pr-14 pb-7 sm:pb-8 lg:pb-10">
                    <div className="section-body leading-relaxed">
                        {item.answer}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

/* ── Main Section ───────────────────────────────── */
const SEOHomepageCopy = () => {
    const [openIndex, setOpenIndex] = useState(0); // first item open by default
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const headerRef = useRef(null);
    const listRef = useRef(null);

    const handleToggle = useCallback(
        (index) => setOpenIndex((prev) => (prev === index ? -1 : index)),
        []
    );

    /* ── GSAP Entrance Animations ─── */
    useGSAP(() => {
        if (!sectionRef.current) return;

        const mobile = isMobile();
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: mobile ? 'top 85%' : 'top 75%',
                once: true,
            },
        });

        // Badge
        tl.fromTo(
            badgeRef.current,
            { scale: 0.85, opacity: 0, y: -15, willChange: 'transform, opacity' },
            {
                scale: 1, opacity: 1, y: 0,
                duration: getResponsiveDuration('medium'),
                ease: EASE.backGentle,
                clearProps: 'willChange',
            }
        );

        // Header
        tl.fromTo(
            headerRef.current,
            {
                y: mobile ? 30 : 40, opacity: 0,
                filter: mobile ? 'blur(5px)' : 'blur(8px)',
                willChange: 'transform, opacity, filter',
            },
            {
                y: 0, opacity: 1, filter: 'blur(0px)',
                duration: getResponsiveDuration('medium'),
                ease: EASE.circ,
                clearProps: 'willChange',
            },
            '-=0.25'
        );

        // Staggered accordion items
        if (listRef.current) {
            // Pre-hide chevron icon strokes before items fade in
            const chevronPaths = [];
            [...listRef.current.querySelectorAll('svg')].forEach(svg => {
                const paths = [...svg.querySelectorAll('path, line, circle, polyline, polygon, rect')];
                paths.forEach(path => {
                    const len = path.getTotalLength ? path.getTotalLength() : 60;
                    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
                });
                chevronPaths.push(...paths);
            });

            tl.fromTo(
                listRef.current.children,
                { y: mobile ? 20 : 30, opacity: 0, willChange: 'transform, opacity' },
                {
                    y: 0, opacity: 1,
                    duration: getResponsiveDuration('normal'),
                    stagger: 0.1,
                    ease: EASE.circ,
                    clearProps: 'willChange',
                },
                '-=0.3'
            );

            // Dedicated ScrollTrigger — delay fires the draw after accordion items
            // are partially visible. Same trigger as section, matching ComparisonSection pattern.
            if (chevronPaths.length) {
                gsap.to(chevronPaths, {
                    strokeDashoffset: 0,
                    duration: 0.8,
                    stagger: 0.07,
                    ease: 'power2.inOut',
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: mobile ? 'top 85%' : 'top 75%',
                        once: true,
                    },
                });
            }
        }
    }, { scope: sectionRef });

    return (
        <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white">
            <div className="max-w-4xl mx-auto">

                {/* ── Header ── */}
                <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 space-y-6 sm:space-y-8">
                    <div ref={badgeRef}>
                        <Badge>FAQ</Badge>
                    </div>
                    <div ref={headerRef} className="text-center">
                        <h2 className="font-display uppercase text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-5">
                            Frequently Asked
                        </h2>
                        <p className="section-body max-w-2xl mx-auto">
                            Everything you need to know about GOD WEAR compression t-shirts, from fabric technology to shipping across India.
                        </p>
                    </div>
                </div>

                {/* ── Accordion List ── */}
                <div ref={listRef} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
                            index={index}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </div>

            </div>
        </Section>
    );
};

export default SEOHomepageCopy;
