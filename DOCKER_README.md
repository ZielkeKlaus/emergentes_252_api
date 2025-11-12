# 🐳 DOCKER - Guia Completo de Execução

## 📋 Trabalho de Computação em Nuvem

### Sobre o Projeto
Este é um ambiente **completo dockerizado** da plataforma **EstudeFácil/Cursos Academy**, composto por:

- ✅ **Container 1**: PostgreSQL (Banco de Dados)
- ✅ **Container 2**: Node.js + TypeScript + Prisma (Backend/API)
- ✅ **Container 3**: React + Vite + Nginx (Frontend)

### ✨ Funcionalidades Implementadas

1. ✅ **Execução simultânea** de múltiplos containers
2. ✅ **Persistência de dados** via Docker Volumes
3. ✅ **Comunicação entre containers** via rede Docker (cursos_network)
4. ✅ **Variáveis de ambiente** para configuração
5. ✅ **Health checks** para garantir containers saudáveis
6. ✅ **Operações CRUD** completas (cadastro, listagem, edição, exclusão)
7. ✅ **Porta exposta** para acesso externo

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Docker instalado (versão 20+)
- Docker Compose instalado (versão 2+)
- Porta 80, 3001 e 5432 disponíveis

### 📦 Passo 1: Clonar o Repositório (se ainda não tiver)

```bash
git clone https://github.com/ZielkeKlaus/emergentes_252_api.git
cd emergentes_252_api
```

### 🔧 Passo 2: Verificar Variáveis de Ambiente

O arquivo `.env` já está configurado com valores padrão:

```env
DB_USER=cursosuser
DB_PASSWORD=cursospass123
DB_NAME=cursosdb
JWT_KEY=minha_chave_secreta_jwt_super_segura_12345
```

**Você pode editar se necessário!**

### 🏗️ Passo 3: Construir e Iniciar os Containers

#### Opção A - Construir e Iniciar (primeira vez)
```bash
docker-compose up --build -d
```

#### Opção B - Apenas Iniciar (se já construído)
```bash
docker-compose up -d
```

#### Opção C - Ver logs em tempo real
```bash
docker-compose up --build
```

### ⏳ Aguarde a Inicialização

O processo completo leva aproximadamente **2-3 minutos**:
1. PostgreSQL inicia (10-15 segundos)
2. Backend aplica migrações do Prisma (30-40 segundos)
3. Frontend é servido pelo Nginx (5 segundos)

---

## 🔍 Verificar Containers em Execução

### Windows (PowerShell)
```powershell
docker ps
```

### Linux/Mac
```bash
sudo docker ps
```

### Saída esperada:
```
CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS                    NAMES
xxxxxxxxxxxx   emergentes_252_api-frontend   "nginx -g 'daemon of…"   Up 2 minutes   0.0.0.0:80->80/tcp       cursos_frontend
xxxxxxxxxxxx   emergentes_252_api-backend    "sh -c 'npx prisma m…"   Up 2 minutes   0.0.0.0:3001->3001/tcp   cursos_backend
xxxxxxxxxxxx   postgres:15-alpine       "docker-entrypoint.s…"   Up 2 minutes   0.0.0.0:5432->5432/tcp   cursos_database
```

---

## 🌐 Acessar a Aplicação

### Frontend (Interface do Usuário)
```
http://localhost
ou
http://localhost:80
```

### Backend (API REST)
```
http://localhost:3001
```

### Endpoints Importantes da API:
- `http://localhost:3001/categorias` - Listar categorias
- `http://localhost:3001/cursos` - Listar cursos
- `http://localhost:3001/health/db` - Verificar conexão com banco

---

## 📝 Popular o Banco de Dados

### Opção 1 - Via Navegador
Acesse no navegador:
```
http://localhost:3001/setup/criar-primeiro-admin
```

Depois:
```
http://localhost:3001/setup/popular-dados
```

