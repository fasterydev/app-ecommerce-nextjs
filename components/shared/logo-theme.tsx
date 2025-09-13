"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
export function LogoTheme() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkMode = theme === "dark";
  const isLightMode = theme === "light";
  return (
    <>
      {isDarkMode && (
        <div className="flex font-semibold text-lg space-x-1 my-auto">
          <Image
            src="/logo-dark.webp"
            alt="logo-dark.webp"
            width={150}
            height={150}
          />
        </div>
      )}
      {isLightMode && (
        <div className="flex font-semibold text-lg space-x-1 my-auto">
          <Image
            src="/logo-light.webp"
            alt="logo-light.webp"
            width={150}
            height={150}
          />
        </div>
      )}
      {/* {isDarkMode && (
        <div className="flex font-semibold text-lg space-x-1">
          <Image
            src="/fastery_icon_dark.svg"
            alt="fastery_icon_dark"
            width={18}
            height={18}
          />
          <div>Fastery</div>
          <div className="text-[#e11d48]">Shop</div>
        </div>
      )}
      {isLightMode && (
        <div className="flex font-semibold text-lg space-x-1">
          <Image
            src="/fastery_icon_light.svg"
            alt="fastery_icon_light"
            width={18}
            height={18}
          />
          <div>Fastery</div>
          <div className="text-[#e11d48]">Shop</div>
        </div>
      )} */}
    </>
  );
}
