"use client";
import React from "react";
import Link from "next/link";
import { LogoTheme } from "../shared/logo-theme";
import { Button } from "../ui/button";
import { ModeToggle } from "../shared/mode-toggle";
import { DropdownMenuHome } from "../shared/dropdown-menu";
import { ShoppingCart } from "../shared/shopping-cart";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-muted-foreground/20 ">
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
        <ShoppingCart />

        <DropdownMenuHome />
        {/* {isLoaded  ? (
          <Link href="/sales">
            <Button className="text-sm items-center text-center my-auto">
              <UserCircleIcon />
              <div>{user ? user.firstName : "Inicia sesión"}</div>
            </Button>
          </Link>
        ) : (
          <Button disabled className="text-sm items-center">
            <LoaderCircleIcon className="size-4 animate-spin" />
          </Button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
