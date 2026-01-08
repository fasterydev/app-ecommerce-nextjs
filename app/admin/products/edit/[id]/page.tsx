"use client";

import { editProduct } from "@/actions";
import { Product } from "@/components/interfaces/product";
import ProductForm from "@/components/product/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/stores/customer/product-store";
import { AlertTriangleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { products, fetchProducts } = useProductStore();

  const handleSave = async (product: Partial<Product>) => {
    try {
      const res = await editProduct(product);
      console.log("Respuesta de editar producto:", res);
      if (res.statusCode === 200) {
        toast.success(res.message || "Producto actualizado correctamente");
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar el producto"
      );
    } finally {
    }
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  // Solo cargar productos al inicio
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Buscar producto cuando productos o ID cambian
  useEffect(() => {
    if (!productId || products.length === 0) return;

    const product = products.find((p) => p.id === productId);
    setEditingProduct(product);
  }, [products, productId]);

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
