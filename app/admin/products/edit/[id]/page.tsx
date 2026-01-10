"use client";

import { editProduct } from "@/actions";
import { Product } from "@/components/interfaces/product";
import ProductForm from "@/components/product/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminProductStore } from "@/stores/admin/product-store";
import { AlertTriangleIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const { currentProduct, fetchProductById, updateProduct, isLoading, isSaving } = useAdminProductStore();

  const handleSave = async (product: Partial<Product>) => {
    try {
      const result = await updateProduct(product);
      if (result.success) {
        router.push("/admin/products");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar el producto"
      );
    }
  };

  const handleCancel = () => {
    router.push("/admin/products");
  };

  // Cargar producto por ID
  useEffect(() => {
    if (productId) {
      fetchProductById(productId).then((product) => {
        if (product) {
          setEditingProduct(product);
        }
      });
    }
  }, [productId, fetchProductById]);

  // Sincronizar currentProduct con editingProduct
  useEffect(() => {
    if (currentProduct && currentProduct.id === productId) {
      setEditingProduct(currentProduct);
    }
  }, [currentProduct, productId]);

  return (
    <>
      {isLoading ? (
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">Cargando producto...</p>
          </CardContent>
        </Card>
      ) : editingProduct ? (
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
