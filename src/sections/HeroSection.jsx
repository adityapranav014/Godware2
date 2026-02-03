import { Video } from '@imagekit/react';

const HeroSection = ({ onShopClick }) => {
  return (
    <div className="relative bg-dark-900 text-white min-h-dvh overflow-hidden flex items-center justify-center">
      {/* Background - Subtle */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <img
          className="block md:hidden brightness-75 scale-125 h-full w-full object-cover"
          alt="bg mobile"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background_mobile.svg"
        />
        <img
          className="hidden md:block scale-110 h-full w-full object-cover object-center opacity-60"
          alt="bg desktop"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background.svg"
        />
      </div>

      {/* Content - Mobile First */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28 flex flex-col items-center justify-center min-h-dvh space-y-8 sm:space-y-10 md:space-y-12">

        {/* Eyebrow - Compact on Mobile */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-energy-500/10 border border-energy-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-energy-500 animate-pulse" />
          <h4 className="uppercase text-energy-500 text-xs sm:text-sm md:text-sm font-semibold tracking-wider">
            Your Second Layer of Skin
          </h4>
        </div>

        {/* Hero Headline - Mobile Optimized Typography */}
        <div className="space-y-4 sm:space-y-6 w-full text-center">
          <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold font-display leading-tight tracking-tight">
            Elevate Your{' '}
            <span className="relative inline-flex items-baseline">
              <span className="relative z-10 px-3 sm:px-4 py-1 sm:py-1.5 text-gold-500 rounded-lg">
                Performance
              </span>
            </span>
            <br className="hidden sm:block" />
            <span className="block sm:inline"> with Precision Engineered</span>
            <br className="hidden md:block" />
            <span className="block sm:inline"> Athlete Wear</span>
          </h1>

          {/* Subtitle - Readable on Mobile */}
          <p className="text-sm sm:text-base md:text-base text-dark-400 md:text-white/80 max-w-2xl mx-auto font-sans leading-relaxed px-4 md:px-0 md:font-medium">
            Premium fitness and lifestyle brand for those who train with discipline and live with confidence.
          </p>
        </div>

        {/* CTA - Thumb-friendly */}
        <div className="w-full flex justify-center pt-4">
          <button
            onClick={onShopClick}
            className="group w-full sm:w-auto min-w-[280px] sm:min-w-0 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-5 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-dark-900 text-base sm:text-lg lg:text-lg font-bold rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/30 active:scale-100"
          >
            <span className="flex items-center justify-center gap-2 font-sans">
              Shop Now
              <svg className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </div>

        {/* Hero Video - Mobile Aspect Ratio Optimized */}
        <div className="w-full max-w-4xl mt-8 sm:mt-12 md:mt-16">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-dark-700 bg-dark-800 shadow-2xl aspect-[4/5] sm:aspect-[3/4] md:aspect-video">
            <Video
              urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
              src="/video/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
            {/* Subtle gold accent border */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-gold-500/10 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
