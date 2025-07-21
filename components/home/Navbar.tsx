"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoTheme } from "../shared/logo-theme";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import { DropdownMenuHome } from "../shared/dropdown-menu";
import { ShoppingCartIconHome } from "../shared/shopping-cart";

const Navbar = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/shop", label: "Tienda" },
    { href: "/about-us", label: "Quiénes Somos" },
    { href: "/contact-us", label: "Contacto" },
  ];

  return (
    <nav className="flex items-center justify-between py-3 px-3 md:px-12 lg:px-12">
      {/* <nav className="flex items-center justify-between py-3 border-b border-muted-foreground/20 px-3 md:px-12 lg:px-12"> */}
      <div>
        <Link href="/">
          <LogoTheme />
        </Link>
      </div>

      <div className="flex items-center gap-4 max-md:hidden">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button
              className={pathname === link.href ? "underline" : ""}
              variant={pathname === link.href ? "link" : "ghost"}
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />
        <ShoppingCartIconHome />
        <DropdownMenuHome />
      </div>
    </nav>
  );
};

export default Navbar;
