export type Roles = "admin" | "user";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
      isRegistered?: boolean;
      isBanned?: boolean;
    };
    metadefault: {
      role: Roles;
    };
  }
}
