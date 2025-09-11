"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/components/product/interface";
import { Button } from "@/components/ui/button";
import {
  BadgeCheckIcon,
  ShoppingCartIcon,
  StoreIcon,
  TruckIcon,
} from "lucide-react";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import WhatsappButton from "@/components/shared/whatsapp-button";
import ProductSkeleton from "./product-id-skeleton";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { useProductStore } from "@/stores/user/product-store";
import ProductCard from "./product-card";

interface ProductIdViewProps {
  productId?: string;
}

export default function ProductIdView({ productId }: ProductIdViewProps) {
  const [product, setProduct] = useState<Product | undefined>();
  const [mainImage, setMainImage] = useState<string | undefined>();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  const { getProductsRandom, fetchProducts, getProductId } = useProductStore();

  useEffect(() => {
    async function loadProducts() {
      await fetchProducts();

      // set product específico
      if (productId) {
        const prod = getProductId(productId);
        setProduct(prod);
        setMainImage(prod?.images?.[0]);
      }

      // set productos random
      const random = getProductsRandom(5);
      setRandomProducts(random);
    }

    loadProducts();
  }, [productId, fetchProducts, getProductId, getProductsRandom]);

  if (!product) {
    return <ProductSkeleton />;
  }

  return (
    <div className="pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
            <Image
              src={
                mainImage ||
                product?.images[0] ||
                "https://placehold.co/600x600.png"
              }
              alt={product?.name || "Product Image"}
              className="w-full h-auto object-cover mix-blend-multiply"
              width={1280}
              height={720}
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product?.images.map((image, index) => (
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
          <h1 className="text-3xl font-medium text-gray-800/90 mb-3">
            {product?.name}
          </h1>
          {product.brand ? (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <p>{product.brand.name}</p>
              <div className="flex items-center gap-0.5">
                <BadgeCheckIcon size={20} className="text-blue-500" />
              </div>
            </div>
          ) : null}
          <p className="text-gray-600 mt-3">{product?.description}</p>
          <p className="text-3xl font-medium mt-6">
            {currencyFormat(convertFromMilliunits(product?.cost) || 0)}
          </p>
          <hr className="bg-gray-600 my-6" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                {product?.brand && (
                  <tr>
                    <td className="text-gray-600 font-medium">Marca</td>
                    <td className="text-gray-800/50 ">
                      {product.brand.name || "Desconocida"}
                    </td>
                  </tr>
                )}
                {product?.category && (
                  <tr>
                    <td className="text-gray-600 font-medium">Categoria</td>
                    <td className="text-gray-800/50">
                      {product.category.name || "Desconocida"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-2 grid-cols-1 items-center mt-5 gap-4">
            <Button size={"lg"}>
              <ShoppingCartIcon />
              Añadir al carrito
            </Button>
            <WhatsappButton className="w-full" />
          </div>
          <Separator className="my-8" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TruckIcon className="text-green-500" size={20} />
              <p className="text-gray-600 text-sm">Envío a todo el Ecuador</p>
            </div>
            {/* COMPRA SEGURA */}
            <div className="flex items-center gap-2 mb-3">
              <BadgeCheckIcon className="text-green-500" size={20} />
              <p className="text-gray-600 text-sm">
                Productos originales y de alta calidad
              </p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <StoreIcon className="text-green-500" size={20} />
              <p className="text-gray-600 text-sm">
                Compra online y retira en nuestras sucursales
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col xl:col-span-2 col-span-1 w-full">
          {product?.htmlContent ? (
            <ScrollArea className="h-[400px] w-full rounded-md">
              <div
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full text-justify break-words [&_img]:max-w-full [&_table]:w-full [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: product.htmlContent,
                }}
              />
            </ScrollArea>
          ) : (
            <p className="text-gray-600">No hay contenido adicional.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4">
          <p className="text-2xl font-medium">
            Productos{" "}
            <span className="font-medium text-primary">Destacados</span>
          </p>
          <div className="w-28 h-0.5 bg-primary mt-2"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
          {randomProducts.slice(0, 5).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
        <Button className="px-8 py-2 mb-16">Ver más productos</Button>
      </div>
    </div>
  );
}
