"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { UserIcon, ArrowLeftIcon, SaveIcon } from "lucide-react";
import { useUserStore } from "@/stores/admin/user-store";
import Link from "next/link";
import { toast } from "sonner";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id as string;

  const { currentUser, isLoading, isSaving, fetchUserById, updateUser } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isActive: true,
    roles: [] as string[],
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!userId) return;

      const userData = await fetchUserById(userId);
      if (userData) {
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          isActive: userData.isActive ?? true,
          roles: userData.roles || [],
        });
      } else {
        toast.error("Error al cargar el usuario");
        router.push("/admin/users");
      }
    };

    loadUser();
  }, [userId, router, fetchUserById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await updateUser({
      userId,
      firstName: formData.firstName || undefined,
      lastName: formData.lastName || undefined,
      email: formData.email || undefined,
      isActive: formData.isActive,
      roles: formData.roles,
    });

    if (result.success) {
      toast.success(result.message || "Usuario actualizado exitosamente");
      router.push("/admin/users");
    } else {
      toast.error(result.message || "Error al actualizar el usuario");
    }
  };

  const toggleRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Cargando usuario...</p>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Link href="/admin/users">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon size={20} />
          </Button>
        </Link>
        <Card className="p-2 w-fit shadow-sm">
          <UserIcon className="text-primary" size={28} />
        </Card>
        <h1 className="text-xl font-semibold">Editar Usuario</h1>
      </div>

      <p className="mb-6 text-muted-foreground">
        Edita la información del perfil, estado y roles del usuario.
      </p>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Información del Perfil</CardTitle>
            <CardDescription>
              Actualiza los datos personales del usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="Nombre del usuario"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Apellido del usuario"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="correo@ejemplo.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Estado y Permisos</CardTitle>
            <CardDescription>
              Gestiona el estado activo/inactivo y los roles del usuario
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="isActive">Estado del Usuario</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive
                    ? "El usuario está activo y puede acceder al sistema"
                    : "El usuario está inactivo y no puede acceder al sistema"}
                </p>
              </div>
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
            </div>

            <div className="space-y-3">
              <Label>Roles</Label>
              <p className="text-sm text-muted-foreground mb-4">
                Selecciona los roles que tendrá el usuario
              </p>
              <div className="flex flex-wrap gap-2">
                {(["admin", "user"] as const).map((role) => (
                  <div key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`role-${role}`}
                      checked={formData.roles.includes(role)}
                      onChange={() => toggleRole(role)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label
                      htmlFor={`role-${role}`}
                      className="cursor-pointer font-normal"
                    >
                      {role === "admin" ? "Administrador" : "Usuario"}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.roles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.roles.map((role) => (
                    <Badge key={role} variant="outline">
                      {role === "admin" ? "Administrador" : "Usuario"}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 mt-6">
          <Link href="/admin/users">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={isSaving}>
            <SaveIcon size={18} />
            {isSaving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}
