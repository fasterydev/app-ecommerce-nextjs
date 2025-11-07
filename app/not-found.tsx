"use client";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <Card className="mx-auto w-full max-w-3xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative hidden md:block -my-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-white text-center p-6">
                  <h2 className="text-2xl font-bold mb-2">¿Necesitas ayuda?</h2>
                  <p className="text-white/90">
                    Estamos aquí para asistirte en encontrar lo que buscas
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <div className="text-center md:text-left mb-6">
                <h1 className="text-5xl font-bold text-primary mb-2">404</h1>
                <h2 className="text-2xl font-semibold mb-4">
                  Página no encontrada
                </h2>
                <p className="text-muted-foreground">
                  Lo sentimos, la página que estás buscando no existe o ha sido
                  movida.
                </p>
              </div>

              <div className="mt-auto">
                <Link href="/">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    Volver a la página de inicio
                  </Button>
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="w-full mt-2 text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Volver a la página anterior
                </button>
              </div>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
