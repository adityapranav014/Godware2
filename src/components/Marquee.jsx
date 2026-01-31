import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";

const Marquee = ({
  items,
  className = "text-surface bg-ink",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Calculate animation duration based on content width
    const contentWidth = marquee.scrollWidth / 2; // Divide by 2 since we duplicate items
    const duration = contentWidth / 50; // 50px per second for smooth scrolling

    // Set CSS custom property for animation duration
    marquee.style.setProperty('--marquee-duration', `${duration}s`);
  }, [items]);

  return (
    <div
      className={`overflow-hidden w-full h-20 md:h-[100px] flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap ${className}`}
    >
      <div
        ref={marqueeRef}
        className={`flex ${reverse ? 'marquee-reverse' : 'marquee'}`}
        style={{
          animationDuration: 'var(--marquee-duration, 40s)'
        }}
      >
        {/* Duplicate items for seamless loop */}
        {items.concat(items).map((text, index) => (
          <span
            key={index}
            className="flex items-center px-16 gap-x-32"
          >
            {text} <Icon icon={icon} className={iconClassName} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
