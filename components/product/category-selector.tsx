"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { useEffect } from "react";
import { Category } from "@/components/interfaces/category";
import { useCategoryStore } from "@/stores/customer/category-store";

type CategorySelectorProps = {
  value?: string; // category.id
  defaultValue?: string; // category.id
  onChange: (category: Category) => void;
  disabled?: boolean;
  className?: string;
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  className = "",
}) => {
  const { categories, fetchCategories } = useCategoryStore();
  const selected = value ?? defaultValue ?? "";

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-1.5">
      <Label htmlFor="category">Categoria *</Label>
      <Select
        value={selected}
        onValueChange={(selectedId) => {
          const selectedBrand = categories.find((b) => b.id === selectedId);
          if (selectedBrand) onChange(selectedBrand);
        }}
        disabled={disabled}
      >
        <SelectTrigger id="category" className={clsx("w-full", className)}>
          <SelectValue placeholder="Categoria">
            {categories.find((b) => b.id === selected)?.name ?? "Categorias"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
