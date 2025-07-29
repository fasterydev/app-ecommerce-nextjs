"use client";
import { assets } from "@/assets/assets";
import { Card } from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";

type Category = {
  label: string;
  image: StaticImageData;
  align?: "left" | "center" | "right";
  link?: string;
};

const categories: Category[] = [
  {
    label: "Música",
    image: assets.girl_with_headphone_image,
    align: "center",
    link: "/music",
  },
  {
    label: "Podcast",
    image: assets.girl_with_headphone_image,
    align: "right",
    link: "/podcast",
  },
  {
    label: "Conciertos",
    image: assets.girl_with_headphone_image,
    align: "left",
    link: "/concerts",
  },
  {
    label: "Entrevistas",
    image: assets.girl_with_headphone_image,
    align: "center",
    link: "/interviews",
  },
];

const MosaicCategory = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 gap-4 h-[85vh]">
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[0].label}
          image={categories[0].image}
          align={categories[0].align}
          fullHeight
          link={categories[0].link}
        />
      </div>
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[1].label}
          image={categories[1].image}
          align={categories[1].align}
          fullHeight
          link={categories[1].link}
        />
      </div>
      <CategoryCard
        label={categories[2].label}
        image={categories[2].image}
        align={categories[2].align}
        link={categories[2].link}
      />
      <CategoryCard
        label={categories[3].label}
        image={categories[3].image}
        align={categories[3].align}
        link={categories[3].link}
      />
    </div>
  );
};

const CategoryCard = ({
  label,
  image,
  align = "left",
  fullHeight = false,
  link = "#",
}: {
  label: string;
  image: StaticImageData;
  align?: "left" | "center" | "right";
  fullHeight?: boolean;
  link?: string;
}) => {
  const buttonPosition = {
    left: "left-4",
    center: "left-1/2 -translate-x-1/2",
    right: "right-4",
  };

  return (
    <Link href={link} className="relative">
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
    </Link>
  );
};

export default MosaicCategory;
