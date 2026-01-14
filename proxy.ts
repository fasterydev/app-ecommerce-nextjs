import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 🌐 Rutas públicas (no requieren login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/shop",
  "/product(.*)",
  "/about-us",
  "/contact-us",
  "/api/(.*)",
  "/sitemap.xml",
  "/robots.txt",
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

  // Obtener el rol del usuario desde los claims de la sesión
  const metadata = session.sessionClaims?.metadata as
    | { role?: string; isRegistered?: boolean }
    | undefined;
  const publicMetadata = session.sessionClaims?.publicMetadata as
    | { role?: string }
    | undefined;

  const role = metadata?.role || publicMetadata?.role || "user"; // Por defecto es "user" si no tiene rol asignado

  // Verificar si el usuario está registrado (opcional, para futuras implementaciones)
  const isRegistered = metadata?.isRegistered !== false;

  const pathname = request.nextUrl.pathname;

  // 🔓 Usuario no logeado
  if (!session.userId) {
    if (isPublicRoute(request) || isAuthRoute(request)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // ⚠️ Usuario logueado pero NO registrado (si implementas registro adicional)
  // Esta lógica está comentada porque el proyecto actual no tiene /auth/register
  // Descomenta y ajusta si necesitas esta funcionalidad
  /*
  if (!isRegistered) {
    // Permitir rutas públicas y rutas de auth
    if (isPublicRoute(request) || isAuthRoute(request)) {
      return NextResponse.next();
    }
    // Bloquear todo lo demás → enviar a completar registro
    return NextResponse.redirect(new URL("/auth/sign-up", request.url));
  }
  */

  // 🚫 Usuario ya logueado pero intenta entrar a /auth/*
  // Redirigir según su rol después de login/registro exitoso
  if (isAuthRoute(request)) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 🔐 Admin area - solo admins pueden acceder
  if (isAdminRoute(request) && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 👤 User area - solo requiere estar logueado
  if (isUserRoute(request)) {
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|pdf)).*)",
    "/(api|trpc)(.*)",
  ],
};
