"use client";
import { Card, CardContent } from "@/components/ui/card";
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
import { dateFormat } from "@/utils/dateFormat";
import { HashIcon } from "lucide-react";
import { useEffect } from "react";

export default function SalesPage() {
  const { sales, fetchSales } = useSaleStore();

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        {/* <div className="mb-6 flex items-center space-x-2 text-sm ">
          <Link href="/" className="flex items-center ">
            <HomeIcon className="mr-1 h-3 w-3" />
            Inicio
          </Link>
          <span>/</span>
          <span className="font-medium ">Mis Pedidos</span>
        </div> */}

        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-semibold sm:text-3xl">Mis Pedidos</h1>
          <p className="">
            Revisa el estado de tus pedidos y gestiona tus compras.
          </p>
        </div>
        {/* Desktop Table */}

        <div className="hidden md:block">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead className="w-[100px]">Pedido</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium flex space-x-1 items-center">
                    <HashIcon size={14} />
                    <div>{sale.idNumer}</div>
                  </TableCell>
                  <TableCell>{sale.status}</TableCell>
                  <TableCell>{dateFormat(sale.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    {currencyFormat(convertFromMilliunits(sale.total))}
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
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Pedido:
                    </span>
                    <span className="font-medium flex space-x-1 items-center">
                      <HashIcon size={14} />
                      <div>{sale.idNumer}</div>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estado:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === "Pagado"
                          ? "bg-green-100 text-green-800"
                          : sale.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {sale.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Fecha:
                    </span>
                    <span>{dateFormat(sale.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total:
                    </span>
                    <span>
                      {currencyFormat(convertFromMilliunits(sale.total))}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
