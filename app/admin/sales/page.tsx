"use client";
import { DetailsProduct } from "@/components/product/details-product";
import { SaleStatusBadge } from "@/components/sale/sale-status-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSaleStore } from "@/stores/user/sale-store";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { currencyFormat } from "@/utils/currencyFormat";
import { PackageIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useEffect } from "react";

export default function SalesAdminPage() {
  const { sales, fetchSales, deleteSale, isLoading } = useSaleStore();

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Card className="p-2 w-fit shadow-sm">
          <ShoppingCartIcon className="text-primary" size={28} />
        </Card>
        <h1 className="text-xl font-semibold">Ventas</h1>
      </div>
      <p>Aquí puedes gestionar las ventas de tus productos.</p>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Envío</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acciones</TableHead>
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
                  <SaleStatusBadge status={sale.status} />
                </TableCell>
                <TableCell className="font-medium">
                  <PackageIcon size={20} className="inline-block mr-1 mb-1" />
                  <span>
                    {sale.products.reduce(
                      (acc, product) => acc + (product?.quantity ?? 1),
                      0
                    )}
                  </span>
                </TableCell>
                <TableCell className="font-medium">
                  {currencyFormat(convertFromMilliunits(sale.subtotal))}
                </TableCell>
                <TableCell className="font-medium">
                  {currencyFormat(convertFromMilliunits(sale.shippingFee))}
                </TableCell>
                <TableCell className="font-medium">
                  {currencyFormat(convertFromMilliunits(sale.total))}
                </TableCell>
                <TableCell className="font-medium flex gap-2">
                  <DetailsProduct sale={sale} mode="edit" />
                  <Button
                    disabled={isLoading}
                    size="icon"
                    onClick={() => deleteSale(sale.id)}
                  >
                    <TrashIcon size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* <pre>
        <code>{JSON.stringify(sales, null, 2)}</code>
      </pre> */}
    </div>
  );
}
