"use client";
import { createCategory, updateCategory } from "@/actions";
import CategoryAlert from "@/components/product/form-category";
import { Category } from "@/components/interfaces/interface";
import { DeleteAlert } from "@/components/shared/delete-alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCategoryStore } from "@/stores/user/category-store";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CategoriesPage() {
  const { categories, fetchCategories, deleteCategory } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (category: Partial<Category>) => {
    try {
      const res = await createCategory(category);
      if (res.statusCode === 201) {
        toast.success(res.message || "Categoría creada correctamente");
        fetchCategories();
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
        fetchCategories();
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
          <h1 className="text-xl font-semibold">Categorias</h1>
          <p className="text-sm text-muted-foreground">
            Aquí puedes ver todas las categorías de productos. Puedes editar o
            eliminar cada categoría según sea necesario.
          </p>
        </div>
        <CategoryAlert
          onCancel={() => {}}
          onSave={(category) => handleSave(category)}
        />
      </div>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 flex items-center gap-1`}
                  >
                    {category.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <CategoryAlert
                    category={category}
                    onCancel={() => {}}
                    onSave={(category) => handleEdit(category)}
                  />
                  <DeleteAlert
                    id={category.id}
                    name={category.name}
                    onDelete={(id) => {
                      deleteCategory(id);
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
