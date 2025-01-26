import Navbar from "@/components/layout/Navbar.tsx";
import HeroSection from "@/components/layout/HeroSection.tsx";
import FeaturedProducts from "@/components/layout/FeaturedProducts.tsx";
import Testimonials from "@/components/layout/Testimonials.tsx";
import Footer from "@/components/layout/Footer.tsx";

function App() {

  return (
    <>
        <Navbar/>
        <HeroSection/>
        <FeaturedProducts/>
        <Testimonials/>
        <Footer/>
    </>
  )
}

export default App
