import Navbar from "@/components/layout/Navbar.tsx";
import Footer from "@/components/layout/Footer.tsx";
import {Outlet, useLocation} from "react-router";
import {cn} from "@/lib/utils.ts";

const MainLayout = () => {
    const pathname = useLocation().pathname;
    const isDashboard = pathname.includes("dashboard");
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                {!isDashboard && <Navbar/>}
                <div className={cn("flex-grow relative")}>
                    <Outlet/>
                </div>
                {!isDashboard && <Footer/>}
            </div>
        </div>
    );
};
MainLayout.displayName = `MainLayout`
export default MainLayout;