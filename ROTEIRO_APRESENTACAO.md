# ==================================
# ROTEIRO DE APRESENTAÇÃO - Docker
# ==================================

## 🎯 Checklist para a Apresentação

### ANTES DA APRESENTAÇÃO

- [ ] Docker instalado e funcionando
- [ ] Portas 80, 3001 e 5432 livres
- [ ] Arquivo .env configurado na raiz
- [ ] Terminal/PowerShell aberto na pasta do projeto

---

## 📝 ROTEIRO PASSO A PASSO

### 1️⃣ MOSTRAR OS ARQUIVOS DOCKER (2 min)

**Abrir no VS Code e explicar:**

```
📁 emergentes_252_api/
├── 📄 docker-compose.yml       → Orquestra os 3 containers
├── 📄 .env                      → Variáveis de ambiente
├── 📄 init-db.sql              → Script inicial do banco
│
├── 📁 cursos_api/
│   ├── 📄 Dockerfile            → Imagem do backend
│   └── 📄 .dockerignore
│
└── 📁 cursos_web/
    ├── 📄 Dockerfile            → Imagem do frontend
    ├── 📄 nginx.conf            → Config do servidor web
    └── 📄 .dockerignore
```

**Explicar brevemente:**
- "Temos 2 Dockerfiles personalizados"
- "Docker Compose gerencia os 3 serviços"
- "Variáveis de ambiente no .env"
- "Rede Docker para comunicação"
- "Volume para persistência"

---

### 2️⃣ CONSTRUIR E INICIAR OS CONTAINERS (3 min)

**No terminal, executar:**

```powershell
# Navegar até a pasta
cd "caminho\para\emergentes_252_api"

# Construir e iniciar
docker-compose up --build -d
```

**Enquanto constrói, explicar:**
- "Está construindo as imagens Docker"
- "Backend: Node.js + TypeScript + Prisma"
- "Frontend: React + Vite + Nginx"
- "Banco: PostgreSQL 15"

**Tempo estimado:** 2-3 minutos

---

### 3️⃣ MOSTRAR CONTAINERS EM EXECUÇÃO (1 min)

**Executar:**

```powershell
docker ps
```

**Apontar na tela:**
- ✅ cursos_database (PostgreSQL) - porta 5432
- ✅ cursos_backend (Node.js) - porta 3001
- ✅ cursos_frontend (Nginx) - porta 80

**Dizer:**
- "Temos 3 containers rodando simultaneamente"
- "Todos na mesma rede Docker"
- "Portas expostas para acesso externo"

---

### 4️⃣ VERIFICAR COMUNICAÇÃO COM BANCO (1 min)

**No navegador, abrir:**
```
http://localhost:3001/health/db
```

**Resultado esperado:**
```json
{"ok": true}
```

**Explicar:**
- "Backend conectou com sucesso ao PostgreSQL"
- "Comunicação via variável DATABASE_URL"
- "Usando nome do serviço: database:5432"

---

### 5️⃣ POPULAR O BANCO DE DADOS (1 min)

**No navegador, abrir em sequência:**

```
http://localhost:3001/setup/criar-primeiro-admin
```

**Aguardar resposta JSON (admin criado)**

Depois:
```
http://localhost:3001/setup/popular-dados
```

**Aguardar resposta:**
```json
{
  "mensagem": "Banco de dados populado com sucesso!",
  "resumo": {
    "categorias": 4,
    "instrutores": 3,
    "cursos": 6,
    "alunos": 3
  }
}
```

**Explicar:**
- "Dados persistidos no volume Docker"
- "Banco foi populado com dados de exemplo"

---

### 6️⃣ TESTAR A APLICAÇÃO WEB (3 min)

#### A) Listar Cursos

**Abrir:**
```
http://localhost
```

**Mostrar:**
- ✅ 6 cursos aparecendo
- ✅ Busca funcionando (digitar "React")
- ✅ Filtro em tempo real

#### B) Cadastrar Novo Usuário

**Clicar em "Cadastrar"**

**Preencher:**
- Nome: João da Silva
- Email: joao@teste.com
- Senha: Teste@123
- Cidade: Curitiba

**Clicar em "Cadastrar"**

**Mostrar:**
- ✅ Usuário criado
- ✅ Login automático
- ✅ "Olá, João da Silva" no header
- ✅ Dado persistido no banco

#### C) Matricular em Curso

**Clicar em qualquer curso**

**Clicar em "Matricular-se"**

**Mostrar:**
- ✅ Matrícula registrada
- ✅ Mensagem de sucesso
- ✅ Dados salvos no PostgreSQL

#### D) Avaliar Curso

**Rolar até "Avaliar este curso"**

**Preencher:**
- Nota: 10
- Comentário: "Excelente curso! Aprendi muito."

**Clicar em "Enviar Avaliação"**

**Mostrar:**
- ✅ Avaliação aparece na lista
- ✅ Nome do aluno correto
- ✅ Data atual

---

### 7️⃣ ÁREA ADMINISTRATIVA (2 min)

**Abrir:**
```
http://localhost/admin/login
```

**Login:**
- Email: admin@admin.com
- Senha: Admin@123

**Mostrar rapidamente:**
- ✅ Dashboard com gráficos
- ✅ Cursos por categoria (gráfico pizza)
- ✅ Usuários por cidade (gráfico barras)
- ✅ CRUD de Cursos
- ✅ CRUD de Categorias
- ✅ Listagem de Usuários (incluindo João que criamos)
- ✅ Matrículas realizadas

