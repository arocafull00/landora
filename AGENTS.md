# Landora — Guía para agentes

App de gestión inmobiliaria. **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Clerk · PostgreSQL · Drizzle ORM · Tailwind CSS v4 · shadcn/ui · Zustand · Zod · react-toastify.

Arquitectura, rutas y fases de desarrollo: `PLAN.md`.
Aprendizajes técnicos y checklist: `docs/learnings.md`.

## Documentación

Next.js cambia entre versiones. Antes de escribir o modificar código de Next.js, consulta la documentación **exacta** de esta versión en `node_modules/next/dist/docs/`.

No asumas APIs de versiones anteriores ni de la documentación sin versionar.

## TypeScript

**Contrato de parámetros:** No marques parámetros como opcionales (`?`) si en la práctica son obligatorios (por ejemplo, si se lanza un error cuando faltan). La firma debe reflejar el comportamiento real (`param: string`) para que el contrato sea claro en compile time.

**Validaciones:** No dupliques comprobaciones (`null`/`undefined`, `Array.isArray`, etc.) en varias capas si ya están cubiertas en funciones internas. Centraliza la responsabilidad en un solo lugar.

**Nombres:** No renombres propiedades intermedias sin aportar valor. Eso dificulta seguir el flujo de datos.

**Tipos:** No exportes tipos desde un módulo solo para satisfacer dependencias de helpers. Mantén los tipos en su dominio o muévelos a un módulo compartido para evitar acoplamiento y dependencias circulares.

**Control de flujo:** Usa early returns en condicionales en lugar de anidar bloques `else`.

## Entorno, secretos y fronteras

**Entorno del servidor:** Todas las variables privadas se declaran y validan con Zod en `lib/env/server.ts`, que debe importar `server-only`. No accedas directamente a `process.env` desde módulos de negocio ni uses assertions `!`. Las variables obligatorias fallan al arrancar; las integraciones opcionales fallan explícitamente al utilizarlas. Nunca introduzcas bypasses silenciosos en producción.

**Entradas no confiables:** Valida con Zod en el servidor todos los bodies JSON, parámetros de ruta, query strings, `FormData`, Server Actions, webhooks, tokens, respuestas externas y mensajes de iframe. Usa `z.strictObject()` cuando no se admitan campos extra y define límites de longitud, tamaño y cantidad. La validación cliente mejora la UX, pero nunca sustituye la validación servidor.

**Respuestas inválidas:** Los Route Handlers devuelven `400` con `{ error: string }` para entradas inválidas. No envíes detalles de Zod, SQL, stack traces ni mensajes internos de proveedores al cliente.

**Servicios externos:** Todas las peticiones a proveedores deben tener timeout, validar la respuesta y fallar de forma segura. No caches tokens de un solo uso ni registres tokens completos o parciales.

## React y Next.js

**Un componente por archivo:** Nunca declares más de un componente React en el mismo archivo. Extrae subcomponentes a archivos propios.

**Listas:** Si dentro de un `map` hay JSX con lógica o estructura propia, extrae ese elemento a un componente reutilizable en otro archivo.

**Barrel files:** No crees `index.ts` que reexporten módulos.

**UI:** No uses emojis. Usa iconos de la librería del proyecto (shadcn/ui o Lucide React).

**Server vs Client Components:** Por defecto usa Server Components. Añade `"use client"` solo cuando sea estrictamente necesario (interactividad, hooks de estado, efectos).

**Server Actions:** Usa Server Actions para mutaciones. Valida la entrada con Zod en el servidor.

**Carga cliente:** Mantén páginas, datos y contenido estático como Server Components. Extrae únicamente la interactividad a islas cliente. Carga librerías pesadas como gráficos o animaciones mediante `next/dynamic` cuando no sean necesarias en el bundle inicial.

**Detección de móvil (lógica):** Para decidir comportamiento en JavaScript (render condicional, qué componente montar o handlers distintos), usa `useIsMobile()` de `@/hooks/use-mobile`. No uses directamente `window.matchMedia`, `window.innerWidth` ni breakpoints de Tailwind (`md:`, `lg:`, `hidden lg:block`, etc.) para lógica de programación. Tailwind sigue siendo válido para estilos responsivos; esta regla aplica solo cuando el código necesita conocer el tamaño de pantalla en runtime.

