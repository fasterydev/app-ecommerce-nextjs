"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { UserIcon, PencilIcon, SearchIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/admin/user-store";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";

export default function UserAdminPage() {
  const { fetchUsers, users, isLoading, pagination, filters, setFilters } = useUserStore();

  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [isActiveFilter, setIsActiveFilter] = useState<boolean | undefined>(filters.isActive);
  const [sortBy, setSortBy] = useState<"recent" | "email" | "fullName" | "createdAt" | "updatedAt">(filters.sortBy || "recent");
  const [order, setOrder] = useState<"ASC" | "DESC">(filters.order || "DESC");
  const [limit, setLimit] = useState(filters.limit || 10);

  useEffect(() => {
    fetchUsers({
      page: 1,
      limit,
      sortBy,
      order,
      isActive: isActiveFilter,
      search: searchQuery || undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyFilters = (newPage: number = 1) => {
    const filterParams = {
      page: newPage,
      limit,
      sortBy,
      order,
      isActive: isActiveFilter,
      search: searchQuery || undefined,
    };
    setFilters(filterParams);
    fetchUsers(filterParams);
  };

  const handleSearch = () => {
    applyFilters(1);
  };

  const handlePageChange = (page: number) => {
    applyFilters(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    const filterParams = {
      page: 1,
      limit: newLimit,
      sortBy,
      order,
      isActive: isActiveFilter,
      search: searchQuery || undefined,
    };
    setFilters(filterParams);
    fetchUsers(filterParams);
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          {pages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="space-y-4">
      <PageHeader
        icon={UserIcon}
        title="Usuarios"
        description="Gestión de usuarios registrados en la plataforma."
      />

      {/* Filtros */}
      <Card className="border shadow-sm p-0">
        <CardContent className="p-4 sm:p-6 space-y-5">
          {/* Primera fila: Búsqueda y filtros principales */}
          <div className="space-y-4">
            {/* Búsqueda */}
            <div className="w-full">
              <label className="text-sm font-medium text-foreground mb-2 block">
                Búsqueda
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 z-10" />
                  <Input
                    placeholder="Buscar por nombre, apellido o email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-9 w-full"
                  />
                </div>
                <Button
                  onClick={handleSearch}
                  variant="default"
                  className="w-full sm:w-auto sm:min-w-[100px]"
                >
                  Buscar
                </Button>
              </div>
            </div>

            {/* Filtros en grid responsivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Estado */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Estado
                </label>
                <Select
                  value={isActiveFilter === undefined ? "all" : isActiveFilter ? "active" : "inactive"}
                  onValueChange={(value) => {
                    const newValue = value === "all" ? undefined : value === "active";
                    setIsActiveFilter(newValue);
                    applyFilters(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos</SelectItem>
                    <SelectItem value="active">Activos</SelectItem>
                    <SelectItem value="inactive">Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ordenar por */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ordenar por
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(value: "recent" | "email" | "fullName" | "createdAt" | "updatedAt") => {
                    setSortBy(value);
                    applyFilters(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccionar campo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Recientes</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="fullName">Nombre completo</SelectItem>
                    <SelectItem value="createdAt">Fecha de creación</SelectItem>
                    <SelectItem value="updatedAt">Fecha de actualización</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orden */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Orden
                </label>
                <Select
                  value={order}
                  onValueChange={(value: "ASC" | "DESC") => {
                    setOrder(value);
                    applyFilters(1);
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ASC">Ascendente</SelectItem>
                    <SelectItem value="DESC">Descendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Segunda fila: Límite y contador */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                Mostrar:
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select
                  value={limit.toString()}
                  onValueChange={(value) => handleLimitChange(Number(value))}
                >
                  <SelectTrigger className="w-20 sm:w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  por página
                </span>
              </div>
            </div>

            {pagination && (
              <div className="text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md w-full sm:w-auto text-center sm:text-left">
                <span className="font-semibold text-foreground">
                  {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>
                {" "}de{" "}
                <span className="font-semibold text-foreground">{pagination.total}</span> usuarios
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabla */}
      {isLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <UserIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-lg font-medium mb-2 text-muted-foreground">
              No se encontraron usuarios
            </p>
            <p className="text-sm text-muted-foreground">
              Intenta ajustar los filtros de búsqueda.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                <TableRow>
                  <TableHead className="text-center">Nombre</TableHead>
                  <TableHead>Apellido</TableHead>
                  <TableHead>Correo</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center">{user.firstName || "-"}</TableCell>
                    <TableCell>{user.lastName || "-"}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.roles.join(" | ")}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? "outline" : "destructive"}>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/users/${user.id}`}>
                          <Button variant="outline" size="icon" title="Editar usuario">
                            <PencilIcon size={18} />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          {renderPagination()}
        </>
      )}
    </div>
  );
}
