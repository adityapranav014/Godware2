import { Landmark, Zap } from "lucide-react"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";
import Badge from "../components/ui/Badge";
import { Video } from '@imagekit/react';
import { EASE, DURATION, STAGGER, isMobile, getResponsiveDuration, getResponsiveStagger } from '../utils/animations';
import { aboutFeaturesData } from '../assets/data';

gsap.registerPlugin(ScrollTrigger);

// Icon map for about features
const iconMap = {
  Landmark,
  Zap
};

// Create features array with actual icon components
const features = aboutFeaturesData.map(feature => ({
  ...feature,
  icon: iconMap[feature.iconName]
}));

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
        <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">

                <div ref={headerRef} className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 space-y-6 sm:space-y-8">
                    <div ref={badgeRef}>
                        <Badge>About</Badge>
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
                    <div ref={imageRef} className="relative h-80 sm:h-96 lg:h-auto lg:min-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden depth-surface-recessed">
                        <div className="size-full bg-dark-900 flex items-center justify-center">
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
                    <div ref={contentRef} className="depth-card rounded-2xl sm:rounded-3xl lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8">

                        {/* Headline */}
                        <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-4xl font-display leading-tight font-bold uppercase text-white">
                            We're Changing <br />
                            The Way Things <br />
                            Get Made
                        </h2>

                        {/* Feature Cards - Mobile: Stack, Desktop: Grid */}
                        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 border-t border-dark-700 pt-6 sm:pt-8">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.title} className="about-feature flex items-start gap-3 sm:gap-4">
                                        <div className="shrink-0 size-10 sm:size-12 md:size-12 flex items-center justify-center rounded-full bg-dark-750 border border-dark-600"
                                            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.4)' }}>
                                            <Icon size={20} className="text-gold-500 md:w-6 md:h-6" strokeWidth={2.5} />
                                        </div>
                                        <div className="space-y-1 sm:space-y-2">
                                            <h3 className="text-sm md:text-xl uppercase font-bold font-sans text-white tracking-wide">
                                                {feature.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm font-sans text-dark-400 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default AboutUsSection
