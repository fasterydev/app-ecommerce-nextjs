"use client";
import {
  CheckCircle2Icon,
  Loader2Icon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

type Props = {
  productId: string;
  classNameButton?: string;
  size?: "sm" | "lg" | "default" | "icon";
};

export default function ButtonAddToCart({
  productId,
  classNameButton,
  size = "default",
}: Props) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { addItem, cartItems } = useCartStore();

  const handleAddToCart = () => {
    if (user === null && isLoaded) {
      router.push("/auth/sign-in");
      return;
    }

    addItem(productId);
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

  const isProductInCart = Array.isArray(cartItems)
    ? cartItems.some((item) => item.product.id === productId)
    : false;

  return (
    <Button
      size={size}
      onClick={handleAddToCart}
      disabled={isAddingToCart}
      className={cn(
        isAddedToCart &&
          "bg-green-100 hover:bg-green-100 text-green-700 hover:text-green-700 border-green-200 hover:border-green-200",
        classNameButton
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
  );
}
