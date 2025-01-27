import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {Facebook, Instagram, Star, Twitter} from "lucide-react";

const Footer = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // Handle email submission
        setEmail('')
    }

    return (
        <footer className="bg-primary text-primary-foreground">
            {/* Email Signup Section */}
            <div className="container mx-auto px-4 py-12 text-center">
                <h2 className="text-3xl italic mb-4">Enjoy 10% OFF your first order</h2>
                <p className="mb-6 text-primary-foreground">
                    Occasionally we like non-paper post too. Sign up to emails and we&apos;ll send a discount code to your inbox.*
                </p>
                <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto mb-4">
                    <Input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white text-black"
                        required
                    />
                    <Button type="submit" className="bg-[#F5F1EA] text-black hover:bg-[#E5E1DA]">
                        Sign up
                    </Button>
                </form>
                <p className="text-sm text-secondary-foreground">
                    By signing up you agree to our{" "}
                    <Link to="#" className="underline hover:text-white">
                        Terms & Conditions
                    </Link>
                    ,{" "}
                    <Link to="#" className="underline hover:text-white">
                        Privacy Policy
                    </Link>
                </p>
            </div>

            {/* Main Footer Links */}
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                {/* Column 1 - PAPIER */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wider">Papier</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Designers</Link></li>
                        <li><Link to="#" className="hover:underline">Gift Cards</Link></li>
                        <li><Link to="#" className="hover:underline">Business & Bulk Orders</Link></li>
                        <li><Link to="#" className="hover:underline">Wholesale</Link></li>
                        <li><Link to="#" className="hover:underline">Online Magazine</Link></li>
                    </ul>
                </div>

                {/* Column 2 - RESOURCES */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wider">Resources</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">Promotions</Link></li>
                        <li><Link to="#" className="hover:underline">Student & Graduate Discount</Link></li>
                        <li><Link to="#" className="hover:underline">Refer a Friend: Get $10 off</Link></li>
                        <li><Link to="#" className="hover:underline">Email: Sign up for 10% off</Link></li>
                        <li><Link to="#" className="hover:underline">Black Friday</Link></li>
                        <li><Link to="#" className="hover:underline">Advent Calendar</Link></li>
                    </ul>
                </div>

                {/* Column 3 - COMPANY */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wider">Company</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">About Us</Link></li>
                        <li><Link to="#" className="hover:underline">Store Locator</Link></li>
                        <li><Link to="#" className="hover:underline">Careers</Link></li>
                        <li><Link to="#" className="hover:underline">Sustainability</Link></li>
                        <li><Link to="#" className="hover:underline">Sitemap</Link></li>
                    </ul>
                </div>

                {/* Column 4 - CONTACT US */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase tracking-wider">Contact Us</h3>
                    <ul className="space-y-2">
                        <li><Link to="#" className="hover:underline">FAQ</Link></li>
                        <li><Link to="#" className="hover:underline">Contact Us</Link></li>
                        <li><Link to="#" className="hover:underline">Shipping</Link></li>
                        <li><Link to="#" className="hover:underline">Returns</Link></li>
                        <li><Link to="#" className="hover:underline">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Column 5 - Reviews */}
                <div className="lg:text-right">
                    <div className="flex lg:justify-end mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                    </div>
                    <p className="font-semibold">4.75 rating 16,000+ reviews</p>
                    <Link to="#" className="text-sm underline hover:text-gray-300">
                        Read all our reviews
                    </Link>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Social Links */}
                        <div className="flex gap-4">
                            <Link to="#" className="hover:opacity-80"><Facebook/></Link>
                            <Link to="#" className="hover:opacity-80"><Instagram/></Link>
                            <Link to="#" className="hover:opacity-80"><Twitter/></Link>
                        </div>

                        {/* Copyright & Legal */}
                        <div className="flex gap-4 text-sm">
                            <span>© 2025 Papier</span>
                            <Link to="#" className="hover:underline">Privacy</Link>
                            <Link to="#" className="hover:underline">T&Cs</Link>
                            <Link to="#" className="hover:underline">Cookies</Link>
                        </div>

                        {/* Payment Methods */}
                        <div className="flex gap-2 items-center">
                            <span className="w-10 h-6 "><img src={"https://static-00.iconduck.com/assets.00/visa-icon-2048x628-6yzgq2vq.png"} alt={"visa"}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;