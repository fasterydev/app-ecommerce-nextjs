"use client";
import { DeleteProductAlert } from "@/components/product/belete-product-alert";
import { ProductStatusBadge } from "@/components/product/product-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProductStore } from "@/stores/user/product-store";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";

export default function ProductsAdmin() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Productos</h1>
          <p className="text-sm text-muted-foreground">
            Aquí puedes ver y administrar los productos disponibles en la
            tienda.
          </p>
        </div>
        <Link href="/admin/products/create">
          <Button>
            <PlusIcon size={16} />
            Crear producto
          </Button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
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
                <TableCell className="font-medium">{product.stock}</TableCell>
                <TableCell className="font-medium">
                  {product.isBestSeller ? "Sí" : "No"}
                </TableCell>
                <TableCell>
                  <ProductStatusBadge status="draft" />
                </TableCell>
                <TableCell className="space-x-2 justify-end flex items-center">
                  <DeleteProductAlert
                    productId={product.id}
                    onDelete={fetchProducts}
                  />
                  <Button size={"icon"} variant={"outline"}>
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
