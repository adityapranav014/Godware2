import React from 'react';

const Badge = ({ children, className = "" }) => {
    return (
        <div className={`flex ${className}`}>
            <span className="editorial-pill animate-[fadeInScale_0.6s_ease-out]">
                <span className="relative h-1 w-1 shrink-0">
                    <span className="absolute inset-0 rounded-full bg-gold-500 animate-ping opacity-60" />
                    <span className="relative block h-1 w-1 rounded-full bg-gold-500" />
                </span>
                {children}
            </span>
        </div>
    );
};

export default Badge;
