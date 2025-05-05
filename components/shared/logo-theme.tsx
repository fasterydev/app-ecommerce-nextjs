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
        <div className="flex font-bold text-xl space-x-1">
          <Image
            src="/fastery_icon.svg"
            alt="fastery_icon"
            width={20}
            height={20}
          />
          <div>Fastery</div>
          <div className="text-[#e11d48]">Shop</div>
        </div>
      )}
      {isLightMode && (
        <div className="flex font-bold text-xl space-x-1">
          <Image
            src="/fastery_icon.svg"
            alt="fastery_icon"
            width={20}
            height={20}
          />
          <div>Fastery</div>
          <div className="text-[#e11d48]">Shop</div>
        </div>
      )}
    </>
  );
}
// width={70}
