"use client";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";
import { usePublicCategoryStore } from "@/stores/public/category-store";

const MosaicCategory = () => {
  const { categories, fetchCategories, isLoading } = usePublicCategoryStore();

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Filtrar solo las categorías que tienen inHome === true
  const homeCategories = categories.filter((category) => category.inHome === true);

  if (isLoading || homeCategories.length === 0) {
    return null;
  }

  // Imágenes de fallback
  const fallbackImages = [
    "/assets/mosaic/1.png",
    "/assets/mosaic/2.png",
    "/assets/mosaic/3.png",
    "/assets/mosaic/4.png",
  ];

  return (
    <div className="grid grid-cols-2 mt-3 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 xl:pt-1 gap-4 h-[85vh]">
      {homeCategories[0] && (
        <div className="lg:row-span-2 h-full">
          <CategoryCard
            label={homeCategories[0].name || ""}
            image={homeCategories[0].urlImage || fallbackImages[0]}
            align="center"
            fullHeight
            link={homeCategories[0].id ? `/shop?categoryId=${homeCategories[0].id}` : "/shop"}
          />
        </div>
      )}
      {homeCategories[1] && (
        <div className="lg:row-span-2 h-full">
          <CategoryCard
            label={homeCategories[1].name || ""}
            image={homeCategories[1].urlImage || fallbackImages[1]}
            align="center"
            fullHeight
            link={homeCategories[1].id ? `/shop?categoryId=${homeCategories[1].id}` : "/shop"}
          />
        </div>
      )}
      {homeCategories[2] && (
        <CategoryCard
          label={homeCategories[2].name || ""}
          image={homeCategories[2].urlImage || fallbackImages[2]}
          align="center"
          link={homeCategories[2].id ? `/shop?categoryId=${homeCategories[2].id}` : "/shop"}
        />
      )}
      {homeCategories[3] && (
        <CategoryCard
          label={homeCategories[3].name || ""}
          image={homeCategories[3].urlImage || fallbackImages[3]}
          align="center"
          link={homeCategories[3].id ? `/shop?categoryId=${homeCategories[3].id}` : "/shop"}
        />
      )}
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
