"use client";
import { Minus, Plus, ShoppingCartIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";

export default function ShoppingCartPage() {
  const {
    cartItems,
    isLoading,
    addItem,
    decreaseItem,
    removeItem,
    createSale,
  } = useCartStore();
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateSubtotal = () => {
      const subtotalValue = cartItems.reduce(
        (acc, item) => acc + item.product.total * item.quantity,
        0
      );
      setSubtotal(subtotalValue);
      setTotal(subtotalValue);
    };

    calculateSubtotal();
  }, [cartItems]);

  return (
    <main className="container mx-auto xl:py-10 py-5">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <ShoppingCartIcon className="mb-4 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-medium">Tu carrito está vacío</h2>
          <p className="mb-6 text-muted-foreground">
            Agrega artículos a tu carrito para verlos aquí.
          </p>
          <Link href="/">
            <Button>Continuar comprando</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Carrito de compras</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="h-32 w-32 overflow-hidden rounded-md border">
                      <Image
                        src={item.product.images[0] || "/placeholder.svg"}
                        alt={item.product.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="font-medium">${item.product.total}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          disabled={isLoading}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => decreaseItem(item.product.id)}
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          disabled={isLoading}
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => addItem(item.product.id)}
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                        <Button
                          disabled={isLoading}
                          variant="destructive"
                          size="icon"
                          className="ml-auto"
                          onClick={() => removeItem(item.product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Resumen del pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="text-sm">
                    Calculado al finalizar la compra
                  </span>
                </div> */}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={createSale.bind(null, cartItems)}
                  className="w-full"
                >
                  Finalizar compra
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
