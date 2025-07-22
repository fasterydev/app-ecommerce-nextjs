"use client";

import ProductForm from "@/components/admin/product-form";
import { useState } from "react";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  sku: string;
}

export default function Page() {
  const [showForm, setShowForm] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  const sampleProduct: Product = {
    id: "1",
    name: "iPhone 15 Pro Max",
    description:
      "El iPhone más avanzado con chip A17 Pro, cámara de 48MP y pantalla Super Retina XDR de 6.7 pulgadas.",
    price: 1199.99,
    category: "electronics",
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    stock: 25,
    sku: "IPH15PM-256-BLK",
  };

  const handleSave = (product: Product) => {
    console.log("Producto guardado:", product);
    // Aquí implementarías la lógica para guardar en la base de datos
    alert(`Producto ${product.id ? "actualizado" : "creado"} exitosamente!`);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <ProductForm
      product={editingProduct}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
