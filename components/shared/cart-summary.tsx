"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Truck,
  MapPin,
  ZapIcon,
  TruckIcon,
  Building2Icon,
} from "lucide-react";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { useCartStore } from "@/stores/public/cart-store";
import { useSaleStore } from "@/stores/customer/sale-store";
import { CreateSaleDto } from "@/actions/customer/sales";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type TypeShipping = "local_delivery" | "national_delivery" | "pickup";

export function CartSummary() {
  const router = useRouter();
  const [deliveryMethod, setDeliveryMethod] = useState<TypeShipping | "">("");
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Ecuador",
    addressLine2: "",
    phoneContact: "",
  });

  const { totalPriceCart, fetchCart } = useCartStore();
  const { createSale, isSaving } = useSaleStore();

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value as TypeShipping);
  };

  const isAddressValid = () => {
    if (deliveryMethod === "pickup") return true;
    return (
      address.street.trim() !== "" &&
      address.city.trim() !== "" &&
      address.state.trim() !== "" &&
      address.postalCode.trim() !== "" &&
      address.country.trim() !== ""
    );
  };

  const handleCreateSale = async () => {
    if (!deliveryMethod) {
      toast.error("Por favor selecciona un método de envío");
      return;
    }


    if (!isAddressValid()) {
      toast.error("Por favor completa todos los campos de dirección requeridos");
      return;
    }

    try {
      const createSaleDto: CreateSaleDto = {
        typeShipping: deliveryMethod,
        street: address.street,
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
        addressLine2: address.addressLine2 || undefined,
        phoneContact: address.phoneContact || undefined,
      };

      const result = await createSale(createSaleDto);
      
      if (result.success) {
        // Recargar el carrito (debería estar vacío después de crear la venta)
        await fetchCart();
        toast.success("¡Compra realizada exitosamente!");
        router.push("/sales");
      }
    } catch (error) {
      console.error("Error al crear la venta:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            Opciones de Envío
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={deliveryMethod}
            onValueChange={handleDeliveryMethodChange}
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="local_delivery" id="local_delivery" />
                <Label
                  htmlFor="local_delivery"
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center w-full gap-3">
                      <ZapIcon size={20} className="text-primary" />
                      <div>
                        <p className="font-medium">Envío Ciudad</p>
                        <p className="text-sm text-muted-foreground">
                          24 horas
                        </p>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem
                  value="national_delivery"
                  id="national_delivery"
                />
                <Label
                  htmlFor="national_delivery"
                  className="flex-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center w-full gap-3">
                      <TruckIcon size={20} className=" text-primary" />
                      <div>
                        <p className="font-medium">Envío Nacional</p>
                        <p className="text-sm text-muted-foreground">
                          1-3 días hábiles
                        </p>
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Building2Icon size={20} className=" text-primary" />
                    <div>
                      <p className="font-medium">Retirar en Sucursal</p>
                      <p className="text-sm text-muted-foreground">
                        Sin costo adicional
                      </p>
                    </div>
                  </div>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Card de Dirección de Envío - Solo se muestra si NO es pickup */}
      {deliveryMethod && deliveryMethod !== "pickup" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Dirección de Envío
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="street">Calle y número *</Label>
              <Input
                id="street"
                placeholder="Ej: Av. Principal 123"
                value={address.street}
                onChange={(e) =>
                  setAddress({ ...address, street: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="addressLine2">Apartamento, piso, etc. (opcional)</Label>
              <Input
                id="addressLine2"
                placeholder="Ej: Apt 4B, Piso 2"
                value={address.addressLine2}
                onChange={(e) =>
                  setAddress({ ...address, addressLine2: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  placeholder="Ciudad"
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">Provincia/Estado *</Label>
                <Input
                  id="state"
                  placeholder="Provincia"
                  value={address.state}
                  onChange={(e) =>
                    setAddress({ ...address, state: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="postalCode">Código Postal *</Label>
                <Input
                  id="postalCode"
                  placeholder="Código Postal"
                  value={address.postalCode}
                  onChange={(e) =>
                    setAddress({ ...address, postalCode: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">País *</Label>
                <Input
                  id="country"
                  placeholder="País"
                  value={address.country}
                  onChange={(e) =>
                    setAddress({ ...address, country: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phoneContact">Teléfono de contacto (opcional)</Label>
              <Input
                id="phoneContact"
                placeholder="Ej: +593 99 999 9999"
                value={address.phoneContact}
                onChange={(e) =>
                  setAddress({ ...address, phoneContact: e.target.value })
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Original order summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>
              {currencyFormat(convertFromMilliunits(totalPriceCart()))}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCreateSale}
            className="w-full"
            disabled={
              isSaving ||
              !deliveryMethod ||
              (deliveryMethod !== "pickup" && !isAddressValid())
            }
          >
            {isSaving ? "Procesando..." : "Finalizar compra"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
