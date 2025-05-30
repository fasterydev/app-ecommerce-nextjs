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
import {
  FacebookIcon,
  LoaderCircleIcon,
  ShieldIcon,
  User2Icon,
} from "lucide-react";
import { Icons } from "@/components/icons";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 ">
      <div className="my-auto space-y-2 xl:mx-auto mx-0">
        <SignIn.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignIn.Step name="start">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <div className="text-center items-center mx-auto">
                        <LogoTheme />
                      </div>
                      <CardDescription className="text-center">
                        Inicia sesión en tu cuenta
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-y-4">
                      <div className="grid grid-cols-3 gap-x-4">
                        <Clerk.Connection name="apple" asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:apple">
                              {(isLoading) =>
                                isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Icons.apple />
                                    <>Apple</>
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                        <Clerk.Connection name="google" asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:google">
                              {(isLoading) =>
                                isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <Icons.google />
                                    <>Google</>
                                  </>
                                )
                              }
                            </Clerk.Loading>
                          </Button>
                        </Clerk.Connection>
                        <Clerk.Connection name="facebook" asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            type="button"
                            disabled={isGlobalLoading}
                          >
                            <Clerk.Loading scope="provider:facebook">
                              {(isLoading) =>
                                isLoading ? (
                                  <LoaderCircleIcon className="size-4 animate-spin" />
                                ) : (
                                  <>
                                    <FacebookIcon />
                                    Facebook
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
                      <Clerk.Field name="identifier" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Correo electrónico</Label>
                        </Clerk.Label>
                        <Clerk.Input
                          type="email"
                          value={"user@fastery.dev"}
                          required
                          asChild
                        >
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>

                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <div></div>
                                ) : (
                                  "Iniciar sesión"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>

                        <Button variant="link" size="sm" asChild>
                          <Clerk.Link navigate="sign-up">
                            ¿No tienes una cuenta? Regístrate
                          </Clerk.Link>
                        </Button>
                        <Link href="/auth/forgot-password" className="mx-auto ">
                          <Button className="" variant={"link"} size="sm">
                            ¿Olvidaste tu contraseña?
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Step>

                <SignIn.Step name="choose-strategy">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Use another method</CardTitle>
                      <CardDescription>
                        Facing issues? You can use any of these methods to sign
                        in.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <SignIn.SupportedStrategy name="email_code" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Email code
                        </Button>
                      </SignIn.SupportedStrategy>
                      <SignIn.SupportedStrategy name="password" asChild>
                        <Button
                          type="button"
                          variant="link"
                          disabled={isGlobalLoading}
                        >
                          Password
                        </Button>
                      </SignIn.SupportedStrategy>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action navigate="previous" asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? <div></div> : "Go back";
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
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>
                          Bienvenido de nuevo <SignIn.SafeIdentifier />
                        </CardTitle>
                        <CardDescription>
                          Ingrese su contraseña para continuar
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
                        <Clerk.Field name="password" className="space-y-2">
                          <Clerk.Label asChild>
                            <Label>Contraseña</Label>
                          </Clerk.Label>
                          <Clerk.Input
                            type="password"
                            value={"user@fastery.dev"}
                            asChild
                          >
                            <Input />
                          </Clerk.Input>
                          <Clerk.FieldError className="block text-sm text-destructive" />
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? <div></div> : "Continue";
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          {/* <SignIn.Action navigate="choose-strategy" asChild>
                            <Button type="button" size="sm" variant="link">
                              Utilice otro método
                            </Button>
                          </SignIn.Action> */}
                          <Button
                            onClick={() => {
                              window.location.href = "/";
                            }}
                            className=""
                            variant={"link"}
                            size="sm"
                          >
                            Volver a iniciar sesión
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>

                  <SignIn.Strategy name="email_code">
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Revisa tu correo electrónico</CardTitle>
                        <CardDescription>
                          Ingrese el código de verificación enviado a su correo
                          electrónico
                        </CardDescription>
                        <p className="text-sm text-muted-foreground">
                          Bienvenido de nuevo <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
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
                                      className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
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
                                <Button variant="link" size="sm" disabled>
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button variant="link" size="sm">
                                ¿No recibiste el código? Reenviar
                              </Button>
                            </SignIn.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? <div></div> : "Continue";
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                          <SignIn.Action navigate="choose-strategy" asChild>
                            <Button size="sm" variant="link">
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
        <Card className="p-4 text-xs hidden gap-1.5 ">
          <div className="flex items-center mx-auto gap-2">
            <User2Icon size={15} />
            <div>Usuario de Prueba</div>
          </div>
          <div className="justify-between flex items-center gap-2">
            <div>Correo:</div>
            <div className="text-muted-foreground">user@fastery.dev</div>
          </div>
          <div className="justify-between flex items-center gap-2">
            <div>Contraseña:</div>
            <div className="text-muted-foreground">Abc123</div>
          </div>
          <div className="flex items-center mx-auto gap-2">
            <ShieldIcon size={15} />
            <div>Usuario Administrador</div>
          </div>
          <div className="justify-between flex items-center gap-2">
            <div>Correo:</div>
            <div className="text-muted-foreground">admin@fastery.dev</div>
          </div>
          <div className="justify-between flex items-center gap-2">
            <div>Contraseña:</div>
            <div className="text-muted-foreground">Abc123</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
