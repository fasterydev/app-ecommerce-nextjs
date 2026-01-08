"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/components/interfaces/interface";
import { Button } from "@/components/ui/button";
import {
  BadgeCheckIcon,
  HeartIcon,
  Share2Icon,
  StoreIcon,
  TruckIcon,
} from "lucide-react";
import { currencyFormat } from "@/utils/currencyFormat";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import WhatsappButton from "@/components/shared/whatsapp-button";
import ProductSkeleton from "./product-id-skeleton";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { useProductStore } from "@/stores/customer/product-store";
import ProductCard from "./product-card";
import ButtonAddToCart from "./button-add-to-cart";

interface ProductIdViewProps {
  productId?: string;
  product?: Product;
}

export default function ProductIdView({
  productId,
  product,
}: ProductIdViewProps) {
  const [mainImage, setMainImage] = useState<string>();
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>();

  const { getProductsRandom, fetchProducts, getProductId } = useProductStore();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentProduct?.name,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Sharing not supported");
    }
  };

  useEffect(() => {
    async function loadData() {
      // Siempre cargamos productos random
      await fetchProducts();
      setRandomProducts(getProductsRandom(5));

      // Lógica para producto actual
      if (productId) {
        const prod = getProductId(productId);
        setCurrentProduct(prod);
        setMainImage(prod?.images?.[0]);
      } else if (product) {
        setCurrentProduct(product);
        setMainImage(product.images?.[0]);
      } else {
        // Si no hay ni productId ni product
        setCurrentProduct(undefined);
      }
    }

    loadData();
  }, [productId, product, fetchProducts, getProductsRandom, getProductId]);

  // Validación: si no hay producto válido -> Skeleton
  if (!currentProduct) {
    return <ProductSkeleton />;
  }

  return (
    <div className="xl:pt-14 pt-3 space-y-10">
      {/* <pre>
        {JSON.stringify({ productId, product, currentProduct }, null, 2)}
      </pre> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="lg:px-16 xl:px-20">
          {/* Imagen principal */}
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 aspect-square">
            <Image
              src={
                mainImage ||
                currentProduct?.images[0] ||
                "https://placehold.co/600x600.png"
              }
              alt={currentProduct?.name || "Product Image"}
              className="w-full h-full object-cover mix-blend-multiply"
              width={1280}
              height={1280}
            />
          </div>

          {/* Miniaturas */}
          <div className="grid grid-cols-4 gap-4">
            {currentProduct?.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setMainImage(image)}
                className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10 aspect-square"
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index}`}
                  className="w-full h-full object-cover mix-blend-multiply"
                  width={1280}
                  height={1280}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-3">
            {currentProduct?.name}
          </h1>
          {currentProduct.brand ? (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <p>{currentProduct.brand.name}</p>
              <div className="flex items-center gap-0.5">
                <BadgeCheckIcon size={20} className="text-blue-500" />
              </div>
            </div>
          ) : null}
          <p className="text-gray-600 mt-3">{currentProduct?.description}</p>
          <p className="mt-4">
            <Button className="text-3xl font-medium py-6">
              {currencyFormat(
                convertFromMilliunits(currentProduct?.total) || 0
              )}
            </Button>
          </p>
          <hr className="bg-gray-600 my-5" />
          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
                {currentProduct?.brand && (
                  <tr>
                    <td className="text-gray-600 font-medium">Marca</td>
                    <td className="text-gray-800/50 ">
                      {currentProduct.brand.name || "Desconocida"}
                    </td>
                  </tr>
                )}
                {currentProduct?.category && (
                  <tr>
                    <td className="text-gray-600 font-medium">Categoria</td>
                    <td className="text-gray-800/50">
                      {currentProduct.category.name || "Desconocida"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 mt-5 items-stretch">
            {/* Botón principal */}

            <ButtonAddToCart size="lg" productId={currentProduct.slug} />

            {/* WhatsApp */}
            <WhatsappButton className="w-full" />

            {/* Grupo de acciones secundarias */}
            <div className="flex items-center justify-center gap-2 w-full">
              <Button variant="outline" size="icon" className="rounded-full">
                <HeartIcon className="w-5 h-5" />
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Share2Icon className="w-5 h-5" />
              </Button>
            </div>
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
          {currentProduct?.htmlContent ? (
            <ScrollArea className="h-[400px] w-full rounded-md">
              <div
                className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-full text-justify break-words [&_img]:max-w-full [&_table]:w-full [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: currentProduct.htmlContent,
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
