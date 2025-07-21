"use client";
import { assets } from "@/assets/assets";
import { Card } from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import clsx from "clsx";

type Category = {
  label: string;
  image: StaticImageData;
  align?: "left" | "center" | "right";
};

const categories: Category[] = [
  { label: "Música", image: assets.girl_with_headphone_image, align: "center" },
  { label: "Podcast", image: assets.girl_with_headphone_image, align: "right" },
  {
    label: "Conciertos",
    image: assets.girl_with_headphone_image,
    align: "left",
  },
  {
    label: "Entrevistas",
    image: assets.girl_with_headphone_image,
    align: "center",
  },
];

const MosaicCategory = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 p-4 h-[85vh]">
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[0].label}
          image={categories[0].image}
          align={categories[0].align}
          fullHeight
        />
      </div>
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[1].label}
          image={categories[1].image}
          align={categories[1].align}
          fullHeight
        />
      </div>
      <CategoryCard
        label={categories[2].label}
        image={categories[2].image}
        align={categories[2].align}
      />
      <CategoryCard
        label={categories[3].label}
        image={categories[3].image}
        align={categories[3].align}
      />
    </div>
  );
};

const CategoryCard = ({
  label,
  image,
  align = "left",
  fullHeight = false,
}: {
  label: string;
  image: StaticImageData;
  align?: "left" | "center" | "right";
  fullHeight?: boolean;
}) => {
  const buttonPosition = {
    left: "left-4",
    center: "left-1/2 -translate-x-1/2",
    right: "right-4",
  };

  return (
    <Card
      className={clsx(
        "relative overflow-hidden group w-full",
        fullHeight ? "h-full" : "h-full"
      )}
    >
      <Image
        src={image}
        alt={label}
        fill
        className={clsx(
          "object-cover transition-transform duration-500 ease-in-out",
          "group-hover:scale-105"
        )}
      />
      <Button
        className={clsx(
          "absolute bottom-4 z-10 transform",
          buttonPosition[align]
        )}
      >
        {label}
      </Button>
      <div className="absolute inset-0 z-0" />
    </Card>
  );
};

export default MosaicCategory;
