# ==================================
# DOCKERFILE - Backend API (Node.js + TypeScript + Prisma)
# ==================================

# Estágio 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# ==================================
# Estágio 2: Imagem de produção
FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar apenas dependências de produção
RUN npm ci --only=production

# Copiar Prisma schema
COPY --from=builder /app/prisma ./prisma

# Gerar Prisma Client
RUN npx prisma generate

# Copiar código compilado
COPY --from=builder /app/dist ./dist

# Expor porta da aplicação
EXPOSE 3001

# Variáveis de ambiente (serão sobrescritas pelo docker-compose)
ENV NODE_ENV=production
ENV PORT=3001

# Script de inicialização
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/index.js"]
