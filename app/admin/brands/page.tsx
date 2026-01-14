"use client";
import BrandAlert from "@/components/product/form-brand";
import { Brand } from "@/components/interfaces/brand";
import { DeleteAlert } from "@/components/shared/delete-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminBrandStore } from "@/stores/admin/brand-store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TagIcon } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function BrandsPage() {
  const { brands, fetchBrands, deleteBrand, createBrand, updateBrand, pagination, filters, isLoading } =
    useAdminBrandStore();

  const [search, setSearch] = useState(filters.search || "");
  const [limit, setLimit] = useState<string>(String(filters.limit || 10));

  useEffect(() => {
    fetchBrands({ page: 1, limit: Number(limit) || 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSave = async (brand: Partial<Brand>) => {
    try {
      const res = await createBrand(brand);
      if (res.success) {
        toast.success(res.message || "Marca creada correctamente");
        fetchBrands();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar el producto"
      );
    }
  };

  const handleEdit = async (brand: Partial<Brand>) => {
    try {
      const res = await updateBrand(brand);
      if (res.success) {
        toast.success(res.message || "Marca actualizada correctamente");
        fetchBrands();
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Error desconocido al actualizar la marca"
      );
    }
  };

  const applyFilters = async (opts?: { page?: number }) => {
    await fetchBrands({
      page: opts?.page ?? 1,
      limit: Number(limit) || 10,
      search: search.trim() || undefined,
    });
  };

  return (
    <div>
      <PageHeader
        icon={TagIcon}
        title="Marcas"
        description="Administra las marcas de tus productos aquí."
        action={
          <BrandAlert onCancel={() => {}} onSave={(brand) => handleSave(brand)} />
        }
      />

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marca..."
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
                    onSave={(b) => handleEdit(b)}
                  />
                  <DeleteAlert
                    id={brand.id}
                    name={brand.name}
                    onDelete={(id) => {
                      deleteBrand(id);
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
