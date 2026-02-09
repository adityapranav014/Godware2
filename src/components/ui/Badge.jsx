import React from 'react';

const Badge = ({ children, className = "" }) => {
    return (
        <div className={`flex justify-center ${className}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill text-gold-400 text-xs sm:text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-sm border border-gold-500/20 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500 shadow-[0_0_10px_#c98b3a] shrink-0" />
                {children}
            </span>
        </div>
    );
};

export default Badge;
