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
        <div className="flex font-semibold text-lg">
          <Image
            src="/fastery_icon_dark.svg"
            alt="fastery_icon_dark"
            width={18}
            height={18}
            className="mr-2"
          />
          <div>Fastery</div>
          <div className="text-primary">Shop</div>
        </div>
      )}
      {effectiveMode === "light" && (
        <div className="flex font-semibold text-lg ">
          <Image
            src="/fastery_icon_light.svg"
            alt="fastery_icon_light"
            width={18}
            height={18}
            className="mr-2"
          />
          <div>Fastery</div>
          <div className="text-primary">Shop</div>
        </div>
      )}
    </>
  );
}
