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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { EditIcon, PlusIcon, Upload, X } from "lucide-react";
import { Category } from "@/components/interfaces/category";
import Image from "next/image";
import { uploadFile } from "@/actions";

type Props = {
  category?: Category;
  onSave: (category: Partial<Category>) => void;
  onCancel: () => void;
};

export default function CategoryAlert({ category, onSave, onCancel }: Props) {
  const isEditing = !!category;

  const [formData, setFormData] = useState<Partial<Category>>({
    name: category?.name || "",
    description: category?.description || "",
    urlImage: category?.urlImage || "",
    inHome: category?.inHome || false,
    ...(category?.id && { id: category.id }),
  });

  // Actualizar formData cuando cambia la categoría
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || "",
        description: category.description || "",
        urlImage: category.urlImage || "",
        inHome: category.inHome || false,
        ...(category.id && { id: category.id }),
      });
    } else {
      setFormData({
        name: "",
        description: "",
        urlImage: "",
        inHome: false,
        id: undefined,
      });
    }
  }, [category]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false); // Controla apertura del modal
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleInputChange = (
    field: keyof Category,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        urlImage: "Por favor selecciona un archivo de imagen",
      }));
      return;
    }

    setIsUploading(true);
    try {
      const result = await uploadFile(file);
      if (result.statusCode === 201 && result.url) {
        setFormData((prev) => ({ ...prev, urlImage: result.url }));
        setErrors((prev) => ({ ...prev, urlImage: "" }));
      } else {
        setErrors((prev) => ({
          ...prev,
          urlImage: result.message || "Error al subir la imagen",
        }));
      }
    } catch (err) {
      console.error("Error al subir archivo:", err);
      setErrors((prev) => ({
        ...prev,
        urlImage: "Error al subir la imagen",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, urlImage: "" }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || !formData.name.trim())
      newErrors.name = "El nombre es requerido";
    if (!formData.description || !formData.description.trim())
      newErrors.description = "La descripción es requerida";

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
        description: "",
        urlImage: "",
        inHome: false,
        id: undefined,
      }); // Limpia el formulario
      setErrors({});
    }
  };

  const handleCancel = () => {
    onCancel();
    setFormData({
      name: category?.name || "",
      description: category?.description || "",
      urlImage: category?.urlImage || "",
      inHome: category?.inHome || false,
      ...(category?.id && { id: category.id }),
    }); // Restaura valores originales
    setErrors({});
    setOpen(false); // Cierra
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size={category ? "icon" : "sm"}
          variant={category ? "outline" : "default"}
        >
          {category ? <EditIcon /> : <PlusIcon />}
          {category ? "" : "Crear categoría"}
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

          <div className="space-y-1">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Upload Area */}
          <div className="space-y-1">
            <Label>Imagen de la categoría</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.urlImage ? (
                <div className="relative group">
                  <Image
                    src={formData.urlImage}
                    alt="Imagen de categoría"
                    width={200}
                    height={200}
                    className="w-full h-32 object-cover rounded-lg border mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={removeImage}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arrastra una imagen aquí o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="category-image-upload"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("category-image-upload")?.click()
                    }
                    disabled={isUploading}
                  >
                    {isUploading ? "Subiendo..." : "Seleccionar Imagen"}
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    PNG, JPG hasta 10MB
                  </p>
                </>
              )}
            </div>
            {errors.urlImage && (
              <p className="text-sm text-red-500">{errors.urlImage}</p>
            )}
          </div>

          {/* InHome Switch */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="inHome">Mostrar en inicio</Label>
              <Switch
                id="inHome"
                checked={formData.inHome ? true : false}
                onCheckedChange={(checked) =>
                  handleInputChange("inHome", checked)
                }
              />
            </div>
            <p className="text-xs text-gray-500">
              Activa esta opción para mostrar la categoría en la página de inicio
            </p>
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
