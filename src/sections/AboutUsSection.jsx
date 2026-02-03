import { Landmark, Zap } from "lucide-react"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import { Video } from '@imagekit/react';
import { EASE, DURATION, STAGGER, isMobile, getResponsiveDuration, getResponsiveStagger } from '../utils/animations';

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const headerRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const mobile = isMobile();
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: mobile ? "top 85%" : "top 75%",
                toggleActions: 'play none none reverse',
            }
        });

        // Badge entrance - smooth
        tl.fromTo(
            badgeRef.current,
            { scale: 0.85, opacity: 0, y: -15, willChange: 'transform, opacity' },
            {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: getResponsiveDuration('medium'),
                ease: EASE.backGentle,
                clearProps: 'willChange',
            }
        );

        // Header entrance - silky smooth
        tl.fromTo(
            headerRef.current,
            { 
                y: mobile ? 30 : 40, 
                opacity: 0, 
                filter: mobile ? 'blur(5px)' : 'blur(8px)',
                willChange: 'transform, opacity, filter',
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: getResponsiveDuration('medium'),
                ease: EASE.circ,
                clearProps: 'willChange',
            },
            '-=0.25'
        );

        // Image reveal with premium scale and blur
        tl.fromTo(
            imageRef.current,
            { 
                y: mobile ? 30 : 40, 
                opacity: 0,
                scale: 0.96,
                filter: mobile ? 'blur(6px)' : 'blur(10px)',
                willChange: 'transform, opacity, filter',
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: getResponsiveDuration('slow'),
                ease: EASE.expo,
                clearProps: 'willChange',
            },
            '-=0.15'
        );

        // Content reveal - synchronized
        tl.fromTo(
            contentRef.current,
            { 
                y: mobile ? 30 : 40, 
                opacity: 0,
                scale: 0.96,
                filter: mobile ? 'blur(6px)' : 'blur(10px)',
                willChange: 'transform, opacity, filter',
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: getResponsiveDuration('slow'),
                ease: EASE.expo,
                clearProps: 'willChange',
            },
            '<'
        );

        // Feature items stagger - smooth cascade
        const featureItems = sectionRef.current?.querySelectorAll(".about-feature");
        if (featureItems?.length) {
            tl.fromTo(
                featureItems,
                { 
                    y: mobile ? 20 : 30, 
                    opacity: 0,
                    willChange: 'transform, opacity',
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: getResponsiveDuration('normal'),
                    stagger: getResponsiveStagger('normal'),
                    ease: EASE.circ,
                    clearProps: 'willChange',
                },
                '-=0.5'
            );

            // Feature hover effects - desktop only
            if (!mobile) {
                featureItems.forEach((item) => {
                    item.addEventListener('mouseenter', () => {
                        gsap.to(item, {
                            scale: 1.015,
                            y: -2,
                            duration: getResponsiveDuration('fast'),
                            ease: EASE.circ,
                        });
                    });

                    item.addEventListener('mouseleave', () => {
                        gsap.to(item, {
                            scale: 1,
                            y: 0,
                            duration: getResponsiveDuration('fast'),
                            ease: EASE.circ,
                        });
                    });
                });
            }
        }

        // Parallax effect on image - subtle on mobile
        if (!mobile) {
            ScrollTrigger.create({
                trigger: imageRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
                onUpdate: (self) => {
                    const video = imageRef.current?.querySelector('video');
                    if (video) {
                        gsap.to(video, {
                            y: -25 * self.progress,
                            duration: 0,
                        });
                    }
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">

                {/* Header */}
                <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 space-y-6 sm:space-y-8">
                    <div ref={badgeRef} className="flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-xs sm:text-sm uppercase tracking-widest font-semibold">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                            About
                        </span>
                    </div>
                    <SectionHeader
                        title="Built for Warriors"
                        subtitle="Born from discipline and driven by performance. God Wear delivers premium athletic wear that moves as relentlessly as you do."
                        align="center"
                        titleClassName="text-white font-display text-2xl sm:text-3xl md:text-xl lg:text-2xl xl:text-3xl font-bold"
                        subtitleClassName="text-dark-400 md:text-white/80 font-sans text-sm sm:text-base md:text-base"
                    />
                </div>

                {/* Content - Mobile: Stack, Desktop: Side-by-side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-stretch">

                    {/* Video/Image - Mobile First */}
                    <div ref={imageRef} className="relative h-80 sm:h-96 lg:h-auto lg:min-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden border border-dark-700 shadow-2xl shadow-dark-900/50">
                        <div className="size-full bg-dark-800 flex items-center justify-center">
                            <Video
                                urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
                                src="/video/video-tag-line.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Subtle gold accent border */}
                        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-gold-500/10 pointer-events-none" />
                    </div>

                    {/* Content Card */}
                    <div ref={contentRef} className="bg-dark-800 border border-dark-700 rounded-2xl sm:rounded-3xl lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-display leading-tight font-bold uppercase text-white">
                            We're Changing <br />
                            The Way Things <br />
                            Get Made
                        </h2>

                        {/* Feature Cards - Mobile: Stack, Desktop: Grid */}
                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 border-t border-dark-700 pt-6 sm:pt-8">

                            {/* Feature 1 */}
                            <div className="about-feature flex items-start gap-3 sm:gap-4">
                                <div className="shrink-0 size-10 sm:size-12 md:size-12 flex items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20">
                                    <Zap size={20} className="text-gold-500 md:w-6 md:h-6" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <h3 className="text-sm sm:text-base md:text-xl uppercase font-bold font-sans text-white tracking-wide">
                                        Sustainability
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base font-sans text-dark-400 md:text-white/80 leading-relaxed">
                                        Working alongside international groups of athletes, we create high-performance gym wear from premium materials.
                                    </p>
                                </div>
                            </div>

                            {/* Feature 2 */}
                            <div className="about-feature flex items-start gap-3 sm:gap-4">
                                <div className="shrink-0 size-10 sm:size-12 md:size-12 flex items-center justify-center rounded-full bg-gold-500/10 border border-gold-500/20">
                                    <Landmark size={20} className="text-gold-500 md:w-6 md:h-6" strokeWidth={2.5} />
                                </div>
                                <div className="space-y-1 sm:space-y-2">
                                    <h3 className="text-sm sm:text-base md:text-xl uppercase font-bold font-sans text-white tracking-wide">
                                        Mission
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base font-sans text-dark-400 md:text-white/80 leading-relaxed">
                                        We're on a mission to empower people to push their limits and achieve their fitness goals with confidence and style.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default AboutUsSection
