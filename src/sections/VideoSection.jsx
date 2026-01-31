import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

const VideoSection = () => {
    return (
        <Section background="dark" padding="large" className="relative overflow-hidden">
            <div className="space-y-10">
                <div className="flex justify-center">
                    <span className="accent-pill uppercase tracking-[0.4em] text-white/70">
                        Studio Film
                    </span>
                </div>

                <SectionHeader 
                    title="Built to Last" 
                    subtitle="Premium materials, precision craftsmanship. Experience the difference quality makes."
                    align="center"
                    titleClassName="text-white font-machina"
                    subtitleClassName="text-white/70 font-manrope"
                />

                <div className="glass-card glow-border w-full max-w-[95vw] lg:h-auto mx-auto lg:w-[90%] xl:w-[94%] 2xl:w-[96%] 
                    border p-4 sm:p-6 lg:p-8 border-white/15 rounded-3xl relative min-h-[28rem]">

                    <video
                        className="md:my-6 lg:my-8 min-h-[220px] sm:min-h-[280px] lg:min-h-[30vh] w-full max-md:aspect-video md:h-auto rounded-xl object-cover"
                        src="https://videos.pexels.com/video-files/4945154/4945154-uhd_2732_1440_24fps.mp4"
                        autoPlay
                        loop
                        playsInline
                        preload="auto"
                        muted
                    />

                    <div className="hidden md:flex absolute top-[28%] right-6 lg:right-10 animate-float flex-col items-center gap-2">
                        <img
                            className="w-40 sm:w-52 lg:w-60"
                            alt="Elite performance"
                            loading="eager"
                            src="https://dfdx9u0psdezh.cloudfront.net/home/hero/e610ce8beaa7a2b72c73dd68.webp"
                        />
                        <p className="text-center text-xs uppercase tracking-[0.4em] text-white/70 font-manrope">
                            Elite Performance
                        </p>
                    </div>

                    <div className="hidden md:flex absolute top-[60%] left-6 lg:left-10 animate-float flex-col items-center gap-2">
                        <img
                            className="w-40 sm:w-52 lg:w-60"
                            alt="Premium quality"
                            loading="eager"
                            src="https://dfdx9u0psdezh.cloudfront.net/home/hero/57b6a3ee65a9c27fc2ee29c6.webp"
                        />
                        <p className="text-center text-xs uppercase tracking-[0.4em] text-white/70 font-manrope">
                            Premium Quality
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default VideoSection
