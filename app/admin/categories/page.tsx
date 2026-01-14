"use client";
import CategoryAlert from "@/components/product/form-category";
import { Category } from "@/components/interfaces/category";
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
import { useAdminCategoryStore } from "@/stores/admin/category-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TagIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  const {
    categories,
    fetchCategories,
    deleteCategory,
    createCategory,
    updateCategory,
    pagination,
    filters,
    isLoading,
  } = useAdminCategoryStore();

  const [search, setSearch] = useState(filters.search || "");
  const [limit, setLimit] = useState<string>(String(filters.limit || 10));

  useEffect(() => {
    fetchCategories({ page: 1, limit: Number(limit) || 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (category: Partial<Category>) => {
    try {
      const res = await createCategory(category);
      if (res.success) {
        toast.success(res.message || "Categoría creada correctamente");
        fetchCategories();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar el producto"
      );
    }
  };

  const handleEdit = async (category: Partial<Category>) => {
    try {
      const res = await updateCategory(category);
      if (res.success) {
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

  const applyFilters = async (opts?: { page?: number }) => {
    await fetchCategories({
      page: opts?.page ?? 1,
      limit: Number(limit) || 10,
      search: search.trim() || undefined,
    });
  };

  return (
    <div>
      <PageHeader
        icon={TagIcon}
        title="Categorias"
        description="Aquí puedes ver todas las categorías de productos. Puedes editar o eliminar cada categoría según sea necesario."
        action={
          <CategoryAlert
            onCancel={() => {}}
            onSave={(category) => handleSave(category)}
          />
        }
      />

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categoría..."
            className="md:w-72"
          />
          <Select value={limit} onValueChange={setLimit}>
            <SelectTrigger className="w-full md:w-32">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => applyFilters({ page: 1 })} disabled={isLoading}>
            Aplicar
          </Button>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="outline"
            disabled={isLoading || (pagination?.page ?? 1) <= 1}
            onClick={() => applyFilters({ page: (pagination?.page ?? 1) - 1 })}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            Página {pagination?.page ?? filters.page} de {pagination?.totalPages ?? "—"}
          </span>
          <Button
            variant="outline"
            disabled={
              isLoading ||
              !pagination?.totalPages ||
              (pagination?.page ?? 1) >= pagination.totalPages
            }
            onClick={() => applyFilters({ page: (pagination?.page ?? 1) + 1 })}
          >
            Siguiente
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>En Inicio</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  {category.urlImage ? (
                    <div className="relative w-16 h-16">
                      <Image
                        src={category.urlImage}
                        alt={category.name}
                        fill
                        className="object-cover rounded-md border"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center">
                      <TagIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </TableCell>
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
                <TableCell>
                  <Badge
                    variant={category.inHome ? "default" : "secondary"}
                    className={`px-2 py-0.5 flex items-center gap-1`}
                  >
                    {category.inHome ? "Sí" : "No"}
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
                      applyFilters({ page: pagination?.page ?? filters.page });
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
