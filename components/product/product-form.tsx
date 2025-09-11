"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  Save,
  ImageIcon,
  DollarSignIcon,
  PackageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrandSelector } from "../product/brand-selector";
import { Switch } from "../ui/switch";
import { Product } from "../product/interface";
import { HtmlEditor } from "../shared/simple-editor";
import { AmountInput } from "../shared/amount-input";
import {
  convertFromMilliunits,
  convertToMilliunits,
} from "@/utils/covertAmountMiliunits";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { uploadFile } from "@/actions";
import { CategorySelector } from "./category-selector";

interface ProductFormProps {
  product?: Product;
  onSave: (product: Partial<Product>) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSave,
  onCancel,
}: ProductFormProps) {
  const isEditing = !!product;

  const [formData, setFormData] = useState<Partial<Product>>({
    name: product?.name || "",
    brandId: product?.brand?.id || null,
    categoryId: product?.category?.id || null,
    description: product?.description || "",
    images: product?.images || [],
    isNew: product?.isNew || false,
    isBestSeller: product?.isBestSeller || false,
    sku: product?.sku || "",
    cost: product?.cost || 0,
    revenue: product?.revenue || 0,
    htmlContent: product?.htmlContent || "",
    status: product?.status || "draft",
    stock: product?.stock || 0,
    ...(product?.id && { id: product.id }),
  });

  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = async (files: FileList | null) => {
    if (!files) return;

    const uploadedImages: string[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        try {
          const result = await uploadFile(file);
          if (result.statusCode === 201 && result.url) {
            uploadedImages.push(result.url);
          } else {
            console.error("Error al subir archivo:", result.message);
          }
        } catch (err) {
          console.error("Error al subir archivo:", err);
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images ?? []), ...uploadedImages].slice(0, 6),
    }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images ?? []).filter((_, i) => i !== index),
    }));
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
    if (!formData.sku || !formData.sku.trim())
      newErrors.sku = "El SKU es requerido";
    if (!formData.brandId) newErrors.brandId = "La marca es requerida";
    if (formData.isNew === undefined)
      newErrors.isNew = "El estado es requerido";
    if (formData.isBestSeller === undefined)
      newErrors.isBestSeller = "El estado es requerido";
    if (formData.cost === undefined || formData.cost <= 0)
      newErrors.cost = "El costo debe ser mayor a 0";
    if (formData.revenue === undefined || formData.revenue <= 0)
      newErrors.revenue = "La ganancia debe ser mayor a 0";
    if (formData.stock === undefined || formData.stock < 0)
      newErrors.stock = "El stock debe ser mayor o igual a 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };
  const defaultHtmlContent = `
  <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">
    Lorem Ipsum Dolor Sit Amet
  </h2>

  <p style="font-size: 1rem; margin-bottom: 1rem;">
    El <strong>Lorem Ipsum</strong> es simplemente el texto de relleno de las imprentas y archivos de texto. Ha sido el estándar de la industria desde el siglo XVI.
  </p>

  <p style="font-size: 1rem; margin-bottom: 1.5rem;">
    <em>
      Se ha utilizado como texto de prueba en tipografías, maquetación y diseño web para simular el contenido real.
    </em>
  </p>

  <table style="width: 100%; border-collapse: collapse; border: 1px solid #1e293b; margin-bottom: 1rem;">
    <thead>
      <tr>
        <th style="border: 1px solid #1e293b; padding: 8px; font-weight: bold;">Encabezado</th>
        <th style="border: 1px solid #1e293b; padding: 8px; font-weight: bold;">Detalle</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #1e293b; padding: 8px;">Lorem</td>
        <td style="border: 1px solid #1e293b; padding: 8px;">Texto de ejemplo</td>
      </tr>
      <tr>
        <td style="border: 1px solid #1e293b; padding: 8px;">Ipsum</td>
        <td style="border: 1px solid #1e293b; padding: 8px;">Contenido simulado</td>
      </tr>
      <tr>
        <td style="border: 1px solid #1e293b; padding: 8px;">Dolor</td>
        <td style="border: 1px solid #1e293b; padding: 8px;">Maquetación web</td>
      </tr>
      <tr>
        <td style="border: 1px solid #1e293b; padding: 8px;">Sit</td>
        <td style="border: 1px solid #1e293b; padding: 8px;">Texto de prueba</td>
      </tr>
      <tr>
        <td style="border: 1px solid #1e293b; padding: 8px;">Amet</td>
        <td style="border: 1px solid #1e293b; padding: 8px;">Diseño responsivo</td>
      </tr>
    </tbody>
  </table>

  <p style="font-size: 1rem;">
    <strong>Incluye:</strong> párrafos de prueba, encabezados, tablas y estilos básicos para maquetación.
  </p>
`;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-semibold ">
            {isEditing ? "Editar Producto" : "Crear Producto"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Modifica la información del producto"
              : "Completa la información para crear un nuevo producto"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Nombre del Producto *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Ej: iPhone 15 Pro Max"
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="sku">SKU *</Label>
                    <Input
                      id="sku"
                      value={formData.sku}
                      onChange={(e) => handleInputChange("sku", e.target.value)}
                      placeholder="Ej: IPH15PM-256-BLK"
                      className={errors.sku ? "border-red-500" : ""}
                    />
                    {errors.sku && (
                      <p className="text-sm text-red-500 mt-1">{errors.sku}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="grid gap-1.5">
                    <BrandSelector
                      value={formData.brandId ?? undefined}
                      className={errors.brand ? "border-red-500" : ""}
                      onChange={(brand) =>
                        handleInputChange("brandId", brand.id)
                      }
                    />
                    {errors.brand && (
                      <p className="text-sm text-red-500">{errors.brand}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <CategorySelector
                      value={formData.categoryId ?? undefined}
                      className={errors.category ? "border-red-500" : ""}
                      onChange={(category) =>
                        handleInputChange("categoryId", category.id)
                      }
                    />
                    {errors.category && (
                      <p className="text-sm text-red-500">{errors.category}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="status">Estado *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleInputChange("status", value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Estados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Estados</SelectLabel>
                          <SelectItem value="draft">Borrador</SelectItem>
                          <SelectItem value="published">Publicado</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.name && (
                      <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <Switch
                        id="isNew"
                        checked={formData.isNew ? true : false}
                        onCheckedChange={(checked) =>
                          handleInputChange("isNew", checked)
                        }
                      />
                      <Label htmlFor="isNew">Es Nuevo</Label>
                    </div>
                    {errors.isNew && (
                      <p className="text-sm text-red-500">{errors.isNew}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <div className="flex items-center justify-center space-x-2 mt-3">
                      <Switch
                        id="isBestSeller"
                        checked={formData.isBestSeller ? true : false}
                        onCheckedChange={(checked) =>
                          handleInputChange("isBestSeller", checked)
                        }
                      />
                      <Label htmlFor="isBestSeller">Top Ventas</Label>
                    </div>
                    {errors.isBestSeller && (
                      <p className="text-sm text-red-500">
                        {errors.isBestSeller}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="description">Descripción *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="Describe las características principales del producto..."
                    rows={4}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="stock">Stock *</Label>
                    <AmountInput
                      id="stock"
                      Icon={PackageIcon}
                      decimalScale={0}
                      decimalsLimit={0}
                      defaultValue={isEditing ? formData.stock : formData.stock}
                      onValueChange={(value) =>
                        handleInputChange("stock", Number(value))
                      }
                      className={errors.stock ? "border-red-500" : ""}
                    />
                    {errors.stock && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.stock}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="cost">Costo *</Label>
                    <AmountInput
                      id="cost"
                      Icon={DollarSignIcon}
                      defaultValue={
                        isEditing
                          ? convertFromMilliunits(formData.cost)
                          : formData.cost
                      }
                      onValueChange={(value) =>
                        handleInputChange("cost", convertToMilliunits(value))
                      }
                      className={errors.cost ? "border-red-500" : ""}
                    />
                    {errors.cost && (
                      <p className="text-sm text-red-500 mt-1">{errors.cost}</p>
                    )}
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="revenue">Ganancia *</Label>
                    <AmountInput
                      id="revenue"
                      Icon={DollarSignIcon}
                      defaultValue={
                        isEditing
                          ? convertFromMilliunits(formData.revenue)
                          : formData.revenue
                      }
                      onValueChange={(value) =>
                        handleInputChange("revenue", convertToMilliunits(value))
                      }
                      className={errors.revenue ? "border-red-500" : ""}
                    />
                    {errors.revenue && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.revenue}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* <pre>
              <code className="text-sm">
                {JSON.stringify(formData, null, 2)}
              </code>
            </pre>
            <pre>
              <code className="text-sm">
                {JSON.stringify(product, null, 2)}
              </code>
            </pre> */}
            <div className="m-auto">
              <HtmlEditor
                defaultValue={defaultHtmlContent}
                value={product?.htmlContent}
                onChange={(html) => {
                  setFormData((prev) => ({ ...prev, htmlContent: html }));
                }}
              />
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5" />
                  Imágenes del Producto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arrastra imágenes aquí o haz clic para seleccionar
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                    id="image-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                  >
                    Seleccionar Archivos
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Máximo 6 imágenes. PNG, JPG hasta 10MB
                  </p>
                </div>

                {/* Image Preview */}
                {(formData.images?.length ?? 0) > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Imágenes ({formData.images?.length ?? 0}/6)</Label>
                      {(formData.images?.length ?? 0) > 0 && (
                        <Badge variant="secondary">
                          {formData.images?.[0] && "Principal"}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(formData.images ?? []).map((image, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={image || " "}
                            alt={`Producto ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-24 object-cover rounded-lg border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          {index === 0 && (
                            <Badge className="absolute bottom-1 left-1 text-xs">
                              Principal
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" size="lg">
                    <Save size={16} />
                    {isEditing ? "Actualizar Producto" : "Crear Producto"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={onCancel}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
