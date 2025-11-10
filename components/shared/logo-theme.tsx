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
        <div className="flex-col ">
          <div className="font-bold text-2xl tracking-wider text-center">
            VILEZA
          </div>
          <div className="font-bold text-xs -mt-1 tracking-widest text-center">
            MARKET
          </div>
        </div>
      )}
      {effectiveMode === "light" && (
        <div className="flex-col ">
          <div className="font-bold text-2xl tracking-wider text-center">
            VILEZA
          </div>
          <div className="font-bold text-xs -mt-1 tracking-widest text-center">
            MARKET
          </div>
        </div>
      )}
    </>
  );
}
