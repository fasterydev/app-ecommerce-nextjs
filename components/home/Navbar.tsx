"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoTheme } from "../shared/logo-theme";
import { Button } from "../ui/button";
import { DropdownMenuHome } from "../shared/dropdown-menu";
import { ShoppingCartIconHome } from "../shared/shopping-cart";
import { AlignJustifyIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ListItem } from "@/components/ui/list-item";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Inicio", href: "/" },
  {
    label: "Productos",
    isMenu: true,
    items: [
      {
        title: "Nike",
        href: "/shop?brand=nike",
        description: "Explora lo mejor en calzado y ropa deportiva de Nike.",
      },
      {
        title: "Adidas",
        href: "/shop?brand=adidas",
        description: "Rinde al máximo con la línea original de Adidas.",
      },
      {
        title: "Puma",
        href: "/shop?brand=puma",
        description: "Estilo urbano con energía deportiva de Puma.",
      },
      {
        title: "Reebok",
        href: "/shop?brand=reebok",
        description: "Vanguardia y performance con Reebok.",
      },
    ],
  },
  { label: "Quiénes Somos", href: "/about-us" },
  { label: "Contacto", href: "/contact-us" },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-3 items-center justify-between py-3 px-4 md:px-12 lg:px-12">
      {/* IZQUIERDA */}
      <div className="flex items-center xl:justify-start justify-start">
        {/* Sheet para móviles */}
        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustifyIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader className="bg-muted text-center font-medium">
                Menu
              </SheetHeader>
              <div className="flex flex-col gap-2 px-2">
                {navItems.map((item) => (
                  <Link key={item.label} href={"#"}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left text-base transition-all duration-200 hover:pl-4 hover:text-primary"
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo en XL */}
        <div className="hidden xl:block">
          <Link href="/">
            <LogoTheme />
          </Link>
        </div>
      </div>

      {/* CENTRO en móvil */}
      <div className="flex justify-center xl:hidden">
        <Link href="/">
          <LogoTheme />
        </Link>
      </div>

      {/* CENTRO XL: NavigationMenu */}
      <div className="hidden xl:flex items-center justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            {navItems.map((item) =>
              item.isMenu ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href="/"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium">
                              shadcn/ui
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Beautifully designed components built with
                              Tailwind CSS.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="/docs" title="Introduction">
                        Re-usable components built using Radix UI and Tailwind
                        CSS.
                      </ListItem>
                      <ListItem href="/docs/installation" title="Installation">
                        How to install dependencies and structure your app.
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Typography"
                      >
                        Styles for headings, paragraphs, lists...etc
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <Link href={"#"}>
                    <Button
                      variant={pathname === item.href ? "link" : "ghost"}
                      className={`${
                        pathname === item.href ? "underline" : ""
                      } text-sm font-medium transition-colors hover:text-foreground`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* DERECHA */}
      <div className="flex justify-end items-center gap-2">
        <ShoppingCartIconHome />
        <div className="hidden xl:block">
          <DropdownMenuHome />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
