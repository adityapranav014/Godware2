import { Video } from '@imagekit/react';
const HeroSection = ({ onShopClick }) => {
  return (
    <div className="bg-ink text-white min-h-[100dvh] overflow-hidden relative flex items-center justify-center">
      <section
        className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-12 md:pb-16 flex flex-col items-center justify-center min-h-[100dvh] gap-8 m-8 md:m-16"
      >
        <h4 className="uppercase text-accent md:text-2xl text-center mb-2 impact">
          Second layer of skin
        </h4>
        <div className="flex flex-col items-center justify-center gap-10 w-full">
          <div className="flex flex-col items-center justify-center gap-6 w-full">
            <div className="font-machina text-[2.7rem] md:text-[5rem] lg:text-[4.7rem] tracking-tight md:leading-[5rem] text-center">
              <h1 className="capitalize impact">
                Elevate Your
                <span className="relative mx-2 inline-flex items-center">
                  <span className="relative z-10 px-2 font-machina pt-[0.05rem] text-white/90 bg-[#E8602E21] border border-[#E8602E] uppercase">
                    Performance
                    <span className="absolute -left-2 -top-2 h-1 w-1 bg-white" />
                    <span className="absolute -right-2 -top-2 h-1 w-1 bg-white" />
                    <span className="absolute -left-2 -bottom-2 h-1 w-1 bg-white" />
                    <span className="absolute -right-2 -bottom-2 h-1 w-1 bg-white" />
                  </span>
                </span>
                with Precision Engineered Athlete Wear
              </h1>
            </div>
            <p className="text-base md:text-[1.65rem] text-center font-manrope text-white/70 w-full lg:w-[70%] ">
              Premium fitness and lifestyle brand for those who train with discipline and live with confidence, built with powerful compression, bold design, and lasting comfort.
            </p>

            <div className="flex justify-center w-full mt-4">
              <button
                onClick={onShopClick}
                className="cta-gradient group text-white text-xl py-3 px-10 rounded-2xl border border-transparent backdrop-blur-md shadow-[0_15px_40px_rgba(255,202,6,0.35)] transition duration-300 hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden w-max flex gap-1 font-manrope font-medium">
                  <div className="transition-transform duration-300 ease-out group-hover:-translate-y-full">
                    Shop Now <span>→</span>
                  </div>
                  <div className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
                    Shop Now <span>→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 w-full mt-52">
            <div className="w-full border border-white/20 bg-black/50 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.55)] backdrop-blur-[20px] relative overflow-hidden">
              <Video
                urlEndpoint="https://ik.imagekit.io/fr3yiiin6"
                src="/video/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            </div>
          </div>
        </div>
      </section>
      <div className="absolute inset-x-0 -top-40 h-[165vh] overflow-hidden">
        <img
          className="block lg:hidden absolute inset-0 brightness-75 saturate-125 contrast-110 scale-150 h-full w-full object-cover"
          alt="bg mobile"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background_mobile.svg"
        />

        <img
          className="hidden lg:block absolute inset-0 brightness-80 saturate-120 contrast-110 scale-110 h-full w-full object-cover object-[60%_60%]"
          alt="bg desktop"
          src="https://dfdx9u0psdezh.cloudfront.net/common/Background.svg"
        />
      </div>
    </div>
  );
};

export default HeroSection;
