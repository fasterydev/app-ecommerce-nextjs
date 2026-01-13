![Image](https://github.com/user-attachments/assets/4e677eef-0481-4275-8af4-0cc0773db120)

# FasteryShop

FasteryShop es una plataforma de e-commerce moderna construida con tecnologías de vanguardia para ofrecer una experiencia de compra rápida, segura y escalable.

## 🚀 Características

- ✅ Autenticación segura y gestión de usuarios con Clerk
- ✅ Comunicación fluida entre frontend y backend mediante APIs REST
- ✅ Integración con Fastery Nexus para operaciones financieras
- ✅ Integración con Traky App para seguimiento de paquetes en tiempo real
- ✅ Arquitectura escalable para crecimiento futuro
- ✅ Gestión de productos, categorías y marcas
- ✅ Carrito de compras y favoritos
- ✅ Panel de administración completo
- ✅ Diseño responsive y moderno

## 🛠️ Tecnologías Utilizadas

- **Frontend:** Next.js 16+ (React 19, TypeScript)
- **Autenticación y Seguridad:** Clerk
- **Backend/API:** NestJS
- **UI Components:** Radix UI, shadcn/ui
- **Estilos:** Tailwind CSS
- **Validación:** Zod
- **Servicios Externos:**
  - **Fastery Nexus API:** Sistema de gestión de dinero y flujo de caja
  - **Traky App API:** Sistema de logística y seguimiento de paquetes

## 📋 Requisitos Previos

- Node.js 24.x o superior
- npm >= 11.0.0
- Cuenta de Clerk configurada
- Backend NestJS desplegado y funcionando

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd app-ecommerce-nextjs
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (ver sección siguiente)

4. Inicia el servidor de desarrollo:
```bash
npm run dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## ⚙️ Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

### Backend
```bash
NEXT_PUBLIC_BACKEND_URL=https://api-ecommerce-nestjs.onrender.com/api
# NOTA: Debe esperar a que el backend se despliegue en Render
```

### Información del Negocio
```bash
NEXT_PUBLIC_BUSINESS_NAME=Nombre de tu negocio
NEXT_PUBLIC_BUSINESS_EMAIL=correo@ejemplo.com
NEXT_PUBLIC_BUSINESS_PHONE=+593999999999
NEXT_PUBLIC_BUSINESS_ADDRESS=Dirección completa del negocio
```

### Clerk Authentication
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/auth/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/auth/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/auth/sign-up
```

### Notas sobre las Variables de Entorno

- Las variables con prefijo `NEXT_PUBLIC_` son accesibles en el cliente
- `CLERK_SECRET_KEY` solo está disponible en el servidor (no requiere prefijo `NEXT_PUBLIC_`)
- `NEXT_PUBLIC_BUSINESS_PHONE` debe incluir el código de país (ej: `+593999999999`)
- Todas las variables son validadas al iniciar la aplicación usando Zod

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo con Turbopack

# Producción
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
npm run type-check   # Verifica los tipos de TypeScript
```

## 📁 Estructura del Proyecto

```
app-ecommerce-nextjs/
├── app/                    # Rutas y páginas de Next.js
│   ├── (user)/            # Rutas públicas del usuario
│   ├── admin/             # Panel de administración
│   └── auth/              # Páginas de autenticación
├── components/            # Componentes React
│   ├── home/             # Componentes de la página principal
│   ├── product/          # Componentes de productos
│   ├── shared/           # Componentes compartidos
│   └── ui/               # Componentes de UI (shadcn/ui)
├── actions/              # Server actions y funciones del servidor
├── stores/               # Zustand stores para estado global
├── types/                # Definiciones de tipos TypeScript
├── utils/                # Utilidades y helpers
└── env.ts                # Validación de variables de entorno
```

## 🔐 Roles y Permisos

La aplicación soporta dos roles principales:

- **Admin:** Acceso completo al panel de administración
- **User:** Acceso a compras, carrito, favoritos y perfil

## 🛒 Funcionalidades Principales

### Para Usuarios
- Navegación por categorías y marcas
- Búsqueda y filtrado de productos
- Carrito de compras
- Lista de favoritos
- Perfil de usuario
- Historial de compras

### Para Administradores
- Gestión de productos (crear, editar, eliminar)
- Gestión de categorías
- Gestión de marcas
- Gestión de usuarios
- Visualización de ventas y estadísticas

## 🤝 Contribuir

Este es un proyecto privado de Fastery, LLC. Para contribuciones, por favor contacta al equipo de desarrollo.

## 📄 Licencia

UNLICENSED - Propiedad privada de Fastery, LLC.

## 📞 Soporte

Para soporte técnico, contacta a:
- Email: info@fastery.dev
- Website: [https://fastery.dev](https://fastery.dev)

---

Desarrollado con ❤️ por [Fastery, LLC](https://fastery.dev)