## Formularios

Todo formulario nuevo con 2 o más campos debe usar `react-hook-form` con `zodResolver` y un schema de Zod en `lib/schemas/`. No uses un `useState` independiente por campo ni limpies formularios mediante varios setters.

- El hook del formulario configura `useForm`, sus `defaultValues`, `handleSubmit`, `formState.errors`, `formState.isSubmitting` y `reset`.
- Los datos de contexto que el usuario no edita, como `tenantId`, se omiten del schema de formulario y se inyectan al enviar.
- Los subcomponentes reciben solo los bindings y errores que necesitan; muestran los errores de campo con `text-danger`.
- Los inputs y textareas nativos usan `register`. Los controles propios (fecha, selects, comboboxes o multiselect) usan `Controller`.
- No uses `<select>` ni `<option>` nativos para controles nuevos: usa los componentes de `components/ui/` basados en Radix, como `@/components/ui/select`.
- El estado auxiliar que no se persiste, como una búsqueda dentro de un selector, puede usar `useState` aparte del formulario.
- Los errores globales de validación o envío también se notifican con `toast.error(...)`.
- El servidor reutiliza el mismo schema o un schema de dominio equivalente y vuelve a validar antes de mutar datos.

## Arquitectura de componentes: separación por capas

Todo componente que mezcle lógica de negocio con JSX debe dividirse en tres capas:

**1. Custom hook** (`hooks/use-[feature].ts`) — toda la lógica: estado, derivaciones, handlers, efectos de datos.
**2. Subcomponentes** (`components/`) — JSX puro, solo props, sin lógica de negocio ni acceso directo a stores.
**3. Page/contenedor** (`page.client.tsx`) — orquesta hook + subcomponentes, JSX mínimo, side effects de navegación en `useEffect`.

### Reglas concretas

- Si un componente supera ~80 líneas, es señal de que necesita separarse.
- Las derivaciones van en el hook como variables computadas, nunca como estado (`const x = a ?? b`, no `useState`).
- El copy/strings van en objetos constantes tipados fuera del JSX, nunca inline.
- Los subcomponentes reciben solo lo que necesitan por props; no acceden a stores directamente.
- El redirect y otros side effects van en `useEffect` explícito en el contenedor, nunca como `if` en medio del render.

### Estructura de carpetas

```
components/[dominio]/[feature]/
├── page.client.tsx
├── hooks/
│   └── use-[feature].ts
├── components/
│   ├── [feature]-form.tsx
│   └── [feature]-sidebar.tsx
└── [feature]-copy.ts
```

### Señales de que un componente necesita refactor

- Hay un `useEffect` que setea estado (ver regla de dependencias circulares).
- El JSX tiene lógica ternaria compleja o strings largos inline.
- El componente accede a más de 2 stores de Zustand directamente.
- Los handlers (`handleSubmit`, etc.) tienen más de 10 líneas.

## Notificaciones al usuario

Para **todos** los mensajes de error o éxito mostrados al usuario, usa **siempre** `react-toastify`. No uses `alert`, `confirm`, ni ningún otro mecanismo nativo o custom. Llama a `toast.error(...)` para errores y `toast.success(...)` para operaciones exitosas.

## Logging y errores

Usa siempre `logger` de `@/lib/logger`. No importes `@sentry/nextjs` directamente fuera de `lib/logger.ts`, `instrumentation.ts`, `instrumentation-client.ts`, los archivos `sentry.*.config.ts` y `next.config.ts`.

- Log estructurado: `logger.info(logger.fmt\`Booking ${bookingId} created\`)`.
- Excepción con contexto: `logger.captureException(error, { action: "create-booking", tenantId, userId })`.
- Aviso: `logger.warn(logger.fmt\`Retry ${attempt} for ${operationName}\`)`.
- Nunca incluyas en logs secretos, tokens, queries completas, payloads arbitrarios ni datos personales innecesarios.
- Separa el mensaje público del contexto interno: el usuario recibe un error genérico y estable; `logger` conserva la excepción y los identificadores seguros.

