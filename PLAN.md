# Plan de implementación: SaaS de gestión de landings multi-tenant

> Plan estructurado para ejecutar con Claude Code. Cada fase es un contexto de trabajo independiente.

---

## Stack

- **Next.js 15** (App Router)
- **Clerk** — autenticación
- **Neon** — base de datos PostgreSQL
- **Drizzle ORM** — queries y schema
- **Cloudinary** — almacenamiento de imágenes
- **Vercel** — despliegue, dominios y KV (caché)
- **Zod** — validación de content_json por plantilla

---

## Estructura de carpetas objetivo

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Clerk auth guard
│   │   ├── page.tsx                # Lista de landings del cliente
│   │   └── landings/
│   │       └── [id]/
│   │           └── editor/
│   │               └── page.tsx    # Editor de landing
│   ├── (superadmin)/
│   │   ├── layout.tsx              # Guard de rol admin
│   │   └── page.tsx                # Panel: clientes, dominios, Vercel API
│   ├── api/
│   │   ├── landings/
│   │   │   ├── route.ts            # GET /api/landings
│   │   │   └── [id]/
│   │   │       └── route.ts        # GET/PATCH /api/landings/[id]
│   │   ├── assets/
│   │   │   └── route.ts            # POST /api/assets (upload Cloudinary)
│   │   └── admin/
│   │       └── domains/
│   │           └── route.ts        # POST /api/admin/domains (Vercel API)
│   └── [domain]/                   # Rutas públicas servidas por middleware
│       └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── LandingList.tsx
│   │   └── editor/
│   │       ├── EditorShell.tsx     # Tabs + autoguardado con debounce
│   │       ├── tabs/
│   │       │   ├── SeoTab.tsx
│   │       │   ├── BrandingTab.tsx
│   │       │   ├── HeroTab.tsx
│   │       │   ├── BenefitsTab.tsx
│   │       │   ├── TestimonialsTab.tsx
│   │       │   ├── FaqTab.tsx
│   │       │   ├── CtaTab.tsx
│   │       │   └── PublishTab.tsx
│   │       └── ImageUploader.tsx
│   └── templates/
│       ├── registry.ts             # TEMPLATE_REGISTRY objeto
│       └── clinic-v1/
│           ├── index.tsx           # Componente de plantilla
│           └── schema.ts           # Zod schema del content_json
├── db/
│   ├── schema.ts                   # Drizzle schema
│   └── queries/
│       ├── clients.ts
│       ├── landings.ts
│       └── assets.ts
├── lib/
│   ├── auth.ts                     # Helpers Clerk
│   ├── cloudinary.ts               # Upload helper
│   ├── domains.ts                  # Vercel API wrapper
│   ├── tenants.ts                  # Resolver host → landing
│   └── kv.ts                       # Vercel KV helpers
├── middleware.ts                    # Resolución multi-tenant
└── types/
    └── content.ts                   # Tipos TypeScript del content_json
```

---

## Base de datos (Drizzle schema)

```typescript
// db/schema.ts

import { pgTable, text, boolean, timestamp, jsonb, uuid } from 'drizzle-orm/pg-core'

export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const memberships = pgTable('memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id),
  clerkUserId: text('clerk_user_id').notNull(),
  role: text('role').notNull().default('editor'), // 'owner' | 'editor'
  createdAt: timestamp('created_at').defaultNow(),
})

