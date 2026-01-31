import { Landmark, Zap } from "lucide-react"
import Section from "../components/layout/Section";
import SectionHeader from "../components/layout/SectionHeader";

const MissionSection = () => {
    return (
        <Section background="gray" padding="default">
            {/* Header */}
            <SectionHeader 
                title="ABOUT US" 
                align="left"
            />

            {/* Content */}
            <div>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-4 items-center'>

                        {/* Left Image Col */}
                        <div className='relative h-[620px] bg-stroke rounded-3xl overflow-hidden'>

                            {/* Image Placeholder */}
                            <div className='size-full bg-[url(https://images.pexels.com/photos/29526382/pexels-photo-29526382.jpeg)]
                    bg-cover bg-center flex items-center justify-center
                    text-muted saturate-100'>
                            </div>

                            {/* Learn More Button */}
                            <button className='absolute bottom-4 left-4 bg-surface/90
                    text-ink text-sm px-4 py-2 rounded-full
                    uppercase hover:bg-base transition-colors shadow-md'>
                                Learn More
                            </button>
                        </div>

                        {/* Right Text Col */}
                        <div className='space-y-8 bg-subtle rounded-3xl 
                h-full lg:col-span-2 flex flex-col justify-between p-8
                lg:p-16'>

                            {/* Heading */}
                            <h2 className='text-4xl sm:text-5xl lg:text-6xl impact text-accent
                    leading-tight mb-4 uppercase'>
                                We'Re changing <br />
                                The Way things <br />
                                Get Made
                            </h2>


                            {/* Two Small Feature Items */}
                            <div className='grid lg:grid-cols-2 gap-6 border-t border-accent pt-6'>

                                {/* Feature Item 1 */}
                                <div className='flex items-start space-x-3'>
                                    <div className='size-10 aspect-square flex items-center justify-center
                            rounded-full bg-ink p-2 flex-shrink-0'>
                                        <Zap size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-ink sm:text-lg uppercase font-bold mb-1">
                                            SUSTAINABILITY
                                        </h3>
                                        <p className="text-sm text-muted">
                                            Working alongside international groups of  athletes,
                                            we create high-performance gym wear from premium materials.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature Item 2 */}
                                <div className='flex items-start space-x-3'>
                                    <div className='size-10 aspect-square flex items-center justify-center
                            rounded-full bg-ink p-2 flex-shrink-0'>
                                        <Landmark size={18} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-ink sm:text-lg uppercase font-bold mb-1">
                                            MISSION
                                        </h3>
                                        <p className="text-sm text-muted">
                                            We're on a mission to empower people to push their limits
                                            and achieve their fitness goals with confidence and style.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        </Section>
    )
}

export default MissionSection
