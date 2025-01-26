import { Separator } from "@/components/ui/separator";

const Footer = () => {
    return (
        <footer className="bg-primary py-8 text-neutral-foreground">
            <div className="container mx-auto px-4">
                {/* Top Section: Links and Logo */}
                <div className="flex flex-wrap justify-between items-center gap-8">
                    {/* Logo and Tagline */}
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-foreground">
                            YourBrand
                        </h2>
                        <p className="text-sm mt-2 text-muted-foreground">
                            Crafting quality tools for your creativity and success.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8">
                        <p
                            className="text-sm hover:text-highlight transition-colors"
                        >
                            About Us
                        </p>
                        <p
                            className="text-sm hover:text-highlight transition-colors"
                        >
                            Products
                        </p>
                        <p
                            className="text-sm hover:text-highlight transition-colors"
                        >
                            Support
                        </p>
                        <p
                            className="text-sm hover:text-highlight transition-colors"
                        >
                            Contact
                        </p>
                    </div>
                </div>

                {/* Separator */}
                <Separator className="my-6 bg-neutral-foreground/30" />

                {/* Bottom Section: Policies and Social Links */}
                <div className="flex flex-wrap justify-between items-center gap-6">
                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} YourBrand. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex gap-4">
                        <a
                            href="https://twitter.com/yourbrand"
                            className="text-muted-foreground hover:text-highlight transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">Twitter</span>
                            {/* Replace with a proper Twitter icon or include from lucide-react */}
                            Twitter
                        </a>
                        <a
                            href="https://facebook.com/yourbrand"
                            className="text-muted-foreground hover:text-highlight transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">Facebook</span>
                            {/* Replace with a proper Facebook icon or include from lucide-react */}
                            Facebook
                        </a>
                        <a
                            href="https://instagram.com/yourbrand"
                            className="text-muted-foreground hover:text-highlight transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className="sr-only">Instagram</span>
                            {/* Replace with a proper Instagram icon or include from lucide-react */}
                            Instagram
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;