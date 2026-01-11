"use client";
import { DetailsProduct } from "@/components/product/details-product";
import { SaleStatusBadge } from "@/components/sale/sale-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminSaleStore } from "@/stores/admin/sale-store";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { currencyFormat } from "@/utils/currencyFormat";
import { dateFormat } from "@/utils/dateFormat";
import { 
  PackageIcon, 
  ShoppingCartIcon, 
  HashIcon,
  UserIcon,
  CalendarIcon,
  Loader2Icon
} from "lucide-react";
import { useEffect } from "react";
import { PageHeader } from "@/components/shared/page-header";

export default function SalesAdminPage() {
  const { sales, fetchSales, isLoading } = useAdminSaleStore();

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalProducts = (sale: any) => {
    if (!sale.products || !Array.isArray(sale.products)) return 0;
    return sale.products.reduce(
      (acc: number, product: any) => acc + (product?.quantity ?? 1),
      0
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        icon={ShoppingCartIcon}
        title="Gestión de Ventas"
        description="Administra todas las ventas del sistema. Puedes ver detalles y actualizar estados de las ventas."
      />

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : sales.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCartIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2 text-muted-foreground">
              No hay ventas registradas
            </p>
            <p className="text-sm text-muted-foreground">
              Las ventas aparecerán aquí cuando los clientes realicen compras.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-hidden rounded-lg border bg-card">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[80px]">#</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Productos</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right w-[120px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-1">
                        <HashIcon size={14} className="text-muted-foreground" />
                        <span>{sale.idNumer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className="text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">
                            {sale.user?.firstName} {sale.user?.lastName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {sale.user?.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <SaleStatusBadge status={sale.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <PackageIcon size={16} className="text-muted-foreground" />
                        <span className="font-medium">{totalProducts(sale)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon size={14} />
                        <span>{dateFormat(sale.createdAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {currencyFormat(convertFromMilliunits(sale.total))}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <DetailsProduct sale={sale} mode="edit" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4 md:hidden">
            {sales.map((sale) => (
              <Card key={sale.id}>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <HashIcon size={14} className="text-muted-foreground" />
                          <span className="font-semibold">#{sale.idNumer}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <UserIcon size={14} className="text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">
                              {sale.user?.firstName} {sale.user?.lastName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sale.user?.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <SaleStatusBadge status={sale.status} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Productos</p>
                        <div className="flex items-center gap-1">
                          <PackageIcon size={14} className="text-muted-foreground" />
                          <span className="font-medium">{totalProducts(sale)}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Fecha</p>
                        <div className="flex items-center gap-1">
                          <CalendarIcon size={14} className="text-muted-foreground" />
                          <span className="text-sm">{dateFormat(sale.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total</p>
                        <p className="text-lg font-semibold">
                          {currencyFormat(convertFromMilliunits(sale.total))}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <DetailsProduct sale={sale} mode="edit" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
