"use client";
import { getProducts } from "@/actions";
import { DeleteProductAlert } from "@/components/product/belete-product-alert";
import { Product } from "@/components/product/product";
import { ProductStatusBadge } from "@/components/product/product-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.products || []);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Productos</h1>
      <p>
        Aquí puedes ver y administrar los productos disponibles en la tienda.
      </p>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Image
                    src={product.images[0]}
                    alt={product.images[0]}
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
                <TableCell>
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
        <code className="text-sm">{JSON.stringify(products, null, 2)}</code>
      </pre> */}
    </div>
  );
}
