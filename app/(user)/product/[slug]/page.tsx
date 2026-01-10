"use client";
import { usePublicProductStore } from "@/stores/public/product-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import ProductIdView from "@/components/product/product-id-view";

export default function ProductIdPage() {
  const params = useParams();
  const productId = params?.slug as string;
  const { currentProduct, fetchProduct, isLoading } = usePublicProductStore();

  useEffect(() => {
    if (productId) {
      fetchProduct(productId);
    }
  }, [productId, fetchProduct]);

  return <ProductIdView product={currentProduct || undefined} productId={productId} />;
}
