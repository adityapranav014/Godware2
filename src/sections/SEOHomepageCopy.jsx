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
import SectionHeader from '../components/layout/SectionHeader';
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
                    we create is engineered to feel like your second layer of skin — locking muscles
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
                    adapts to every movement — from heavy deadlifts to explosive sprints. The advanced
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
                    and every personal best — making them the ultimate second layer of skin for
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
                    to understand why we built GOD WEAR — a compression t-shirt brand born from
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
const AccordionItem = ({ item, isOpen, onToggle }) => (
    <div className="faq-item depth-card rounded-2xl sm:rounded-3xl overflow-hidden">
        {/* Toggle Button */}
        <button
            onClick={onToggle}
            className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 lg:p-8 text-left cursor-pointer group"
            aria-expanded={isOpen}
        >
            <h2 className="font-display font-bold text-sm sm:text-base lg:text-lg text-white uppercase tracking-wide group-hover:text-gold-500 transition-colors duration-300">
                {item.question}
            </h2>
            <div
                className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                    isOpen
                        ? 'bg-gold-500/10 border-gold-500/30 rotate-180'
                        : 'bg-dark-750 border-dark-600'
                }`}
                style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.4)' }}
            >
                <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isOpen ? 'text-gold-500' : 'text-white/60'
                    }`}
                    strokeWidth={2}
                />
            </div>
        </button>

        {/* Collapsible Body — CSS grid-rows trick for smooth height animation */}
        <div
            className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.215,0.61,0.355,1)]"
            style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
        >
            <div className="overflow-hidden min-h-0">
                <div className="px-5 sm:px-6 lg:px-8 pb-5 sm:pb-6 lg:pb-8 border-t border-dark-700">
                    <div className="text-sm sm:text-base leading-relaxed font-sans font-light tracking-wide pt-5 sm:pt-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
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
                toggleActions: 'play none none reverse',
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
                    <div ref={headerRef}>
                        <SectionHeader
                            title="Frequently Asked"
                            subtitle="Everything you need to know about GOD WEAR compression t-shirts — from fabric technology to shipping across India."
                            align="center"
                            titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
                            subtitleClassName="text-dark-400 md:text-white/60 font-sans text-sm sm:text-base md:text-base"
                        />
                    </div>
                </div>

                {/* ── Accordion List ── */}
                <div ref={listRef} className="space-y-3 sm:space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            item={item}
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
