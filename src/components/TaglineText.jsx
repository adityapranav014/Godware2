import { Asterisk } from "lucide-react"

const TaglineText = () => {
    return (
        <div className="bg-ink py-40">
            <div className="relative max-w-5xl mx-auto px-4 xl:px-0 text-center z-20 text-white">


                {/* Small images above text */}
                <div
                    className="absolute z-10 size-20 bg-stroke rounded-full overflow-clip
                        left-1/2 -translate-x-1/2 -top-20
                        md:left-[17.5rem] md:-translate-x-0 md:-top-20"
                >
                    <div
                        className="size-full bg-cover bg-top"
                        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/tagLineSection-1.png)` }}
                    ></div>
                </div>

                <h2 className="text-4xl lg:text-5xl
                leading-tight text-white tracking-tight">
                    Our gym wear is crafted with{" "}
                    <div className="border w-fit inline-flex items-center border-white/30 rounded-full
                    pr-4 pl-2 pb-1">
                        <Asterisk className="inline-block" size={45} />
                        second-skin
                    </div>{" "}
                    technology that supports
                    muscles, reduces fatigue, and keeps you dry
                    through every rep, sprint, and stretch.
                </h2>

                {/* Small Image below text */}
                <div
                    className="absolute z-10 size-20 bg-stroke rounded-full overflow-clip
                        left-1/2 -translate-x-1/2 -bottom-20
                        md:left-auto md:right-[21rem] md:translate-x-0 md:-bottom-20"
                >
                    <div
                        className="size-full bg-cover bg-top"
                        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/tagLineSection-3.png)` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default TaglineText
