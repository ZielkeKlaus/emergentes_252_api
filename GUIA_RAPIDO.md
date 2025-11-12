# ⚡ GUIA RÁPIDO - 5 Minutos Antes da Apresentação

## 🎯 CHECKLIST PRÉ-APRESENTAÇÃO

### ✅ Preparação (fazer em casa)

- [ ] Docker Desktop instalado e rodando
- [ ] Projeto clonado do GitHub
- [ ] Testado pelo menos uma vez antes
- [ ] Portas 80, 3001 e 5432 livres
- [ ] Arquivo .env na raiz do projeto

### ✅ 5 Minutos Antes (na sala)

1. **Abrir Docker Desktop** - Verificar que está rodando
2. **Abrir PowerShell/Terminal** - Navegar até a pasta do projeto
3. **Executar o comando de build** (demora 2-3 minutos)
4. **Enquanto constrói**: Abrir os arquivos para mostrar
5. **Popular o banco** - Usar endpoints de setup

---

## 🚀 COMANDOS EM ORDEM

### 1. Navegar até o projeto
```powershell
cd "C:\Users\...\emergentes_252_api"
```

### 2. Construir e iniciar (DEMORA 2-3 MIN)
```powershell
docker-compose up --build -d
```

**ENQUANTO CONSTRÓI, MOSTRAR:**
- `docker-compose.yml` aberto no VS Code
- Explicar os 3 serviços
- Mostrar Dockerfiles

### 3. Verificar containers (quando terminar)
```powershell
docker ps
```

**DEVE MOSTRAR 3 CONTAINERS:**
- cursos_database
- cursos_backend  
- cursos_frontend

### 4. Popular banco
**Abrir no navegador:**
```
http://localhost:3001/setup/criar-primeiro-admin
http://localhost:3001/setup/popular-dados
```

### 5. Testar aplicação
```
http://localhost
```

---

## 🗣️ ROTEIRO DE FALA (2 minutos)

### Abertura (15 segundos)
> "Desenvolvemos um ambiente Docker completo com 3 containers para uma plataforma de cursos online. Vou demonstrar o funcionamento."

### Mostrar Arquivos (30 segundos)
> "Aqui temos o docker-compose.yml que orquestra 3 serviços:
> - PostgreSQL para banco de dados
> - Backend em Node.js com TypeScript
> - Frontend em React servido por Nginx
> 
> Todos na mesma rede Docker, com volumes para persistência."

### Executar (15 segundos)
> "Vou iniciar o ambiente com um único comando."

```powershell
docker-compose up --build -d
```

### Enquanto constrói (1 minuto)
> "Enquanto constrói as imagens, vou mostrar os Dockerfiles.
> 
> O backend usa multi-stage build: primeiro compila o TypeScript, depois cria imagem de produção otimizada.
> 
> O frontend também usa multi-stage: build do React com Vite, depois serve com Nginx.
> 
> As variáveis de ambiente estão no arquivo .env: credenciais do banco, chave JWT."

### Mostrar Containers (15 segundos)
```powershell
docker ps
```

> "Temos os 3 containers rodando:
> - Database na porta 5432
> - Backend na 3001
> - Frontend na 80"

### Popular Banco (15 segundos)
**Abrir navegador:**
```
http://localhost:3001/setup/popular-dados
```

> "Vou popular o banco com dados de exemplo via API."

### Demonstração (1 minuto)
**Abrir:**
```
http://localhost
```

> "Aplicação funcionando. Vou fazer um cadastro em tempo real."

**Cadastrar usuário:**
- Nome: João Teste
- Email: joao@teste.com
- Senha: Teste@123
- Cidade: Curitiba

> "Usuário cadastrado, salvo no PostgreSQL via Prisma ORM."

**Matricular em curso:**
> "Vou matricular em um curso. Dados persistidos no volume Docker."

**Avaliar curso:**
> "E deixar uma avaliação. Comunicação app ↔ banco funcionando."

---

## 🎓 PERGUNTAS ESPERADAS E RESPOSTAS

### "Como funciona a comunicação entre containers?"

**Responder:**
> "Os containers estão na mesma rede Docker chamada 'cursos_network'.
> O backend acessa o banco usando a variável DATABASE_URL que aponta para 'database:5432' - o Docker resolve esse nome para o IP do container.
> O Prisma ORM gerencia as conexões e queries SQL."

### "E se derrubar os containers, perde os dados?"

**Responder:**
> "Não, porque usamos um volume Docker chamado 'postgres_data'.
> Ele persiste os dados independente do ciclo de vida do container.
> Posso demonstrar:"

