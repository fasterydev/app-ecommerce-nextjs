"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  BadgeCheckIcon,
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "./product";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { addItemToCart } from "@/actions";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cart-store";
// import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await addItemToCart(productId);
      if (response.statusCode === 201) {
        toast.success(response.message || "Producto agregado al carrito");
        await useCartStore.getState().fetchCart();
      } else {
        toast.error(
          response.message || "Error al agregar el producto al carrito"
        );
      }
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
    } finally {
    }
  };

  return (
    <Card className="xl:px-4 px-3 pb-3 relative">
      {/* <Link href={`/product/${product.id}`}> */}
      <div className="flex flex-col items-start gap-0.5 w-full cursor-pointer">
        <div className="cursor-pointer group  rounded-lg w-full md:h-52 flex items-center justify-center ">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="group-hover:scale-105 transition object-cover rounded-2xl  md:w-full md:h-full "
            width={800}
            height={800}
          />
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.discount > 0 && (
              <Badge className="bg-red-500 text-xs font-medium text-white hover:bg-red-500">
                -{convertFromMilliunits(product.discount)}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-green-500 text-xs font-medium text-white hover:bg-green-500">
                Nuevo
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="bg-amber-500 text-xs font-medium text-white hover:bg-amber-500">
                Top ventas
              </Badge>
            )}
          </div>
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
        <p className="w-full text-xs pt-2 text-muted-foreground flex items-center truncate">
          {product.subName}{" "}
          <BadgeCheckIcon size={14} className="ml-1 text-blue-500" />
        </p>
        <p className="md:text-base font-medium  w-full line-clamp-2">
          {product.name}
        </p>
        <div className="flex items-center gap-1.5">
          <p className="text-xs">{4.5}</p>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">(24)</span>
        </div>
        <div className="flex items-center pt-1">
          {product.cost ? (
            <>
              <span className="font-medium text-red-600">
                $
                {(
                  product.cost -
                  (product.cost * product.discount) / 100
                ).toFixed(2)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.cost.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-medium">${product.cost.toFixed(2)}</span>
          )}
        </div>
      </div>
      {/* </Link> */}
      <div className="-mt-5.5">
        <Button
          onClick={() => handleAddToCart(product.id)}
          variant={"secondary"}
          className="max-sm:hidden mt-2 px-4 py-1.5 border-gray-500/20 rounded-full text-xs transition w-full"
        >
          <ShoppingCartIcon />
          Añadir al carrito
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
