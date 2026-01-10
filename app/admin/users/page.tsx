"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { UserIcon, ShieldBanIcon, PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useUserStore } from "@/stores/admin/user-store";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function UserAdminPage() {
  const { fetchUsers, users } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3">
        <Card className="p-2 w-fit shadow-sm">
          <UserIcon className="text-primary" size={28} />
        </Card>
        <h1 className="text-xl font-semibold">Usuarios</h1>
      </div>

      <p className="mt-2 text-muted-foreground">
        Gestión de usuarios registrados en la plataforma.
      </p>

      <div className="overflow-hidden rounded-lg border mt-4">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              <TableHead className="text-center">Nombre</TableHead>
              <TableHead>Apellido</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
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
                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
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
