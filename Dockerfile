# Stage 1: Build (compila TS)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package files primero (para cache de dependencias)
COPY package*.json ./
RUN npm ci --only=production=false  # Instala todas (dev + prod)

# Copia fuente y compila
COPY . .
RUN npm run build  # tsc compila src/ a dist/
RUN npm ci --only=production=true --prefix /app && npm cache clean --force  # Reinstala solo prod

# Stage 2: Runtime (imagen ligera)
FROM node:18-alpine AS runtime

WORKDIR /app

# Copia compilado y node_modules de builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
# Copia otros archivos necesarios (ej. .env.local)
COPY --from=builder /app/.env.local ./


# Expone puerto
EXPOSE 3000

# Comando de inicio (usa .env.local montado)
CMD ["npm", "start"]  # O "node dist/server.js"