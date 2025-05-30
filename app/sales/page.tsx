"use client";
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
import { EyeIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function SalesPage() {
  const invoices = [
    {
      invoice: "#123",
      status: "Pagado",
      date: "15 de octubre de 2025",
      total: "$150.00",
    },
    {
      invoice: "#124",
      status: "Pendiente",
      date: "16 de octubre de 2025",
      total: "$200.00",
    },
    {
      invoice: "#125",
      status: "Enviado",
      date: "17 de octubre de 2025",
      total: "$300.00",
    },
    {
      invoice: "#126",
      status: "Pagado",
      date: "18 de octubre de 2025",
      total: "$250.00",
    },
  ];
  return (
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm ">
          <Link href="/" className="flex items-center ">
            <HomeIcon className="mr-1 h-3 w-3" />
            Inicio
          </Link>
          <span>/</span>
          <span className="font-medium ">Mis Pedidos</span>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Mis Pedidos</h1>
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium flex space-x-3 items-center">
                    <div>{invoice.invoice}</div>
                    <Button size={"icon"} className="w-8 h-8">
                      <EyeIcon />
                    </Button>
                  </TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell className="text-right">{invoice.total}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 md:hidden">
          {invoices.map((invoice) => (
            <Card key={invoice.invoice}>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Pedido:
                    </span>
                    <span className="font-medium">{invoice.invoice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estado:
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        invoice.status === "Pagado"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Fecha:
                    </span>
                    <span>{invoice.date}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Total:
                    </span>
                    <span className="font-semibold">{invoice.total}</span>
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
