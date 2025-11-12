# 🐳 DOCKER - Resumo Visual do Projeto

## 📊 ARQUITETURA DO SISTEMA

```
┌────────────────────────────────────────────────────────────────┐
│                    REDE DOCKER: cursos_network                  │
│                           (bridge)                              │
│                                                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐│
│  │   CONTAINER 1   │  │   CONTAINER 2   │  │   CONTAINER 3   ││
│  │   PostgreSQL    │  │   Backend API   │  │    Frontend     ││
│  │                 │  │                 │  │                 ││
│  │  🗄️ Database   │  │  ⚙️ Node.js    │  │  🎨 React      ││
│  │   postgres:15   │  │  + TypeScript  │  │  + Nginx       ││
│  │                 │  │  + Express     │  │                 ││
│  │  Port: 5432    │◄─┤  + Prisma      │◄─┤  Port: 80      ││
│  │                 │  │                 │  │                 ││
│  │  User: cursosuser│ │  Port: 3001    │  │                 ││
│  │  DB: cursosdb   │  │                 │  │                 ││
│  └────────┬────────┘  └─────────────────┘  └─────────────────┘│
│           │                                                     │
│           │                                                     │
│      ┌────▼─────┐                                              │
│      │  VOLUME  │                                              │
│      │ postgres │  ◄── Persistência de Dados                  │
│      │  _data   │                                              │
│      └──────────┘                                              │
└────────────────────────────────────────────────────────────────┘
           │                     │                    │
           │                     │                    │
           ▼                     ▼                    ▼
     [Porta 5432]          [Porta 3001]         [Porta 80]
  (Acesso ao Banco)      (API REST)        (Interface Web)
```

---

## 🔄 FLUXO DE COMUNICAÇÃO

### 1. Usuário → Frontend
```
Navegador (http://localhost) → Nginx (porta 80) → React App
```

### 2. Frontend → Backend
```
React App → Axios HTTP → Backend API (porta 3001)
```

### 3. Backend → Database
```
Backend API → Prisma ORM → PostgreSQL (porta 5432)
         ↓
  DATABASE_URL (variável de ambiente)
  postgresql://cursosuser:cursospass123@database:5432/cursosdb
```

---

## 📁 ESTRUTURA DE ARQUIVOS DOCKER

```
emergentes_252_api/
│
├── 📄 docker-compose.yml          ← Orquestração dos containers
├── 📄 .env                         ← Variáveis de ambiente
├── 📄 init-db.sql                  ← Script inicial do PostgreSQL
│
├── 📁 cursos_api/                  ← Backend
│   ├── 📄 Dockerfile               ← Build do container backend
│   ├── 📄 .dockerignore            ← Arquivos ignorados no build
│   ├── 📁 prisma/
│   │   └── 📄 schema.prisma        ← Modelo do banco de dados
│   ├── 📄 index.ts                 ← Entry point da API
│   └── 📁 routes/                  ← Endpoints da API
│
└── 📁 cursos_web/                  ← Frontend
    ├── 📄 Dockerfile               ← Build do container frontend
    ├── 📄 nginx.conf               ← Configuração do Nginx
    ├── 📄 .dockerignore            ← Arquivos ignorados no build
    └── 📁 src/                     ← Código React
```

---

## ⚙️ CONFIGURAÇÕES IMPORTANTES

### Docker Compose (docker-compose.yml)
```yaml
services:
  database:    # PostgreSQL
  backend:     # Node.js API
  frontend:    # React + Nginx

volumes:
  postgres_data:  # Persistência

networks:
  cursos_network:  # Comunicação
```

### Variáveis de Ambiente (.env)
```env
DB_USER=cursosuser
DB_PASSWORD=cursospass123
DB_NAME=cursosdb
JWT_KEY=minha_chave_secreta_jwt_super_segura_12345
```

### Database URL (gerada automaticamente)
```
postgresql://cursosuser:cursospass123@database:5432/cursosdb?schema=public
```

---

## 🚀 COMANDOS PRINCIPAIS

### Iniciar tudo
```bash
docker-compose up --build -d
```

### Ver containers
```bash
docker ps
```

### Ver logs
```bash
docker-compose logs -f
```

### Parar tudo
```bash
docker-compose down
```

---

## ✅ FUNCIONALIDADES IMPLEMENTADAS

### Container 1: PostgreSQL
- ✅ Banco de dados relacional
- ✅ Porta 5432 exposta
- ✅ Persistência via volume
- ✅ Health check
- ✅ Encoding UTF-8

### Container 2: Backend (Node.js)
- ✅ API RESTful
- ✅ Prisma ORM
- ✅ Autenticação JWT
- ✅ Validação com Zod
- ✅ CORS configurado
- ✅ Migrations automáticas
- ✅ Health checks

