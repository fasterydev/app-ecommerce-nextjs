"use client";
import { usePublicProductStore } from "@/stores/public/product-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductIdView from "@/components/product/product-id-view";
import ProductSkeleton from "@/components/product/product-id-skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ProductIdPage() {
  const params = useParams();
  const productId = params?.slug as string;
  const { currentProduct, fetchProduct, isLoading, isNotFound } = usePublicProductStore();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  // Mostrar skeleton mientras carga
  if (isLoading) {
    return <ProductSkeleton />;
  }

  // Mostrar mensaje de producto no encontrado
  if (isNotFound) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4">
        <AlertCircle className="w-16 h-16 text-muted-foreground" />
        <h1 className="text-3xl font-semibold text-gray-800">Producto no encontrado</h1>
        <p className="text-gray-600 text-center max-w-md">
          Lo sentimos, no pudimos encontrar el producto que estás buscando. 
          Puede que el producto haya sido eliminado o la URL sea incorrecta.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild>
            <Link href="/shop">Ver todos los productos</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <ProductIdView product={currentProduct || undefined} productId={productId} />;
}
