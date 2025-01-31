"use client"

import { type ReactNode} from "react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Users, ShoppingBag, Menu, Package} from "lucide-react"
import {Link, useLocation} from "react-router"
import {Sidebar, SidebarHeader, SidebarTrigger, SidebarProvider} from "@/components/ui/sidebar"

interface LayoutProps {
    children: ReactNode
}

export function Layout({children}: LayoutProps) {
    const pathname = useLocation().pathname

    const SidebarContent = () => (
        <ScrollArea className="flex-1">
            <nav className="space-y-2 px-4 py-4">
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-gray-600 dark:text-gray-300",
                        pathname === "/dashboard/admin/users" && "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
                    )}
                >
                    <Link to="/dashboard/admin/users" className="flex items-center gap-3">
                        <Users className="h-5 w-5"/>
                        Users
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-gray-600 dark:text-gray-300",
                        pathname === "/dashboard/admin/products" && "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
                    )}
                >
                    <Link to="/dashboard/admin/products" className="flex items-center gap-3">
                        <ShoppingBag className="h-5 w-5"/>
                        Products
                    </Link>
                </Button>
                <Button
                    asChild
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-gray-600 dark:text-gray-300",
                        pathname === "/dashboard/admin/orders" && "bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
                    )}
                >
                    <Link to="/dashboard/admin/orders" className="flex items-center gap-3">
                        <Package
                            className="h-5 w-5"/>
                        Orders
                    </Link>
                </Button>
            </nav>
        </ScrollArea>
    )

    return (
        <SidebarProvider>
            <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
                <Sidebar className="border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
                    <SidebarHeader
                        className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
                        <Link className="flex items-center gap-2 font-semibold h-full" to="/dashboard">
                            {/*<LayoutDashboard className="h-6 w-6"/>*/}
                            <img src="/logo.png" alt="Stationary Shop" className="h-28 w-28"/>
                        </Link>
                    </SidebarHeader>
                    <SidebarContent>
                    </SidebarContent>
                </Sidebar>
            </div>
            <div className="flex flex-1 flex-col overflow-hidden">
                <header
                    className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-800">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="lg:hidden">
                            <Menu className="h-6 w-6"/>
                        </SidebarTrigger>
                        {/*<h1 className="text-lg md:text-2xl font-semibold text-gray-900 dark:text-white">*/}
                        {/*    {pathname === "/dashboard/admin/users"*/}
                        {/*        ? "User Management"*/}
                        {/*        : pathname === "/dashboard"*/}
                        {/*            ? "Dashboard"*/}
                        {/*            : "Product Management"}*/}
                        {/*</h1>*/}
                    </div>
                    <Button variant="outline">Logout</Button>
                </header>
                <main className="flex-1 overflow-y-auto bg-gray-50 p-6 dark:bg-gray-900">{children}</main>
            </div>
        </SidebarProvider>
    )
}

