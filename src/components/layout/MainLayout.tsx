import Navbar from "@/components/layout/Navbar.tsx";
import Footer from "@/components/layout/Footer.tsx";
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar/>
            <div className={" flex-grow"}>
                <Outlet/>
            </div>
            <div className={"mt-10"}>
                <Footer/>
            </div>
        </div>
    );
};
MainLayout.displayName = `MainLayout`
export default MainLayout;