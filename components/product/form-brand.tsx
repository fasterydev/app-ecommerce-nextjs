"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditIcon, PlusIcon } from "lucide-react";
import { Brand, Category } from "./interface";

type Props = {
  brand?: Brand;
  onSave: (brand: Partial<Brand>) => void;
  onCancel: () => void;
};

export default function BrandAlert({ brand, onSave, onCancel }: Props) {
  const isEditing = !!brand;

  const [formData, setFormData] = useState<Partial<Brand>>({
    name: brand?.name || "",
    ...(brand?.id && { id: brand.id }),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false); // Controla apertura del modal

  const handleInputChange = (
    field: keyof Category,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || !formData.name.trim())
      newErrors.name = "El nombre es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setOpen(false); // Cierra el modal
      setFormData({
        name: "",
        id: undefined,
      }); // Limpia el formulario
      setErrors({});
    }
  };

  const handleCancel = () => {
    onCancel();
    setFormData({
      name: "",
      id: undefined,
    }); // Limpia
    setErrors({});
    setOpen(false); // Cierra
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={brand ? "icon" : "sm"}
          variant={brand ? "outline" : "default"}
        >
          {brand ? <EditIcon /> : <PlusIcon />}
          {brand ? "" : "Crear marca"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEditing ? "Editar categoría" : "Crear categoría"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isEditing
              ? "Modifica la información de esta categoría."
              : "Agrega una nueva categoría para tus productos."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="name">Nombre *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <AlertDialogFooter className="pt-4">
            <AlertDialogCancel onClick={handleCancel}>
              Cancelar
            </AlertDialogCancel>
            <Button type="submit">{isEditing ? "Editar" : "Crear"}</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
