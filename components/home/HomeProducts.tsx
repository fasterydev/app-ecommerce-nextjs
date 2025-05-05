import React from "react";
import ProductCard from "../ProductCard";

const HomeProducts = () => {
  const products = [
    {
      id: 1,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 1",
      description: "Description for Product 1",
      offerPrice: "10.80",
    },
    {
      id: 2,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 2",
      description: "Description for Product 2",
      offerPrice: "10.80",
    },
    {
      id: 3,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 3",
      description: "Description for Product 3",
      offerPrice: "10.80",
    },
    {
      id: 4,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 4",
      description: "Description for Product 4",
      offerPrice: "10.80",
    },
    {
      id: 5,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 5",
      description: "Description for Product 5",
      offerPrice: "10.80",
    },
    {
      id: 6,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 6",
      description: "Description for Product 6",
      offerPrice: "10.80",
    },
    {
      id: 7,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 7",
      description: "Description for Product 7",
      offerPrice: "10.80",
    },
    {
      id: 8,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 8",
      description: "Description for Product 8",
      offerPrice: "10.80",
    },
    {
      id: 9,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 9",
      description: "Description for Product 9",
      offerPrice: "10.80",
    },
    {
      id: 10,
      image: ["/assets/bose_headphone_image.png"],
      name: "Product 10",
      description: "Description for Product 10",
      offerPrice: "10.80",
    },
  ];

  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
};

export default HomeProducts;
