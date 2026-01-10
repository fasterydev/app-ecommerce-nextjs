"use client";
import { useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePublicProductStore } from "@/stores/public/product-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";

const FeaturedProduct = () => {
  const { products, fetchProducts, isLoading } = usePublicProductStore();

  useEffect(() => {
    // Cargar productos destacados (isBestSeller: true)
    fetchProducts({ limit: 20 }); // Cargar más para tener opciones
  }, [fetchProducts]);

  // Obtener productos destacados (máximo 3)
  const featuredProducts = useMemo(() => {
    return products
      .filter((product) => product.isBestSeller && product.status === "published")
      .slice(0, 3);
  }, [products]);

  // Si no hay productos destacados, usar los primeros 3 productos
  const displayProducts = useMemo(() => {
    if (featuredProducts.length > 0) {
      return featuredProducts;
    }
    return products
      .filter((product) => product.status === "published")
      .slice(0, 3);
  }, [featuredProducts, products]);

  if (isLoading) {
    return (
      <div className="my-14">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-medium">Productos destacados</p>
          <div className="w-28 h-0.5 bg-primary mt-2"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="relative group h-64 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <div className="my-14">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-medium">Productos destacados</p>
        <div className="w-28 h-0.5 bg-primary mt-2"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        {displayProducts.map((product) => (
          <div
            key={product.id}
            className="relative group overflow-hidden rounded-lg"
          >
            <div className="relative w-full h-64 md:h-80">
              <Image
                src={product.images[0] || "https://placehold.co/600x600.png"}
                alt={product.name}
                fill
                className="object-cover group-hover:brightness-75 transition duration-300 rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 space-y-2 z-10">
                <p className="font-medium text-xl lg:text-2xl text-white">
                  {product.name}
                </p>
                <p className="text-sm lg:text-base leading-5 max-w-60 text-white/90 line-clamp-2">
                  {product.description}
                </p>
                <div className="text-white font-semibold text-lg">
                  {currencyFormat(convertFromMilliunits(product.total))}
                </div>
                <Link href={`/product/${product.slug}`}>
                  <Button className="flex items-center gap-1.5 bg-primary px-4 py-2 hover:bg-primary/90">
                    <div>Comprar ahora</div>
                    <ExternalLinkIcon size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
