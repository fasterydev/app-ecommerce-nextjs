"use client";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm ">
          <Link href="/" className="flex items-center ">
            <HomeIcon className="mr-1 h-3 w-3" />
            Inicio
          </Link>
          <span>/</span>
          <span className="font-medium ">Mis Favoritos</span>
        </div>

        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Mis Favoritos</h1>
          <p>Aquí puedes ver y gestionar tus productos favoritos.</p>
        </div>
      </div>
    </main>
  );
}
