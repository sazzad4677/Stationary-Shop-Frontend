const HeroSection = () => {
    return (
        <section className="relative bg-primary text-primary-foreground py-16 md:py-24">
            {/* Container */}
            <div
                className="container mx-auto flex flex-col-reverse items-center justify-between px-4 md:flex-row lg:px-8">

                {/* Left Content */}
                <div className="text-center md:text-left max-w-lg">
                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-accent">
                        Find the Perfect Tools <br/>
                        <span className="text-primary-foreground">
              & Bring Your Ideas to Life
            </span>
                    </h1>

                    {/* Subheading */}
                    <p className="mt-4 text-lg text-muted-foreground sm:mt-6">
                        Level up your workspace with premium stationary. Get started and experience the power of
                        creativity.
                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex justify-center md:justify-start gap-4">
                        {/* Shop Now Button */}
                        <p
                            className="rounded-full bg-accent px-6 py-3 text-lg font-medium text-accent-foreground shadow-md transition-transform hover:scale-105 hover:shadow-lg"
                        >
                            Shop Now
                        </p>

                        {/* Learn More Button */}
                        <p
                            className="rounded-full border-2 border-primary px-6 py-3 text-lg font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-transform hover:shadow-md"
                        >
                            Learn More
                        </p>
                    </div>
                </div>

                {/* Right Image */}
                <div className="relative max-w-md w-full mt-8 md:mt-0">
                    <img
                        src="/"
                        alt="Stationary Products"
                        className="rounded-lg shadow-lg w-full object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;