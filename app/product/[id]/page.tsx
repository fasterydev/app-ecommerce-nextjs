"use client";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import React from "react";

const Product = () => {
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

  const products = [
    {
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
    },
    {
      _id: "67a1f52e3f34a77b6dde914a",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Bose QuietComfort 45",
      description:
        "The Bose QuietComfort 45 headphones are engineered for exceptional sound quality and unparalleled noise cancellation. With a 24-hour battery life and comfortable, lightweight design, these headphones deliver premium audio for any environment. Whether on a flight, in the office, or at home, the Bose QC45 blocks out distractions, offering an immersive listening experience.",
      price: 429.99,
      offerPrice: 329.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667311/m16coelz8ivkk9f0nwrz.png",
      ],
      category: "Headphone",
      date: 1738667310300,
      __v: 0,
    },
    {
      _id: "67a1f5663f34a77b6dde914c",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Samsung Galaxy S23",
      description:
        "The Samsung Galaxy S23 offers an all-encompassing mobile experience with its advanced AMOLED display, offering vibrant visuals and smooth interactions. Equipped with top-of-the-line fitness tracking features and cutting-edge technology, this phone delivers outstanding performance. With powerful hardware, a sleek design, and long battery life, the S23 is perfect for those who demand the best in mobile innovation.",
      price: 899.99,
      offerPrice: 799.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667368/xjd4eprpwqs7odbera1w.png",
      ],
      category: "Smartphone",
      date: 1738667366224,
      __v: 0,
    },
    {
      _id: "67a1f5993f34a77b6dde914e",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Garmin Venu 2",
      description:
        "The Garmin Venu 2 smartwatch blends advanced fitness tracking with sophisticated design, offering a wealth of features such as heart rate monitoring, GPS, and sleep tracking. Built with a 24-hour battery life, this watch is ideal for fitness enthusiasts and anyone looking to enhance their daily lifestyle. With a stunning AMOLED display and customizable watch faces, the Venu 2 combines technology with style seamlessly.",
      price: 399.99,
      offerPrice: 349.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667419/hdfi4u3fmprazpnrnaga.png",
      ],
      category: "Earphone",
      date: 1738667417511,
      __v: 0,
    },
    {
      _id: "67a1f5ef3f34a77b6dde9150",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "PlayStation 5",
      description:
        "The PlayStation 5 takes gaming to the next level with ultra-HD graphics, a powerful 825GB SSD, and ray tracing technology for realistic visuals. Whether you're into high-action games or immersive storytelling, the PS5 delivers fast loading times, seamless gameplay, and stunning visuals. It's a must-have for any serious gamer looking for the ultimate gaming experience.",
      price: 599.99,
      offerPrice: 499.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667504/dd3l13vfoartrgbvkkh5.png",
      ],
      category: "Accessories",
      date: 1738667503075,
      __v: 0,
    },
    {
      _id: "67a1f70c3f34a77b6dde9156",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Canon EOS R5",
      description:
        "The Canon EOS R5 is a game-changing mirrorless camera with a 45MP full-frame sensor, offering ultra-high resolution and the ability to shoot 8K video. Whether you're capturing professional-quality stills or cinematic video footage, this camera delivers exceptional clarity, speed, and color accuracy. With advanced autofocus and in-body stabilization, the R5 is ideal for photographers and videographers alike.",
      price: 4199.99,
      offerPrice: 3899.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667790/r5h370zuujvrw461c6wy.png",
      ],
      category: "Camera",
      date: 1738667788883,
      __v: 0,
    },
    {
      _id: "67a1f7c93f34a77b6dde915a",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "MacBook Pro 16",
      description:
        "The MacBook Pro 16, powered by Apple's M2 Pro chip, offers outstanding performance with 16GB RAM and a 512GB SSD. Whether you're editing high-resolution video, developing software, or multitasking with ease, this laptop can handle the toughest tasks. It features a stunning Retina display with True Tone technology, making it a top choice for professionals in creative industries or anyone who demands premium performance in a portable form.",
      price: 2799.99,
      offerPrice: 2499.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738667979/rzri7kytphxalrm9rubd.png",
      ],
      category: "Laptop",
      date: 1738667977644,
      __v: 0,
    },
    {
      _id: "67a1f8363f34a77b6dde915c",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Sony WF-1000XM5",
      description:
        "Sony WF-1000XM5 true wireless earbuds deliver immersive sound with Hi-Res Audio and advanced noise cancellation technology. Designed for comfort and quality, they provide a stable, snug fit for a secure listening experience. Whether you're working out or traveling, these earbuds will keep you connected with the world around you while enjoying rich, clear sound.",
      price: 349.99,
      offerPrice: 299.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738668088/e3zjaupyumdkladmytke.png",
      ],
      category: "Earphone",
      date: 1738668086331,
      __v: 0,
    },
    {
      _id: "67a1f85e3f34a77b6dde915e",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "Samsung Projector 4k",
      description:
        "The Samsung 4K Projector offers an immersive cinematic experience with ultra-high-definition visuals and realistic color accuracy. Equipped with a built-in speaker, it delivers rich sound quality to complement its stunning 4K resolution. Perfect for movie nights, gaming, or presentations, this projector is the ultimate choice for creating an at-home theater experience or professional setting.",
      price: 1699.99,
      offerPrice: 1499.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738668128/qqdcly8a8vkyciy9g0bw.png",
      ],
      category: "Accessories",
      date: 1738668126660,
      __v: 0,
    },
    {
      _id: "67a1fa4b3f34a77b6dde9166",
      userId: "user_2sZFHS1UIIysJyDVzCpQhUhTIhw",
      name: "ASUS ROG Zephyrus G16",
      description:
        "The ASUS ROG Zephyrus G16 gaming laptop is powered by the Intel Core i9 processor and features an RTX 4070 GPU, delivering top-tier gaming and performance. With 16GB of RAM and a 1TB SSD, this laptop is designed for gamers who demand extreme power, speed, and storage. Equipped with a stunning 16-inch display, it's built to handle the most demanding titles and applications with ease.",
      price: 2199.99,
      offerPrice: 1999.99,
      image: [
        "https://res.cloudinary.com/djbvf02yt/image/upload/v1738668621/wig1urqgnkeyp4t2rtso.png",
      ],
      category: "Laptop",
      date: 1738668619198,
      __v: 0,
    },
  ];

  return (
    <>
      <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
              <Image
                src={productData.image[0]}
                alt="alt"
                className="w-full h-auto object-cover mix-blend-multiply"
                width={1280}
                height={720}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {productData.image.map((image, index) => (
                <div
                  key={index}
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
              {productData.name}
            </h1>
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
            <p className="text-gray-600 mt-3">{productData.description}</p>
            <p className="text-3xl font-medium mt-6">
              ${productData.offerPrice}
              <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                ${productData.price}
              </span>
            </p>
            <hr className="bg-gray-600 my-6" />
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full max-w-72">
                <tbody>
                  <tr>
                    <td className="text-gray-600 font-medium">Brand</td>
                    <td className="text-gray-800/50 ">Generic</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Color</td>
                    <td className="text-gray-800/50 ">Multi</td>
                  </tr>
                  <tr>
                    <td className="text-gray-600 font-medium">Category</td>
                    <td className="text-gray-800/50">{productData.category}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center mt-10 gap-4">
              <button className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button className="w-full py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 mt-16">
            <p className="text-3xl font-medium">
              Featured{" "}
              <span className="font-medium text-orange-600">Products</span>
            </p>
            <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
            {products.slice(0, 5).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
            See more
          </button>
        </div>
      </div>
    </>
  );
};

export default Product;
