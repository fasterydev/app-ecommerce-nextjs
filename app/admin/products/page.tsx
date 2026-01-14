"use client";
import { DeleteProductAlert } from "@/components/product/delete-product-alert";
import { ProductStatusBadge } from "@/components/product/product-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminProductStore } from "@/stores/admin/product-store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditIcon, EyeIcon, PackageIcon, PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBrandsAdmin, getCategoriesAdmin } from "@/actions";
import type { Brand } from "@/components/interfaces/brand";
import type { Category } from "@/components/interfaces/category";

export default function ProductsAdmin() {
  const { products, fetchProducts, isLoading, pagination, filters } =
    useAdminProductStore();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [search, setSearch] = useState(filters.search || "");
  const [brandId, setBrandId] = useState<string>(filters.brandId || "all");
  const [categoryId, setCategoryId] = useState<string>(
    filters.categoryId || "all"
  );
  const [limit, setLimit] = useState<string>(String(filters.limit || 10));

  useEffect(() => {
    // cargar opciones para filtros (admin: incluye inactivos si el backend los devuelve)
    (async () => {
      try {
        const [b, c] = await Promise.all([
          getBrandsAdmin({ page: 1, limit: 1000 }),
          getCategoriesAdmin({ page: 1, limit: 1000 }),
        ]);
        setBrands("brands" in b ? b.brands : []);
        setCategories("categories" in c ? c.categories : []);
      } catch (e) {
        console.error("Error cargando filtros de marcas/categorías:", e);
      }
    })();

    fetchProducts({ page: 1, limit: Number(limit) || 10 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const appliedBrandId = useMemo(
    () => (brandId === "all" ? undefined : brandId),
    [brandId]
  );
  const appliedCategoryId = useMemo(
    () => (categoryId === "all" ? undefined : categoryId),
    [categoryId]
  );
  const appliedSearch = useMemo(() => {
    const s = search.trim();
    return s.length ? s : undefined;
  }, [search]);

  const applyFilters = async (opts?: { page?: number }) => {
    await fetchProducts({
      page: opts?.page ?? 1,
      limit: Number(limit) || 10,
      search: appliedSearch,
      brandId: appliedBrandId,
      categoryId: appliedCategoryId,
    });
  };

  return (
    <div>
      <PageHeader
        icon={PackageIcon}
        title="Inventario"
        description="Aquí puedes ver y administrar los productos disponibles en la tienda."
        action={
          <Link href="/admin/products/create">
            <Button>
              <PlusIcon size={16} />
              Crear producto
            </Button>
          </Link>
        }
      />

      {/* Filtros + paginación */}
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-wrap md:items-center">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre..."
            className="w-full md:w-72"
          />

          <Select value={brandId} onValueChange={setBrandId}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Marca" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las marcas</SelectItem>
              {brands.map((b) => (
                <SelectItem key={b.id} value={b.id}>
                  {b.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full md:w-56">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

          <Button
            variant="outline"
            onClick={() => applyFilters({ page: 1 })}
            disabled={isLoading}
            className="w-full md:w-auto"
          >
            Aplicar
          </Button>
        </div>

        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between md:w-auto md:justify-end">
          <Button
            variant="outline"
            disabled={isLoading || (pagination?.page ?? 1) <= 1}
            onClick={() => applyFilters({ page: (pagination?.page ?? 1) - 1 })}
            className="w-full sm:w-auto"
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground text-center sm:text-left">
            Página {pagination?.page ?? filters.page} de{" "}
            {pagination?.totalPages ?? "—"}
          </span>
          <Button
            variant="outline"
            disabled={
              isLoading ||
              !pagination?.totalPages ||
              (pagination?.page ?? 1) >= pagination.totalPages
            }
            onClick={() => applyFilters({ page: (pagination?.page ?? 1) + 1 })}
            className="w-full sm:w-auto"
          >
            Siguiente
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Marca</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Cargando productos...
                </TableCell>
              </TableRow>
            ) : products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay productos disponibles
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="bg-muted p-1 rounded-md"
                  />
                  {product.name}
                </TableCell>
                <TableCell className="font-medium">
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 flex items-center gap-1`}
                  >
                    {product?.brand ? product.brand.name : "Sin marca"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 flex items-center gap-1`}
                  >
                    {product?.category
                      ? product.category.name
                      : "Sin categoría"}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  <Badge
                    variant="outline"
                    className={`px-2 py-0.5 flex items-center gap-1`}
                  >
                    <PackageIcon />
                    {product?.stock ? product.stock : "Sin stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ProductStatusBadge status={product.status} />
                </TableCell>
                <TableCell className="space-x-2 justify-end items-center">
                  <Link
                    href={`/product/${product.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size={"icon"} variant={"outline"}>
                      <EyeIcon />
                    </Button>
                  </Link>
                  <Link href={`/admin/products/edit/${product.id}`}>
                    <Button size={"icon"} variant={"outline"}>
                      <EditIcon />
                    </Button>
                  </Link>
                  <DeleteProductAlert
                    productId={product.id}
                    onDelete={() => {
                      applyFilters({ page: pagination?.page ?? filters.page });
                    }}
                  />
                </TableCell>
              </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
