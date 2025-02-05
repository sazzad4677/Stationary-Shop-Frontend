import FeaturedProducts from "@/pages/Home/FeaturedProducts.tsx";
import Testimonials from "@/pages/Home/Testimonials.tsx";
import HeroSection from "@/pages/Home/HeroSection.tsx";
import ProductCategories from "@/pages/Home/Categories.tsx";

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <ProductCategories/>
            <FeaturedProducts/>
            <Testimonials/>
        </div>
    );
};
Home.displayName = `Home`
export default Home;