## Alcance del trabajo

- Cambios mínimos y enfocados: no toques código no relacionado con la tarea.
- Sigue convenciones del código circundante (nombres, imports, estructura de carpetas).
- No añadas comentarios al código.
- No crees tests, documentación nueva ni archivos de ejemplo salvo petición explícita.
- No ejecutes el proyecto (`next dev`, etc.) salvo petición explícita.
- No uses git salvo petición explícita del usuario.
- Respeta las políticas de versiones y procedencia de `pnpm`; no fuerces una actualización bloqueada sin autorización.

## Capa de acceso a datos (DAL)

Todas las queries a la base de datos viven en `data/`, nunca directamente en componentes, layouts, pages ni route handlers.

- Las funciones de **lectura** usan `cache()` de React para deduplicar queries en el mismo render pass.
- Las funciones de **escritura** no usan `cache()`.
- Cada función envuelve su query en `try/catch` y relanza con un mensaje descriptivo. `null` significa "registro no encontrado"; un error lanzado significa fallo de DB o red.
- Los **Server Components** dejan que los errores del DAL suban hasta el `error.tsx` más cercano (patrón RSC estándar).
- Los **Route Handlers** capturan errores del DAL y devuelven `500`.
- `getCurrentUser()` es la función canónica para obtener el usuario autenticado en Server Components y Route Handlers. Internamente llama a `auth()` de Clerk.
- Nunca importes `@/db` fuera de `data/`. Los componentes, layouts y route handlers acceden a persistencia exclusivamente mediante `@/data/*`.
- Los componentes, stores y APIs no importan tipos de `db/schema`. Usa DTOs mínimos de dominio en `lib/domain/dtos.ts`; no expongas filas completas de Drizzle al cliente.
- La DAL traduce errores técnicos conocidos a resultados de dominio discriminados (`created`, `slot_taken`, `not_found`, etc.). Los consumidores no interpretan códigos SQL.
- Las invariantes críticas y condiciones concurrentes se protegen con restricciones SQL. Una comprobación previa mejora la UX, pero nunca sustituye una restricción de base de datos.
- Para operaciones concurrentes, captura el código concreto de la restricción, regístralo cuando corresponda y devuelve un resultado de dominio seguro.

## Estructura prevista

- `app/` — rutas Next.js App Router
- `components/` — UI por dominio (`ui/`, `auth/`, `dashboard/`, …)
- `data/` — capa DAL: queries y mutaciones de base de datos
- `db/` — schema y cliente Drizzle ORM
- `lib/` — utilidades, helpers, cliente Clerk
- `stores/` — stores Zustand
- `scripts/` — scripts de mantenimiento

## Zustand y estado cliente

- Mantén el estado local si solo pertenece a un componente. Usa Zustand para estado compartido por varias ramas o pantallas, no como sustituto automático de props.
- Si los datos iniciales vienen del servidor, crea una instancia del store por árbol mediante un provider y un inicializador perezoso: `useState(() => createStore(initialState))`.
- Nunca mutes un singleton global ni llames acciones del store durante el render para hacer bootstrap.
- Todas las suscripciones usan selectores precisos: `useStore((state) => state.value)`. Para varios valores usa `useShallow`.
- No uses `useStore()` sin selector, porque suscribe el componente al store completo.
- Evita prop drilling a través de componentes que no consumen la prop; usa composición, contexto de dominio o un store ya existente según el alcance real del estado.


## Nunca setState en useEffect con dependencia circular

Si el estado que seteas está en las `deps` del efecto, es un bug.

**❌**
```tsx
useEffect(() => { setFullName(user.name) }, [user, fullName]);
```

**✅ Lazy initializer**
```tsx
const [fullName, setFullName] = useState(() => user?.name ?? "");
```

**✅ Valor derivado**
```tsx
const fullName = user?.name ?? "";
```

**✅ Zustand: inicializar el store desde props del provider con un inicializador perezoso**

> Si un `useEffect` setea estado que está en sus propias `deps`, rediseña: el valor es derivado, no independiente.