export const landingPages = pgTable('landing_pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  template: text('template').notNull().default('clinic_v1'),
  customDomain: text('custom_domain'),
  published: boolean('published').notNull().default(false),
  contentJson: jsonb('content_json').notNull().default({}),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const assets = pgTable('assets', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id),
  url: text('url').notNull(),
  publicId: text('public_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
```

---

## Middleware multi-tenant

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { kv } from '@vercel/kv'

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])
const isDashboard = createRouteMatcher(['/dashboard(.*)'])
const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN! // 'app.tudominio.com'

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const host = req.headers.get('host') ?? ''
  const url = req.nextUrl.clone()

  // Rutas del dashboard — Clerk gestiona el auth
  if (host === APP_DOMAIN) {
    if (!isPublicRoute(req)) auth.protect()
    return NextResponse.next()
  }

  // Rutas multi-tenant — resolver host → landing
  const cached = await kv.get<{ slug: string; clientId: string }>(`domain:${host}`)

  if (cached) {
    url.pathname = `/landing/${cached.slug}`
    return NextResponse.rewrite(url)
  }

  // Cache miss: buscar en DB (solo para dominios no cacheados)
  // La lógica de DB se ejecuta en la API route /api/tenant/resolve
  // para no importar Drizzle directamente en el middleware (Edge runtime)
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/tenant/resolve?host=${host}`)

  if (res.ok) {
    const data = await res.json()
    await kv.set(`domain:${host}`, data, { ex: 300 })
    url.pathname = `/landing/${data.slug}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

---

## Zod schema por plantilla

```typescript
// components/templates/clinic-v1/schema.ts
import { z } from 'zod'

export const ClinicV1Schema = z.object({
  seo: z.object({
    title: z.string().max(60).default(''),
    description: z.string().max(160).default(''),
  }),
  branding: z.object({
    logo: z.string().url().optional().or(z.literal('')),
    primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#000000'),
  }),
  hero: z.object({
    title: z.string().default(''),
    subtitle: z.string().default(''),
    image: z.string().url().optional().or(z.literal('')),
  }),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
  })).default([]),
  testimonials: z.array(z.object({
    name: z.string(),
    text: z.string(),
    avatar: z.string().optional(),
  })).default([]),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).default([]),
  cta: z.object({
    text: z.string().default(''),
    buttonLabel: z.string().default(''),
    buttonUrl: z.string().default(''),
  }),
})

export type ClinicV1Content = z.infer<typeof ClinicV1Schema>
```

---

## Registry de plantillas

```typescript
// components/templates/registry.ts
import { ComponentType } from 'react'
import ClinicV1 from './clinic-v1'
import { ClinicV1Schema } from './clinic-v1/schema'
import { ZodSchema } from 'zod'

interface TemplateEntry {
  component: ComponentType<{ content: any }>
  schema: ZodSchema
  label: string
}

export const TEMPLATE_REGISTRY: Record<string, TemplateEntry> = {
  'clinic_v1': {
    component: ClinicV1,
    schema: ClinicV1Schema,
    label: 'Clínica v1',
  },
}

