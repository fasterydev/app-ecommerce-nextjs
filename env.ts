// src/env.ts
import { z } from "zod";

// Verificar si estamos en el servidor (CLERK_SECRET_KEY solo está disponible en el servidor)
const isServer = typeof window === "undefined";

// Schema con todas las variables
// CLERK_SECRET_KEY es opcional porque no está disponible en el cliente
const envSchema = z.object({
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),

  NEXT_PUBLIC_BUSINESS_NAME: z.string(),
  NEXT_PUBLIC_BUSINESS_EMAIL: z.string().email(),
  NEXT_PUBLIC_BUSINESS_PHONE: z.string(),
  NEXT_PUBLIC_BUSINESS_ADDRESS: z.string(),
  NEXT_PUBLIC_BUSINESS_SLUG: z.string(),

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
  CLERK_SECRET_KEY: z.string().optional(),

  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: z.string(),
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string(),
});

// 👀 Ojo: usamos parse (NO safeParse)
// Si falta algo, lanza error y rompe el build / dev inmediatamente

const envValues: Record<string, string | undefined> = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,

  NEXT_PUBLIC_BUSINESS_NAME: process.env.NEXT_PUBLIC_BUSINESS_NAME,
  NEXT_PUBLIC_BUSINESS_EMAIL: process.env.NEXT_PUBLIC_BUSINESS_EMAIL,
  NEXT_PUBLIC_BUSINESS_PHONE: process.env.NEXT_PUBLIC_BUSINESS_PHONE,
  NEXT_PUBLIC_BUSINESS_ADDRESS: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS,
  NEXT_PUBLIC_BUSINESS_SLUG: process.env.NEXT_PUBLIC_BUSINESS_SLUG,

  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,

  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
  NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
  NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
};

// Solo agregar CLERK_SECRET_KEY si estamos en el servidor
if (isServer) {
  envValues.CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
}

const parsed = envSchema.parse(envValues);

// Validar CLERK_SECRET_KEY solo en el servidor (donde debe estar presente)
if (isServer && !parsed.CLERK_SECRET_KEY) {
  throw new Error("CLERK_SECRET_KEY is required on the server but was not found");
}

// 🎨 Mapeo legible
export const envs = {
  BackendUrl: parsed.NEXT_PUBLIC_BACKEND_URL,
  Business: {
    Name: parsed.NEXT_PUBLIC_BUSINESS_NAME,
    Email: parsed.NEXT_PUBLIC_BUSINESS_EMAIL,
    Phone: parsed.NEXT_PUBLIC_BUSINESS_PHONE,
    Address: parsed.NEXT_PUBLIC_BUSINESS_ADDRESS,
    Slug: parsed.NEXT_PUBLIC_BUSINESS_SLUG,
  },
  Clerk: {
    PublicKey: parsed.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    SecretKey: parsed.CLERK_SECRET_KEY || "",
    SignInUrl: parsed.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    SignUpUrl: parsed.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    ForceRedirect: {
      SignIn: parsed.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
      SignUp: parsed.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    },
    FallbackRedirect: {
      SignIn: parsed.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL,
      SignUp: parsed.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    },
  },
};
