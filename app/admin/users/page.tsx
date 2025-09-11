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
import { UserIcon, ShieldBanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useUserStore } from "@/stores/admin/user-store";

export default function UserAdminPage() {
  const { fetchUsers, users } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      {/* Header with icon inside card, title outside */}
      <div className="flex items-center gap-2">
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
              <TableHead>User Name</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.userName}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(", ")}</TableCell>
                <TableCell>{user.isActive ? "Active" : "Inactive"}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="icon">
                    <ShieldBanIcon size={18} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
