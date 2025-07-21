"use client";
import React from "react";
import Link from "next/link";
import { LogoTheme } from "../shared/logo-theme";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import { DropdownMenuHome } from "../shared/dropdown-menu";
import { ShoppingCartIconHome } from "../shared/shopping-cart";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-3 border-b border-muted-foreground/20 px-3 md:px-12 lg:px-12">
      <div>
        <Link href="/">
          <LogoTheme />
        </Link>
      </div>
      <div className="flex items-center gap-4 max-md:hidden">
        <Link href="/">
          <Button variant={"ghost"}>Inicio</Button>
        </Link>
        <Link href="/shop">
          <Button variant={"ghost"}>Tienda</Button>
        </Link>
        <Link href="/about-us">
          <Button variant={"ghost"}>Quiénes Somos</Button>
        </Link>
        <Link href="/contact-us">
          <Button variant={"ghost"}>Contacto</Button>
        </Link>
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
