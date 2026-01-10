"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { UserIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useUserStore } from "@/stores/admin/user-store";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";

export default function UserAdminPage() {
  const { fetchUsers, users } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <PageHeader
        icon={UserIcon}
        title="Usuarios"
        description="Gestión de usuarios registrados en la plataforma."
      />

      <div className="overflow-hidden rounded-lg border mt-4">
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
                <TableCell className="text-center">{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline">{user.roles.join(" | ")}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive ? "outline" : "destructive"}>{user.isActive ? "Activo" : "Inactivo"}</Badge>
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
    </div>
  );
}
