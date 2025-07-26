"use client";

import { createProduct } from "@/actions";
import ProductForm from "@/components/admin/product-form";
import { Product } from "@/components/product/product";
import { useState } from "react";

export default function CreateProductPage() {
  const [editingProduct] = useState<Product | undefined>();

  const handleSave = async (product: Product) => {
    try {
      const res = await createProduct(product);
      console.log("Product created:", res);
    } catch (error) {
      console.error("Error creating product:", error);
    }
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
