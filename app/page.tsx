import Banner from "@/components/home/Banner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Footer from "@/components/home/Footer";
import HeaderSlider from "@/components/home/HeaderSlider";
import HomeProducts from "@/components/home/HomeProducts";
import Navbar from "@/components/home/Navbar";
import NewsLetter from "@/components/home/NewsLetter";
import { MessageCircle } from "lucide-react";

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
      <a
        href="https://wa.me/593980061377"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
        aria-label="Chat en WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
      <Footer />
    </div>
  );
}
