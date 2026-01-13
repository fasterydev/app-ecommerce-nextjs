"use client";
import Banner from "@/components/home/Banner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HeaderSlider from "@/components/home/HeaderSlider";
import HomeProducts from "@/components/home/HomeProducts";
import Information from "@/components/home/Information";
import MosaicCategory from "@/components/home/MosaicCategory";
import NewsLetter from "@/components/home/NewsLetter";
import { MessageCircle } from "lucide-react";
import { envs } from "@/env";

// Función para limpiar el número de teléfono (remover +, espacios, guiones, etc.)
const cleanPhoneNumber = (phone: string): string => {
  return phone.replace(/[+\s\-()]/g, "");
};

export default function Home() {
  const phoneNumber = cleanPhoneNumber(envs.Business.Phone);
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <>
      <MosaicCategory />
      {/* <HeaderSlider /> */}
      <HomeProducts />
      <FeaturedProduct />
      <Banner />
      {/* <NewsLetter /> */}
      <Information />
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
        aria-label="Chat en WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </>
  );
}