### Opção 2 - Via PowerShell (Windows)
```powershell
# Criar admin
$body = @{} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3001/setup/criar-primeiro-admin" -Method Post -Body $body -ContentType "application/json"

# Popular dados
Invoke-RestMethod -Uri "http://localhost:3001/setup/popular-dados" -Method Post -Body $body -ContentType "application/json"
```

### Opção 3 - Via Terminal (Linux/Mac)
```bash
# Criar admin
curl -X POST http://localhost:3001/setup/criar-primeiro-admin

# Popular dados
curl -X POST http://localhost:3001/setup/popular-dados
```

---

## 🧪 Testar as Funcionalidades

### 1️⃣ Cadastro de Usuário
1. Acesse: `http://localhost`
2. Clique em **"Cadastrar"**
3. Preencha: nome, email, senha, cidade
4. Clique em **"Cadastrar"**
5. ✅ Você será automaticamente logado!

### 2️⃣ Login
1. Acesse: `http://localhost/login`
2. Use credenciais:
   - Email: `ana@aluno.com`
   - Senha: `Senha@123`
3. ✅ Verá "Olá, Ana Oliveira" no header

### 3️⃣ Listar Cursos
1. Acesse: `http://localhost`
2. ✅ Verá 6 cursos em cards

### 4️⃣ Buscar Cursos
1. Na home, digite "React" no campo de busca
2. ✅ Filtrará cursos em tempo real

### 5️⃣ Matricular-se em Curso
1. Clique em qualquer curso
2. Clique em **"Matricular-se"**
3. ✅ Verá mensagem de sucesso

### 6️⃣ Avaliar Curso
1. Na página do curso, role até "Avaliar este curso"
2. Dê uma nota (0-10) e comentário
3. Clique em **"Enviar Avaliação"**
4. ✅ Avaliação aparecerá na lista

### 7️⃣ Área Admin
1. Acesse: `http://localhost/admin/login`
2. Login admin:
   - Email: `admin@admin.com`
   - Senha: `Admin@123`
3. ✅ Verá dashboard com gráficos
4. Navegue por:
   - **Cursos** → Criar, editar, excluir
   - **Categorias** → Gerenciar categorias
   - **Usuários** → Ver todos os usuários
   - **Matrículas** → Ver todas as matrículas
   - **Avaliações** → Gerenciar avaliações

---

## 🔧 Comandos Úteis

### Ver logs de um container específico
```bash
docker logs cursos_backend
docker logs cursos_frontend
docker logs cursos_database
```

### Ver logs em tempo real
```bash
docker logs -f cursos_backend
```

### Entrar em um container
```bash
# Backend
docker exec -it cursos_backend sh

# Banco de dados
docker exec -it cursos_database psql -U cursosuser -d cursosdb
```

### Parar os containers
```bash
docker-compose down
```

### Parar e remover volumes (CUIDADO: apaga dados!)
```bash
docker-compose down -v
```

### Reiniciar containers
```bash
docker-compose restart
```

### Reconstruir apenas um serviço
```bash
docker-compose up -d --build backend
```

---

## 🌐 Arquitetura da Rede Docker

```
┌─────────────────────────────────────────────────┐
│          REDE: cursos_network (bridge)          │
│                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────┐│
│  │  PostgreSQL  │◄─┤   Backend    │◄─┤Frontend││
│  │   :5432      │  │   :3001      │  │  :80   ││
│  └──────────────┘  └──────────────┘  └────────┘│
│         ▲                  ▲              ▲     │
└─────────┼──────────────────┼──────────────┼─────┘
          │                  │              │
          │                  │              │
    [Volume]           [Health Check]   [Nginx]
postgres_data              ✓              ✓
```

### Comunicação:
- **Frontend → Backend**: HTTP via nome do serviço `backend:3001`
- **Backend → Database**: PostgreSQL via `database:5432`
- **Acesso Externo → Frontend**: Porta `80` exposta
- **Acesso Externo → Backend**: Porta `3001` exposta

---

## 📊 Variáveis de Ambiente

