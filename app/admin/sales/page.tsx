"use client";
import { ProductStatusBadge } from "@/components/product/product-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSaleStore } from "@/stores/user/sale-store";
import { useEffect } from "react";

export default function SalesAdminPage() {
  const { sales, fetchSales } = useSaleStore();

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-2">Ventas</h1>
      <p>Aquí puedes gestionar las ventas de tus productos.</p>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Productos</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.idNumer}</TableCell>
                <TableCell className="font-medium">
                  {sale.user?.email}
                </TableCell>
                <TableCell className="font-medium">
                  <ProductStatusBadge status={sale.status} />
                </TableCell>
                <TableCell className="font-medium">
                  {sale.products.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <pre>
        <code>{JSON.stringify(sales, null, 2)}</code>
      </pre>
    </div>
  );
}
