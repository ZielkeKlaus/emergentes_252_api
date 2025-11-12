# ==================================
# DOCKERFILE - Frontend (React + Vite)
# ==================================

# Estágio 1: Build da aplicação React
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Copiar código fonte
COPY . .

# Definir variável de ambiente para build
ARG VITE_API_BASE=http://localhost:3001
ENV VITE_API_BASE=$VITE_API_BASE

# Build da aplicação (Vite)
RUN npm run build

# ==================================
# Estágio 2: Servir com Nginx
FROM nginx:alpine

# Copiar build do React para nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
