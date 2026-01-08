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
import { useCategoryStore } from "@/stores/customer/category-store";

const navItems = [
  { label: "Inicio", href: "/", isMenu: false },
  { label: "Productos", href: "/shop", isMenu: false },
  { label: "Quiénes Somos", href: "/about-us", isMenu: false },
  { label: "Contacto", href: "/contact-us", isMenu: false },
];

const Navbar = () => {
  const { categories } = useCategoryStore();
  const pathname = usePathname();

  return (
    <nav className="grid grid-cols-3 items-center justify-between py-2 px-4 md:px-12 lg:px-12">
      {/* <nav className="grid grid-cols-3 items-center justify-between py-3 px-4 md:px-12 lg:px-12 border-b-2 border-primary"> */}
      {/* IZQUIERDA */}
      <div className="flex items-center xl:justify-start justify-start">
        {/* Sheet para móviles */}
        <div className="xl:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <AlignJustifyIcon className="text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader className="bg-muted text-center font-medium">
                Menu
              </SheetHeader>
              <div className="flex flex-col gap-2 px-2">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href}>
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
            <LogoTheme mode="light" />
          </Link>
        </div>
      </div>

      {/* CENTRO en móvil */}
      <div className="flex justify-center xl:hidden">
        <Link href="/">
          <LogoTheme mode="light" />
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
                      {/* <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                            href={item.href}
                          >
                            <div className="mt-4 mb-2 text-lg font-medium">
                              {item.label}
                            </div>
                            <p className="text-muted-foreground text-sm leading-tight">
                              Explora nuestra amplia gama de productos de las
                              mejores marcas deportivas.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li> */}
                      {categories.map((subItem) => (
                        <ListItem
                          key={subItem.id}
                          href={subItem.id}
                          title={subItem.name}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href}>
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
