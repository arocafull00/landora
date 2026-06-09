# Despliegue de una web para cliente

## 1. Preparar Landora (una vez)

1. Variables en Vercel:
   - `NEXT_PUBLIC_APP_DOMAIN=landora-seven.vercel.app`
   - `NEXT_PUBLIC_APP_URL=https://landora-seven.vercel.app`
   - `VERCEL_API_TOKEN`
   - `VERCEL_PROJECT_ID`
   - `VERCEL_TEAM_ID` (si aplica)
2. Desplegar el proyecto en Vercel.
3. Aplicar migraciones: `pnpm db:migrate`

## 2. Crear el cliente

1. Entra en `/admin`.
2. Crea el usuario en Clerk (nombre, email, contraseña).
3. Crea su landing: nombre, slug y plantilla.
4. Opcional: **Editar dashboard** para configurar contenido como el cliente.

## 3. Publicar la web

1. En `/admin`, pulsa **Publicar** en la landing del cliente.
2. Comprueba la preview en `https://landora-seven.vercel.app/{slug}`.
3. El cliente solo puede editar si tiene cuenta y landing asignada.

## 4. Conectar dominio del cliente

1. El cliente compra su dominio (ej. `www.suempresa.com`).
2. El cliente entra en `https://landora-seven.vercel.app/domain`.
3. Introduce el dominio y pulsa **Conectar dominio**.
4. Copia los registros DNS que muestra Landora.
5. Los configura en su registrador (Namecheap, Cloudflare, etc.).
6. Espera la propagación DNS (minutos a 48 h).
7. Vercel verifica el dominio → la web queda live.

## 5. Resultado en producción

| Quién | URL | Qué ve |
|-------|-----|--------|
| Visitantes | `www.suempresa.com` | Solo la web pública |
| Cliente | `landora-seven.vercel.app/editor` | Dashboard (requiere login) |
| Admin | `landora-seven.vercel.app/admin` | Panel de administración |

Los visitantes **no** acceden al editor ni al dashboard desde el dominio personalizado.

## 6. Checklist final

- [ ] Landing publicada
- [ ] Dominio verificado en Vercel
- [ ] DNS configurado por el cliente
- [ ] Web accesible en dominio custom
- [ ] Cliente puede iniciar sesión y editar en Landora
