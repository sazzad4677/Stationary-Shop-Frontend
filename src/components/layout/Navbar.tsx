import { useState } from "react";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const cartCount = 3;

    return (
        <nav className="border-b bg-background text-foreground">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
                {/* Logo */}
                <a href="/" className="text-xl font-heading font-bold">
                    StationaryShop
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-6">
                    <p className="hover:underline">
                        Shop
                    </p>
                    <p  className="hover:underline">
                        About
                    </p>
                    <p  className="hover:underline">
                        Contact
                    </p>
                </div>

                {/* Cart Icon */}
                <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 rounded-full bg-primary-foreground text-primary px-[6px] text-xs font-semibold">
              {cartCount}
            </span>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="block md:hidden"
                    aria-label="Toggle Menu"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="h-6 w-6">{isMobileMenuOpen ? "✖" : "☰"}</span>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="block md:hidden bg-background px-4 py-3">
                    <p  className="block mb-2 hover:underline">
                        Shop
                    </p>
                    <p className="block mb-2 hover:underline">
                        About
                    </p>
                    <p className="block hover:underline">
                        Contact
                    </p>
                </div>
            )}
        </nav>
    );
};

export default Navbar;