# Aprendizajes técnicos reutilizables

Este documento resume las decisiones más importantes aplicadas durante la mejora técnica de Landora. El objetivo no es describir únicamente este proyecto, sino extraer patrones que puedan reutilizarse en futuras aplicaciones con Next.js, TypeScript, React y PostgreSQL.

## 1. Valida las variables de entorno al arrancar

Las variables de entorno forman parte del contrato de la aplicación. Acceder directamente a `process.env` por todo el código genera varios problemas:

- El tipo siempre es `string | undefined`.
- Los errores de configuración aparecen tarde, cuando un usuario ejecuta una funcionalidad.
- Es fácil introducir assertions como `process.env.SECRET!`.
- Distintos módulos pueden interpretar de forma diferente si una variable es obligatoria.

La solución es crear un único módulo de entorno del servidor:

```ts
import "server-only";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYMENT_SECRET_KEY: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  PAYMENT_SECRET_KEY: process.env.PAYMENT_SECRET_KEY,
});

if (!parsed.success) {
  throw new Error("Invalid server environment configuration");
}

export const serverEnv = parsed.data;
```

Para integraciones opcionales puede añadirse una función que falle cuando se intente utilizar la integración:

```ts
export function requireServerEnv(key: keyof typeof serverEnv): string {
  const value = serverEnv[key];
  if (!value) {
    throw new Error(`${key} is not configured`);
  }

  return value;
}
```

### Regla reutilizable

- Las variables imprescindibles para arrancar se validan al importar el módulo.
- Las variables de funcionalidades opcionales se validan al usar esa funcionalidad.
- Los secretos viven únicamente en módulos con `server-only`.
- Nunca se usa `!` para ocultar una variable posiblemente ausente.
- Nunca se crea un bypass silencioso en producción.

## 2. Trata todas las fronteras como entrada no confiable

TypeScript no valida datos en runtime. Un parámetro tipado como `string` puede llegar desde una petición como un objeto, una cadena demasiado larga o un valor vacío.

Las principales fronteras que deben validarse son:

- Bodies JSON.
- Parámetros de rutas.
- Query strings.
- `FormData`.
- Server Actions.
- Webhooks.
- Mensajes entre ventanas o iframes.
- Respuestas de servicios externos.

El patrón recomendado es:

```ts
const resourceIdSchema = z.uuid();

const updateSchema = z.strictObject({
  name: z.string().trim().min(1).max(120),
});

const parsedId = resourceIdSchema.safeParse(id);
const parsedBody = updateSchema.safeParse(body);

if (!parsedId.success || !parsedBody.success) {
  return Response.json({ error: "Datos inválidos" }, { status: 400 });
}
```

### Por qué limitar longitudes

Los límites no son solo una cuestión de interfaz. También reducen:

- Consumo accidental de memoria.
- Payloads abusivos.
- Logs enormes.
- Contenido inesperado en proveedores externos.
- Riesgo de almacenar datos imposibles de mostrar correctamente.

### Regla reutilizable

Cada entrada se valida una sola vez en la frontera y el resto del flujo trabaja con datos ya normalizados.

## 3. Separa errores de dominio de errores técnicos

Un error de base de datos no debería llegar al navegador. Además de producir una mala experiencia, puede revelar nombres de tablas, restricciones o detalles internos.

Es mejor traducir los errores técnicos a resultados del dominio:

```ts
type CreateReservationResult =
  | { status: "created"; reservation: Reservation }
  | { status: "slot_taken" };
```

La DAL conoce PostgreSQL y traduce sus errores:

```ts
try {
  const reservation = await insertReservation(data);
  return { status: "created", reservation };
} catch (error) {
  if (isExclusionConstraintError(error)) {
    return { status: "slot_taken" };
  }

  logger.captureException(error, {
    action: "create-reservation",
    tenantId: data.tenantId,
  });

  throw new Error("Failed to create reservation", { cause: error });
}
```

La capa superior solo interpreta resultados del negocio:

