"use client";
import React, { useEffect } from "react";
import ProductCard from "../product/product-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getProducts } from "@/actions";
import { Product } from "../product/product";
import ProductCardSkeleton from "../product/product-card-skeleton";

const HomeProducts = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState<Product[]>([]);

  const getProductsApi = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      if (res.statusCode === 200) {
        setProducts(res.products);
      } else {
        console.error("Error al obtener los productos:", res.message);
      }
    } catch (error) {
      console.error("Error en getProducts:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsApi();
  }, []);

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-semibold text-left w-full">
        Productos más vendidos
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center xl:gap-6 gap-4 mt-6 pb-14 w-full">
         {
          loading &&
          Array.from({ length: 5 }, (_, i) => <ProductCardSkeleton key={i} />)
         } 

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
