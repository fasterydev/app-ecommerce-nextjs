"use client";
import Banner from "@/components/home/Banner";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import HeaderSlider from "@/components/home/HeaderSlider";
import HomeProducts from "@/components/home/HomeProducts";
import NewsLetter from "@/components/home/NewsLetter";
import { MessageCircle } from "lucide-react";
// import { useEffect } from "react";
// import { toast } from "sonner";

export default function Home() {
  // useEffect(() => {
  //   const checkServer = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api-ecommerce-nestjs.onrender.com/api/health"
  //       );

  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Estado del servidor:", data);
  //         if (data.status === "ok") {
  //           clearInterval(intervalId);
  //         }
  //       } else {
  //         toast.info("En 1 minuto se activarán los servidores...");
  //         console.log("La API todavía está apagada.");
  //       }
  //     } catch (error) {
  //       console.error("Error al conectar con la API:", error);
  //       toast.info("En 1 minuto se activarán los servidores...");
  //     }
  //   };

  //   const intervalId = setInterval(checkServer, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <>
      <HeaderSlider />
      <HomeProducts />
      <FeaturedProduct />
      <Banner />
      <NewsLetter />
      <a
        href="https://wa.me/593980061377"
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
