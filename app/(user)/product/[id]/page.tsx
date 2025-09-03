"use client";
import { useProductStore } from "@/stores/user/product-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/components/product/interface";
import ProductId from "@/components/product/product-Id";

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
    <ProductId product={productData} />
  );
}
