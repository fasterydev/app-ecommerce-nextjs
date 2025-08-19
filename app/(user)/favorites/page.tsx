"use client";
import ProductCard from "@/components/product/product-card";
import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import { useFavoriteStore } from "@/stores/user/favorite-store";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { favorites, fetchFavorites, isLoading } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Mis Favoritos</h1>
          <p>
            Aquí puedes ver y gestionar tu perfil. Actualiza tu información
            personal, preferencias de notificación y más.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-5 grid-cols-2">
          {favorites.map((favorite) => (
            <ProductCard key={favorite.id} product={favorite.product} />
          ))}
          {isLoading &&
            Array.from({ length: 5 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      </div>
      <pre>{JSON.stringify(favorites, null, 2)}</pre>
    </main>
  );
}