export function getTemplate(key: string): TemplateEntry {
  const entry = TEMPLATE_REGISTRY[key]
  if (!entry) throw new Error(`Template "${key}" not found`)
  return entry
}
```

---

## Editor con autoguardado

```typescript
// components/dashboard/editor/EditorShell.tsx
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useDebouncedCallback } from 'use-debounce'

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function EditorShell({ landing }: { landing: LandingPage }) {
  const [content, setContent] = useState(landing.contentJson)
  const [status, setStatus] = useState<SaveStatus>('idle')

  const save = useDebouncedCallback(async (data: object) => {
    setStatus('saving')
    try {
      await fetch(`/api/landings/${landing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentJson: data }),
      })
      setStatus('saved')
    } catch {
      setStatus('error')
    }
  }, 1500)

  const update = useCallback((patch: Partial<typeof content>) => {
    const next = { ...content, ...patch }
    setContent(next)
    save(next)
  }, [content, save])

  return (
    <div>
      <SaveIndicator status={status} />
      <Tabs content={content} onUpdate={update} />
    </div>
  )
}
```

---

## API route PATCH landing

```typescript
// app/api/landings/[id]/route.ts
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { landingPages } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { getTemplate } from '@/components/templates/registry'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const body = await req.json()

  // Verificar que la landing pertenece al cliente del usuario
  const landing = await db.query.landingPages.findFirst({
    where: eq(landingPages.id, params.id),
    with: { client: true },
  })

  if (!landing || landing.client.clerkUserId !== userId) {
    return new Response('Forbidden', { status: 403 })
  }

  // Validar content_json contra el schema de la plantilla
  if (body.contentJson) {
    const { schema } = getTemplate(landing.template)
    const result = schema.safeParse(body.contentJson)
    if (!result.success) {
      return Response.json({ error: result.error.flatten() }, { status: 400 })
    }
  }

  await db.update(landingPages)
    .set({ contentJson: body.contentJson, updatedAt: new Date() })
    .where(eq(landingPages.id, params.id))

  return Response.json({ ok: true })
}
```

---

## Panel superadmin: añadir dominio a Vercel

- El dashboard usa shadcn/ui (tema por defecto, CSS variables)

```typescript
// app/api/admin/domains/route.ts
export async function POST(req: Request) {
  // Guard: solo superadmin (comprueba metadata de Clerk o env var)
  const { domain, landingId } = await req.json()

  // 1. Añadir a Vercel
  const vercelRes = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: domain }),
    }
  )

  if (!vercelRes.ok) {
    return Response.json({ error: 'Vercel error' }, { status: 500 })
  }

  // 2. Guardar en DB
  await db.update(landingPages)
    .set({ customDomain: domain })
    .where(eq(landingPages.id, landingId))

  // 3. Invalidar caché KV si existía
  await kv.del(`domain:${domain}`)

  return Response.json({ ok: true })
}
```

---

## generateMetadata por landing

```typescript
// app/landing/[slug]/page.tsx
import { Metadata } from 'next'
import { getLandingBySlug } from '@/db/queries/landings'
import { getTemplate } from '@/components/templates/registry'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const landing = await getLandingBySlug(params.slug)
  if (!landing) return {}

  const content = landing.contentJson as any

  return {
    title: content.seo?.title,
    description: content.seo?.description,
    openGraph: {
      title: content.seo?.title,
      description: content.seo?.description,
      images: content.hero?.image ? [content.hero.image] : [],
    },
    alternates: {
      canonical: landing.customDomain
        ? `https://${landing.customDomain}`
        : `https://${landing.slug}.tudominio.com`,
    },
  }
}

export default async function LandingPage({ params }: { params: { slug: string } }) {
  const landing = await getLandingBySlug(params.slug)
  if (!landing || !landing.published) return notFound()

  const { component: Template } = getTemplate(landing.template)
  return <Template content={landing.contentJson} />
}
```

---

## Variables de entorno necesarias

```bash
# .env.local

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Neon
DATABASE_URL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Vercel (para el panel admin)
VERCEL_API_TOKEN=
VERCEL_PROJECT_ID=

# Vercel KV
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# App
NEXT_PUBLIC_APP_DOMAIN=app.tudominio.com
NEXT_PUBLIC_APP_URL=https://app.tudominio.com
```

---

## Fases de implementación

### Fase 1 — Fundamentos (no hay UI todavía)
1. Inicializar proyecto Next.js 15 con App Router
2. Instalar y configurar Clerk
3. Crear schema Drizzle (`clients`, `memberships`, `landing_pages`, `assets`)
4. Conectar Neon y ejecutar primera migración
5. Configurar Cloudinary helper
6. Configurar Vercel KV

### Fase 2 — Middleware multi-tenant
1. Escribir `middleware.ts` con resolución de host
2. Crear `app/api/tenant/resolve/route.ts`
3. Testar localmente con `/etc/hosts` apuntando subdominios a localhost

### Fase 3 — Plantilla clinic-v1
1. Crear Zod schema de `clinic-v1`
2. Crear componente React de la plantilla
3. Crear TEMPLATE_REGISTRY
4. Crear `app/landing/[slug]/page.tsx` con `generateMetadata`

### Fase 4 — Dashboard y editor
1. Layout del dashboard con Clerk guard
2. Lista de landings del cliente
3. Editor con tabs y autoguardado (debounce 1500ms)
4. ImageUploader (upload directo a Cloudinary)
5. API routes: GET/PATCH `/api/landings/[id]`

### Fase 5 — Panel superadmin
1. Ruta `/superadmin` con guard de rol
2. Lista de clientes y landings
3. Formulario para asignar `custom_domain` + llamada a Vercel API

### Fase 6 — Pulido y despliegue
1. Wildcard domain en Vercel (`*.tudominio.com`)
2. Variables de entorno en producción
3. Sitemap dinámico por landing
4. Rate limiting básico en API routes

---

## Prompt de arranque para Claude Code

Pega esto al inicio de cada sesión de Claude Code:

```
Estás desarrollando un SaaS multi-tenant de gestión de landings con Next.js 15 App Router,
Clerk, Neon + Drizzle ORM, Cloudinary y Vercel KV.

Reglas del proyecto:
- Un único proyecto Next.js sirve dashboard y landings públicas
- El middleware resuelve host → landing usando Vercel KV como caché
- Todo el contenido de cada landing va en content_json (jsonb en Neon)
- Cada plantilla tiene su propio Zod schema que valida content_json
- Las plantillas se registran en TEMPLATE_REGISTRY (objeto, no switch)
- El autoguardado del editor usa debounce de 1500ms
- Los dominios personalizados los gestiona el superadmin, no el cliente
- Las imágenes se suben a Cloudinary con namespacing: tenants/{client_id}/

Estructura de carpetas: [pega la estructura de arriba]
Schema de DB: [pega el schema de Drizzle]
```