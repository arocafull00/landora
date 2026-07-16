# Aprendizajes técnicos reutilizables

Resumen de los patrones más importantes aplicados en Landora y que conviene repetir en futuros proyectos con Next.js, React, TypeScript y PostgreSQL.

## 1. Valida todas las fronteras

TypeScript no valida datos en runtime. Usa Zod en:

- Variables de entorno.
- Bodies y parámetros de APIs.
- Server Actions y formularios.
- Webhooks y respuestas externas.
- Mensajes entre ventanas o iframes.

Define límites de longitud y usa `z.strictObject()` cuando no deban aceptarse campos adicionales.

```ts
const schema = z.strictObject({
  id: z.uuid(),
  name: z.string().trim().min(1).max(120),
});
```

El cliente puede validar para mejorar la experiencia, pero el servidor siempre debe volver a validar.

## 2. Centraliza las variables de entorno

No accedas a `process.env` por toda la aplicación ni uses assertions `!`.

```ts
import "server-only";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  PAYMENT_SECRET_KEY: z.string().min(1).optional(),
});

export const serverEnv = envSchema.parse(process.env);
```

- Los secretos viven en módulos con `server-only`.
- Las variables imprescindibles fallan al arrancar.
- Las integraciones opcionales fallan explícitamente al utilizarse.
- Nunca debe existir un bypass silencioso en producción.

## 3. Separa UI, dominio y base de datos

Las dependencias deberían seguir esta dirección:

```text
Componentes
    ↓
Server Actions / Route Handlers
    ↓
DAL en data/
    ↓
Base de datos
```

Solo la DAL debe importar el cliente o schema de Drizzle. La UI recibe DTOs mínimos:

```ts
type EmployeeOptionDto = {
  id: string;
  name: string;
};
```

Esto evita exponer filas completas, reduce el acoplamiento y permite cambiar la persistencia sin reescribir componentes.

## 4. Deja que la base de datos proteja las invariantes

Una comprobación previa no evita carreras entre peticiones simultáneas. Para reservas, inventario, saldos o valores únicos:

1. Comprueba previamente para ofrecer una buena experiencia.
2. Protege la regla con una restricción SQL.
3. Traduce el error SQL a un resultado del dominio.

```ts
type CreateBookingResult =
  | { status: "created"; booking: Booking }
  | { status: "slot_taken" };
```

El usuario recibe `slot_taken`; los detalles SQL solo se registran internamente.

## 5. Usa resultados explícitos y errores seguros

Evita booleanos que oculten la causa:

```ts
type VerificationResult =
  | { valid: true }
  | {
      valid: false;
      reason: "invalid_token" | "configuration_error" | "service_unavailable";
    };
```

Separa siempre:

- Mensaje público: genérico, estable y útil.
- Log interno: excepción, acción e identificadores seguros.

Nunca envíes ni registres secretos, tokens, queries, stack traces o datos personales innecesarios.

## 6. Trata correctamente tokens e iframes

Antes de cachear un token, comprueba su semántica. Los tokens de CAPTCHA suelen ser de un solo uso y caducar rápidamente.

- No caches resultados para reutilizar tokens.
- Valida `hostname` y `action`.
- Aplica límite de longitud y timeout.
- Si falta el secreto en producción, falla de forma segura.
- Nunca registres el token.

Para previews en iframes:

- Usa `sandbox` sin `allow-same-origin` cuando sea posible.
- Comprueba `event.source`.
- Valida todos los payloads.
- Usa un `MessageChannel` privado para la comunicación continuada.

## 7. Inicializa el estado cliente correctamente

Evita stores singleton mutados durante el render. Si los datos llegan del servidor, crea una instancia de Zustand por provider:

```ts
const [store] = useState(() => createFeatureStore(initialState));
```

Suscríbete solo a lo que utiliza el componente:

```ts
const updateContact = useStore((state) => state.updateContact);
```

Para varios valores, usa `useShallow`. No uses `useStore()` sin selector porque provoca renders ante cualquier cambio.

Tampoco dupliques valores derivados en `useState` ni sincronices props mediante efectos si pueden calcularse directamente.

## 8. Estandariza formularios y componentes

Los formularios de varios campos deberían usar React Hook Form y Zod:

- `register` para inputs nativos.
- `Controller` para selects, switches y controles propios.
- Errores de campo junto al control.
- Errores globales mediante notificación.
- Una única llamada a `reset()`.
- El mismo contrato validado otra vez en el servidor.

En React:

- Server Components por defecto.
- Islas cliente solo para interactividad.
- Librerías pesadas mediante import dinámico.
- Un componente por archivo.
- Componentes grandes divididos en hook, contenedor y piezas visuales.

## 9. Incluye accesibilidad y rendimiento desde el principio

Checklist mínima de UI:

- Enlace “Saltar al contenido”.
- Labels asociados a todos los controles.
- Navegación completa por teclado.
- `aria-expanded` y `aria-controls` en desplegables.
- Iconos decorativos con `aria-hidden`.
- Error boundaries con botón de reintento.
- Soporte para `prefers-reduced-motion`.
- Documento desplazable por defecto.

Evita `transition-all`; declara únicamente las propiedades animadas:

```html
transition-colors
transition-transform
transition-[box-shadow,transform]
```

Los colores deben vivir en tokens CSS. Solo los colores dinámicos elegidos por usuarios deberían llegar mediante estilos inline.

## 10. Endurece y verifica de forma progresiva

Cabeceras recomendadas:

- CSP, primero en modo report-only.
- HSTS en producción.
- `X-Content-Type-Options`.
- `Referrer-Policy`.
- `Permissions-Policy`.

Reduce el tamaño máximo de requests. Las subidas grandes deberían ir directamente al proveedor de archivos mediante una firma del servidor.

Orden recomendado de validación:

1. Búsquedas estáticas con `rg`.
2. `pnpm typecheck`.
3. `pnpm lint`.
4. Diagnósticos especializados.
5. `pnpm audit --prod`.
6. `pnpm build`.
7. Pruebas manuales de flujos críticos y concurrencia.

Las herramientas automáticas orientan, pero sus avisos deben comprobarse en el contexto completo antes de modificar código.

## Checklist para futuros proyectos

- [ ] Entorno validado con Zod y secretos protegidos con `server-only`.
- [ ] Todas las entradas externas validadas y limitadas.
- [ ] Queries encapsuladas en una DAL.
- [ ] UI desacoplada de filas de base de datos mediante DTOs.
- [ ] Invariantes críticas protegidas por restricciones SQL.
- [ ] Errores técnicos traducidos a resultados de dominio.
- [ ] Logs sin secretos ni información personal innecesaria.
- [ ] Server Components por defecto y bundles pesados bajo demanda.
- [ ] Zustand inicializado mediante provider y selectores precisos.
- [ ] Formularios con React Hook Form y Zod.
- [ ] Accesibilidad, movimiento reducido y tokens de diseño.
- [ ] CSP y cabeceras de seguridad configuradas.
- [ ] Dependencias sin uso eliminadas y auditoría limpia.
- [ ] Typecheck, lint, build y recorridos críticos verificados.

## Idea central

Cada capa debe tener una responsabilidad clara: el servidor valida, la DAL encapsula, la base de datos protege invariantes, los logs conservan el detalle técnico y el usuario recibe resultados seguros. Esta separación hace que una aplicación sea más predecible, mantenible y resistente.