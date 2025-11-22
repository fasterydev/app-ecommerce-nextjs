import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { esMX } from "@clerk/localizations";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Fastery Shop1",
  description:
    "Ecommerce template built with Next.js, Tailwind CSS, and Clerk.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Next.js",
    "Clerk",
    "Ecommerce",
    "Template",
    "Shop",
    "React",
    "Tailwind CSS",
    "UI Components",
    "Admin Dashboard",
    "Product Management",
    "User Authentication",
    "Server Actions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            forcedTheme="dark"
            themes={["dark"]}
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster expand={false} position="bottom-right" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
