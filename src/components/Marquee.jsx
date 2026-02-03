import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef } from "react";

const Marquee = ({
  items,
  className = "text-surface bg-black",
  icon = "mdi:star-four-points",
  iconClassName = "",
  reverse = false,
}) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const contentWidth = marquee.scrollWidth / 2;
    const duration = Math.max(contentWidth / 60, 14);

    marquee.style.setProperty("--marquee-duration", `${duration}s`);
  }, [items]);

  return (
    <div className={`relative overflow-hidden marquee-mask ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink via-ink/50 to-transparent opacity-90 blur-[30px]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink via-ink/50 to-transparent opacity-90 blur-[30px]" />

      <div className="overflow-hidden w-full h-20 md:h-24 lg:h-28 flex items-center marquee-text-responsive font-light uppercase whitespace-nowrap">
        <div
          ref={marqueeRef}
          className={`flex ${reverse ? "marquee-reverse" : "marquee"}`}
        >
          {items.concat(items).map((text, index) => (
            <span key={index} className="flex items-center px-16 md:px-20 gap-x-32 md:gap-x-40">
              {text} <Icon icon={icon} className={iconClassName} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
