"use client";
import { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Button } from "./ui/button";
import { HeartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  userId: string;
  name: string;
  description: string;
  price: number;
  offerPrice: number;
  image: string[];
  category: string;
  date: number;
}

const ProductCard = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer">
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={product.image[0]}
          alt={product.name}
          className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={cn(
            "top-2 right-2  absolute flex items-center justify-center h-8 w-8 rounded-full shadow-md transition-all duration-300 ease-in-out",
            isFavorite
              ? "bg-rose-500 hover:bg-rose-600"
              : "bg-white hover:bg-gray-100"
          )}
        >
          <HeartIcon
            className={cn(
              "transition-all duration-300 ease-in-out",
              isFavorite
                ? "text-white fill-white animate-heartbeat"
                : "text-gray-500 hover:text-rose-500"
            )}
            size={15}
          />

          {isFavorite && (
            <span className="absolute inset-0 rounded-full animate-ping-slow bg-rose-400 opacity-75"></span>
          )}

          <style jsx global>{`
            @keyframes heartbeat {
              0% {
                transform: scale(1);
              }
              15% {
                transform: scale(1.25);
              }
              30% {
                transform: scale(1);
              }
              45% {
                transform: scale(1.15);
              }
              60% {
                transform: scale(1);
              }
            }

            @keyframes ping-slow {
              0% {
                transform: scale(0.95);
                opacity: 1;
              }
              75%,
              100% {
                transform: scale(1.5);
                opacity: 0;
              }
            }

            .animate-heartbeat {
              animation: heartbeat 0.8s ease-in-out;
            }

            .animate-ping-slow {
              animation: ping-slow 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
          `}</style>
        </button>
      </div>

      <p className="md:text-base font-medium pt-2 w-full truncate">
        {product.name}
      </p>
      <p className="w-full text-xs text-muted-foreground max-sm:hidden truncate">
        {product.description}
      </p>
      <div className="flex items-center gap-2">
        <p className="text-xs">{4.5}</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Image
              key={index}
              className="h-3 w-3"
              src={
                index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon
              }
              alt="star_icon"
            />
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium">${product.offerPrice}</p>
        <Button
          variant={"outline"}
          className="max-sm:hidden px-4 py-1.5 border-gray-500/20 rounded-full text-xs transition"
        >
          Comprar
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
