"use client";
import { createProduct } from "@/actions";
import ProductForm from "@/components/admin/product-form";
import { Product } from "@/components/product/interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateProductPage() {
  const router = useRouter();
  const [editingProduct] = useState<Product | undefined>();

  const handleSave = async (product: Partial<Product>) => {
    try {
      const res = await createProduct(product);
      if (res.statusCode === 201) {
        toast.success(res.message);
        router.push("/admin/products");
      } else {
        toast.error(res.message);
      }
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
