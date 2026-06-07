# Landora — Guía para agentes

App de gestión inmobiliaria. **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Clerk · Neon Postgres · Drizzle ORM · Tailwind CSS v4 · shadcn/ui · Zustand · Zod · react-toastify.

Arquitectura, rutas y fases de desarrollo: `docs/plan.md`.

## Documentación

Next.js cambia entre versiones. Antes de escribir o modificar código de Next.js, consulta la documentación **exacta** de esta versión en `node_modules/next/dist/docs/`.

No asumas APIs de versiones anteriores ni de la documentación sin versionar.

## TypeScript

**Contrato de parámetros:** No marques parámetros como opcionales (`?`) si en la práctica son obligatorios (por ejemplo, si se lanza un error cuando faltan). La firma debe reflejar el comportamiento real (`param: string`) para que el contrato sea claro en compile time.

**Validaciones:** No dupliques comprobaciones (`null`/`undefined`, `Array.isArray`, etc.) en varias capas si ya están cubiertas en funciones internas. Centraliza la responsabilidad en un solo lugar.

**Nombres:** No renombres propiedades intermedias sin aportar valor. Eso dificulta seguir el flujo de datos.

**Tipos:** No exportes tipos desde un módulo solo para satisfacer dependencias de helpers. Mantén los tipos en su dominio o muévelos a un módulo compartido para evitar acoplamiento y dependencias circulares.

**Control de flujo:** Usa early returns en condicionales en lugar de anidar bloques `else`.

## React y Next.js

**Un componente por archivo:** Nunca declares más de un componente React en el mismo archivo. Extrae subcomponentes a archivos propios.

**Listas:** Si dentro de un `map` hay JSX con lógica o estructura propia, extrae ese elemento a un componente reutilizable en otro archivo.

**Barrel files:** No crees `index.ts` que reexporten módulos.

**UI:** No uses emojis. Usa iconos de la librería del proyecto (shadcn/ui o Lucide React).

**Server vs Client Components:** Por defecto usa Server Components. Añade `"use client"` solo cuando sea estrictamente necesario (interactividad, hooks de estado, efectos).

**Server Actions:** Usa Server Actions para mutaciones. Valida la entrada con Zod en el servidor.

## Notificaciones al usuario

Para **todos** los mensajes de error o éxito mostrados al usuario, usa **siempre** `react-toastify`. No uses `alert`, `confirm`, ni ningún otro mecanismo nativo o custom. Llama a `toast.error(...)` para errores y `toast.success(...)` para operaciones exitosas.

## Alcance del trabajo

- Cambios mínimos y enfocados: no toques código no relacionado con la tarea.
- Sigue convenciones del código circundante (nombres, imports, estructura de carpetas).
- No añadas comentarios al código.
- No crees tests, documentación nueva ni archivos de ejemplo salvo petición explícita.
- No ejecutes el proyecto (`next dev`, etc.) salvo petición explícita.
- No uses git salvo petición explícita del usuario.

## Capa de acceso a datos (DAL)

Todas las queries a la base de datos viven en `data/`, nunca directamente en componentes, layouts, pages ni route handlers.

- Las funciones de **lectura** usan `cache()` de React para deduplicar queries en el mismo render pass.
- Las funciones de **escritura** no usan `cache()`.
- Cada función envuelve su query en `try/catch` y relanza con un mensaje descriptivo. `null` significa "registro no encontrado"; un error lanzado significa fallo de DB o red.
- Los **Server Components** dejan que los errores del DAL suban hasta el `error.tsx` más cercano (patrón RSC estándar).
- Los **Route Handlers** capturan errores del DAL y devuelven `500`.
- `getCurrentUser()` es la función canónica para obtener el usuario autenticado en Server Components y Route Handlers. Internamente llama a `auth()` de Clerk.
- Nunca importes `@/db` fuera de `data/`. Los componentes, layouts y route handlers importan exclusivamente desde `@/data/*`.

## Estructura prevista

- `app/` — rutas Next.js App Router
- `components/` — UI por dominio (`ui/`, `auth/`, `dashboard/`, …)
- `data/` — capa DAL: queries y mutaciones de base de datos
- `db/` — schema y cliente Drizzle ORM
- `lib/` — utilidades, helpers, cliente Clerk
- `stores/` — stores Zustand
- `scripts/` — scripts de mantenimiento

Utiliza siempre pnpm.
Utiliza siempre tailwind.
Utiliza siempre lucide icons, nunca emojis.

Coloca código nuevo en la carpeta que corresponda al dominio, no en rutas genéricas.
