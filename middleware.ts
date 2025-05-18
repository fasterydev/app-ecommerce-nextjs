import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/auth/forgot-password(.*)",
  "/terminos-y-condiciones",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const session = await auth();
  const url = new URL(request.url);

  const role =
    session.sessionClaims?.metadata?.role ||
    session.sessionClaims?.metadefault?.role;

  // No sesión activa
  if (!session.userId) {
    if (!isPublicRoute(request)) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
    return NextResponse.next(); // Deja pasar /auth/*
  }

  // Redirección por rol si el usuario entra a rutas públicas
  if ((isPublicRoute(request) && !url.pathname.startsWith("/tracking") && !url.pathname.startsWith("/terminos-y-condiciones")) || url.pathname === "/") {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/packages", request.url));
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  // Protege rutas específicas por rol
  if (isAdminRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/admin/packages", request.url));
  }

  if (isUserRoute(request) && role !== "user") {
    return NextResponse.redirect(new URL("/user", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
