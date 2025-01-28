import Navbar from "@/components/layout/Navbar.tsx";
import Footer from "@/components/layout/Footer.tsx";
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};
MainLayout.displayName = `MainLayout`
export default MainLayout;