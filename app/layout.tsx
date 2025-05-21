import type { Metadata } from "next";
// import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { esMX } from "@clerk/localizations";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

// const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Fastery Shop Template",
  description: "A simple ecommerce template built with Next.js and Clerk",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={esMX}>
      <html lang="es" suppressHydrationWarning>
        {/* <body className={`${outfit.className} antialiased`}> */}
        <body className={`antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header></header>
            <Navbar />
            <main className="px-6 md:px-16 lg:px-32">{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
