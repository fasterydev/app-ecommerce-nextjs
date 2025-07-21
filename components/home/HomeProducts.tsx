"use client";
import { useEffect, useState } from "react";
import ProductCard from "../product/product-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getProducts } from "@/actions";
import { Product } from "../product/product";
import ProductCardSkeleton from "../product/product-card-skeleton";

const HomeProducts = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsApi();
  }, []);

  return (
    <div className="flex flex-col items-center pt-14">
       <div className="flex flex-col items-center">
        <p className="text-2xl font-medium">Productos destacados</p>
        <div className="w-28 h-0.5 bg-primary mt-2"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center xl:gap-6 gap-4 mt-6 pb-14 w-full">
        {loading &&
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
