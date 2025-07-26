"use client";

import ProductForm from "@/components/admin/product-form";
import { Product } from "@/components/product/product";
import { useState } from "react";

export default function Page() {
  const [editingProduct] = useState<Product | undefined>();

  const handleSave = (product: Product) => {
    console.log("Producto guardado:", product);
    // Aquí implementarías la lógica para guardar en la base de datos
    alert(`Producto ${product.id ? "actualizado" : "creado"} exitosamente!`);
  };

  const handleCancel = () => {};

  return (
    <ProductForm
      product={editingProduct}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
