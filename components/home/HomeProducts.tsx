"use client";
import { useEffect } from "react";
import ProductCard from "../product/product-card";
import { Button } from "../ui/button";
import Link from "next/link";
import ProductCardSkeleton from "../product/product-card-skeleton";
import { useProductStore } from "@/stores/customer/product-store";

const HomeProducts = () => {
  const { products, fetchProducts, isLoading } = useProductStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center pt-14">
      <div className="flex flex-col items-center mb-4">
        <p className="text-2xl font-medium">
          Productos <span className="font-medium text-primary">Destacados</span>
        </p>
        <div className="w-28 h-0.5 bg-primary mt-2"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center xl:gap-6 gap-4 mt-6 pb-14 w-full">
        {isLoading &&
          Array.from({ length: 5 }, (_, i) => <ProductCardSkeleton key={i} />)}

        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <Link href="/shop">
        <Button className="px-12 py-2.5">Ver más productos</Button>
      </Link>
    </div>
  );
};

export default HomeProducts;
