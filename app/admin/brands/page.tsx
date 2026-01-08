"use client";
import { createBrand, updateCategory } from "@/actions";
import BrandAlert from "@/components/product/form-brand";
import { Brand, Category } from "@/components/interfaces/interface";
import { DeleteAlert } from "@/components/shared/delete-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBrandStore } from "@/stores/customer/brand-store";
import { useEffect } from "react";
import { toast } from "sonner";
import { TagIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CategoriesPage() {
  const { brands, fetchBrands, deleteBrand } = useBrandStore();

  useEffect(() => {
    fetchBrands();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (brand: Partial<Brand>) => {
    try {
      const res = await createBrand(brand);
      if (res.statusCode === 201) {
        toast.success(res.message || "Marca creada correctamente");
        fetchBrands();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar el producto"
      );
    } finally {
    }
  };

  const handleEdit = async (category: Partial<Category>) => {
    try {
      const res = await updateCategory(category);
      if (res.statusCode === 200) {
        toast.success(res.message || "Categoría actualizada correctamente");
        fetchBrands();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar la categoría"
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3">
            <Card className="p-2 w-fit shadow-sm">
              <TagIcon className="text-primary" size={28} />
            </Card>
            <h1 className="text-xl font-semibold">Marcas</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Administra las marcas de tus productos aquí.
          </p>
        </div>
        <BrandAlert onCancel={() => {}} onSave={(brand) => handleSave(brand)} />
      </div>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="pl-4">Nombre</TableHead>
              <TableHead className="text-right pr-4">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{brand.name}</TableCell>
                <TableCell className="space-x-2 text-right">
                  <BrandAlert
                    brand={brand}
                    onCancel={() => {}}
                    onSave={(brand) => handleEdit(brand)}
                  />
                  <DeleteAlert
                    id={brand.id}
                    name={brand.name}
                    onDelete={(id) => {
                      deleteBrand(id);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
