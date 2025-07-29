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

export default function SalesAdminPage() {
  const { products , fetchProducts } = useProductStore();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Ventas</h1>
      <p>
        Aquí puedes ver los productos que están a la venta. Puedes eliminar
        productos que ya no estén disponibles.
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
