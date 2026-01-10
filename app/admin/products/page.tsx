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
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/shared/page-header";

export default function ProductsAdmin() {
  const { products, fetchProducts, isLoading } = useAdminProductStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                      fetchProducts();
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
