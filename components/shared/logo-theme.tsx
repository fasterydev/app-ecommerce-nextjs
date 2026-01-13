"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function LogoTheme({ mode }: { mode?: "light" | "dark" }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const effectiveMode = mode ?? theme;

  return (
    <>
      {effectiveMode === "dark" && (
        <Image
          src="/logo_black.png"
          alt="logo_black.png"
          width={100}
          height={100}
        />
      )}
      {effectiveMode === "light" && (
        <Image
          src="/logo_black.png"
          alt="logo_black.png"
          width={100}
          height={100}
        />
      )}
    </>
  );
}
