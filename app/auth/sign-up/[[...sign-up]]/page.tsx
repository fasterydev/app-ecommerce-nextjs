"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
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
import { cn } from "@/lib/utils";
import { LoaderCircleIcon, RefreshCcwIcon } from "lucide-react";
import { LogoTheme } from "@/components/shared/logo-theme";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 bg-muted p-4 md:p-6">
      <div className="my-auto xl:mx-auto mx-0 w-full max-w-md">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step name="start">
                  <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                    <CardHeader className="space-y-3">
                      <div className="text-center items-center justify-center mx-auto animate-in slide-in-from-top-2 duration-500">
                        <div className="mx-auto w-full items-center justify-center flex">
                          <LogoTheme mode="light" />
                        </div>
                      </div>
                      <CardDescription className="text-center text-sm md:text-base animate-in slide-in-from-top-3 duration-700">
                        Regístrate para crear una cuenta
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
                                      Registrarse con Google
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
                                      Registrarse con Apple
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
                      <Clerk.Field name="emailAddress" className="space-y-1.5">
                        <Clerk.Label asChild>
                          <Label>
                            Correo electrónico
                            <span className="text-destructive">*</span>
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input
                          placeholder="nombre@correo.com"
                          type="email"
                          required
                          asChild
                        >
                          <Input className="transition-all duration-200 focus:scale-[1.02]" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="password" className="space-y-1.5">
                        <Clerk.Label asChild>
                          <Label>
                            Contraseña
                            <span className="text-destructive">*</span>
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" required asChild>
                          <Input className="transition-all duration-200 focus:scale-[1.02]" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter className="-mt-6">
                      <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                        <SignUp.Captcha className="empty:hidden" />
                        <SignUp.Action submit asChild>
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
                        </SignUp.Action>
                        <Button
                          variant="link"
                          size="sm"
                          asChild
                          className="transition-all duration-200 hover:underline"
                        >
                          <Clerk.Link navigate="sign-in">
                            <span className="hidden sm:inline">
                              ¿Ya tienes una cuenta? Inicia sesión
                            </span>
                            <span className="sm:hidden">Inicia sesión</span>
                          </Clerk.Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                    <CardHeader>
                      <CardTitle className="animate-in slide-in-from-top-2 duration-500">
                        Continuar registro
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="animate-in slide-in-from-bottom-4 duration-500">
                      <Clerk.Field name="username" className="space-y-2">
                        <Clerk.Label>
                          <Label>Nombre de usuario</Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input className="transition-all duration-200 focus:scale-[1.02]" />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                        <SignUp.Action submit asChild>
                          <Button
                            disabled={isGlobalLoading}
                            className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                          >
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <RefreshCcwIcon className="size-4 animate-spin" />
                                ) : (
                                  "Continuar"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignUp.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="verifications">
                  <SignUp.Strategy name="email_code">
                    <Card className="w-full sm:w-96 shadow-xl border border-border/20 bg-white/95 backdrop-blur-sm animate-in fade-in-0 zoom-in-95 duration-300 mx-auto">
                      <CardHeader>
                        <CardTitle className="animate-in slide-in-from-top-2 duration-500">
                          Verificar su correo electrónico
                        </CardTitle>
                        <CardDescription className="animate-in slide-in-from-top-3 duration-700">
                          Utilice el enlace de verificación enviado a su
                          dirección de correo electrónico
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="grid items-center justify-center gap-y-2">
                          <Clerk.Field name="code" className="space-y-2">
                            <Clerk.Label className="sr-only">
                              Correo electrónico
                            </Clerk.Label>
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                className="flex justify-center has-[:disabled]:opacity-50"
                                autoSubmit
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className={cn(
                                        "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all duration-200 first:rounded-l-md first:border-l last:rounded-r-md",
                                        {
                                          "z-10 ring-2 ring-ring ring-offset-background scale-110":
                                            status === "cursor" ||
                                            status === "selected",
                                        }
                                      )}
                                    >
                                      {value}
                                      {status === "cursor" && (
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
                                        </div>
                                      )}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="block text-center text-sm text-destructive" />
                          </Clerk.Field>
                          <SignUp.Action
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
                              type="button"
                              variant="link"
                              size="sm"
                              className="transition-all duration-200 hover:underline"
                            >
                              ¿No recibiste el código? Reenviar
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                          <SignUp.Action submit asChild>
                            <Button
                              disabled={isGlobalLoading}
                              className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <RefreshCcwIcon className="size-4 animate-spin" />
                                  ) : (
                                    "Continuar"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignUp.Strategy>
                </SignUp.Step>
              </>
            )}
          </Clerk.Loading>
        </SignUp.Root>
      </div>
    </div>
  );
}
