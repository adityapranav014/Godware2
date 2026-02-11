import { Star, Truck, Users, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
    { icon: Users, value: "10,000", suffix: "+", label: "Athletes", highlight: false },
    { icon: Star, value: "4.5", suffix: "★", label: "Avg Rating", highlight: true },
    { icon: Truck, value: "Free", suffix: "", label: "Shipping", highlight: false, isText: true },
    { icon: Zap, value: "69", suffix: "%", label: "Off Sale", highlight: true },
];

const AnimatedNumber = ({ value, suffix, isText, highlight }) => {
    const numRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useGSAP(() => {
        if (!numRef.current || isText) return;

        // Parse numeric value (handles commas)
        const numericValue = parseFloat(value.replace(/,/g, ''));
        const hasDecimal = value.includes('.');

        ScrollTrigger.create({
            trigger: numRef.current,
            start: 'top 90%',
            once: true,
            onEnter: () => {
                setHasAnimated(true);
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: numericValue,
                    duration: 1.8,
                    ease: 'power2.out',
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

    return <span ref={numRef}>0{suffix}</span>;
};

const StatsBar = () => {
    const barRef = useRef(null);

    return (
        <div ref={barRef} className="w-full py-5 sm:py-6 md:py-8 bg-dark-950 border-y border-white/5"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), inset 0 -1px 0 rgba(255,255,255,0.03)' }}>
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 place-items-center">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 justify-start sm:justify-center w-full max-w-[160px]"
                            >
                                <div className={`p-2 rounded-xl ${stat.highlight ? 'bg-gold-500/10 border border-gold-500/20' : 'bg-white/5 border border-white/5'} transition-colors duration-300`}>
                                    <Icon
                                        size={18}
                                        className={stat.highlight ? 'text-gold-500' : 'text-white/50'}
                                        strokeWidth={2}
                                    />
                                </div>
                                <div>
                                    <p className={`text-lg sm:text-xl font-bold font-display tabular-nums ${stat.highlight ? 'text-gold-400' : 'text-white'}`}>
                                        <AnimatedNumber
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            isText={stat.isText}
                                            highlight={stat.highlight}
                                        />
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-dark-400 font-sans uppercase tracking-wider">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StatsBar;
