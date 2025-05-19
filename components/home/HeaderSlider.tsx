"use client";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title:
        "Experimenta el Sonido Puro - ¡Tus Auriculares Perfectos te Esperan!",
      offer: "Oferta por Tiempo Limitado 30% de Descuento",
      buttonText1: "Comprar ahora",
      buttonText2: "Ver más",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      title:
        "El Próximo Nivel del Gaming Comienza Aquí - ¡Descubre PlayStation 5 Hoy!",
      offer: "¡Apresúrate, quedan pocas unidades!",
      buttonText1: "Comprar ahora",
      buttonText2: "Saber más",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      title: "Potencia y Elegancia - ¡Apple MacBook Pro está Aquí para Ti!",
      offer: "Oferta Exclusiva 40% de Descuento",
      buttonText1: "Ordenar ahora",
      buttonText2: "Saber más",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 4,
      title: "Potencia y Elegancia - ¡Apple MacBook Pro está Aquí para Ti!",
      offer: "Oferta Exclusiva 40% de Descuento",
      buttonText1: "Ordenar ahora",
      buttonText2: "Saber más",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 5,
      title: "Potencia y Elegancia - ¡Apple MacBook Pro está Aquí para Ti!",
      offer: "Oferta Exclusiva 40% de Descuento",
      buttonText1: "Ordenar ahora",
      buttonText2: "Saber más",
      imgSrc: assets.header_headphone_image,
    },
  ];

  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="flex">
          {sliderData.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div
                key={slide.id}
                className="flex flex-col-reverse md:flex-row items-center justify-between bg-muted py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full"
              >
                <div className="md:pl-8 mt-10 md:mt-0">
                  <p className="md:text-base text-primary pb-1 font-medium">
                    {slide.offer}
                  </p>
                  <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-bold">
                    {slide.title}
                  </h1>
                  <div className="flex items-center mt-4 md:mt-6 ">
                    <button className="md:px-10 px-7 md:py-2.5 py-2 bg-primary rounded-full text-white font-medium">
                      {slide.buttonText1}
                    </button>
                    <button className="group flex items-center gap-2 px-6 py-2.5 font-medium">
                      {slide.buttonText2}
                      <Image
                        className="group-hover:translate-x-1 transition"
                        src={assets.arrow_icon}
                        alt="arrow_icon"
                      />
                    </button>
                  </div>
                </div>
                <div className="flex items-center flex-1 justify-center">
                  <Image
                    className="md:w-72 w-48"
                    src={slide.imgSrc}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default HeaderSlider;