```ts
const result = await createReservationRecord(data);

if (result.status === "slot_taken") {
  return {
    status: "slot_taken",
    error: "Ese horario ya no está disponible",
  };
}
```

### Ventajas

- El cliente recibe mensajes estables.
- La implementación de la base de datos queda encapsulada.
- Los errores inesperados siguen llegando al sistema de observabilidad.
- Los consumidores no necesitan conocer códigos SQL.

## 4. La base de datos debe proteger las invariantes

Comprobar disponibilidad antes de insertar una reserva mejora la experiencia, pero no garantiza consistencia.

Dos peticiones concurrentes pueden hacer lo siguiente:

1. La petición A comprueba que el horario está libre.
2. La petición B comprueba que el mismo horario está libre.
3. Ambas intentan insertar.

La única capa capaz de arbitrar correctamente esa carrera es la base de datos.

Para reservas, inventario, saldos o identificadores únicos:

- La aplicación puede hacer una comprobación previa.
- La base de datos debe tener una restricción que impida el estado inválido.
- El código debe traducir el error de la restricción a un resultado de dominio.

### Regla reutilizable

No intentes sustituir una restricción SQL con una transacción aparente o con dos queries separadas desde la aplicación.

## 5. Una DAL estricta reduce acoplamiento

Las queries deben vivir en una capa de acceso a datos, no en componentes, páginas o route handlers.

Una función de lectura de la DAL debería:

- Importar el cliente de base de datos.
- Usar `cache()` cuando proceda en React Server Components.
- Capturar errores técnicos.
- Devolver `null` si el registro no existe.
- Lanzar un error si la consulta falla.

```ts
export const getCustomerById = cache(async (id: string) => {
  try {
    return await queryCustomer(id) ?? null;
  } catch {
    throw new Error("Failed to fetch customer");
  }
});
```

Una función de escritura no debería usar `cache()`:

```ts
export async function updateCustomer(id: string, data: CustomerUpdate) {
  try {
    return await executeUpdate(id, data);
  } catch {
    throw new Error("Failed to update customer");
  }
}
```

### Estructura recomendada

```text
app/ y components/
        ↓
Server Actions o Route Handlers
        ↓
data/
        ↓
db/
```

Solo `data/` debe importar el cliente o schema de Drizzle. Esto permite cambiar la persistencia sin reescribir la interfaz.

## 6. No expongas filas de la base de datos a la UI

Importar tipos de Drizzle directamente en componentes y stores introduce un acoplamiento invisible:

- La UI recibe campos que no necesita.
- Un cambio de columna se propaga por toda la aplicación.
- Es más fácil enviar accidentalmente información sensible al cliente.
- El dominio acaba expresado según la estructura de almacenamiento.

En su lugar, define DTOs mínimos:

```ts
export type EmployeeOptionDto = {
  id: string;
  name: string;
};

export type BookingSettingsDto = {
  enabled: boolean;
  timezone: string;
  minAdvanceHours: number;
  maxAdvanceDays: number;
};
```

Los DTOs deben describir lo que el consumidor necesita, no todo lo que existe en la tabla.

### Cuándo mapear

- Al salir de la DAL.
- Antes de pasar datos de un Server Component a un Client Component.
- Antes de construir una respuesta API.
- Antes de inicializar un store cliente.

## 7. Diseña resultados explícitos, no booleanos ambiguos

Un booleano suele perder información:

```ts
const valid = await verifyToken(token);
```

Si devuelve `false`, no sabemos si:

- El token es inválido.
- Falta configuración.
- El proveedor no responde.
- Se ha producido un timeout.

Una unión discriminada obliga a manejar los casos:

```ts
type VerificationResult =
  | { valid: true }
  | {
      valid: false;
      reason:
        | "invalid_token"
        | "configuration_error"
        | "verification_failed"
        | "service_unavailable";
    };
```

Este patrón es especialmente útil para:

- Autenticación.
- Pagos.
- Reservas.
- Subidas de archivos.
- Webhooks.
- Operaciones idempotentes.

