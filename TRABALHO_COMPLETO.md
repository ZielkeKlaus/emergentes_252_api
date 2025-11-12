# 📄 TRABALHO DE COMPUTAÇÃO EM NUVEM - DOCKER

## 👥 Informações do Grupo

**Disciplina:** Computação em Nuvem  
**Professor:** Augusto  
**Semestre:** 4º - ADS  
**Data:** Novembro de 2025

**Integrantes:**
- Klaus Zielke
- [Nome do(a) parceiro(a) de dupla]

---

## 📋 Proposta do Trabalho

Criar um ambiente Docker completo composto por:
- ✅ Dois ou mais containers
- ✅ Aplicação desenvolvida em linguagem de programação
- ✅ Banco de dados
- ✅ Comunicação via variáveis de ambiente
- ✅ Rede Docker configurada
- ✅ Persistência de dados com volumes
- ✅ Operações CRUD funcionando

---

## 🏗️ Arquitetura Implementada

### Containers Utilizados

#### 1. Container: PostgreSQL (Banco de Dados)
- **Imagem Base:** `postgres:15-alpine`
- **Porta Exposta:** 5432
- **Função:** Armazenamento persistente de dados
- **Volume:** `postgres_data` (persistência)
- **Variáveis de Ambiente:**
  - `POSTGRES_USER`: cursosuser
  - `POSTGRES_PASSWORD`: cursospass123
  - `POSTGRES_DB`: cursosdb

#### 2. Container: Backend API (Node.js)
- **Linguagem:** Node.js + TypeScript
- **Framework:** Express.js
- **ORM:** Prisma
- **Porta Exposta:** 3001
- **Função:** API RESTful para operações CRUD
- **Dependências:**
  - Express - servidor web
  - Prisma - ORM para banco de dados
  - JWT - autenticação
  - Bcrypt - hash de senhas
  - Zod - validação de dados

#### 3. Container: Frontend (React)
- **Framework:** React 18 + Vite
- **Servidor:** Nginx
- **Porta Exposta:** 80
- **Função:** Interface do usuário
- **Recursos:**
  - Tailwind CSS - estilização
  - React Router - navegação
  - Axios - requisições HTTP
  - Recharts - gráficos

---

## 🔄 Comunicação Entre Containers

### Rede Docker: `cursos_network`
- **Tipo:** Bridge
- **Função:** Permitir comunicação entre containers

### Fluxo de Dados:
```
Frontend (porta 80)
    ↓ HTTP Request
Backend API (porta 3001)
    ↓ DATABASE_URL
PostgreSQL (porta 5432)
    ↓ Resposta
Backend API
    ↓ JSON Response
Frontend
```

### Variável de Ambiente de Conexão:
```env
DATABASE_URL=postgresql://cursosuser:cursospass123@database:5432/cursosdb?schema=public
```

**Observação:** O nome `database` é resolvido automaticamente pelo DNS interno do Docker para o IP do container PostgreSQL.

---

## 📁 Arquivos Docker Criados

### 1. docker-compose.yml
Arquivo principal que orquestra os 3 containers:
- Define os serviços (database, backend, frontend)
- Configura a rede Docker
- Define volumes para persistência
- Estabelece dependências entre containers
- Configura health checks

### 2. cursos_api/Dockerfile
Dockerfile do backend com multi-stage build:
- **Stage 1 (Builder):** Compila TypeScript e gera Prisma Client
- **Stage 2 (Production):** Imagem otimizada apenas com código compilado
- Executa migrations automaticamente ao iniciar

### 3. cursos_web/Dockerfile
Dockerfile do frontend com multi-stage build:
- **Stage 1 (Builder):** Build da aplicação React com Vite
- **Stage 2 (Production):** Serve arquivos estáticos com Nginx

### 4. .env
Arquivo de variáveis de ambiente:
- Credenciais do banco de dados
- Chave JWT
- Configurações da aplicação

### 5. .dockerignore
Arquivos ignorados no build (node_modules, logs, etc.)

---

## 💾 Persistência de Dados

### Volume: postgres_data
- **Tipo:** Named Volume (gerenciado pelo Docker)
- **Montagem:** `/var/lib/postgresql/data` (dentro do container)
- **Persistência:** Mantém dados mesmo após `docker-compose down`
- **Conteúdo:** Todas as tabelas do banco de dados

### Teste de Persistência:
1. Criar dados na aplicação
2. Executar `docker-compose down`
3. Executar `docker-compose up -d`
4. Dados continuam disponíveis ✅

---

## 🗄️ Modelo de Dados (Prisma Schema)

### Tabelas Criadas:
1. **categorias** - Categorias de cursos
2. **usuarios** - Usuários do sistema (alunos e instrutores)
3. **cursos** - Cursos disponíveis
4. **matriculas** - Relação aluno ↔ curso
5. **avaliacoes** - Avaliações de cursos pelos alunos
6. **admins** - Administradores do sistema
7. **logs** - Registros de ações administrativas

