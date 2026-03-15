import { Star, Truck, Users, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { statsData } from '../../assets/data';

gsap.registerPlugin(ScrollTrigger);

// Icon map for stats
const iconMap = {
    Users,
    Star,
    Truck,
    Zap
};

// Create stats array with actual icon components
const stats = statsData.map(stat => ({
    ...stat,
    icon: iconMap[stat.iconName]
}));

const AnimatedNumber = ({ value, suffix, isText, highlight }) => {
    const numRef = useRef(null);

    useGSAP(() => {
        if (!numRef.current || isText) return;

        const numericValue = parseFloat(value.replace(/,/g, ''));
        const hasDecimal = value.includes('.');

        ScrollTrigger.create({
            trigger: numRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: numericValue,
                    duration: 2.0,
                    ease: 'elastic.out(1, 0.75)',
                    onUpdate: () => {
                        if (numRef.current) {
                            if (hasDecimal) {
                                numRef.current.textContent = obj.val.toFixed(1) + suffix;
                            } else {
                                numRef.current.textContent = Math.round(obj.val).toLocaleString() + suffix;
                            }
                        }
                    }
                });
            }
        });
    }, [value, suffix, isText]);

    if (isText) {
        return <span ref={numRef}>{value}</span>;
    }

    // Compute the final display string so the ghost can reserve its exact width
    const numericValue = parseFloat(value.replace(/,/g, ''));
    const hasDecimal = value.includes('.');
    const finalDisplay = (hasDecimal ? numericValue.toFixed(1) : numericValue.toLocaleString()) + suffix;

    // inline-grid stacks both spans in the same cell.
    // The invisible ghost always holds the widest (final) string → no layout shift.
    // The visible span animates on top.
    return (
        <span className="inline-grid">
            <span ref={numRef} style={{ gridArea: '1/1' }}>0{suffix}</span>
            <span style={{ gridArea: '1/1', visibility: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
                {finalDisplay}
            </span>
        </span>
    );
};

const StatsBar = () => {
    const barRef = useRef(null);

    useGSAP(() => {
        if (!barRef.current) return;

        const items = barRef.current.querySelectorAll('.stat-item');
        gsap.fromTo(
            items,
            {
                y: 25,
                opacity: 0,
                filter: 'blur(6px)',
            },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.7,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: barRef.current,
                    start: 'top 90%',
                    once: true,
                },
            }
        );
    }, []);

    return (
        <div ref={barRef} className="w-full py-8 sm:py-10 md:py-12 bg-dark-950"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                {/* Editorial stats row: pure typographic — no icons, just numbers + labels */}
                <div className="flex items-center justify-center">
                    {stats.map((stat, idx) => (
                        <div key={stat.label} className="flex items-stretch">
                            <div
                                className="stat-item stat-editorial px-2 xs:px-4 sm:px-7 md:px-10 lg:px-14"
                                style={{ opacity: 0 }}
                            >
                                <p className={`stat-editorial-num tabular-nums ${stat.highlight ? 'gold' : ''}`}>
                                    <AnimatedNumber
                                        value={stat.value}
                                        suffix={stat.suffix}
                                        isText={stat.isText}
                                        highlight={stat.highlight}
                                    />
                                </p>
                                <span className="stat-editorial-label">{stat.label}</span>
                            </div>
                            {idx < stats.length - 1 && (
                                <div className="self-center w-px h-7 bg-white/6 shrink-0" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
