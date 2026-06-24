# Stripe — configuración y pruebas en local

Landora usa **Payment Links** de Stripe (no Stripe.js en el frontend). Tras el pago, un webhook actualiza la suscripción principal o el addon de reservas en la base de datos.

## Variables de entorno

Copia los valores de `.env.example` a `.env`. Todas deben ser del **mismo modo** (test o live); Stripe no mezcla recursos entre modos.

| Variable | Uso |
|----------|-----|
| `STRIPE_SECRET_KEY` | API server-side (`sk_test_...` en local) |
| `STRIPE_WEBHOOK_SECRET` | Verificación de firmas del webhook (`whsec_...`) |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Suscripción principal |
| `NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK` | Addon de reservas |
| `STRIPE_BOOKING_PRICE_ID` | Identifica suscripciones de booking en el webhook |

No se usa `pk_test_...` (publishable key). Los pagos van a la página hospedada de Stripe.

## 1. Configurar Stripe Dashboard (modo test)

1. Activa **Test mode** en el [Dashboard de Stripe](https://dashboard.stripe.com).
2. **Developers → API keys** → copia la **Secret key** (`sk_test_...`) a `STRIPE_SECRET_KEY`.
3. Crea los productos/precios de suscripción en **Products** (modo test).
4. Crea dos **Payment Links** en **Payment Links**:
   - Suscripción principal → `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
   - Addon booking → `NEXT_PUBLIC_STRIPE_BOOKING_PAYMENT_LINK`
5. Copia el **Price ID** del producto booking → `STRIPE_BOOKING_PRICE_ID`.

Los Payment Links y price IDs de `.env.example` son de producción; no los uses en local.

## 2. Instalar Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows (scoop)
scoop install stripe
```

Autentícate (usa la CLI key del Dashboard o `stripe login`):

```bash
stripe login
```

## 3. Webhooks en local

Stripe no puede llamar a `localhost` directamente. Reenvía eventos con el CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

El comando imprime un `whsec_...`. Cópialo a `STRIPE_WEBHOOK_SECRET` en `.env` y reinicia `pnpm dev`.

Eventos que procesa la app (`app/api/webhooks/stripe/route.ts`):

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_failed`

## 4. Probar un pago en local

1. Deja corriendo `pnpm dev` y `stripe listen` en terminales separadas.
2. Inicia sesión en la app con un usuario de Clerk.
3. Dispara el checkout:
   - **Suscripción principal:** accede a una ruta del dashboard sin suscripción activa (el proxy redirige al Payment Link).
   - **Addon booking:** visita `/booking-upgrade`.
4. La app añade `client_reference_id` con el `clerkUserId` al Payment Link.
5. En el checkout de Stripe usa una tarjeta de prueba:
   - Número: `4242 4242 4242 4242`
   - Fecha: cualquier mes/año futuro
   - CVC: cualquier 3 dígitos
6. Comprueba:
   - Eventos en la terminal de `stripe listen`
   - Suscripción o addon actualizado en la base de datos
   - Portal de cliente en `/settings` (si ya hay `stripeCustomerId`)

## 5. Producción

1. Desactiva **Test mode** y repite el paso 1 con recursos live.
2. Crea un endpoint en **Developers → Webhooks** apuntando a `https://tu-dominio/api/webhooks/stripe`.
3. Selecciona los mismos eventos listados arriba.
4. Copia el **Signing secret** del endpoint a `STRIPE_WEBHOOK_SECRET` en Vercel.
5. Configura las variables Stripe en Vercel con valores live.

## Referencia rápida de claves del Dashboard

| Clave en Dashboard | ¿Va en `.env`? |
|--------------------|----------------|
| Secret key (`sk_test_...`) | Sí → `STRIPE_SECRET_KEY` |
| Publishable key (`pk_test_...`) | No |
| Restricted key (`rk_test_...`) | No |
| CLI key | No (solo para `stripe login`) |
| Webhook signing secret (Dashboard) | Solo en producción |
| Webhook signing secret (`stripe listen`) | Sí → `STRIPE_WEBHOOK_SECRET` en local |
