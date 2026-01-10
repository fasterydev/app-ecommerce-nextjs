"use client";
import { Product } from "@/components/interfaces/product";
import ProductForm from "@/components/product/product-form";
import { useAdminProductStore } from "@/stores/admin/product-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProductPage() {
  const router = useRouter();
  const [editingProduct] = useState<Product | undefined>();
  const { createProduct, isSaving } = useAdminProductStore();

  const handleSave = async (product: Partial<Product>) => {
    try {
      const result = await createProduct(product);
      if (result.success) {
        router.push("/admin/products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCancel = () => {
    router.replace("/admin/products");
  };

  return (
    <ProductForm
      product={editingProduct}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
