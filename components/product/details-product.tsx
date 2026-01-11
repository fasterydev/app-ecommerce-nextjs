"use client";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  DollarSign,
  EyeIcon,
  Loader2Icon,
  Package,
  RotateCcwIcon,
  User,
  XCircle,
} from "lucide-react";
import { Sale } from "../sale/interface";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { SaleStatusBadge } from "../sale/sale-status-badge";
import { updateSaleAdmin } from "@/actions";
import Link from "next/link";
import { dateFormat } from "@/utils/dateFormat";
import { useState } from "react";
import { toast } from "sonner";
import PayphoneButton from "@/components/shared/payphone-button";

type Props = {
  sale: Sale;
  mode: "view" | "edit";
};

export function DetailsProduct({ sale, mode }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const isAdmin = mode === "edit";

  const handleCompleteSale = async (id: string) => {
    if (!isAdmin) return;
    try {
      setIsLoading(true);
      const result = await updateSaleAdmin(id, {
        status: "completed",
      });
      if (result.statusCode === 200) {
        toast.success("Venta marcada como completada");
        // Recargar la página para actualizar los datos
        window.location.reload();
      } else {
        toast.error(result.message || "Error al actualizar la venta");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la venta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSale = async (id: string) => {
    if (!isAdmin) return;
    try {
      setIsLoading(true);
      const result = await updateSaleAdmin(id, {
        status: "canceled",
      });
      if (result.statusCode === 200) {
        toast.success("Venta cancelada");
        // Recargar la página para actualizar los datos
        window.location.reload();
      } else {
        toast.error(result.message || "Error al cancelar la venta");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al cancelar la venta");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSale = async (id: string) => {
    if (!isAdmin) return;
    try {
      setIsLoading(true);
      const result = await updateSaleAdmin(id, {
        status: "pending",
      });
      if (result.statusCode === 200) {
        toast.success("Estado de venta reiniciado");
        // Recargar la página para actualizar los datos
        window.location.reload();
      } else {
        toast.error(result.message || "Error al actualizar la venta");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar la venta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"icon"} variant="outline">
          <EyeIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="h-screen overflow-y-auto w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Detalles del Pedido #{sale.idNumer}
          </SheetTitle>
          <SheetDescription>
            {isAdmin
              ? "Vista de administrador - Puedes cambiar el estado del pedido"
              : "Información de tu pedido"}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 xl:mx-8 mx-2">
          <div className="flex items-center justify-between">
            <SaleStatusBadge status={sale.status} />
            <span className="text-sm text-muted-foreground">
              {dateFormat(sale.createdAt)}
            </span>
          </div>

          <Separator />

          {isAdmin && (
            <>
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Información del Cliente
                </h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>{" "}
                    {sale.user.email}
                  </div>
                  {sale.user.fullName && (
                    <div>
                      <span className="font-medium">Nombre:</span>{" "}
                      {sale.user.fullName}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Activo:</span>{" "}
                    {sale.user.isActive ? "Sí" : "No"}
                  </div>
                </div>
              </div>
              <Separator />
            </>
          )}

          <div className="space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Package className="h-4 w-4" />
              Productos ({sale.products.length})
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2">
              {sale.products.map((product) => (
                <Link
                  href={`/product/${product.slug}`}
                  key={product.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    key={product.id}
                    className="border rounded-lg p-3 space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      {product.images.length > 0 && (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="object-cover rounded my-auto"
                          width={64}
                          height={64}
                        />
                      )}
                      <div className="flex-1">
                        <h5 className="font-medium">{product.name}</h5>
                        <div className="grid grid-cols-1  text-sm text-muted-foreground">
                          <div>Cantidad: {product.quantity}</div>
                          <div>
                            Precio:{" "}
                            {currencyFormat(
                              convertFromMilliunits(product.total)
                            )}
                          </div>
                          {isAdmin && (
                            <>
                              <div>
                                Costo:{" "}
                                {currencyFormat(
                                  convertFromMilliunits(product.cost)
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Resumen
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {currencyFormat(convertFromMilliunits(sale.subtotal))}
                </span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{currencyFormat(convertFromMilliunits(sale.total))}</span>
              </div>
            </div>
          </div>

          {!isAdmin && sale.status === "pending" && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Pago del Pedido</h4>
                <p className="text-sm text-muted-foreground">
                  Complete el pago de su pedido para procesar su orden.
                </p>
                <PayphoneButton
                  config={{
                    // amount: convertFromMilliunits(sale.total),
                    reference: `Pago Pedido #${sale.idNumer}`,
                    amount: 315,
                    amountWithoutTax: 200,
                    amountWithTax: 100,
                    tax: 15,
                    currency: "USD",
                  }}
                  buttonText="Pagar Pedido"
                  buttonVariant="default"
                  buttonSize="lg"
                  buttonClassName="w-full"
                  onSuccess={() => {
                    toast.success("Pago iniciado correctamente");
                  }}
                  onError={(error) => {
                    toast.error(`Error al cargar el método de pago: ${error}`);
                  }}
                />
              </div>
            </>
          )}

          {isAdmin && sale.status === "pending" && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Acciones de Administrador</h4>
                <div className="xl:grid-cols-2 md:grid-cols-2 grid-cols-1 grid  gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleCompleteSale?.(sale.id)}
                    disabled={isLoading}
                    className="flex items-center gap-2 w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon size={18} className="animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Marcar Completado
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={() => handleCancelSale?.(sale.id)}
                    className="flex items-center gap-2 w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon size={18} className="animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" />
                        Cancelar Pedido
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
          {isAdmin && sale.status != "pending" && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-semibold">Acciones de Administrador</h4>
                <div className="xl:grid-cols-2 md:grid-cols-2 grid-cols-1 grid  gap-2">
                  <Button
                    size="sm"
                    variant="default"
                    disabled={isLoading}
                    onClick={() => handleResetSale?.(sale.id)}
                    className="flex items-center gap-2 w-full bg-purple-500 hover:bg-purple-600 text-white"
                  >
                    {isLoading ? (
                      <>
                        <Loader2Icon size={18} className="animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <RotateCcwIcon className="h-4 w-4" />
                        Reiniciar Estado
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        {/* <pre>
          {JSON.stringify(sale, null, 2)}
        </pre> */}
      </SheetContent>
    </Sheet>
  );
}
