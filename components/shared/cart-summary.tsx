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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Truck,
  MapPin,
  Plus,
  ZapIcon,
  TruckIcon,
  Building2Icon,
} from "lucide-react";
import { currencyFormat } from "@/utils/currencyFormat";

const cartItems = [
  { id: 1, name: "Producto 1", price: 2500, quantity: 2 },
  { id: 2, name: "Producto 2", price: 1800, quantity: 1 },
];

const sucursales = [
  { id: 1, name: "Sucursal Centro", address: "Calle 10 #15-20, Centro" },
  { id: 2, name: "Sucursal Norte", address: "Carrera 15 #85-30, Zona Rosa" },
  { id: 3, name: "Sucursal Sur", address: "Avenida 68 #40-50, Kennedy" },
];

// Mock functions - replace with your actual functions
const convertFromMilliunits = (amount: number) => amount / 100;

export function CartSummary() {
  const [deliveryMethod, setDeliveryMethod] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [addresses, setAddresses] = useState<
    Array<{ id: number; name: string; address: string; city: string }>
  >([]);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "",
    city: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const getShippingCost = () => {
    if (deliveryMethod === "city") return 300; // $3 in cents
    if (deliveryMethod === "national") return 600; // $6 in cents
    return 0;
  };

  const total = subtotal + getShippingCost();

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.address && newAddress.city) {
      const newId = addresses.length + 1;
      setAddresses([...addresses, { id: newId, ...newAddress }]);
      setNewAddress({ name: "", address: "", city: "" });
      setIsAddressDialogOpen(false);
    }
  };

  const handleDeliveryMethodChange = (value: string) => {
    setDeliveryMethod(value);
    if (value !== "pickup") {
      setSelectedBranch("");
    }
  };

  const createSale = (items: typeof cartItems) => {
    console.log("Creating sale with items:", items);
    console.log("Delivery method:", deliveryMethod);
    console.log("Selected branch:", selectedBranch);
    console.log("Total:", total);
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
                <RadioGroupItem value="city" id="city" />
                <Label htmlFor="city" className="flex-1 cursor-pointer">
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
                    <div className="font-semibold text-lg text-primary">
                      {currencyFormat(convertFromMilliunits(300))}
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="national" id="national" />
                <Label htmlFor="national" className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center w-full gap-3">
                      {/* <Image
                        src="/assets/servientrega-logo.webp"
                        alt="servientrega"
                        width={100}
                        height={100}
                      /> */}
                      <TruckIcon size={20} className=" text-primary"/>
                      <div>
                        <p className="font-medium">Envío Nacional</p>
                        <p className="text-sm text-muted-foreground">
                          1-3 días hábiles
                        </p>
                      </div>
                    </div>
                    <div className="font-semibold text-lg text-primary">
                      {currencyFormat(convertFromMilliunits(600))}
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

          {deliveryMethod === "pickup" && (
            <div className="mt-4 space-y-2">
              <Label>Selecciona una sucursal:</Label>
              <RadioGroup
                value={selectedBranch}
                onValueChange={setSelectedBranch}
              >
                {sucursales.map((sucursal) => (
                  <div
                    key={sucursal.id}
                    className="flex items-center space-x-2 p-2 border rounded"
                  >
                    <RadioGroupItem
                      value={sucursal.id.toString()}
                      id={`branch-${sucursal.id}`}
                    />
                    <Label
                      htmlFor={`branch-${sucursal.id}`}
                      className="flex-1 cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{sucursal.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {sucursal.address}
                        </p>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}
        </CardContent>
      </Card>

      {(deliveryMethod === "city" || deliveryMethod === "national") && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Direcciones de Entrega
            </CardTitle>
          </CardHeader>
          <CardContent>
            {addresses.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  No tienes direcciones guardadas
                </p>
                <Dialog
                  open={isAddressDialogOpen}
                  onOpenChange={setIsAddressDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Dirección
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Dirección</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nombre de la dirección</Label>
                        <Input
                          id="name"
                          placeholder="Ej: Casa, Oficina"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección completa</Label>
                        <Textarea
                          id="address"
                          placeholder="Calle, número, barrio, referencias"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          placeholder="Ciudad"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button onClick={handleAddAddress} className="w-full">
                        Guardar Dirección
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <div className="space-y-3">
                {addresses.map((address) => (
                  <Card key={address.id} className="p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{address.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.address}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
                <Dialog
                  open={isAddressDialogOpen}
                  onOpenChange={setIsAddressDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Otra Dirección
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Agregar Nueva Dirección</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nombre de la dirección</Label>
                        <Input
                          id="name"
                          placeholder="Ej: Casa, Oficina"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Dirección completa</Label>
                        <Textarea
                          id="address"
                          placeholder="Calle, número, barrio, referencias"
                          value={newAddress.address}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              address: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          placeholder="Ciudad"
                          value={newAddress.city}
                          onChange={(e) =>
                            setNewAddress({
                              ...newAddress,
                              city: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button onClick={handleAddAddress} className="w-full">
                        Guardar Dirección
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Original order summary */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen del pedido</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{currencyFormat(convertFromMilliunits(subtotal))}</span>
          </div>
          {deliveryMethod && deliveryMethod !== "pickup" && (
            <div className="flex justify-between">
              <span>Envío:</span>
              <span>
                {currencyFormat(convertFromMilliunits(getShippingCost()))}
              </span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>{currencyFormat(convertFromMilliunits(total))}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => createSale(cartItems)}
            className="w-full"
            disabled={
              !deliveryMethod ||
              (deliveryMethod === "pickup" && !selectedBranch)
            }
          >
            Finalizar compra
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
