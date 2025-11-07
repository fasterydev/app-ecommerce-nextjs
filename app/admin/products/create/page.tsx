"use client";
import { Product } from "@/components/interfaces/interface";
import ProductForm from "@/components/product/product-form";
import { useProductStore } from "@/stores/user/product-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProductPage() {
  const router = useRouter();
  const [editingProduct] = useState<Product | undefined>();
  const { createProduct } = useProductStore();

  const handleSave = async (product: Partial<Product>) => {
    try {
      await createProduct(product);
      router.push("/admin/products");
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
