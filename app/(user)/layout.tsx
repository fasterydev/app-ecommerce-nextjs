import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="px-3 md:px-16 lg:px-32">{children}</main>
      <Footer />
    </>
  );
}
