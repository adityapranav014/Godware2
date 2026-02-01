import { Landmark, Zap } from "lucide-react"
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../components/layout/Section";

gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const featureItems = sectionRef.current?.querySelectorAll(".about-feature");

        gsap.fromTo(
            headerRef.current,
            { y: 20, opacity: 0 },
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
            imageRef.current,
            { x: -20, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        );

        gsap.fromTo(
            contentRef.current,
            { x: 20, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        );

        if (featureItems?.length) {
            gsap.fromTo(
                featureItems,
                { y: 16, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 75%"
                    }
                }
            );
        }
    }, { scope: sectionRef });

    return (
        <Section background="dark" padding="large" sectionRef={sectionRef} className="text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 xl:px-0">

                {/* Header */}
                <div ref={headerRef} className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-4">
                    <div className="flex justify-center">
                        <span className="accent-pill font-manrope">
                            About
                            <span className="corner-dot corner-dot-tl" />
                            <span className="corner-dot corner-dot-tr" />
                            <span className="corner-dot corner-dot-bl" />
                            <span className="corner-dot corner-dot-br" />
                        </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl impact uppercase text-white mb-4 font-machina">
                        Our Story
                    </h2>
                    <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto font-manrope">
                        We're redefining athletic wear. Built for champions who demand excellence in every rep, every set, every day.
                    </p>
                </div>

                {/* Content */}
                <div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-6 items-center'>

                        {/* Left Image Col */}
                        <div ref={imageRef} className='relative h-[360px] sm:h-[440px] lg:h-[620px] bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.5)]'>

                            {/* Image Placeholder */}
                            <div className='size-full bg-[url(https://images.pexels.com/photos/29526382/pexels-photo-29526382.jpeg)]
                    bg-cover bg-center flex items-center justify-center
                    text-white/60 saturate-100'>
                            </div>
                        </div>

                        {/* Right Text Col */}
                        <div ref={contentRef} className='space-y-8 bg-subtle rounded-3xl text-ink
                h-full lg:col-span-2 flex flex-col justify-between p-6 sm:p-8 lg:p-14'>

                            {/* Heading */}
                            <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl impact text-accent font-machina
                    leading-tight mb-4 uppercase'>
                                We'Re changing <br />
                                The Way things <br />
                                Get Made
                            </h2>


                            {/* Two Small Feature Items */}
                            <div className='grid lg:grid-cols-2 gap-6 border-t border-accent pt-6'>

                                {/* Feature Item 1 */}
                                <div className='about-feature flex items-start space-x-3'>
                                    <div className='size-10 aspect-square flex items-center justify-center
                            rounded-full bg-ink p-2 flex-shrink-0'>
                                        <Zap size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-ink text-base sm:text-lg uppercase font-bold mb-1 font-manrope">
                                            SUSTAINABILITY
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted font-manrope">
                                            Working alongside international groups of  athletes,
                                            we create high-performance gym wear from premium materials.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Item 2 */}
                                <div className='about-feature flex items-start space-x-3'>
                                    <div className='size-10 aspect-square flex items-center justify-center
                            rounded-full bg-ink p-2 flex-shrink-0'>
                                        <Landmark size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-ink text-base sm:text-lg uppercase font-bold mb-1 font-manrope">
                                            MISSION
                                        </h3>
                                        <p className="text-sm sm:text-base text-muted font-manrope">
                                            We're on a mission to empower people to push their limits
                                            and achieve their fitness goals with confidence and style.
                                        </p>
                                    </div>
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
