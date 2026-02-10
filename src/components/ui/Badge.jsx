import React from 'react';

const Badge = ({ children, className = "" }) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-gold-400 text-xs sm:text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-sm depth-glow animate-[fadeInScale_0.6s_ease-out]"
                style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))' }}>
                <span className="relative h-1.5 w-1.5 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-75" />
                    <span className="relative block h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_10px_#c98b3a]" />
                </span>
                {children}
            </span>
        </div>
    );
};

export default Badge;
