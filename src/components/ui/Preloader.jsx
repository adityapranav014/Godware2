import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const logoWrapRef = useRef(null);
  const shineRef = useRef(null);
  const brandRef = useRef(null);
  const lineRef = useRef(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const overlay = overlayRef.current;
    const counter = counterRef.current;
    const logoWrap = logoWrapRef.current;
    const shine = shineRef.current;
    const brand = brandRef.current;
    const line = lineRef.current;

    if (!overlay || !counter || !logoWrap || !brand) return;

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // ── Logo entrance: scale up from slight reduction with blur
    tl.fromTo(
      logoWrap,
      { opacity: 0, scale: 0.82, filter: 'blur(14px)' },
      { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
      0
    );

    // ── Shine sweep — premium agency technique:
    //    a 45° white-gold gradient bar slides diagonally across the logo once,
    //    positioned with `overflow:hidden` on the parent so it clips cleanly.
    if (shine) {
      tl.fromTo(
        shine,
        { x: '-110%', skewX: -18 },
        { x: '220%', skewX: -18, duration: 0.75, ease: 'power2.inOut' },
        0.55   // starts just as logo fully appears
      );
    }

    // ── Progress line grows left→right in sync with counter
    if (line) {
      tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0);
    }

    // ── Counter 0 → 100
    const counterObj = { val: 0 };
    tl.to(counterObj, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counter) counter.textContent = Math.round(counterObj.val);
      },
    }, 0);

    // ── Brand tagline fades in slightly after logo
    tl.fromTo(
      brand,
      { opacity: 0, y: 16, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
      0.4
    );

    // ── Second shine sweep at ~70% progress — keeps it feeling alive
    if (shine) {
      tl.fromTo(
        shine,
        { x: '-110%', skewX: -18 },
        { x: '220%', skewX: -18, duration: 0.65, ease: 'power2.inOut' },
        1.4
      );
    }

    // ── Hold at 100
    tl.to({}, { duration: 0.22 });

    // ── Elastic pop on counter number — lands the moment
    tl.to(counter, { scale: 1.07, duration: 0.16, ease: 'power2.out' });
    tl.to(counter, { scale: 1, duration: 0.35, ease: 'elastic.out(1.8, 0.5)' });

    // ── Fire hero NOW — curtain rises while hero bursts in underneath (agency overlap)
    tl.call(() => onComplete?.());
    tl.to({}, { duration: 0.12 });

    // ── Curtain wipe up — decisive power4 snap
    tl.to(overlay, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.65,
      ease: 'power4.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(overlay, { display: 'none' });
        setIsDone(true);
      },
    });

    // ── Contents glide upward as the curtain rises — creates depth
    tl.to(
      [counter, brand, line, logoWrap].filter(Boolean),
      { y: -28, opacity: 0, duration: 0.45, ease: 'power3.in', stagger: 0.025 },
      '<'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-10000 flex flex-col items-center justify-center bg-black select-none"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      {/* ── Logo with shine overlay ── */}
      <div
        ref={logoWrapRef}
        className="relative mb-8 overflow-hidden rounded-xl"
        style={{ opacity: 0 }}
      >
        {/* Logo image — sized generously for cinematic presence */}
        <img
          src={`${import.meta.env.BASE_URL}images/logo.webp`}
          alt="GOD WEAR"
          className="h-24 sm:h-28 w-auto object-contain relative z-10"
          style={{
            filter: 'drop-shadow(0 0 28px rgba(201,139,58,0.45)) drop-shadow(0 0 8px rgba(201,139,58,0.25))',
          }}
          draggable={false}
        />

        {/* Shine sweep bar — clipped by parent overflow:hidden */}
        <div
          ref={shineRef}
          className="pointer-events-none absolute inset-y-0 z-20"
          style={{
            left: 0,
            width: '50%',
            background:
              'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.55) 50%, rgba(201,139,58,0.25) 60%, transparent 80%)',
            transform: 'translateX(-110%) skewX(-18deg)',
          }}
        />
      </div>

      {/* ── Brand tagline ── */}
      <div ref={brandRef} className="text-center mb-7" style={{ opacity: 0 }}>
        <p className="text-[10px] tracking-[0.55em] text-gold-500/55 uppercase font-sans">
          Second Layer of Skin
        </p>
      </div>

      {/* ── Progress line ── */}
      <div className="relative w-44 h-px bg-white/8 mb-4 overflow-hidden">
        <div
          ref={lineRef}
          className="absolute inset-0 origin-left"
          style={{
            background: 'linear-gradient(90deg, transparent, #c98b3a 40%, #e8b86d 60%, transparent)',
            transform: 'scaleX(0)',
          }}
        />
      </div>

      {/* ── Counter ── */}
      <div className="flex items-baseline gap-1">
        <span
          ref={counterRef}
          className="text-5xl sm:text-6xl font-display font-light text-white/75 tabular-nums"
        >
          0
        </span>
        <span className="text-xs text-white/25 font-sans tracking-widest">%</span>
      </div>
    </div>
  );
};

export default Preloader;