---

## ✅ Operações CRUD Implementadas

### CREATE (Criar)
- ✅ Cadastrar usuário
- ✅ Matricular em curso
- ✅ Criar avaliação
- ✅ Criar curso (admin)
- ✅ Criar categoria (admin)

### READ (Ler)
- ✅ Listar cursos
- ✅ Buscar/filtrar cursos
- ✅ Visualizar detalhes do curso
- ✅ Listar avaliações
- ✅ Dashboard com estatísticas (admin)

### UPDATE (Atualizar)
- ✅ Editar curso (admin)
- ✅ Editar categoria (admin)

### DELETE (Excluir)
- ✅ Excluir curso (admin)
- ✅ Excluir categoria (admin)
- ✅ Excluir avaliação (admin)

---

## 🚀 Como Executar

### Pré-requisitos
- Docker instalado (versão 20+)
- Docker Compose instalado (versão 2+)
- Portas 80, 3001 e 5432 disponíveis

### Comandos

#### 1. Clonar o repositório
```bash
git clone https://github.com/ZielkeKlaus/emergentes_252_api.git
cd emergentes_252_api
```

#### 2. Configurar variáveis de ambiente
O arquivo `.env` já está configurado com valores padrão.

#### 3. Construir e iniciar containers
```bash
docker-compose up --build -d
```

#### 4. Verificar containers em execução
```bash
docker ps
```

#### 5. Popular banco de dados
Acessar no navegador:
```
http://localhost:3001/setup/popular-dados
```

#### 6. Acessar aplicação
```
http://localhost
```

---

## 🧪 Testes Realizados

### 1. Teste de Comunicação
- ✅ Frontend → Backend (HTTP)
- ✅ Backend → Database (Prisma ORM)
- ✅ Health check do banco: `http://localhost:3001/health/db`

### 2. Teste de CRUD
- ✅ Cadastro de usuário
- ✅ Login
- ✅ Listagem de cursos
- ✅ Busca/filtro
- ✅ Matrícula em curso
- ✅ Avaliação de curso
- ✅ CRUD de cursos (admin)
- ✅ CRUD de categorias (admin)

### 3. Teste de Persistência
- ✅ Criar dados
- ✅ Parar containers (`docker-compose down`)
- ✅ Reiniciar containers (`docker-compose up -d`)
- ✅ Dados mantidos no volume

### 4. Teste de Health Checks
- ✅ PostgreSQL health check funcionando
- ✅ Backend health check funcionando
- ✅ Frontend health check funcionando

---

## 📊 Endpoints da API

### Públicos
```
GET  /categorias              - Listar categorias
GET  /cursos                  - Listar cursos
GET  /cursos/:id              - Detalhes de um curso
POST /usuarios                - Cadastrar usuário
POST /usuarios/login          - Login
GET  /avaliacoes/curso/:id    - Avaliações de um curso
```

### Protegidos (requer token)
```
POST /matriculas              - Matricular em curso
POST /avaliacoes              - Avaliar curso
```

### Administrativos (requer adminToken)
```
POST /admins/login            - Login admin
GET  /dashboard/gerais        - Estatísticas gerais
GET  /dashboard/cursosPorCategoria  - Dados para gráfico
GET  /usuarios                - Listar usuários
POST /cursos                  - Criar curso
PUT  /cursos/:id              - Editar curso
DELETE /cursos/:id            - Excluir curso
POST /categorias              - Criar categoria
PUT  /categorias/:id          - Editar categoria
DELETE /categorias/:id        - Excluir categoria
```

---

## 🔐 Segurança Implementada

### Autenticação
- ✅ JWT (JSON Web Tokens) com expiração
- ✅ Senhas com hash bcrypt
- ✅ Validação de dados com Zod

### Variáveis de Ambiente
- ✅ Credenciais do banco não no código
- ✅ Chave JWT em variável de ambiente
- ✅ Arquivo .env não commitado no Git

### Rede Docker
- ✅ Containers isolados em rede própria
- ✅ Apenas portas necessárias expostas

---

## 📈 Recursos Adicionais Implementados

### Dashboard Administrativo
- ✅ Gráfico de pizza (cursos por categoria)
- ✅ Gráfico de barras (usuários por cidade)
- ✅ Cards com estatísticas (total de usuários, cursos, matrículas)

### Interface do Usuário
- ✅ Design responsivo (Tailwind CSS)
- ✅ Busca em tempo real
- ✅ Feedback visual de ações
- ✅ Validação de formulários

### Backend
- ✅ Validação de dados robusta
- ✅ Tratamento de erros
- ✅ Logs informativos
- ✅ Migrations automáticas

---

## 🎯 Conceitos de Computação em Nuvem Aplicados

