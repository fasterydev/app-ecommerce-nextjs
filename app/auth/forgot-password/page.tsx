"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogoTheme } from "@/components/shared/logo-theme";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isLoaded) return null;

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4 md:p-6">
      <Card className="w-full max-w-md shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-2 animate-in slide-in-from-top-2 duration-500">
            <LogoTheme mode="light" />
          </div>
          <CardTitle className="animate-in slide-in-from-top-3 duration-700">
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <CardDescription className="text-sm md:text-base animate-in slide-in-from-top-4 duration-700 delay-100">
            {successfulCreation
              ? "Ingresa el nuevo password y el código que se envió a tu correo."
              : "Escribe tu correo para enviar un código de recuperación."}
          </CardDescription>
        </CardHeader>

        <form onSubmit={!successfulCreation ? create : reset}>
          <CardContent className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
            {!successfulCreation ? (
              <>
                <div className="grid gap-2 animate-in slide-in-from-left-2 duration-500">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ej. nombre@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-2 animate-in slide-in-from-left-2 duration-500">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Nueva contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>

                <div className="grid gap-2 animate-in slide-in-from-right-2 duration-500 delay-75">
                  <Label htmlFor="code" className="text-sm font-medium">
                    Código de verificación
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </>
            )}

            {error && (
              <p className="text-sm text-destructive text-center animate-in slide-in-from-bottom-2 duration-300">
                {error}
              </p>
            )}
            {secondFactor && (
              <p className="text-sm text-muted-foreground text-center animate-in slide-in-from-bottom-2 duration-300">
                Se requiere autenticación de dos factores. Esta interfaz aún no
                lo maneja.
              </p>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-3 pt-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <Button
              type="submit"
              className="w-full transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              {!successfulCreation
                ? "Enviar código de recuperación"
                : "Restablecer contraseña"}
            </Button>
            <Link href="/auth/sign-in" className="w-full">
              <Button
                variant="link"
                className="w-full text-center transition-all duration-200 hover:underline"
              >
                Volver al inicio de sesión
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
