export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <main className="px-6 md:px-16 lg:px-32">{children}</main>
      </body>
    </html>
  );
}
