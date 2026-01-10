"use client";
import { Minus, Plus, ShoppingCartIcon, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useCartStore } from "@/stores/public/cart-store";
import { useUser } from "@clerk/nextjs";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";

export function ShoppingCartIconHome() {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const {
    cartItems = [],
    fetchCart,
    addItem,
    decreaseItem,
    removeItem,
  } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const subtotalValue = cartItems.reduce(
        (acc, item) => acc + item.product.total * item.quantity,
        0
      );
      setSubtotal(subtotalValue);
    }
  }, [cartItems]);

  useEffect(() => {
    if (isLoaded && user) {
      fetchCart();
    }
    // }, []);
  }, [fetchCart, isLoaded, user]);

  const cartCount = cartItems?.length || 0;

  return (
    <>
      {/* Icono móvil */}
      <Link href="/shopping-cart" className="xl:hidden block my-auto">
        <Button className="relative p-3" size={"icon"} variant="outline">
          <ShoppingCartIcon size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </Link>

      {/* Icono desktop con dropdown */}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative hidden xl:flex"
          >
            <ShoppingCartIcon size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            )}
            <span className="sr-only">Shopping cart</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-100 overflow-hidden">
          <div className="flex items-center justify-between p-2">
            <span className="text-sm font-medium">
              Mi carrito ({cartCount})
            </span>
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar</span>
            </Button>
          </div>

          <DropdownMenuSeparator />

          {cartCount === 0 ? (
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <ShoppingCartIcon className="mb-2 h-10 w-10 text-muted-foreground" />
              <p className="mb-1 text-lg font-medium">Su carrito está vacío</p>
              <p className="text-sm text-muted-foreground">
                Añade artículos a tu carrito
              </p>
            </div>
          ) : (
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-4 py-2">
                {cartItems.map((item) => (
                  <div
                    key={item?.id || Math.random()}
                    className="flex items-center gap-3"
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-md border">
                      <Image
                        src={item?.product?.images?.[0] || "/placeholder.svg"}
                        alt={item?.product?.id}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-medium">
                        {item?.product?.name}
                      </h4>
                      <p className="text-sm font-medium">
                        {currencyFormat(
                          convertFromMilliunits(item?.product?.total) || 0
                        )}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => decreaseItem(item?.product?.id)}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Disminuir la cantidad</span>
                        </Button>
                        <span className="text-xs w-4 text-center">
                          {item?.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => addItem(item?.product?.id)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Aumentar la cantidad</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 ml-auto"
                          onClick={() => removeItem(item?.product?.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                          <span className="sr-only">Eliminar elemento</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          <DropdownMenuSeparator />
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal:</span>
              <span className="font-medium">
                {currencyFormat(convertFromMilliunits(subtotal) || 0)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm pb-1">
              <span>Envío:</span>
              <span className="font-medium">
                Calculado al finalizar la compra
              </span>
            </div>
            <Link href="/shopping-cart">
              <Button onClick={() => setOpen(false)} className="w-full">
                Finalizar compra
              </Button>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
