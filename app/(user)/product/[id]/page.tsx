"use client";
import { useProductStore } from "@/stores/user/product-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/components/product/interface";
import ProductIdView from "@/components/product/product-id.-view";

export default function ProductIdPage() {
  const params = useParams();
  const productId = params?.id as string;
  const [productData, setProductData] = useState<Product>();
  const { getProductId, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
    const product = getProductId(productId);
    setProductData(product);
  }, [fetchProducts, productId, getProductId]);

  

  return (
    <ProductIdView productId={productData?.id} />
  );
}