## 8. Los tokens de seguridad tienen semántica propia

No todos los tokens pueden tratarse como datos cacheables.

En el caso de un CAPTCHA o mecanismo similar:

- El token puede ser de un solo uso.
- Puede caducar rápidamente.
- Puede estar ligado a un hostname.
- Puede estar ligado a una acción concreta.

Por tanto:

- No se cachea un resultado positivo para reutilizar el token.
- No se registran el token ni fragmentos del token.
- Se valida el `hostname`.
- Se valida la `action`.
- Se limita la longitud antes de llamar al proveedor.
- Se aplica timeout a la petición externa.
- Si falta el secreto en producción, la verificación falla.

### Principio general

Antes de optimizar o cachear un token, hay que conocer su semántica de seguridad y sus garantías de uso.

## 9. Los errores públicos y los logs internos tienen objetivos distintos

El usuario necesita una explicación útil y segura:

```ts
return { error: "No se pudo completar la reserva" };
```

El equipo necesita contexto técnico:

```ts
logger.captureException(error, {
  action: "create-booking",
  tenantId,
  userId,
});
```

Nunca deben enviarse al cliente:

- Queries SQL.
- Stack traces.
- Secretos.
- Tokens.
- Mensajes internos del proveedor.
- Datos personales innecesarios.

Tampoco conviene construir logs concatenando objetos arbitrarios. Es preferible usar mensajes estructurados y un conjunto pequeño de identificadores seguros.

## 10. Un iframe necesita aislamiento y un canal de comunicación seguro

Usar `postMessage(..., "*")` sin comprobaciones permite aceptar mensajes de ventanas no confiables. Sin embargo, retirar `allow-same-origin` de un iframe sandboxed convierte su origen en opaco y complica el uso de un origen exacto.

Una solución robusta es establecer un `MessageChannel`:

1. El padre crea un `MessageChannel`.
2. Transfiere uno de los puertos al iframe.
3. El iframe solo acepta la inicialización si `event.source === window.parent`.
4. A partir de ahí, toda la comunicación pasa por el puerto privado.
5. El iframe puede permanecer con `sandbox="allow-scripts"`.

```ts
const channel = new MessageChannel();

channel.port1.onmessage = handlePreviewMessage;
channel.port1.start();

iframe.contentWindow?.postMessage(
  { type: "preview-channel-init" },
  "*",
  [channel.port2],
);
```

El iframe:

```ts
function connectChannel(event: MessageEvent) {
  if (event.source !== window.parent) return;
  if (event.data?.type !== "preview-channel-init") return;

  const port = event.ports[0];
  if (!port) return;

  port.onmessage = (messageEvent) => {
    handleValidatedPayload(messageEvent.data);
  };

  port.start();
}
```

Incluso dentro de un canal privado, los payloads deben validarse antes de utilizarlos.

## 11. Despliega una CSP de forma progresiva

Una Content Security Policy estricta puede romper autenticación, pagos, analítica, imágenes o monitorización si se activa sin observar primero el tráfico real.

Una estrategia más segura:

1. Definir una CSP inicial.
2. Desplegarla como `Content-Security-Policy-Report-Only`.
3. Recorrer todos los flujos externos.
4. Ajustar únicamente los orígenes realmente necesarios.
5. Convertirla después en una política bloqueante.

También conviene añadir:

- `Strict-Transport-Security` en producción.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy`.
- `Permissions-Policy`.
- Una política explícita de `frame-ancestors`.

### Regla reutilizable

Las cabeceras de seguridad no deben copiarse a ciegas. Deben adaptarse a los proveedores reales de la aplicación.

## 12. Reduce el límite de request al mínimo necesario

Un límite global de 50 MB es excesivo para una aplicación que normalmente recibe JSON y formularios pequeños.

Un límite amplio:

- Aumenta el impacto de peticiones abusivas.
- Consume más memoria.
- Oculta que las subidas grandes deberían ir directamente a un proveedor de archivos.

Para imágenes o vídeos, el patrón preferible es:

1. El servidor firma o autoriza la subida.
2. El navegador sube directamente al proveedor.
3. La aplicación recibe únicamente metadatos y la URL resultante.

## 13. Inicializa Zustand por árbol de React, no como singleton mutable

Un store global creado al importar el módulo puede compartir estado entre renders del servidor o dificultar la hidratación.

Para datos que vienen del servidor, crea una instancia por provider:

```ts
function createFeatureStore(initial: InitialState) {
  return createStore<FeatureState>()(() => ({
    ...initial,
  }));
}

