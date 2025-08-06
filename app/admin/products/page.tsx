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
import { EditIcon, EyeIcon, PackageIcon, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

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
              <TableHead>Marca</TableHead>
              <TableHead>Stock</TableHead>
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
                    <PackageIcon />
                    {product?.stock ? product.stock : "Sin stock"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ProductStatusBadge status="draft" />
                </TableCell>
                <TableCell className="space-x-2 justify-end items-center">
                  
                  <Link href={`/product/${product.id}`} target="_blank" rel="noopener noreferrer">
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
                    onDelete={fetchProducts}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <pre>
        <code className="text-xs text-muted-foreground">
          {JSON.stringify(products, null, 2)}
        </code>
      </pre> */}
    </div>
  );
}