---

### 8️⃣ EXPLICAR A COMUNICAÇÃO (2 min)

**Mostrar diagrama (pode desenhar no quadro ou slides):**

```
┌─────────────────────────────────────┐
│     REDE: cursos_network            │
│                                     │
│  ┌──────────┐   ┌──────────┐       │
│  │PostgreSQL│◄──│ Backend  │       │
│  │  :5432   │   │  :3001   │       │
│  └──────────┘   └──────────┘       │
│       ▲              ▲              │
│       │              │              │
│   [Volume]      [API REST]          │
│  postgres_data      │               │
└─────────────────────┼───────────────┘
                      │
                      ▼
                ┌──────────┐
                │ Frontend │
                │   :80    │
                └──────────┘
                (Nginx servindo React)
```

**Explicar:**

1. **Frontend → Backend:**
   - "Frontend acessa API via HTTP"
   - "Porta 3001 exposta"
   - "Axios faz requisições REST"

2. **Backend → Database:**
   - "Conexão via Prisma ORM"
   - "DATABASE_URL definida em variável de ambiente"
   - "Formato: postgresql://user:pass@database:5432/db"
   - "Nome 'database' resolve via DNS do Docker"

3. **Rede Docker:**
   - "Todos containers na mesma rede bridge"
   - "Comunicam-se por nome do serviço"
   - "Isolamento de outras aplicações"

4. **Persistência:**
   - "Volume 'postgres_data' armazena dados"
   - "Sobrevive a reinicializações"
   - "Gerenciado pelo Docker"

---

### 9️⃣ VERIFICAR PERSISTÊNCIA (1 min)

**Executar no terminal:**

```powershell
# Parar containers
docker-compose down

# Verificar que não há containers
docker ps

# Iniciar novamente
docker-compose up -d

# Verificar containers
docker ps
```

**No navegador, abrir:**
```
http://localhost
```

**Mostrar:**
- ✅ Dados continuam lá!
- ✅ Usuário João ainda existe
- ✅ Matrículas preservadas
- ✅ Avaliações mantidas

**Explicar:**
- "Volume Docker manteve todos os dados"
- "Persistência funcionando corretamente"

---

### 🔟 VER LOGS (OPCIONAL - 1 min)

**Se o professor perguntar sobre logs:**

```powershell
# Ver logs do backend
docker logs cursos_backend

# Ver logs do banco
docker logs cursos_database

# Ver todos os logs
docker-compose logs
```

---

## 🎓 PONTOS IMPORTANTES A MENCIONAR

### ✅ Requisitos Atendidos:

1. **Dois ou mais containers**: ✅ 3 containers
2. **Aplicação desenvolvida**: ✅ Node.js + TypeScript
3. **Banco de dados**: ✅ PostgreSQL
4. **Variáveis de ambiente**: ✅ DATABASE_URL, JWT_KEY
5. **Mesma rede Docker**: ✅ cursos_network
6. **Portas expostas**: ✅ 80, 3001, 5432
7. **Execução simultânea**: ✅ docker-compose
8. **Persistência**: ✅ Volume postgres_data
9. **Comunicação app ↔ banco**: ✅ Prisma + DATABASE_URL
10. **CRUD funcionando**: ✅ Cadastro, listagem, edição, exclusão

---

## 💡 POSSÍVEIS PERGUNTAS DO PROFESSOR

### "Como funciona a comunicação?"
**Resposta:**
- "O backend acessa o banco usando a variável DATABASE_URL"
- "O Docker resolve o nome 'database' para o IP do container"
- "Eles estão na mesma rede Docker chamada cursos_network"
- "O Prisma ORM gerencia as conexões e queries SQL"

### "E se o container parar?"
**Resposta:**
- "O Docker pode reiniciar automaticamente (restart: unless-stopped)"
- "Os dados estão salvos no volume, não se perdem"
- "Health checks monitoram a saúde dos containers"

### "Como garantir que o banco está pronto?"
**Resposta:**
- "Usamos depends_on com condition: service_healthy"
- "Health check no PostgreSQL verifica com pg_isready"
- "Backend só inicia após banco estar saudável"

### "E a segurança?"
**Resposta:**
- "Senhas em variáveis de ambiente (não no código)"
- "JWT para autenticação de usuários"
- "Bcrypt para hash de senhas no banco"
- "Rede Docker isolada"

---

## ⏱️ TEMPO TOTAL ESTIMADO: 15-20 minutos

- Setup inicial: 3 min
- Demonstração: 10 min
- Explicação técnica: 3 min
- Perguntas: 4 min

---

## 📋 CHECKLIST FINAL

Antes de encerrar, confirmar:

- [ ] Mostrou aplicação funcionando
- [ ] Executou `docker ps`
- [ ] Fez cadastro em tempo real
- [ ] Fez listagem de dados
- [ ] Explicou comunicação app ↔ banco
- [ ] Mencionou variáveis de ambiente
- [ ] Mencionou rede Docker
- [ ] Mencionou persistência com volume
- [ ] Respondeu perguntas

---

## 🚀 BOA APRESENTAÇÃO!

**Lembre-se:**
- Fale com confiança
- Mostre que entende o que está fazendo
- Destaque os conceitos de Docker
- Se der erro, mantenha a calma e verifique os logs

**Você está preparado! 💪**
