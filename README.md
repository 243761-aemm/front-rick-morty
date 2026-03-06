# Rick & Morty SOA — Frontend

Interfaz de usuario construida con **Next.js 14** + **TypeScript** + **Tailwind CSS**.

## Stack
- **Next.js 14** (App Router, Client Components)
- **TypeScript** — interfaces tipadas para todos los datos de la API
- **Tailwind CSS** — estilos utilitarios
- **Fetch API** — peticiones asíncronas con async/await

## Variables de entorno (.env)

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Puerto
Corre en `http://localhost:3000`

## Características
- ✅ **Estado Loading** — Skeleton grid animado mientras carga
- ✅ **Estado Success** — Grid de tarjetas con imagen, nombre y estado
- ✅ **Estado Error** — Mensaje amigable con botón de reintentar
- ✅ **Filtros** — búsqueda por nombre, filtro por estado (Alive/Dead/Unknown)
- ✅ **Paginación** — navega entre las ~42 páginas de personajes
- ✅ **Modal de detalle** — click en una tarjeta para ver más info
- ✅ **Sin API Keys en el cliente** — todo pasa por el backend proxy

## Setup local
npm install
npm run dev