export function FeatureStoreProvider({ initial, children }: Props) {
  const [store] = useState(() => createFeatureStore(initial));

  return (
    <FeatureStoreContext value={store}>
      {children}
    </FeatureStoreContext>
  );
}
```

Esto evita:

- Mutar el store durante el render.
- Hacer bootstrap mediante efectos.
- Compartir datos entre usuarios.
- Sobrescribir cambios locales al hidratar.

### Usa selectores precisos

```ts
const updateContact = useDashboardStore((state) => state.updateContact);
```

Para varios valores:

```ts
const { landing, updateLanding } = useDashboardStore(
  useShallow((state) => ({
    landing: state.landing,
    updateLanding: state.updateLanding,
  })),
);
```

Evita:

```ts
const state = useDashboardStore();
```

Una suscripción al store completo hace que el componente se renderice por cualquier cambio.

## 14. El estado derivado no debe duplicarse

Si un valor puede calcularse a partir de props o de otro estado, normalmente no necesita `useState`.

Evita:

```ts
const [fullName, setFullName] = useState("");

useEffect(() => {
  setFullName(user.name);
}, [user]);
```

Prefiere:

```ts
const fullName = user.name;
```

O un inicializador perezoso si realmente debe convertirse en estado editable:

```ts
const [fullName, setFullName] = useState(() => user.name);
```

Esto elimina renders adicionales y efectos con dependencias circulares.

## 15. Los formularios necesitan un único modelo de estado

Un formulario con varios `useState` independientes tiende a duplicar:

- Valores iniciales.
- Validación.
- Limpieza.
- Estado de envío.
- Mensajes de error.

El patrón reutilizable es:

```ts
const formSchema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
});

const {
  register,
  control,
  handleSubmit,
  formState: { errors, isSubmitting },
  reset,
} = useForm<FormValues>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
  },
});
```

- Inputs nativos: `register`.
- Selects, switches o date pickers: `Controller`.
- Errores de campo: junto al control.
- Errores globales: notificación.
- Reset: una única llamada a `reset`.

### Comparte el contrato con el servidor

Cuando sea posible, el formulario y la Server Action deben usar el mismo schema o schemas derivados del mismo módulo.

El servidor siempre vuelve a validar. La validación cliente solo mejora la experiencia.

## 16. Server Components por defecto, islas cliente por necesidad

Una página pública completa no debería convertirse en Client Component solo porque contiene una FAQ o un carrusel.

Es mejor mantener:

- Datos, layout y contenido estático en Server Components.
- Navegación interactiva en una isla cliente.
- Carruseles en una isla cliente.
- Analítica en una isla cliente.
- Animaciones visibles en una isla cliente.

Esto reduce:

- JavaScript enviado al navegador.
- Tiempo de hidratación.
- Dependencias incluidas en el bundle inicial.
- Superficie de errores cliente.

Las librerías pesadas, como gráficos, deben cargarse dinámicamente desde un wrapper cliente:

```ts
const Chart = dynamic(() => import("./chart-area"), {
  ssr: false,
  loading: () => <ChartSkeleton />,
});
```

## 17. Accesibilidad: empieza por la estructura

Las mejoras de mayor impacto suelen ser simples:

- Enlace “Saltar al contenido”.
- Un destino identificable con `id`.
- Labels asociados a inputs.
- `aria-expanded` y `aria-controls` en desplegables.
- Iconos decorativos con `aria-hidden`.
- Navegación por teclado.
- Mensajes de error comprensibles.
- Error boundaries con botón de reintento.

Para una FAQ:

```tsx
<button
  aria-expanded={open}
  aria-controls={contentId}
  onClick={() => setOpen((value) => !value)}
