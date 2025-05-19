import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Rutas públicas accesibles sin login
const isPublicRoute = createRouteMatcher([
  "/",
  "/terminos-y-condiciones",
  "/tracking(.*)",
]);

// Rutas del sistema de auth de Clerk
const isAuthRoute = createRouteMatcher([
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/auth/forgot-password(.*)",
]);

// Rutas privadas por rol
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher(["/user(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const session = await auth();
  
  const role =
    session.sessionClaims?.metadata?.role ||
    session.sessionClaims?.metadefault?.role;

  // 🔓 Usuario no logeado
  if (!session.userId) {
    if (isPublicRoute(request) || isAuthRoute(request)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (isAuthRoute(request)) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    } else if (role === "user") {
      return NextResponse.redirect(new URL("/user", request.url));
    }
  }

  // 🔐 Rutas protegidas por rol
  if (isAdminRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
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
