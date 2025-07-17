import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { esMX } from "@clerk/localizations";
import { Toaster } from "sonner";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Fastery Shop Template",
  description: "A simple ecommerce template built with Next.js and Clerk",
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
            <main className="px-4 md:px-16 lg:px-32">{children}</main>
            <Toaster expand={false} position="top-center" richColors />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
