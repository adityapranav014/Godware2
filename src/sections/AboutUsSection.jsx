import { Landmark, Zap } from "lucide-react"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";
import TextReveal from "../components/ui/TextReveal";
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
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const mobile = isMobile();
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: mobile ? "top 85%" : "top 75%",
                once: true,
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

        // Image reveal with diagonal clip-path wipe
        if (imageRef.current) {
            tl.fromTo(
                imageRef.current,
                {
                    clipPath: mobile ? 'inset(100% 0 0 0)' : 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                    opacity: 0.3,
                    scale: 1.08,
                    willChange: 'clip-path, opacity, transform',
                },
                {
                    clipPath: mobile ? 'inset(0% 0 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                    opacity: 1,
                    scale: 1,
                    duration: getResponsiveDuration('slower'),
                    ease: EASE.expo,
                    clearProps: 'willChange',
                },
                '-=0.3'
            );

            // Parallax scroll-scrubbed scale on video
            if (!mobile) {
                ScrollTrigger.create({
                    trigger: imageRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 2,
                    onUpdate: (self) => {
                        const video = imageRef.current?.querySelector('video');
                        if (video) {
                            const scale = 1 + (self.progress * 0.08);
                            gsap.set(video, {
                                y: -30 * self.progress,
                                scale: scale,
                            });
                        }
                    }
                });
            }
        }

        // Content card reveal
        tl.fromTo(
            contentRef.current,
            {
                y: mobile ? 30 : 50,
                opacity: 0,
                scale: 0.96,
                filter: mobile ? 'blur(4px)' : 'blur(8px)',
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
            '-=0.5'
        );

        // Feature items stagger - smooth cascade
        const featureItems = sectionRef.current?.querySelectorAll(".about-feature");
        if (featureItems?.length) {
            tl.fromTo(
                featureItems,
                {
                    y: mobile ? 20 : 35,
                    opacity: 0,
                    x: -10,
                    willChange: 'transform, opacity',
                },
                {
                    y: 0,
                    opacity: 1,
                    x: 0,
                    duration: getResponsiveDuration('normal'),
                    stagger: getResponsiveStagger('medium'),
                    ease: EASE.circ,
                    clearProps: 'willChange',
                },
                '-=0.4'
            );

            // Feature hover effects with SVG icon line-draw - desktop only
            if (!mobile) {
                featureItems.forEach((item) => {
                    const iconEl = item.querySelector('svg');

                    item.addEventListener('mouseenter', () => {
                        gsap.to(item, {
                            scale: 1.02,
                            y: -3,
                            x: 5,
                            duration: getResponsiveDuration('fast'),
                            ease: EASE.circ,
                        });

                        // SVG icon re-draw effect on hover
                        if (iconEl) {
                            const paths = iconEl.querySelectorAll('path, line, circle, polyline');
                            paths.forEach(path => {
                                const length = path.getTotalLength ? path.getTotalLength() : 60;
                                gsap.fromTo(path, {
                                    strokeDasharray: length,
                                    strokeDashoffset: length,
                                }, {
                                    strokeDashoffset: 0,
                                    duration: 0.6,
                                    ease: 'power2.inOut',
                                });
                            });
                        }
                    });

                    item.addEventListener('mouseleave', () => {
                        gsap.to(item, {
                            scale: 1,
                            y: 0,
                            x: 0,
                            duration: getResponsiveDuration('fast'),
                            ease: EASE.circ,
                        });
                    });
                });
            }
        }

    }, { scope: sectionRef });

    return (
        <Section background="dark" padding="large" sectionRef={sectionRef} className="bg-dark-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">

                <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-14 space-y-4 sm:space-y-6">
                    <div ref={badgeRef} className="flex flex-col gap-4">
                        <span className="section-tag">About</span>
                        <div className="section-header-row">
                            <TextReveal
                                as="h2"
                                variant="slideUp"
                                splitBy="words"
                                trigger="top 82%"
                                stagger={0.06}
                                duration={0.9}
                                className="text-section-xl font-display uppercase font-bold leading-none text-white"
                            >
                                Built for Warriors
                            </TextReveal>
                            <p className="text-white/60 font-sans text-sm leading-relaxed pb-1">
                                Born from discipline and driven by performance. God Wear delivers premium compression that moves as relentlessly as you do.
                            </p>
                        </div>
                        <div className="accent-rule-long mt-2" />
                    </div>
                </div>

                {/* Content - Mobile: Stack, Desktop: Side-by-side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-stretch">

                    {/* Video/Image — Clip-path wipe reveal */}
                    <div ref={imageRef} className="relative h-80 sm:h-96 lg:h-auto lg:min-h-140 rounded-2xl sm:rounded-3xl overflow-hidden depth-surface-recessed">
                        <div className="size-full bg-dark-900 flex items-center justify-center overflow-hidden">
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
                    <div ref={contentRef} className="relative overflow-hidden depth-card rounded-2xl sm:rounded-3xl lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 lg:p-12 space-y-6 sm:space-y-8 group">

                        {/* Headline */}
                        <TextReveal
                            as="h2"
                            variant="wordSlide"
                            splitBy="words"
                            trigger="top 80%"
                            stagger={0.06}
                            duration={0.8}
                            className="relative z-10 text-section-lg font-display leading-none font-bold uppercase text-white"
                        >
                            We're Changing The Way Things Get Made
                        </TextReveal>

                        {/* Features — numbered editorial list */}
                        <div className="relative z-10 grid gap-5 sm:gap-7 lg:grid-cols-2 border-t border-dark-700 pt-6 sm:pt-8">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={feature.title} className="about-feature flex items-start gap-4 transition-all duration-300">
                                        <div className="shrink-0 flex flex-col items-center gap-2 pt-0.5">
                                            <span className="feature-num">{String(idx + 1).padStart(2, '0')}</span>
                                            <div className="w-px h-8 bg-gold-500/20" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h3 className="text-sm uppercase font-bold font-sans text-white tracking-wide">
                                                {feature.title}
                                            </h3>
                                            <p className="section-muted leading-relaxed">
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