1. **Containerização** - Isolamento de aplicações em containers
2. **Orquestração** - Docker Compose gerenciando múltiplos serviços
3. **Redes Virtuais** - Comunicação entre containers
4. **Persistência** - Volumes para armazenamento durável
5. **Configuração via Ambiente** - Uso de variáveis de ambiente
6. **Health Checks** - Monitoramento automático de saúde
7. **Multi-stage Builds** - Otimização de imagens Docker
8. **Escalabilidade** - Arquitetura preparada para escalar
9. **Portabilidade** - Funciona em qualquer ambiente com Docker
10. **Infraestrutura como Código** - docker-compose.yml

---

## 📚 Tecnologias Utilizadas

### Backend
- Node.js 18
- TypeScript 5
- Express.js 4
- Prisma ORM 6
- PostgreSQL 15
- JWT, Bcrypt, Zod

### Frontend
- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- React Router DOM 6
- Axios, Recharts

### DevOps
- Docker 28
- Docker Compose 2
- Nginx (Alpine)
- PostgreSQL (Alpine)

---

## 🏆 Requisitos do Trabalho - Status

- ✅ **Ambiente com dois ou mais containers** → 3 containers implementados
- ✅ **Dockerfile ou Docker Compose** → Ambos implementados
- ✅ **Aplicação desenvolvida** → Node.js + TypeScript (backend) + React (frontend)
- ✅ **Banco de dados** → PostgreSQL
- ✅ **Comunicação via variáveis de ambiente** → DATABASE_URL, JWT_KEY
- ✅ **Mesma rede Docker** → cursos_network
- ✅ **Portas expostas** → 80, 3001, 5432
- ✅ **Execução simultânea** → docker-compose gerencia tudo
- ✅ **Persistência de dados** → Volume postgres_data
- ✅ **Comunicação app ↔ banco** → Via Prisma ORM
- ✅ **Operações básicas** → CRUD completo funcionando

---

## 📂 Estrutura do Repositório

```
emergentes_252_api/
├── docker-compose.yml          # Orquestração dos containers
├── .env                         # Variáveis de ambiente
├── init-db.sql                  # Script inicial PostgreSQL
├── DOCKER_README.md             # Documentação completa
├── ROTEIRO_APRESENTACAO.md      # Roteiro para apresentação
├── GUIA_RAPIDO.md               # Guia rápido 5 minutos
├── RESUMO_VISUAL.md             # Resumo visual da arquitetura
├── COMANDOS_DOCKER.md           # Comandos úteis
│
├── cursos_api/                  # Backend
│   ├── Dockerfile               # Build do backend
│   ├── .dockerignore
│   ├── prisma/
│   │   └── schema.prisma        # Modelo do banco
│   ├── routes/                  # Endpoints da API
│   └── index.ts                 # Entry point
│
└── cursos_web/                  # Frontend
    ├── Dockerfile               # Build do frontend
    ├── nginx.conf               # Config do Nginx
    ├── .dockerignore
    └── src/                     # Código React
```

---

## 🔗 Links Úteis

### Repositório GitHub
```
https://github.com/ZielkeKlaus/emergentes_252_api
```

### Documentação
- Docker: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Prisma: https://www.prisma.io/docs
- PostgreSQL: https://www.postgresql.org/docs/

---

## 💡 Aprendizados

### Conceitos Aprendidos
1. Criação de Dockerfiles otimizados com multi-stage build
2. Orquestração de múltiplos containers com Docker Compose
3. Configuração de redes Docker para comunicação entre serviços
4. Implementação de volumes para persistência de dados
5. Uso de variáveis de ambiente para configuração
6. Health checks para monitoramento de containers
7. Boas práticas de segurança em containers

### Desafios Superados
1. Configurar Prisma para funcionar em container
2. Garantir ordem de inicialização dos containers (depends_on)
3. Configurar Nginx para servir Single Page Application
4. Implementar health checks efetivos
5. Otimizar tamanho das imagens Docker

---

## 📝 Conclusão

O projeto demonstra com sucesso a implementação de um ambiente completo usando Docker, atendendo a todos os requisitos solicitados. A aplicação é funcional, escalável e segue boas práticas de desenvolvimento com containers.

A arquitetura em 3 camadas (frontend, backend, banco de dados) demonstra claramente os conceitos de containerização, comunicação entre serviços, persistência de dados e orquestração com Docker Compose.

O ambiente está pronto para apresentação e pode ser executado em qualquer máquina com Docker instalado, demonstrando a portabilidade e praticidade da tecnologia.

---

## 👨‍💻 Autores

Desenvolvido como trabalho acadêmico para a disciplina de Computação em Nuvem, 4º semestre do curso de Análise e Desenvolvimento de Sistemas.

**Professor:** Augusto  
**Instituição:** Faculdade de ADS  
**Ano:** 2025

---

**FIM DO DOCUMENTO**
