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
import { Product } from "./product";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { useCartStore } from "@/stores/cart-store";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { addFavorite } from "@/actions";

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
            // onClick={() => setIsFavorite(!isFavorite)}
            onClick={() => isAddedToFavorites(product)}
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
          onClick={handleAddToCart}
          // variant={"secondary"}
          disabled={isAddingToCart}
          className={cn(
            "max-sm:hidden mt-2 px-4 py-1.5 border-gray-500/20 rounded-full text-xs transition w-full",
            isAddedToCart &&
              "bg-green-100 hover:bg-green-100 text-green-700 hover:text-green-700 border-green-200 hover:border-green-200"
          )}
        >
          {isAddingToCart ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />
              Cargando...
            </>
          ) : isAddedToCart ? (
            <>
              <CheckCircle2Icon className=" h-4 w-4 animate-appear" />
              Añadido
            </>
          ) : (
            <>
              {isProductInCart ? (
                <>
                  <PlusIcon className="h-4 w-4" />
                  Añadir uno más
                </>
              ) : (
                <>
                  <ShoppingCartIcon className="h-4 w-4" />
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