### Container 3: Frontend (React)
- ✅ Interface moderna
- ✅ Nginx como servidor
- ✅ SPA (Single Page App)
- ✅ Build otimizado
- ✅ Compressão gzip

---

## 🔐 SEGURANÇA

### Senhas
- ❌ Não no código
- ✅ Em variáveis de ambiente
- ✅ Hash com bcrypt

### Autenticação
- ✅ JWT tokens
- ✅ Expiração configurada
- ✅ Validação em rotas protegidas

### Rede
- ✅ Isolamento via Docker network
- ✅ Containers não acessíveis externamente (exceto portas expostas)

---

## 📊 ENDPOINTS DA API

### Públicos
```
GET  /cursos              - Listar cursos
GET  /categorias          - Listar categorias
POST /usuarios            - Cadastrar usuário
POST /usuarios/login      - Login
```

### Protegidos (requer token)
```
POST /matriculas          - Matricular em curso
POST /avaliacoes          - Avaliar curso
```

### Admin (requer adminToken)
```
GET  /dashboard/gerais    - Estatísticas
POST /cursos              - Criar curso
PUT  /cursos/:id          - Editar curso
DELETE /cursos/:id        - Excluir curso
```

### Utilitários
```
GET  /health/db           - Health check do banco
POST /setup/criar-primeiro-admin    - Criar admin
POST /setup/popular-dados           - Popular banco
```

---

## 💾 PERSISTÊNCIA DE DADOS

### Volume: postgres_data
```
Local no host: Gerenciado pelo Docker
Dados: Todas as tabelas do PostgreSQL
Backup: Sobrevive a docker-compose down
```

### Verificar volume
```bash
docker volume ls
docker volume inspect cursos_postgres_data
```

---

## 🎯 TESTE RÁPIDO

### 1. Verificar API
```
http://localhost:3001/categorias
```

### 2. Verificar Frontend
```
http://localhost
```

### 3. Verificar Saúde do Banco
```
http://localhost:3001/health/db
```

### 4. Popular Banco
```
http://localhost:3001/setup/popular-dados
```

---

## 📈 MONITORAMENTO

### Ver recursos usados
```bash
docker stats
```

### Ver logs específicos
```bash
docker logs cursos_backend
docker logs cursos_database
docker logs cursos_frontend
```

### Health status
```bash
docker inspect cursos_backend --format='{{.State.Health.Status}}'
```

---

## 🎓 CONCEITOS APLICADOS

1. ✅ **Containerização** - Isolamento de aplicações
2. ✅ **Orquestração** - Docker Compose gerenciando múltiplos containers
3. ✅ **Redes** - Comunicação entre containers
4. ✅ **Volumes** - Persistência de dados
5. ✅ **Variáveis de Ambiente** - Configuração flexível
6. ✅ **Multi-stage Build** - Otimização de imagens
7. ✅ **Health Checks** - Monitoramento automático
8. ✅ **Reverse Proxy** - Nginx servindo React
9. ✅ **API Gateway** - Backend como intermediário
10. ✅ **Microserviços** - Separação de responsabilidades

---

## 🔧 TROUBLESHOOTING RÁPIDO

### Porta em uso
```powershell
# Ver processo usando porta
netstat -ano | findstr :80
netstat -ano | findstr :3001

# Matar processo
taskkill /PID <numero> /F
```

### Container unhealthy
```bash
docker logs cursos_backend
docker-compose restart backend
```

### Reconstruir tudo
```bash
docker-compose down -v
docker-compose up --build -d
```

---

## 📞 COMANDOS DE EMERGÊNCIA

### Limpar tudo e recomeçar
```bash
docker-compose down -v
docker system prune -a -f
docker volume prune -f
docker-compose up --build -d
```

---

## 🏆 REQUISITOS DO TRABALHO ATENDIDOS

- ✅ Ambiente com 2+ containers (temos 3)
- ✅ Dockerfile personalizado
- ✅ Docker Compose
- ✅ Aplicação em linguagem de programação (Node.js + TypeScript)
- ✅ Banco de dados (PostgreSQL)
- ✅ Comunicação via variáveis de ambiente
- ✅ Mesma rede Docker
- ✅ Portas expostas
- ✅ Execução simultânea
- ✅ Persistência com volume
- ✅ Comunicação app ↔ banco
- ✅ CRUD completo funcionando

---

## 📱 ACESSO RÁPIDO

| Serviço    | URL                           | Porta |
|------------|-------------------------------|-------|
| Frontend   | http://localhost              | 80    |
| Backend    | http://localhost:3001         | 3001  |
| Database   | postgresql://localhost:5432   | 5432  |

---

**Desenvolvido para a disciplina de Computação em Nuvem - 2025** 🎓
