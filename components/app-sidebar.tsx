"use client";
import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  ListTodoIcon,
  PackageIcon,
  ServerIcon,
  TagIcon,
  UserIcon,
} from "lucide-react";
import { LogoTheme } from "./shared/logo-theme";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Inventario",
      url: "/admin/products",
      icon: PackageIcon,
    },
    {
      title: "Categorías",
      url: "/admin/categories",
      icon: TagIcon,
    },
    {
      title: "Marcas",
      url: "/admin/brands",
      icon: TagIcon,
    },
    {
      title: "Pedidos",
      url: "/admin/sales",
      icon: ListTodoIcon,
    },
    {
      title: "Usuarios",
      url: "/admin/users",
      icon: UserIcon,
    },
  ],
  navSecondary: [
    {
      title: "Pago de Mantenimiento",
      url: "https://www.fastery.dev/",
      icon: ServerIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link className="mx-auto" href="/admin/products">
              <LogoTheme mode="light"/>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
