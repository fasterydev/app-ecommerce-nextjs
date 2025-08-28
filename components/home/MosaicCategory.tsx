"use client";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { useCategoryStore } from "@/stores/user/category-store";

const MosaicCategory = () => {
  const { categories } = useCategoryStore();

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 mt-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 xl:pt-1 gap-4 h-[85vh]">
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[0]?.name || ""}
          image="/home/wella-2-bw.jpg"
          align="center"
          fullHeight
          link="#"
        />
      </div>
      <div className="lg:row-span-2 h-full">
        <CategoryCard
          label={categories[1]?.name || ""}
          image="/home/wella-2-bw.jpg"
          align="center"
          fullHeight
          link="#"
        />
      </div>
      <CategoryCard
        label={categories[2]?.name || ""}
        image="/home/wella-2-bw.jpg"
        align="center"
        link="#"
      />
      <CategoryCard
        label={categories[3]?.name || ""}
        image="/home/wella-2-bw.jpg"
        align="center"
        link="#"
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
  label?: string;
  image: string;
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
          alt={image}
          fill
          className={clsx(
            "object-cover transition-transform duration-500 ease-in-out",
            "group-hover:scale-105"
          )}
        />
        {label && (
          <Button
            className={clsx(
              "absolute bottom-4 z-10 transform",
              buttonPosition[align]
            )}
          >
            {label}
          </Button>
        )}

        <div className="absolute inset-0 z-0" />
      </Card>
    </Link>
  );
};

export default MosaicCategory;
