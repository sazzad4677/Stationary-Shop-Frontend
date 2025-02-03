import * as React from "react"
import {ShoppingCart, User, Heart, Menu, LogOut } from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {Badge} from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Link, useLocation} from "react-router";
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {logout, selectUser} from "@/redux/features/auth/auth.slice.ts";
import {useState} from "react";
import {useLogoutMutation,} from "@/redux/features/auth/auth.api.ts";
import {Avatar, AvatarFallback} from "@/components/ui/avatar.tsx";

const Navbar = () => {
    const dispatch = useAppDispatch()
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const location = useLocation()
    const pathname = location.pathname
    const user = useAppSelector(selectUser)
    const cartCount = useAppSelector((state) => state.cart.totalQuantity);
    const [apiLogout] = useLogoutMutation();
    const handleLogout = async () => {
        await apiLogout(undefined)
        dispatch(logout())
    }

    const handleSheetClose = () => {
        setIsSheetOpen(false);
    };


    return (
        <nav className={pathname === "/" ? "bg-background" : "bg-primary"}>
            <div className="container mx-auto flex h-16 items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-heading font-bold tracking-widest text-primary">
                    <img src="/logo.png" alt="Stationary Shop" className="h-16"/>
                </Link>

                {/* Desktop Navigation Links */}
                <NavigationMenu className="hidden md:flex z-50">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger
                                className={pathname === "/" ? "" : "text-primary-foreground bg-primary mr-2"}>
                                Products
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] ">
                                    <li className="row-span-3">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                to="/products"
                                            >
                                                <div className="mb-2 mt-4 text-lg font-medium">Browse Collection</div>
                                                <p className="text-sm leading-tight text-muted-foreground">
                                                    Discover our latest and most popular stationery items.
                                                </p>
                                            </Link>
                                        </NavigationMenuLink>
                                    </li>
                                    <ListItem href="/products/notebooks" title="Notebooks">
                                        Premium quality notebooks for every need
                                    </ListItem>
                                    <ListItem href="/products/planners" title="Planners">
                                        Stay organized with our beautiful planners
                                    </ListItem>
                                    <ListItem href="/products/accessories" title="Accessories">
                                        Complement your stationery with our accessories
                                    </ListItem>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link
                                to="/about"
                                className={
                                    pathname === "/"
                                        ? navigationMenuTriggerStyle()
                                        : "text-primary-foreground bg-primary mr-2 text-sm font-semibold"
                                }
                            >
                                About Us
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                {/* User, Favorites, and Cart (Desktop View) */}
                <div className="hidden md:flex items-center space-x-4">
                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="h-8 w-8 rounded-full">
                                    <AvatarFallback>
                                        {user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuItem className="font-normal cursor-pointer">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                {user?.role === "admin" && <DropdownMenuItem asChild>
                                    <Link to="/dashboard">Dashboard</Link>
                                </DropdownMenuItem>}
                                <DropdownMenuItem asChild>
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4"/>
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button variant="ghost" size="sm" asChild>
                            <Link to="/login" className="flex items-center space-x-1">
                                <User className="h-4 w-4"/>
                                <span>Log In</span>
                            </Link>
                        </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild>
                        <Link to="/favorites" className="flex items-center space-x-1">
                            <Heart className="h-4 w-4"/>
                            <span>Favorites</span>
                        </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                        <Link to="/cart" className="flex items-center space-x-1">
                            <ShoppingCart className="h-4 w-4"/>
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <Badge variant="secondary" className="ml-1">
                                    {cartCount}
                                </Badge>
                            )}
                        </Link>
                    </Button>
                    {/*<ModeToggle />*/}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center space-x-4">
                    <Button variant="default" size="icon" asChild className={"relative"}>
                        <Link to="/cart">
                            <ShoppingCart className="h-4 w-4"/>
                            {cartCount > 0 && (
                                <Badge variant="secondary" className="absolute -top-2 -right-2">
                                    {cartCount}
                                </Badge>
                            )}
                        </Link>
                    </Button>
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-4 w-4"/>
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <div className="flex flex-col space-y-4 mt-4">
                                <h2 className="text-lg font-semibold mb-2">Menu</h2>
                                <Button variant="ghost" asChild className="w-full justify-start"
                                        onClick={handleSheetClose}>
                                    <Link to="/products">Browse Products</Link>
                                </Button>
                                <Button variant="ghost" asChild className="w-full justify-start"
                                        onClick={handleSheetClose}>
                                    <Link to="/favorites">Favorites</Link>
                                </Button>
                                {user ? (
                                    <>
                                        <Button variant="ghost" asChild className="w-full justify-start"
                                                onClick={handleSheetClose}>
                                            <Link to="/dashboard">Dashboard</Link>
                                        </Button>
                                        <Button variant="ghost" asChild className="w-full justify-start"
                                                onClick={handleSheetClose}>
                                            <Link to="/profile">Profile</Link>
                                        </Button>
                                        <Button variant="ghost" onClick={async () => {
                                            await handleLogout()
                                            handleSheetClose()
                                        }} className="w-full justify-start">
                                            Log Out
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="ghost" asChild className="w-full justify-start"
                                            onClick={handleSheetClose}>
                                        <Link to="/login">Log In / Sign Up</Link>
                                    </Button>
                                )}
                                <Button variant="ghost" asChild className="w-full justify-start"
                                        onClick={handleSheetClose}>
                                    <Link to="/about">About Us</Link>
                                </Button>
                                {/*<div className="flex justify-center mt-4">*/}
                                {/*    <ModeToggle />*/}
                                {/*</div>*/}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}

const ListItem = React.forwardRef<React.ComponentRef<"a">, React.ComponentPropsWithoutRef<"a">>(
    ({className, title, children, ...props}, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </a>
                </NavigationMenuLink>
            </li>
        )
    },
)
ListItem.displayName = "ListItem"

export default Navbar