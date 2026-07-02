# PR Auto-Pilot — Sistema de PR asistido por IA (Fase 5)

Sistema para generar y enviar pitches de PR personalizados a escala usando la
API de Claude (Anthropic) para redactar y Resend para enviar. La versión del
manual es multi-usuario (Supabase + Apps Script + dashboard). Aquí se implementa
la **versión single-user** integrada en este sitio, que cubre el 90% del valor
sin la complejidad de un SaaS. Se documenta también cómo escalar a multi-usuario.

---

## Arquitectura (single-user, integrada)

```
Lista de medios (JSON/CSV)
        │
        ▼
POST /api/pr/generate  ──►  Claude API (redacta pitch personalizado)
        │
        ▼
   Revisión humana (obligatoria)
        │
        ▼
POST /api/pr/send      ──►  Resend (envía el email)
        │
        ▼
   Registro de estado (enviado / respondido / publicado)
```

**Regla de oro:** ningún email se envía sin revisión humana. La IA redacta, la
persona aprueba. Esto evita spam y protege la reputación del dominio.

---

## Variables de entorno

```
ANTHROPIC_API_KEY   clave de https://console.anthropic.com  (generación)
RESEND_API_KEY      ya configurada en Fase 2                (envío)
PR_ADMIN_KEY        clave secreta para proteger los endpoints /api/pr/*
CONTACT_FROM        remitente verificado en Resend
```

## Endpoints incluidos

- `POST /api/pr/generate` — recibe `{ outlet, contact, angle, type }` y devuelve
  un borrador de pitch redactado por Claude en el tono del material de PR.
  Protegido con el header `x-pr-key: <PR_ADMIN_KEY>`.

> El endpoint de envío no se incluye por defecto para evitar envíos
> accidentales. Para enviar, usa el borrador aprobado con la API de Resend
> (mismo patrón que `/api/contact`) o pégalo en tu cliente de correo.

## Uso

```bash
curl -X POST https://www.darwinontiveros.com/api/pr/generate \
  -H "Content-Type: application/json" \
  -H "x-pr-key: TU_PR_ADMIN_KEY" \
  -d '{
    "outlet": "Podcast Emprende",
    "contact": "María",
    "angle": "cómo vender sin bajar el precio",
    "type": "podcast"
  }'
```

Devuelve `{ subject, body }`. Revisa, ajusta y envía tú mismo.

---

## Escalar a multi-usuario (versión completa del manual)

Cuando quieras convertirlo en servicio para varios clientes:

### 1. Base de datos (Supabase)

```sql
-- Usuarios / clientes de PR
create table pr_users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  brand_voice text,            -- tono y bio para los pitches
  created_at timestamptz default now()
);

-- Medios objetivo
create table pr_outlets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references pr_users(id),
  outlet text not null,
  contact_name text,
  contact_email text,
  type text,                   -- podcast | prensa | blog
  status text default 'pending', -- pending|generated|sent|replied|published
  created_at timestamptz default now()
);

-- Pitches generados
create table pr_pitches (
  id uuid primary key default gen_random_uuid(),
  outlet_id uuid references pr_outlets(id),
  subject text,
  body text,
  approved boolean default false,
  sent_at timestamptz,
  created_at timestamptz default now()
);
```

Activa Row Level Security y políticas por `user_id`.

### 2. Generación en lote

Un cron/worker recorre `pr_outlets` con `status = 'pending'`, llama a Claude con
el `brand_voice` del usuario y guarda el pitch en `pr_pitches` con
`approved = false`.

### 3. Dashboard de aprobación

Panel (puede ser una ruta protegida en este mismo Next.js) que lista los pitches
`approved = false`, permite editar y marcar `approved = true`.

### 4. Envío

Al aprobar, un endpoint envía vía Resend, guarda `sent_at` y cambia el `status`
del outlet a `sent`. Un webhook de Resend (o Apps Script leyendo la bandeja)
actualiza `replied` / `published`.

### 5. Apps Script (opcional)

Google Apps Script puede monitorizar respuestas en Gmail y actualizar Supabase
vía su REST API, cerrando el loop de seguimiento sin intervención manual.

---

## Ética y buenas prácticas

- Revisión humana antes de cada envío. Sin excepción.
- Nunca comprar listas de correo; usa contactos públicos y relevantes.
- Un follow-up máximo. Respeta las bajas.
- Personalización real: la IA ayuda, no reemplaza el criterio.
- Cumple GDPR/CAN-SPAM: identifícate y ofrece forma de no recibir más mensajes.
