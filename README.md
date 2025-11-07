![Image](https://github.com/user-attachments/assets/4e677eef-0481-4275-8af4-0cc0773db120)
# FasteryShop

FasteryShop is a modern e-commerce platform built with cutting-edge technologies to deliver a fast, secure, and scalable shopping experience.

## Technologies Used
- **Frontend:** Next.js
- **Authentication and Security:** Clerk
- **Backend/API:** NestJS
- **External Services:**
  - **Fastery Nexus API:** Money management and cash flow system.
  - **Traky App API:** Package logistics and shipment tracking system.

## Features
- Secure authentication and user management with Clerk.
- Seamless communication between frontend and backend through REST APIs.
- Fastery Nexus integration for handling financial operations.
- Traky App integration for real-time package tracking.
- Scalable architecture for future growth.

## Getting Started

### Environment Variables
Set up the following environment variables:

```bash
NEXT_PUBLIC_BACKEND_URL=https://api-ecommerce-nestjs.onrender.com/api
# DEBE ESPERAR A QUE EL BACKEND SE DESPLIEGUE EN RENDER

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/auth/sign-up
