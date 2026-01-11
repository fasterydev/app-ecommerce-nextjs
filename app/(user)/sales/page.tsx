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
import { useSaleStore } from "@/stores/customer/sale-store";
import { convertFromMilliunits } from "@/utils/covertAmountMiliunits";
import { currencyFormat } from "@/utils/currencyFormat";
import { dateFormat } from "@/utils/dateFormat";
import { 
  HashIcon, 
  HomeIcon, 
  PackageIcon, 
  CalendarIcon,
  Loader2Icon,
  ShoppingBagIcon
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SalesPage() {
  const { sales, fetchSales, isLoading } = useSaleStore();

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
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground transition-colors">
            <HomeIcon className="mr-1 h-3 w-3" />
            Inicio
          </Link>
          <span>/</span>
          <span className="font-medium text-foreground">Mis Pedidos</span>
        </div>

        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold tracking-tight">
            Mis Pedidos
          </h1>
          <p className="text-muted-foreground">
            Revisa el estado de tus pedidos y gestiona tus compras.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <Card>
            <CardContent className="flex items-center justify-center py-16">
              <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
            </CardContent>
          </Card>
        ) : sales.length === 0 ? (
          /* Empty State */
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBagIcon className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No hay pedidos realizados aún
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Cuando realices tu primera compra, aparecerá aquí junto con todos los detalles de tu pedido.
              </p>
              <Button asChild>
                <Link href="/shop">
                  <PackageIcon className="mr-2 h-4 w-4" />
                  Explorar productos
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-hidden rounded-lg border bg-card shadow-sm">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[100px]">Pedido</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Productos</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="text-right w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <HashIcon size={16} className="text-muted-foreground" />
                          <span className="text-lg">#{sale.idNumer}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <SaleStatusBadge status={sale.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <PackageIcon size={16} className="text-muted-foreground" />
                          <span className="font-medium">{totalProducts(sale)} productos</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon size={14} />
                          <span>{dateFormat(sale.createdAt)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-lg">
                        {currencyFormat(convertFromMilliunits(sale.total))}
                      </TableCell>
                      <TableCell className="text-right">
                        <DetailsProduct sale={sale} mode="view" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {sales.map((sale) => (
                <Card key={sale.id} className="shadow-sm">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between pb-3 border-b">
                        <div className="flex items-center gap-2">
                          <HashIcon size={18} className="text-muted-foreground" />
                          <span className="text-xl font-bold">#{sale.idNumer}</span>
                        </div>
                        <SaleStatusBadge status={sale.status} />
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">Productos</p>
                          <div className="flex items-center gap-2">
                            <PackageIcon size={16} className="text-muted-foreground" />
                            <span className="font-medium">{totalProducts(sale)}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1.5">Fecha</p>
                          <div className="flex items-center gap-2">
                            <CalendarIcon size={14} className="text-muted-foreground" />
                            <span className="text-sm">{dateFormat(sale.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Total and Actions */}
                      <div className="flex items-center justify-between pt-3 border-t">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Total</p>
                          <p className="text-2xl font-bold">
                            {currencyFormat(convertFromMilliunits(sale.total))}
                          </p>
                        </div>
                        <DetailsProduct sale={sale} mode="view" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