>
  {question}
</button>

{open ? <div id={contentId}>{answer}</div> : null}
```

No es necesario animar la altura para que el componente sea usable.

## 18. Respeta `prefers-reduced-motion` globalmente

No basta con desactivar una animación concreta. Es útil incluir una protección global:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Los componentes con animaciones complejas también deberían consultar la preferencia y evitar montar librerías de animación cuando no son necesarias.

## 19. Evita `transition-all`

`transition-all` puede animar propiedades que no se pretendían animar, incluidas propiedades costosas o cambios de layout.

Prefiere:

```html
transition-colors
transition-transform
transition-[box-shadow,transform]
transition-[color,background-color,border-color]
```

Además de ser más predecible, deja claro qué comportamiento visual se espera.

## 20. Los colores deben pertenecer al sistema de diseño

Los colores hardcodeados repartidos por componentes dificultan:

- Cambiar el tema.
- Mantener contraste.
- Reutilizar componentes.
- Detectar inconsistencias.

Los valores deben definirse como tokens:

```css
:root {
  --agenda-blue-main: #3b82f6;
  --agenda-blue-container: #bfdbfe;
  --agenda-blue-ink: #1e3a8a;
}
```

Los componentes consumen el token:

```ts
const color = "var(--agenda-blue-main)";
```

La excepción son colores dinámicos almacenados por el usuario.

## 21. El documento debe ser desplazable por defecto

Bloquear `html` o `body` globalmente suele romper páginas públicas, modales, navegación por anclas y accesibilidad.

El patrón correcto es:

- El documento mantiene su scroll normal.
- Las aplicaciones tipo dashboard controlan su propio contenedor.
- Un dashboard puede usar `h-dvh overflow-hidden`.
- El área interior que necesita scroll usa `overflow-y-auto`.

No conviene modificar el overflow global después de la hidratación mediante un provider cliente.

## 22. Elimina rutas y dependencias duplicadas

Cada endpoint o dependencia adicional amplía:

- La superficie de ataque.
- La cantidad de código que mantener.
- Las formas posibles de ejecutar la misma operación.
- El riesgo de que dos flujos validen de manera diferente.

Antes de eliminar un endpoint:

1. Busca consumidores en el repositorio.
2. Confirma si existen clientes móviles o integraciones externas.
3. Migra la UI al mecanismo canónico.
4. Elimina el endpoint y sus tipos asociados.
5. Ejecuta el build para detectar referencias generadas.

Antes de mantener una dependencia:

- Busca imports reales.
- Comprueba si es directa o transitiva.
- Elimina SDKs no usados.
- Conserva una sola configuración de lint.

## 23. Actualiza dependencias sin saltarte las políticas del proyecto

No siempre es correcto forzar la última versión.

Una política con antigüedad mínima o verificación de procedencia puede impedir instalar una versión recién publicada. Esto protege contra paquetes comprometidos o releases inestables.

Si una vulnerabilidad procede de una dependencia transitiva:

- Comprueba si existe una versión segura compatible.
- Usa overrides de `pnpm` cuando sea apropiado.
- Vuelve a ejecutar `pnpm audit --prod`.
- Comprueba qué versión termina realmente instalada.

El objetivo no es cambiar números en `package.json`, sino conseguir un árbol de producción seguro y reproducible.

## 24. Verifica por capas

Una validación fiable debe ir de lo más rápido a lo más completo:

1. Búsquedas estáticas con `rg`.
2. `pnpm typecheck`.
3. `pnpm lint`.
4. Herramientas de diagnóstico especializadas.
5. `pnpm audit --prod`.
6. `pnpm build`.
7. Pruebas manuales de los recorridos críticos.

### Por qué ejecutar el build

TypeScript no detecta todos los problemas de:

- Server Components.
- Imports cliente/servidor.
- Generación de rutas.
- Variables de entorno.
- Prerender.
- Configuración de Next.js.

### Interpreta las herramientas, no obedezcas ciegamente

Un diagnóstico automático puede marcar:

- Un listener como no limpiado aunque exista `removeEventListener`.
- Una Server Action pública por token como falta de autenticación.
- Una librería pesada como import directo aunque el archivo padre ya se cargue dinámicamente.

Cada aviso debe comprobarse en el contexto completo. La herramienta orienta; el código y el modelo de seguridad deciden.

## 25. Conserva los cambios locales del usuario

En una auditoría o refactor grande es habitual encontrar un working tree con cambios previos.

Buenas prácticas:

- Revisar el estado antes de editar.
- No usar `git reset --hard`.
- No revertir archivos ajenos a la tarea.
- Hacer cambios mínimos por área.
- Evitar reformateos masivos que oculten el diff real.
- No crear commits o ramas si no se ha solicitado.

## Checklist reutilizable

### Seguridad

- [ ] Variables de entorno validadas con Zod.
- [ ] Módulos de secretos marcados con `server-only`.
- [ ] Sin assertions `!` sobre secretos.
- [ ] Bodies, params, queries y acciones validados.
- [ ] Límites de longitud y tamaño definidos.
- [ ] Errores internos no enviados al cliente.
- [ ] Logs sin tokens, secretos ni datos personales innecesarios.
- [ ] CSP desplegada primero en report-only.
- [ ] HSTS y cabeceras de seguridad configuradas.
- [ ] Iframes sandboxed y mensajes validados.

### Datos

- [ ] Queries dentro de `data/`.
- [ ] La UI no importa el cliente de base de datos.
- [ ] DTOs mínimos entre servidor y cliente.
- [ ] Invariantes críticas protegidas por SQL.
- [ ] Errores SQL traducidos a resultados del dominio.
- [ ] Lecturas cacheadas solo cuando corresponde.

### React y estado

- [ ] Server Components por defecto.
- [ ] Client Components limitados a interactividad real.
- [ ] Store inicializado mediante provider.
- [ ] Selectores precisos en Zustand.
- [ ] Sin estado derivado duplicado.
- [ ] Sin `setState` circular dentro de efectos.
- [ ] Librerías pesadas cargadas dinámicamente.

### Formularios

- [ ] React Hook Form para formularios de varios campos.
- [ ] Zod compartido con el servidor.
- [ ] `Controller` para componentes propios.
- [ ] Errores de campo junto al control.
- [ ] Errores globales mediante notificación.
- [ ] Reset centralizado.

### UI y accesibilidad

- [ ] Enlace “Saltar al contenido”.
- [ ] Labels y nombres accesibles.
- [ ] Navegación completa por teclado.
- [ ] `prefers-reduced-motion`.
- [ ] Sin animaciones de altura innecesarias.
- [ ] Sin `transition-all`.
- [ ] Colores definidos mediante tokens.
- [ ] Error boundaries recuperables.
- [ ] Scroll global habilitado por defecto.

### Validación final

- [ ] `pnpm typecheck`.
- [ ] `pnpm lint`.
- [ ] `pnpm build`.
- [ ] `pnpm audit --prod`.
- [ ] Diagnóstico de React revisado manualmente.
- [ ] Flujos críticos probados con entradas válidas y malformadas.
- [ ] Condiciones concurrentes probadas cuando existan recursos compartidos.

## Idea central

La mejora más importante no es una librería concreta. Es diseñar fronteras claras:

- El navegador no confía en datos externos.
- La Server Action no confía en el navegador.
- La DAL no expone la base de datos.
- La base de datos protege las invariantes.
- Los logs conservan el detalle técnico.
- El usuario recibe resultados de dominio seguros.
- React solo hidrata la interactividad necesaria.

Cuando cada capa tiene una responsabilidad explícita, la aplicación se vuelve más segura, predecible y fácil de modificar.
