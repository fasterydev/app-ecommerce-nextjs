"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  BadgeCheckIcon,
  CheckCircle2Icon,
  HeartIcon,
  Loader2Icon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { useCartStore } from "@/stores/cart-store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addFavorite } from "@/actions";
import { currencyFormat } from "@/utils/currencyFormat";
import { Product } from "./interface";
import Link from "next/link";

const ProductCard = ({ product }: { product: Product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { addItem, cartItems } = useCartStore();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const handleAddToCart = () => {
    if (user === null && isLoaded) {
      router.push("/auth/sign-in");
      return;
    }

    addItem(product.id);
    setIsAddingToCart(true);

    // Simulate loading for 2 seconds
    setTimeout(() => {
      setIsAddingToCart(false);
      setIsAddedToCart(true);

      // Reset the added state after 2 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
    }, 2000);
  };

  const isAddedToFavorites = async (product: Product) => {
    try {
      const res = await addFavorite(product.id);
      if (res.statusCode === 200) {
        setIsFavorite(true);
      }
      return res;
    } catch (error) {
      console.error("Error checking if product is added to favorites:", error);
    }
  };

  const isProductInCart = Array.isArray(cartItems)
    ? cartItems.some((item) => item.product.id === product.id)
    : false;

  return (
    <Card className="p-2.5 relative mb-auto">
      <Link href={`/product/${product.id}`}>
        <div className="flex flex-col items-start w-full cursor-pointer">
          <div className="cursor-pointer group rounded-lg w-full md:h-52 flex items-center justify-center ">
            <Image
              src={product.images[0] || "https://placehold.co/600x600.png"}
              alt={product.name}
              className="group-hover:scale-105 transition object-cover rounded-xl  md:w-full md:h-full"
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
              // onClick={() => setIsFavorite(!isFavorite)}
              onClick={() => isAddedToFavorites(product)}
              className={cn(  
                "top-2 right-2 border absolute flex items-center justify-center h-8 w-8 rounded-full shadow-md transition-all duration-300 ease-in-out",
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
            </button>
          </div>
          {product.brand ? (
            <div className="w-full text-xs pt-1.5 -mb-1 text-muted-foreground flex items-center truncate">
              {product.brand.name}
              <BadgeCheckIcon size={14} className="ml-1 text-blue-500" />
            </div>
          ) : null}
          <div className="md:text-base font-medium pt-1 w-full line-clamp-2 ">
            {product.name}
          </div>
          <div className="flex items-center gap-1.5">
            <p className="text-xs">{4.5}</p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  size={12}
                  key={i}
                  className={`${
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
            <>
              <span className="font-medium">
                {currencyFormat(convertFromMilliunits(product.total))}
              </span>
            </>
          </div>
        </div>
      </Link>

      <div className="-mt-6">
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={cn(
            "mt-1 text-xs w-full",
            isAddedToCart &&
              "bg-green-100 hover:bg-green-100 text-green-700 hover:text-green-700 border-green-200 hover:border-green-200"
          )}
        >
          {isAddingToCart ? (
            <>
              <Loader2Icon size={18} className="animate-spin" />
              Cargando...
            </>
          ) : isAddedToCart ? (
            <>
              <CheckCircle2Icon size={18} className="  animate-appear" />
              Añadido
            </>
          ) : (
            <>
              {isProductInCart ? (
                <>
                  <PlusIcon size={18} />
                  Añadir uno más
                </>
              ) : (
                <>
                  <ShoppingCartIcon size={18} />
                  Añadir al carrito
                </>
              )}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
