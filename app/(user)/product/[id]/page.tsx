"use client";

import { useProductStore } from "@/stores/user/product-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/components/product/interface";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";

export default function ProductId() {
  const params = useParams();
  const productId = params?.id as string;
  const [productData, setProductData] = useState<Product>();
  const [mainImage, setMainImage] = useState(null);
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (!productId || products.length === 0) return;

    const product = products.find((p) => p.id === productId);
    setProductData(product);
  }, [products, productId]);

  return (
    <div className="pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
              src={
                mainImage ||
                productData?.images[0] ||
                "https://placehold.co/600x600.png"
              }
              alt={productData?.name || "Product Image"}
              className="w-full h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {productData?.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
              >
                <Image
                  src={image}
                  alt="alt"
                  className="w-full h-auto object-cover mix-blend-multiply"
                  width={1280}
                  height={720}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {productData?.name}
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="fill-amber-400 text-amber-400" size={16} />
            </div>
            <p>(4.5)</p>
          </div>
          <p className="text-gray-600 mt-3">{productData?.description}</p>
          <p className="text-3xl font-medium mt-6">
            {currencyFormat(convertFromMilliunits(productData?.cost) || 0)}
            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
              {currencyFormat(convertFromMilliunits(productData?.cost) || 0)}
            </span>
          </p>
          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                {productData?.brand && (
                  <tr>
                    <td className="text-gray-600 font-medium">Marca</td>
                    <td className="text-gray-800/50 ">
                      {productData.brand.name || "Desconocida"}
                    </td>
                  </tr>
                )}
                {productData?.category && (
                  <tr>
                    <td className="text-gray-600 font-medium">Categoria</td>
                    <td className="text-gray-800/50">
                      {productData.category.name || "Desconocida"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 items-center mt-5 gap-4">
            <Button size={"lg"} variant={"outline"}>
              <ShoppingCartIcon />
              Añadir al carrito
            </Button>
            <Button size={"lg"}>Comprar ahora</Button>
          </div>
        </div>
        <div className="flex flex-col xl:col-span-2 col-span-1 items-center">
          {productData?.htmlContent ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{
                __html: productData.htmlContent,
              }}
            />
          ) : (
            <p className="text-gray-600">No hay contenido adicional.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <p className="text-3xl font-medium">
            Productos{" "}
            <span className="font-medium text-primary">Destacados</span>
          </p>
          <div className="w-28 h-0.5 bg-primary mt-2"></div>
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {products.slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div> */}
        <Button className="px-8 py-2 mb-16">Ver más productos</Button>
      </div>
      {/* <pre>{JSON.stringify(productData, null, 2)}</pre>
      <pre>{JSON.stringify(mainImage, null, 2)}</pre> */}
    </div>
  );
}
