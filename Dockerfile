# ── Dependencies ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ── Build ──────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* se embebe en el bundle durante el build, no en runtime.
# El navegador del usuario llama a localhost:4000 directamente,
# por eso usamos localhost y no el nombre del servicio Docker.
ARG NEXT_PUBLIC_API_URL=http://localhost:4000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# ── Runner ─────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Standalone incluye todo lo necesario para correr sin node_modules completo
COPY --from=builder /app/.next/standalone ./

# Los assets estáticos van en su lugar correcto dentro del standalone
COPY --from=builder /app/.next/static ./.next/static

# La carpeta public es opcional (puede no existir)
COPY --from=builder /app/public* ./public/

EXPOSE 3000
CMD ["node", "server.js"]
