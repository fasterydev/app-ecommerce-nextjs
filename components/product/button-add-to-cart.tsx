"use client";
import {
  Loader2Icon,
  PlusCircleIcon,
  ShoppingCartIcon,
  XCircleIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";
import { useProductStore } from "@/stores/user/product-store";

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
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const { addItem, cartItems } = useCartStore();
  const { getProductId } = useProductStore();

  const product = getProductId(productId);

  const handleAddToCart = (id: string) => {
    if (user === null && isLoaded) {
      router.push("/auth/sign-in");
      return;
    }

    if (!product || product.stock <= 0) return;
    setIsAddedToCart(true);

    addItem(id);

    setTimeout(() => {
      setIsAddedToCart(false);
    }, 2000);
  };

  const productInCart = cartItems.find(
    (item) => item.product.slug === productId
  );

  if (!product) {
    return null;
  }

  const isOutOfStock = product.stock - (productInCart?.quantity || 0) <= 0;

  return (
    <Button
      size={size}
      onClick={() => handleAddToCart(product.id)}
      disabled={isAddedToCart || isOutOfStock}
      className={cn(
        isOutOfStock && "bg-gray-200 text-gray-500 cursor-not-allowed",
        classNameButton
      )}
    >
      {/* Loading */}
      {isAddedToCart && (
        <>
          <Loader2Icon size={18} className="animate-spin" />
          Cargando...
        </>
      )}

      {/* Sin stock */}
      {isOutOfStock && !isAddedToCart && (
        <>
          <XCircleIcon size={18} />
          Sin stock
        </>
      )}

      {/* Ya en carrito */}
      {productInCart && !isOutOfStock && !isAddedToCart && (
        <>
          <PlusCircleIcon size={18} />
          Añadir otro
        </>
      )}

      {/* No está en carrito */}
      {!productInCart && !isOutOfStock && !isAddedToCart && (
        <>
          <ShoppingCartIcon size={18} />
          Añadir al carrito
        </>
      )}
    </Button>
  );
}