Utiliza siempre pnpm.
Utiliza siempre tailwind.
Utiliza siempre lucide icons, nunca emojis.
Coloca código nuevo en la carpeta que corresponda al dominio, no en rutas genéricas.

## Seguridad web, accesibilidad y movimiento

**Iframes:** Usa `sandbox` sin `allow-same-origin` cuando sea posible. Comprueba `event.source`, valida el payload y usa un `MessageChannel` privado para comunicación continuada. No aceptes mensajes globales basándote únicamente en `event.data.type`.

**Cabeceras:** Mantén CSP inicialmente en modo report-only hasta verificar Clerk, Stripe, PostHog, Sentry, Cloudinary y Turnstile. Conserva HSTS en producción, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`. Reduce el límite de request al mínimo real; las subidas grandes deben ir directamente al proveedor mediante firma.

**Accesibilidad:** Toda página debe ofrecer un destino para “Saltar al contenido”. Todos los controles necesitan nombre accesible; los desplegables usan `aria-expanded` y `aria-controls`; los iconos decorativos usan `aria-hidden`. Los `error.tsx` recuperables incluyen una acción de reintento.

**Movimiento:** Respeta `prefers-reduced-motion` globalmente y en componentes de animación. No animes `height` ni uses `transition-all`; declara propiedades concretas como `transition-colors`, `transition-transform` o `transition-[box-shadow,transform]`.

**Scroll:** El documento es desplazable por defecto. Solo el shell del dashboard controla `overflow-hidden` y sus regiones internas gestionan su propio scroll. No modifiques `html/body` después de hidratar.

## Colores y tema

Los colores viven en `app/globals.css` como variables CSS en `:root` y se exponen a Tailwind v4 vía `@theme inline`. **Nunca uses colores hardcodeados** en componentes, layouts ni estilos inline salvo datos dinámicos de usuario (p. ej. color de empleado desde la base de datos).

**Usa siempre clases del tema semántico:**

| Rol | Clases Tailwind |
|-----|-----------------|
| Fondo app | `bg-canvas` |
| Paneles / inputs | `bg-surface` |
| Acciones / nav activa | `bg-primary`, `hover:bg-primary-hover`, `text-on-primary` |
| Texto | `text-ink`, `text-ink-secondary`, `text-ink-muted` |
| Bordes | `border-border`, `border-border-subtle`, `divide-border-subtle` |
| Focus | `ring-primary` |
| Estado error | `text-danger`, `bg-danger` |
| Estado aviso | `text-warning`, `bg-warning` |
| Estado éxito | `text-success`, `bg-success` |
| Acentos suaves | `bg-primary-subtle`, `text-primary-light` |

**Prohibido en UI:** valores hex/rgb/oklch literales, paletas de Tailwind no definidas en el tema (`zinc-*`, `red-500`, `emerald-600`, etc.) y `style={{ color: '...' }}` / `backgroundColor` con valores fijos.

**Si falta un token:** añádelo primero en `:root` y `@theme inline` de `globals.css`, luego úsalo en el componente. No introduzcas el color directamente en el JSX.

**Excepción:** colores dinámicos persistidos (color de empleado, marca de clínica). Usa `style` solo con el valor de datos; el fallback cuando falte debe ser una clase del tema (`bg-border`), no un hex.

## Checklist antes de entregar

Ejecuta, en este orden y en proporción al cambio:

1. Búsquedas estáticas con `rg` para imports prohibidos, `console.*`, endpoints obsoletos y patrones afectados.
2. `pnpm typecheck`.
3. `pnpm lint`.
4. React Doctor cuando se modifique React, estado, componentes o rendimiento.
5. `pnpm audit --prod` cuando cambien dependencias o lockfile.
6. `pnpm build` para detectar errores de RSC, rutas, prerender y entorno.
7. Recorridos manuales de los flujos críticos, entradas malformadas y concurrencia cuando aplique.

Interpreta los diagnósticos automáticos en contexto: verifica el código completo antes de modificarlo y documenta los falsos positivos comprobados. No declares una tarea completa si quedan validaciones requeridas sin ejecutar; indica claramente qué falta y por qué.
