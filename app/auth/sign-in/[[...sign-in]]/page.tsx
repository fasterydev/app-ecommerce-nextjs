"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogoTheme } from "@/components/shared/logo-theme";
import { LoaderCircleIcon } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 bg-muted p-4 md:p-6">
      <div className="my-auto xl:mx-auto mx-0 w-full max-w-md">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                    <CardHeader className="space-y-3">
                      <div className="text-center items-center justify-center mx-auto animate-in slide-in-from-top-2 duration-500">
                        <LogoTheme mode="light" />
                      </div>
                      <CardDescription className="text-center text-sm md:text-base animate-in slide-in-from-top-3 duration-700">
                        Inicia sesión en tu cuenta
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-y-4 -mt-2 animate-in slide-in-from-bottom-4 duration-500">
                      <div className="grid grid-cols-1 gap-3">
                        <Clerk.Connection name="google" asChild>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                            className="transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                          >
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Clerk.Icon />
                                    <span className="hidden sm:inline">
                                      Iniciar sesión con Google
                                    </span>
                                    <span className="sm:hidden">Google</span>
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                        <Clerk.Connection name="apple" asChild>
                          <Button
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                            className="transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                          >
                            <Clerk.Loading scope="provider:apple">
                              {(isLoading) =>
                                isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Clerk.Icon />
                                    <span className="hidden sm:inline">
                                      Iniciar sesión con Apple
                                    </span>
                                    <span className="sm:hidden">Apple</span>
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                      </div>
                      <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                        ó
                      </p>
                      <Clerk.Field name="identifier" className="space-y-1.5">
                        <Clerk.Label asChild>
                          <Label>Correo electrónico</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="email"
                          placeholder="nombre@correo.com"
                          required
                          asChild
                        >
                          <Input className="transition-all duration-200 focus:scale-[1.02]" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>

                    <CardFooter className="-mt-3">
                      <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                        <SignIn.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  "Iniciar sesión"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>

                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="transition-all duration-200 hover:underline"
                        >
                          <Clerk.Link navigate="sign-up">
                            <span className="hidden sm:inline">
                              ¿No tienes una cuenta? Regístrate
                            </span>
                            <span className="sm:hidden">Regístrate</span>
                          </Clerk.Link>
                        </Button>
                        <Link href="/auth/forgot-password" className="w-full">
                          <Button
                            variant="link"
                            size="sm"
                            className="w-full text-center transition-all duration-200 hover:underline"
                          >
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="choose-strategy">
                  <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                    <CardHeader>
                      <CardTitle className="animate-in slide-in-from-top-2 duration-500">
                        Usar otro método
                      </CardTitle>
                      <CardDescription className="animate-in slide-in-from-top-3 duration-700">
                        ¿Tienes problemas? Puedes usar cualquiera de estos
                        métodos para iniciar sesión.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4 animate-in slide-in-from-bottom-4 duration-500">
                      <SignIn.SupportedStrategy name="email_code" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                          className="transition-all duration-200 hover:underline"
                        >
                          Código por correo
                        </Button>
                      </SignIn.SupportedStrategy>
                      <SignIn.SupportedStrategy name="password" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                          className="transition-all duration-200 hover:underline"
                        >
                          Contraseña
                        </Button>
                      </SignIn.SupportedStrategy>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                        <SignIn.Action navigate="previous" asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  "Volver"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="verifications">
                  <SignIn.Strategy name="password">
                    <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                      <CardHeader>
                        <CardTitle className="animate-in slide-in-from-top-2 duration-500">
                          Bienvenido de nuevo <SignIn.SafeIdentifier />
                        </CardTitle>
                        <CardDescription className="animate-in slide-in-from-top-3 duration-700">
                          Ingrese su contraseña para continuar
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <Clerk.Field name="password" className="space-y-1.5">
                          <Clerk.Label asChild>
                            <Label>Contraseña</Label>
                          </Clerk.Label>
                          <Clerk.Input type="password" asChild>
                            <Input className="transition-all duration-200 focus:scale-[1.02]" />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <LoaderCircleIcon className="size-4 animate-spin" />
                                  ) : (
                                    "Continuar"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <Button
                            onClick={() => {
                              window.location.href = "/auth/sign-in";
                            }}
                            variant="link"
                            size="sm"
                            className="transition-all duration-200 hover:underline"
                          >
                            Volver a iniciar sesión
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>

                  <SignIn.Strategy name="email_code">
                    <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                      <CardHeader>
                        <CardTitle className="animate-in slide-in-from-top-2 duration-500">
                          Revisa tu correo electrónico
                        </CardTitle>
                        <CardDescription className="animate-in slide-in-from-top-3 duration-700">
                          Ingrese el código de verificación enviado a su correo
                          electrónico
                        </CardDescription>
                        <p className="text-sm text-muted-foreground animate-in slide-in-from-top-4 duration-700 delay-100">
                          Bienvenido de nuevo <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <Clerk.Field name="code">
                          <Clerk.Label className="sr-only">
                            Código de verificación de correo electrónico
                          </Clerk.Label>
                          <div className="grid gap-y-2 items-center justify-center">
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                autoSubmit
                                className="flex justify-center has-[:disabled]:opacity-50"
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className="relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all duration-200 first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-2 data-[status=selected]:ring-ring data-[status=selected]:ring-offset-background data-[status=selected]:scale-110 data-[status=cursor]:ring-2 data-[status=cursor]:ring-ring data-[status=cursor]:ring-offset-background data-[status=cursor]:scale-110"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="block text-sm text-destructive text-center" />
                            <SignIn.Action
                              asChild
                              resend
                              className="text-muted-foreground"
                              fallback={({ resendableAfter }) => (
                                <Button
                                  variant="link"
                                  size="sm"
                                  disabled
                                  className="transition-all duration-200"
                                >
                                  ¿No recibiste el código? Reenviar (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button
                                variant="link"
                                size="sm"
                                className="transition-all duration-200 hover:underline"
                              >
                                ¿No recibiste el código? Reenviar
                              </Button>
                            </SignIn.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                          <SignIn.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <LoaderCircleIcon className="size-4 animate-spin" />
                                  ) : (
                                    "Continuar"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button
                              size="sm"
                              variant="link"
                              className="transition-all duration-200 hover:underline"
                            >
                              Utilice otro método
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </SignIn.Root>
      </div>
    </div>
  );
}
