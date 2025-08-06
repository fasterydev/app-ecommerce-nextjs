"use client";

import ProductForm from "@/components/admin/product-form";
import { Product } from "@/components/product/interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/stores/user/product-store";
import { AlertTriangleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { products } = useProductStore();

  const handleSave = (product: Partial<Product>) => {
    console.log("Producto guardado:", product);
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  useEffect(() => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setEditingProduct(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {editingProduct ? (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <Card className="w-full max-w-md mx-auto border-red-500">
          <CardHeader className="flex flex-row items-center space-x-1">
            <AlertTriangleIcon className="text-red-500" />
            <CardTitle className="text-red-500 font-semibold">
              Producto no encontrado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No pudimos encontrar el producto que estás buscando. Verifica el
              ID o vuelve a la lista.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
