import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 🌐 Rutas públicas (no requieren login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop",
  "/product(.*)",
  "/about-us",
  "/contact-us",
]);

// 🔑 Rutas de auth
const isAuthRoute = createRouteMatcher([
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/auth/forgot-password(.*)",
]);

// 🔐 Rutas privadas por rol
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isUserRoute = createRouteMatcher([
  "/shopping-cart",
  "/profile",
  "/favorites",
  "/sales",
]);

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

  // 🚫 Usuario ya logueado pero intenta entrar a /auth/*
  if (isAuthRoute(request)) {
    if (role === "admin")
      return NextResponse.redirect(new URL("/admin", request.url));
    if (role === "user")
      return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 Admin area
  if (isAdminRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 User area
  // if (isUserRoute(request) && role !== "user") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  if (isUserRoute(request)) {
    // Solo requiere estar logueado
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
