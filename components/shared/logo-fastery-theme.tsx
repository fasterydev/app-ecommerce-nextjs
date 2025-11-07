"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

export function LogoFasteryTheme() {
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
        <div className="flex space-x-2.5 mx-auto ">
          <Image
            src="/fastery_logo_dark.svg"
            alt="fastery_logo_dark"
            width={70}
            height={70}
          />
        </div>
      )}
      {isLightMode && (
        <div className="flex space-x-2.5 mx-auto ">
          <Image
            src="/fastery_logo_light.svg"
            alt="fastery_logo_light"
            width={70}
            height={70}
          />
        </div>
      )}
    </>
  );
}
