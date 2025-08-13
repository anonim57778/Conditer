import ProductsList from "./product-list";
import AboutUsSection from "./about-section";
import Carousel from "./carousel";
import MainSection from "./main-section";

export default function LandingPage() {

    return (
        <div>
            <MainSection/>
            <Carousel/>
            <ProductsList/>
            <AboutUsSection/>
        </div>
    )
}