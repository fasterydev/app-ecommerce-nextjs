import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { esMX } from "@clerk/localizations";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Cabellos del Sol | Peluquería - Estética",
  description: "Bienvenido a Cabellos del Sol, tu destino para la peluquería y estética.",
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
  openGraph: {
    title: "Fastery Shop Template",
    description: "A simple ecommerce template built with Next.js and Clerk",
    url: "https://fastery-shop-template.vercel.app",
    siteName: "Fastery Shop Template",
    images: [
      {
        url: "https://fastery-shop-template.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_MX",
    type: "website",
  },
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
            defaultTheme="light"
            enableSystem={true}
            themes={["light", "dark", "system"]}
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster expand={false} position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