```powershell
docker-compose down
docker-compose up -d
```

**Abrir:** `http://localhost`

> "Dados continuam aqui!"

### "Como garante que o banco está pronto antes do backend?"

**Responder:**
> "Usamos 'depends_on' com 'service_healthy' no docker-compose.
> O PostgreSQL tem um health check com 'pg_isready'.
> Backend só inicia depois que o banco está saudável."

### "Por que usar Docker?"

**Responder:**
> "Padronização do ambiente, facilita deploy, isolamento de dependências, escalabilidade, e funciona igual em qualquer máquina com Docker instalado."

---

## 🛠️ PLANO B (se algo der errado)

### Se porta 80 estiver em uso:
```powershell
# Editar docker-compose.yml
# Trocar "80:80" por "8080:80"
docker-compose up -d

# Acessar: http://localhost:8080
```

### Se build falhar:
```powershell
# Limpar e tentar novamente
docker-compose down -v
docker system prune -f
docker-compose up --build -d
```

### Se banco não conectar:
```powershell
# Ver logs
docker logs cursos_database
docker logs cursos_backend

# Verificar .env
cat .env
```

### Se tudo falhar:
> "Vou mostrar a aplicação rodando na versão em produção no Vercel/Render"
> https://emergentes-252-rndsfr12m-klaus-zielkes-projects.vercel.app

---

## 📱 URLS IMPORTANTES

| O que                  | URL                                      |
|------------------------|------------------------------------------|
| Frontend               | http://localhost                         |
| Backend API            | http://localhost:3001                    |
| Criar Admin            | http://localhost:3001/setup/criar-primeiro-admin |
| Popular Banco          | http://localhost:3001/setup/popular-dados |
| Health Check           | http://localhost:3001/health/db          |
| Login Admin            | http://localhost/admin/login             |

---

## 🎬 DIVISÃO DA DUPLA

### Pessoa 1 - Apresentador Principal
- Explicar a arquitetura
- Executar comandos Docker
- Mostrar containers rodando
- Navegar na aplicação

### Pessoa 2 - Apoio Técnico
- Controlar o navegador
- Fazer cadastros/testes
- Responder perguntas técnicas
- Ter os comandos prontos para copiar

---

## ⏱️ CRONÔMETRO

| Minuto | Ação                                  |
|--------|---------------------------------------|
| 0:00   | Apresentação inicial                  |
| 0:15   | Mostrar arquivos Docker               |
| 0:30   | Executar docker-compose up            |
| 1:30   | Mostrar containers com docker ps      |
| 1:45   | Popular banco de dados                |
| 2:00   | Demonstrar aplicação                  |
| 3:00   | Cadastro em tempo real                |
| 4:00   | Explicar comunicação app ↔ banco     |
| 5:00   | Perguntas                             |

---

## 💪 DICAS FINAIS

1. **Fale devagar e claro** - Professor precisa entender
2. **Mostre confiança** - Mesmo se errar, continue
3. **Teste ANTES** - Nunca apresente algo não testado
4. **Tenha backup** - URLs de produção prontas
5. **Conheça os comandos** - Não fique lendo slides
6. **Explique, não só mostre** - Demonstre conhecimento
7. **Prepare respostas** - Antecipe perguntas comuns
8. **Seja objetivo** - 10-15 minutos no máximo

---

## 🎯 CRITÉRIOS DE AVALIAÇÃO (provável)

- ✅ Containers funcionando simultaneamente
- ✅ Comunicação entre app e banco
- ✅ Persistência de dados
- ✅ Uso correto de variáveis de ambiente
- ✅ Rede Docker configurada
- ✅ Portas expostas
- ✅ CRUD funcionando
- ✅ Explicação técnica clara
- ✅ Domínio do conteúdo

---

## 📞 ÚLTIMO CHECKLIST (1 minuto antes)

- [ ] Docker Desktop aberto
- [ ] Terminal aberto na pasta correta
- [ ] Navegador aberto
- [ ] VS Code aberto nos arquivos Docker
- [ ] .env configurado
- [ ] Portas livres
- [ ] Internet funcionando (para build)
- [ ] Projetor/compartilhamento de tela OK

---

## 🎉 BOA APRESENTAÇÃO!

**Lembrete final:**
- Respire fundo
- Você preparou bem
- Conhece o projeto
- Docker está funcionando
- Vai dar certo! 💪

**Em caso de nervosismo:**
> "Vamos lá, é só rodar um comando e mostrar o resultado. Simples assim!"

---

**Boa sorte! 🚀🎓**
