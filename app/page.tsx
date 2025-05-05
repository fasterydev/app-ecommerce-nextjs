import Banner from "@/components/home/Banner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Footer from "@/components/home/Footer";
import HeaderSlider from "@/components/home/HeaderSlider";
import HomeProducts from "@/components/home/HomeProducts";
import Navbar from "@/components/home/Navbar";
import NewsLetter from "@/components/home/NewsLetter";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
}