### Container: database
- `POSTGRES_USER`: Usuário do PostgreSQL
- `POSTGRES_PASSWORD`: Senha do PostgreSQL
- `POSTGRES_DB`: Nome do banco de dados

### Container: backend
- `DATABASE_URL`: URL completa de conexão (gerada automaticamente)
- `JWT_KEY`: Chave secreta para tokens JWT
- `NODE_ENV`: Ambiente (production)
- `PORT`: Porta do servidor (3001)

### Container: frontend
- `VITE_API_BASE`: URL da API (build-time)

---

## 🗄️ Persistência de Dados

### Volume: postgres_data
- **Tipo**: Named Volume
- **Localização**: Gerenciado pelo Docker
- **Conteúdo**: Todos os dados do PostgreSQL
- **Persistência**: Sobrevive a `docker-compose down`

### Ver volumes
```bash
docker volume ls
```

### Inspecionar volume
```bash
docker volume inspect cursos_postgres_data
```

### Backup do volume (exemplo)
```bash
docker run --rm -v cursos_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data
```

---

## 🎯 Para a Apresentação

### 1. Mostrar aplicação funcionando
```
Abrir: http://localhost
Demonstrar: cadastro, login, busca, matrícula, avaliação
```

### 2. Exibir containers em execução
```bash
docker ps
```

### 3. Realizar cadastros em tempo real
```
- Criar novo usuário
- Matricular em curso
- Avaliar curso
- Mostrar dados persistidos
```

### 4. Explicar comunicação app ↔ banco
```
- Frontend (porta 80) → Backend (porta 3001)
- Backend → PostgreSQL (porta 5432)
- Variáveis de ambiente para DATABASE_URL
- Mesma rede Docker (cursos_network)
- Health checks garantem disponibilidade
```

---

## ❓ Troubleshooting

### Erro: "Porta já em uso"
```bash
# Verificar processos usando a porta
netstat -ano | findstr :80
netstat -ano | findstr :3001
netstat -ano | findstr :5432

# Matar processo (substitua PID)
taskkill /PID <numero> /F
```

### Erro: "Container unhealthy"
```bash
# Ver logs do container
docker logs cursos_backend

# Verificar health
docker inspect cursos_backend | grep -A 10 Health
```

### Erro: "Prisma migration failed"
```bash
# Entrar no container e rodar manualmente
docker exec -it cursos_backend sh
npx prisma migrate deploy
```

### Erro: "Cannot connect to database"
```bash
# Verificar se database está saudável
docker ps
docker logs cursos_database
```

### Reconstruir do zero
```bash
# Parar e limpar tudo
docker-compose down -v
docker system prune -a

# Reconstruir
docker-compose up --build -d
```

---

## 📚 Requisitos Atendidos

- ✅ **Dois ou mais containers** (3 no total)
- ✅ **Dockerfile** para aplicação Node.js e React
- ✅ **Docker Compose** orquestrando todos os serviços
- ✅ **Banco de dados PostgreSQL**
- ✅ **Comunicação via variáveis de ambiente**
- ✅ **Mesma rede Docker** (cursos_network)
- ✅ **Portas expostas** (80, 3001, 5432)
- ✅ **Execução simultânea** dos containers
- ✅ **Persistência com volumes**
- ✅ **Operações CRUD** funcionando
- ✅ **Health checks** implementados

---

## 👥 Desenvolvido Por

- **Klaus Zielke**
- **Seu parceiro(a) de dupla**

**Disciplina**: Computação em Nuvem  
**Professor**: Augusto  
**Data**: Novembro de 2025

---

## 📞 Suporte

Se tiver problemas, verifique:
1. Docker está instalado: `docker --version`
2. Docker Compose está instalado: `docker-compose --version`
3. Portas estão livres
4. Arquivo `.env` está na raiz do projeto
5. Logs dos containers: `docker-compose logs`

---

## 🎉 Pronto para Apresentar!

Execute o comando abaixo e mostre ao professor:

```bash
docker-compose up --build -d && docker ps
```

**Boa sorte na apresentação! 🚀**
