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
          src="/logo-light.webp"
          alt="logo-light.webp"
          width={150}
          height={150}
        />
      )}
      {effectiveMode === "light" && (
        <Image
          src="/logo-dark.webp"
          alt="logo-dark.webp"
          width={150}
          height={150}
        />
      )}
    </>
  );
}
