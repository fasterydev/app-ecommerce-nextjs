"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { getUserData, updateProfile } from "@/actions";
import Loading from "./loading";

interface ProfileData {
  nombre: string;
  apellido: string;
  correo: string;
  whatsapp: string;
}

export function UpdateProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileData>({
    nombre: "",
    apellido: "",
    correo: "",
    whatsapp: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUserData();
      if (result.user) {
        setFormData({
          nombre: result.user.firstName || "",
          apellido: result.user.lastName || "",
          correo: result.user.email || "",
          whatsapp: result.user.phone || "",
        });
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (formData: ProfileData) => {
    try {
      setIsLoading(true);
      const response = await updateProfile({
        firstName: formData.nombre,
        lastName: formData.apellido,
        phone: formData.whatsapp,
      });

      if (response.statusCode === 201) {
        throw new Error("Error al actualizar la información");
      }

      toast.success("¡Éxito!", {
        description: "Tu información ha sido actualizada correctamente",
      });
    } catch (error) {
      toast.error("Error", {
        description: "Hubo un problema al actualizar tu información",
      });
      console.error("Error al actualizar la información:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!formData.correo) return <Loading/>;

  return (
    <Card className="xl:w-1/2 w-full m-auto">
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre *</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apellido">Apellido *</Label>
              <Input
                id="apellido"
                type="text"
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="correo" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Correo Electrónico *
            </Label>
            <Input
              id="correo"
              type="email"
              placeholder="tu@email.com"
              value={formData.correo}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Número de WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="0999-999-999"
              value={formData.whatsapp}
              onChange={(e) => handleInputChange("whatsapp", e.target.value)}
            />
          </div>

          <Button
            onClick={() => handleSubmit(formData)}
            className="mx-auto flex"
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar Información"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
