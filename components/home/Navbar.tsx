"use client";
import React from "react";
// import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
// import { useAppContext } from "@/context/AppContext";
// import Image from "next/image";
import { LogoTheme } from "../shared/logo-theme";
import { Button } from "../ui/button";
import { UserCircleIcon } from "lucide-react";
import { ModeToggle } from "../shared/mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-muted-foreground/20 ">
      <div>
        <LogoTheme />
      </div>
      <div className="flex items-center gap-4 max-md:hidden">
        <Link href="/">
          <Button variant={"ghost"}>Inicio</Button>
        </Link>
        <Link href="/">
          <Button variant={"ghost"}>Tienda</Button>
        </Link>
        <Link href="/">
          <Button variant={"ghost"}>Quiénes Somos</Button>
        </Link>
        <Link href="/">
          <Button variant={"ghost"}>Contacto</Button>
        </Link>
      </div>

      <div className="flex items-center gap-3">
      <ModeToggle />
        <Link href="#">
          <Button className="text-sm items-center text-center my-auto">
            <UserCircleIcon />
            <div>Inicia sesión</div>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
