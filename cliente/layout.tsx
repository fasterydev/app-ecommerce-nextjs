import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { esMX } from "@clerk/localizations";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vileza Market - Tu tienda en línea de confianza",
  description:
    "Descubre Vileza Market, tu tienda en línea confiable para productos de calidad a precios competitivos. Compra fácil y seguro con envío rápido y atención al cliente excepcional.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Vileza Market",
    "tienda en línea",
    "compras en línea",
    "productos de calidad",
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
        <body className={`${spaceGrotesk.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={true}
            forcedTheme="light"
            themes={["light"]}
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
