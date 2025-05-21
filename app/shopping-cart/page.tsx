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
import { getShoppingCart } from "@/actions";
import { ShoppingCart } from "@/components/shopping-cart/shopping-cart";

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<ShoppingCart[]>([]);
  // const [loading, setLoading] = useState(true);

  // const subtotal = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  // const updateQuantity = (id: number, newQuantity: number) => {
  //   if (newQuantity < 1) return;
  //   setCartItems(
  //     cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  // const removeItem = (id: number) => {
  //   setCartItems(cartItems.filter((item) => item.id !== id));
  // };

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

  // const createShoppingCartApi = async () => {
  //   try {
  //     const rest = await createShoppingCart();
  //     if (rest.statusCode == 200) {
  //       setCartItems(rest.shoppingCart);
  //     }
  //   } catch (error) {
  //     console.error("Error en createShoppingCartApi:", error);
  //     throw new Error("Error al crear el carrito de compras");
  //   }
  // };

  useEffect(() => {
    getShoppingCartApi();
  }, []);

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-6">
        {/* <Link href="/" className="mr-4">
          <Button variant="outline" size="sm">
            &larr; Back
          </Button>
        </Link> */}
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
      </div>

      {/* <Button onClick={() => createShoppingCartApi()}>Test</Button> */}

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
                <CardTitle>Artículos del carrito</CardTitle>
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
                      <p className="font-medium">${item.product.cost}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          // onClick={() =>
                          //   updateQuantity(item.id, item.quantity - 1)
                          // }
                        >
                          <Minus className="h-4 w-4" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          // onClick={() =>
                          //   updateQuantity(item.id, item.quantity + 1)
                          // }
                        >
                          <Plus className="h-4 w-4" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-auto"
                          // onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
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
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>
                <div className="flex justify-between">
                  <span>Envío</span>
                  <span className="text-sm">
                    Calculado al finalizar la compra
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  {/* <span>${subtotal.toFixed(2)}</span> */}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Finalizar compra</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}
