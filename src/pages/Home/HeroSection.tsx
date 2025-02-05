import {Button} from "@/components/ui/button"
import {motion} from "framer-motion"
import {ArrowRight, Sparkles} from "lucide-react"
import {useState} from "react"
import {Link} from "react-router";

const HeroSection = () => {
    const [showPlayAgain, setShowPlayAgain] = useState(false)

    return (
        <section
            className="relative bg-gradient-to-br from-strong to-strong/80 text-primary-foreground py-16 md:py-24 overflow-hidden">
            {/* Floating Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="absolute -top-1/2 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl"
                    animate={{y: [-10, 10]}}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 4,
                    }}
                />
                <motion.div
                    className="absolute -bottom-1/2 -right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl"
                    animate={{x: [-10, 10]}}
                    transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 4,
                    }}
                />
            </div>

            <div
                className="container mx-auto flex flex-col-reverse items-center justify-between px-4 md:flex-row lg:px-8 gap-12 relative z-10">
                {/* Left Content */}
                <motion.div
                    className="text-center md:text-left max-w-lg"
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    {/* Heading with Typewriter Effect */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-secondary-foreground leading-tight">
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{duration: 1}}
                        >
                            Find the Perfect Tools
                        </motion.div>
                        <br/>
                        <span
                            className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-text-glow">
                            & Bring Your Ideas to Life
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mt-6 text-lg sm:text-xl text-muted-foreground">
                        Level up your workspace with premium stationery. Get started and experience the power of
                        creativity.
                    </p>

                    {/* Buttons with Enhanced Hover Effects */}
                    <div className="mt-8 flex justify-center md:justify-start gap-4 flex-wrap">
                        <Button
                            variant="secondary"
                            size="lg"
                            className="rounded-full group hover:scale-105 transition-transform relative px-8 py-6 "
                        >
                            <Link to="/products" className={" text-lg font-semibold flex items-center gap-2"}>Shop Now
                                <ArrowRight
                                    className="w-5 h-5 group-hover:translate-x-1 group-hover:opacity-100 transition-transform"
                                />
                                </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-lg font-semibold flex items-center gap-2 group hover:bg-secondary/10 transition-colors relative"
                        >
                            Learn More
                            <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform"/>
                        </Button>
                    </div>
                </motion.div>

                {/* Right Video Section with Play Again Option */}
                <motion.div
                    className="relative max-w-lg w-full"
                    initial={{opacity: 0, scale: 0.9}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{duration: 0.5, delay: 0.2}}
                >
                    <div className="relative rounded-lg overflow-hidden shadow-2xl group">
                        <video
                            src="https://res-2.cloudinary.com/papier/video/upload/c_fill,q_80:qmax_20,w_608/v1/remote_assets/user_photos/images/000/592/017/original/0125_US_ONSITE_HOMEPAGE_20THJAN_MULTI-BOOK.webm"
                            autoPlay
                            loop
                            muted
                            className="w-full object-cover h-auto group-hover:opacity-90 transition-opacity"
                            onEnded={() => setShowPlayAgain(true)}
                        />
                        {showPlayAgain && (
                            <button
                                className="absolute inset-0 flex justify-center items-center bg-black/60 text-white text-sm rounded-lg hover:bg-black/70 transition duration-300"
                                onClick={() => setShowPlayAgain(false)}
                            >
                                Play Again
                            </button>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-strong/40 to-transparent"/>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection