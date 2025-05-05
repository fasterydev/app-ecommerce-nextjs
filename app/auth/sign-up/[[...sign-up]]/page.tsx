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
import { RefreshCcwIcon } from "lucide-react";
import { LogoTheme } from "@/components/shared/logo-theme";

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1">
      <div className="my-auto  xl:mx-auto mx-0">
        <SignUp.Root>
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <SignUp.Step name="start">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <div className="text-center items-center mx-auto">
                        <LogoTheme />
                      </div>
                      <CardDescription>
                        Regístrate para crear una cuenta
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="emailAddress" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>
                            Correo electrónico
                            <span className="text-destructive">*</span>
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="email" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>
                            Contraseña
                            <span className="text-destructive">*</span>
                          </Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Captcha className="empty:hidden" />
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
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
                        <Button variant="link" size="sm" asChild>
                          <Clerk.Link navigate="sign-in">
                            ¿Ya tienes una cuenta? Inicia sesión
                          </Clerk.Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </SignUp.Step>

                <SignUp.Step name="continue">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Continue registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Clerk.Field name="username" className="space-y-2">
                        <Clerk.Label>
                          <Label>Username</Label>
                        </Clerk.Label>
                        <Clerk.Input type="text" required asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignUp.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <RefreshCcwIcon className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
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
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Verificar su correo electrónico</CardTitle>
                        <CardDescription>
                          Utilice el enlace de verificación enviado a su
                          dirección de correo electrónico
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
                        <div className="grid items-center justify-center gap-y-2">
                          <Clerk.Field name="code" className="space-y-2">
                            <Clerk.Label className="sr-only">
                              Email address
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
                                        "relative flex size-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
                                        {
                                          "z-10 ring-2 ring-ring ring-offset-background":
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
                              <Button variant="link" size="sm" disabled>
                                ¿No recibiste el código? Reenviar (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button type="button" variant="link" size="sm">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignUp.Action>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignUp.Action submit asChild>
                            <Button disabled={isGlobalLoading}>
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <RefreshCcwIcon className="size-4 animate-spin" />
                                  ) : (
                                    "Continue"
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
