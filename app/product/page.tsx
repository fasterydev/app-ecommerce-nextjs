"use client";
import { getProducts } from "@/actions";
import { assets } from "@/assets/assets";
import { Product } from "@/components/product/product";
import ProductCard from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCardIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProductPage = () => {
  const productData = {
    _id: "67a1f4e43f34a77b6dde9144",
    userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
    name: "Apple AirPods Pro 2nd gen",
    description:
      "Apple AirPods Pro (2nd Gen) with MagSafe Case (USB-C) provide excellent sound, active noise cancellation, and a comfortable fit. The USB-C case ensures quick charging, and they pair seamlessly with Apple devices for an effortless audio experience.",
    price: 499.99,
    offerPrice: 399.99,
    image: [
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/lrllaprpos2pnp5c9pyy.png",
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/jqotgy2rvm36vfjv6lxl.png",
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667238/niw7tqxvjsxt7wcehxeo.png",
      "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667237/h8cq4x9cfzqzwaiarvpk.png",
    ],
    category: "Earphone",
    date: 1738667236865,
    __v: 0,
  };
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
    <>
      <div className="pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <Card className="overflow-hidden p-0 mb-4">
              <Image
                src={productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover "
                width={1280}
                height={720}
              />
            </Card>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <Card key={index} className="cursor-pointer p-0">
                  <Image
                    src={image}
                    alt="alt"
                    className="w-full h-auto object-cover"
                    width={250}
                    height={250}
                  />
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-medium  mb-4">{productData.name}</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_icon}
                  alt="star_icon"
                />
                <Image
                  className="h-4 w-4"
                  src={assets.star_dull_icon}
                  alt="star_dull_icon"
                />
              </div>
              <p>(4.5)</p>
            </div>
            <p className=" mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-muted-foreground line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className=" my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className=" font-medium">Brand</td>
                    <td className=" ">Generic</td>
                  </tr>
                  <tr>
                    <td className=" font-medium">Color</td>
                    <td className=" ">Multi</td>
                  </tr>
                  <tr>
                    <td className=" font-medium">Category</td>
                    <td className="">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <Button size={"lg"} variant={"secondary"}>
                <ShoppingCartIcon />
                Añadir al carrito
              </Button>
              <Button size={"lg"}>
                <CreditCardIcon />
                Comprar ahora
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Productos{" "}
              <span className="font-medium text-primary">Destacados</span>
            </p>
            <div className="w-28 h-0.5 bg-primary mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <Button>Ver más productoss</Button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
