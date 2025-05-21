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
import { getShoppingCart } from "@/actions";
import { ShoppingCart } from "../shopping-cart/shopping-cart";

export function ShoppingCartIconHome() {
  const [cartItems, setCartItems] = useState<ShoppingCart[]>([]);
//   const [cartItems, setCartItems] = useState(initialCartItems);

//   const totalItems = cartItems.reduce(
//     (total, item) => total + item.quantity,
//     0
//   );
//   const subtotal = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const updateQuantity = (id: number, newQuantity: number) => {
//     if (newQuantity < 1) return;
//     setCartItems(
//       cartItems.map((item) =>
//         item.id === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const removeItem = (id: number) => {
//     setCartItems(cartItems.filter((item) => item.id !== id));
//   };

  const getShoppingCartApi = async () => {
    try {
      const res = await getShoppingCart();
      if (res.statusCode == 200) {
        setCartItems(res.shoppingCart.items);
      }
    } catch (error) {
      console.error("Error en getShoppingCartApi:", error);
      throw new Error("Error al obtener el carrito de compras");
    }
  };

  useEffect(() => {
    getShoppingCartApi();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCartIcon className="h-5 w-5" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {cartItems.length}
            </span>
          )}
          <span className="sr-only">Shopping cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <span className="text-sm font-medium">Mi carrito ({cartItems.length})</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <DropdownMenuSeparator />

        {cartItems.length === 0 ? (
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
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-20 w-20 overflow-hidden rounded-md border">
                    <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.id}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium">{item.product.name}</h4>
                    <p className="text-sm font-medium">
                      ${item.product.cost}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        // onClick={() =>
                        //   updateQuantity(item.id, item.quantity - 1)
                        // }
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="text-xs w-4 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        // onClick={() =>
                        //   updateQuantity(item.id, item.quantity + 1)
                        // }
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-auto"
                        // onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DropdownMenuSeparator />
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            {/* <span className="font-medium">${subtotal.toFixed(2)}</span> */}
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Envío</span>
            <span className="font-medium">
              Calculado al finalizar la compra
            </span>
          </div>
          <DropdownMenuSeparator />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            {/* <span>${subtotal.toFixed(2)}</span> */}
          </div>
          <Button className="w-full">Finalizar compra</Button>
          <Link href="/shopping-cart">
            <Button variant="outline" className="w-full">
              Ver carrito
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
