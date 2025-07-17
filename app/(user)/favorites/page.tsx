"use client";
import Image from "next/image";
import { getFavorites } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Trash2Icon } from "lucide-react";
import { Favorite } from "@/components/favorites/favorite";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const getFavoritesApi = async () => {
    try {
      const res = await getFavorites();
      if (res.statusCode === 200) {
        setFavorites(res.favorites);
      } else {
        console.error("Error al obtener los favoritos:", res.message);
      }
    } catch (error) {
      console.error("Error al obtener los favoritos:", error);
    }
  };

  useEffect(() => {
    getFavoritesApi();
  }, []);

  return (
    <main className="flex-1 pb-12 pt-6">
      <div className="container mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Mis Favoritos</CardTitle>
            <CardDescription>
              Aquí puedes ver todos los productos que has añadido a tus
              favoritos.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-8 xl:grid-cols-2 grid-cols-1">
            {favorites.map((item: Favorite) => (
              <div key={item.id} className="flex flex-row gap-4">
                <div className="h-32 w-32 overflow-hidden rounded-md border">
                  <Image
                    src={item.product.images[0] || "/placeholder.svg"}
                    alt={item.product.name}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="font-medium">${item.product.cost}</p>
                  <div className="flex items-center gap-2">
                    <Button
                      // disabled={isLoading}
                      variant="destructive"
                      size="icon"
                      className="ml-auto"
                      // onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2Icon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
