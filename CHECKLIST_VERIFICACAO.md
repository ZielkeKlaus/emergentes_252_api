# ✅ CHECKLIST DE VERIFICAÇÃO - EstudeFácil

## 🌐 URLs do Projeto
- **Frontend (Vercel)**: https://seu-projeto.vercel.app
- **Backend (Render)**: https://emergentes-252-api.onrender.com
- **Database (Neon)**: Dashboard Neon (verificar conexões)

---

## 1️⃣ BACKEND - Render (VERIFICAR PRIMEIRO!)

### 🔴 Deploy Status
- [ ] Acessar https://dashboard.render.com e verificar se o deploy está **Live** (verde)
- [ ] Verificar logs: procurar por "Server rodando na porta" sem erros
- [ ] Confirmar que o build terminou com sucesso (não tem erros de TypeScript/Prisma)

### 🔴 Variáveis de Ambiente
- [ ] `DATABASE_URL` está configurada (deve apontar para Neon com `?sslmode=require`)
- [ ] `JWT_KEY` está configurada (sem ela o login não funciona!)
- [ ] **IMPORTANTE**: Se faltou alguma variável, adicionar e fazer **Manual Deploy**

### 🔴 Endpoints Públicos (teste no navegador)
```
https://emergentes-252-api.onrender.com/categorias
https://emergentes-252-api.onrender.com/cursos
```
- [ ] Retorna JSON com dados (não retorna erro 500)
- [ ] Se retornar array vazio `[]`, é porque não tem dados no banco ainda

### 🔴 Endpoints de Dashboard (teste no Postman/Insomnia)
```
GET /dashboard/gerais
GET /dashboard/cursosPorCategoria  ← NOVO!
GET /dashboard/usuariosPorCidade   ← NOVO!
```
- [ ] Testados com token de admin no header
- [ ] Retornam dados estruturados corretamente

---

## 2️⃣ FRONTEND - Vercel

### 🔵 Deploy Status
- [ ] Acessar https://vercel.com/dashboard e verificar se está **Ready**
- [ ] Verificar se o último commit foi deployado (020f536)
- [ ] Logs de build sem erros

### 🔵 Variável de Ambiente
- [ ] `VITE_API_BASE` está apontando para URL do Render
- [ ] Exemplo: `https://emergentes-252-api.onrender.com`
- [ ] **Se mudou**, fazer **Redeploy** no Vercel

---

## 3️⃣ FUNCIONALIDADES PÚBLICAS (Usuário Normal)

### 📚 Página Inicial - Lista de Cursos
- [ ] Acessar a home do site
- [ ] Cursos aparecem em cards (se houver no banco)
- [ ] **Busca funciona**: digitar no campo de busca filtra os cursos
- [ ] Busca procura em: título, descrição, categoria, instrutor
- [ ] Botão "Limpar busca" (X) funciona
- [ ] Se não achar nada, mostra "Nenhum curso encontrado"

### 🔐 Registro de Usuário
- [ ] Clicar em "Cadastrar" no header
- [ ] Preencher: nome, email, senha (8+ chars, maiúscula, minúscula, número, símbolo), cidade
- [ ] Submeter e verificar se:
  - [ ] Cria usuário no banco
  - [ ] Faz login automático
  - [ ] Redireciona para home
  - [ ] Header mostra "Olá, {nome} | Sair"

### 🔑 Login de Usuário
- [ ] Clicar em "Login"
- [ ] Inserir email e senha de um usuário existente
- [ ] Verificar se:
  - [ ] Login bem-sucedido
  - [ ] Header mostra "Olá, {nome}"
  - [ ] Token salvo no localStorage (inspecionar no DevTools)

### 📖 Detalhes do Curso
- [ ] Clicar em qualquer curso
- [ ] Ver título, descrição, carga horária, preço, categoria, instrutor
- [ ] **Se logado**: Botão "Matricular-se" aparece
- [ ] Clicar em "Matricular-se" e confirmar que matrícula foi registrada
- [ ] Tentar matricular novamente → deve mostrar erro "Você já está matriculado"

### ⭐ Avaliação de Curso
- [ ] **Pré-requisito**: estar matriculado no curso
- [ ] Na página do curso, ver formulário de avaliação
- [ ] Inserir nota (0-10) e comentário opcional
- [ ] Submeter avaliação
- [ ] Verificar que:
  - [ ] Mensagem de sucesso aparece
  - [ ] Avaliação aparece na lista abaixo imediatamente
  - [ ] Mostra: nome do aluno, nota, comentário, data

### 🚪 Logout
- [ ] Clicar em "Sair" no header
- [ ] Verificar que:
  - [ ] Volta para a home
  - [ ] Header volta a mostrar "Login | Cadastrar"
  - [ ] localStorage foi limpo (sem token)

---

## 4️⃣ ÁREA ADMINISTRATIVA

### 🔐 Login Admin
- [ ] Acessar `/admin/login` manualmente na URL
- [ ] **Pré-requisito**: ter um admin no banco de dados

**Como criar um admin (se não tiver):**
```sql
-- No Neon SQL Editor:
INSERT INTO "Admin" (nome, email, senha) 
VALUES ('Admin Teste', 'admin@teste.com', '$2b$12$hashedpassword');
```
*Ou usar a rota POST /admins com senha em texto (se não tiver hash)*

- [ ] Fazer login com credenciais admin
- [ ] Verificar redirecionamento para `/admin/dashboard`
- [ ] Sidebar aparece com todas as opções

### 📊 Dashboard
- [ ] Ver 3 cards com totais: Usuários, Cursos, Matrículas
- [ ] **GRÁFICO 1**: Cursos por Categoria (Pizza/Donut)
  - [ ] Aparece se houver cursos no banco
  - [ ] Mostra percentuais corretos
  - [ ] Cores diferentes para cada categoria
- [ ] **GRÁFICO 2**: Usuários por Cidade (Barras)
  - [ ] Aparece se houver usuários no banco
  - [ ] Eixos X e Y corretos
  - [ ] Tooltip funciona ao passar mouse

### 📚 CRUD de Cursos (`/admin/cursos`)
- [ ] Ver tabela com todos os cursos
- [ ] Colunas: ID, Título, Carga Horária, Preço, Categoria, Instrutor
- [ ] **Criar curso**:
  - [ ] Clicar em "+ Novo Curso"
  - [ ] Preencher todos os campos
  - [ ] Selecionar categoria e instrutor (dropdowns populados)
  - [ ] Salvar e verificar que curso aparece na tabela
- [ ] **Editar curso**:
  - [ ] Clicar em "Editar" em um curso
  - [ ] Modal abre com dados preenchidos
  - [ ] Alterar algo e salvar
  - [ ] Verificar atualização na tabela
- [ ] **Excluir curso**:
  - [ ] Clicar em "Excluir"
  - [ ] Confirmar no diálogo
  - [ ] Curso desaparece da tabela

### 🏷️ CRUD de Categorias (`/admin/categorias`)
- [ ] Ver tabela com ID, Nome, Nº Cursos
- [ ] **Criar categoria**:
  - [ ] "+ Nova Categoria"
  - [ ] Digitar nome e salvar
- [ ] **Editar categoria**:
  - [ ] Clicar "Editar"
  - [ ] Mudar nome e salvar
- [ ] **Excluir categoria**:
  - [ ] Tentar excluir categoria com cursos → deve dar erro (FK constraint)
  - [ ] Excluir categoria sem cursos → funciona

### 👥 Visualização de Usuários (`/admin/usuarios`)
- [ ] Ver tabela com: ID, Nome, Email, Cidade, Matrículas, Avaliações, Cadastro
- [ ] Verificar contadores (_count) estão corretos
- [ ] Data formatada em pt-BR

### 📝 Visualização de Matrículas (`/admin/matriculas`)
- [ ] Ver tabela com: ID, Aluno, Email, Curso, Data
- [ ] Total de matrículas no header
- [ ] Datas formatadas

### ⭐ Gerenciamento de Avaliações (`/admin/avaliacoes`)
- [ ] Ver tabela com todas as avaliações
- [ ] **Badge colorida nas notas**:
  - [ ] Verde para nota ≥ 8
  - [ ] Amarela para nota ≥ 6
  - [ ] Vermelha para nota < 6
- [ ] Comentários truncados (hover para ver completo)
- [ ] **Excluir avaliação**:
  - [ ] Clicar "Excluir"
  - [ ] Confirmar
  - [ ] Avaliação removida

### 🚪 Logout Admin
- [ ] Clicar em "Sair" na sidebar
- [ ] Redireciona para `/admin/login`
- [ ] localStorage limpo (sem adminToken)

---

## 5️⃣ CASOS DE ERRO - Testar Resiliência

### ❌ Erros de Validação
- [ ] Cadastro sem senha forte → mensagem de erro clara
- [ ] Login com credenciais erradas → "Email ou senha incorretos"
- [ ] Criar curso sem preencher campos → validação do browser
- [ ] Email duplicado no registro → "Este e-mail já está em uso"

### ❌ Casos Especiais
- [ ] Acessar `/admin/dashboard` sem estar logado → redireciona para login
- [ ] Token JWT expirado (após 1h) → deve pedir novo login
- [ ] Avaliar curso sem estar matriculado → erro apropriado
- [ ] Criar matrícula duplicada → erro "Você já está matriculado"

---

## 6️⃣ PERFORMANCE & RESPONSIVIDADE

### 📱 Mobile/Tablet
- [ ] Abrir site no celular ou redimensionar navegador
- [ ] Layout adapta corretamente (grid responsivo)
- [ ] Sidebar admin funciona em mobile
- [ ] Tabelas tem scroll horizontal se necessário
- [ ] Gráficos redimensionam (ResponsiveContainer)

### ⚡ Performance
- [ ] Página inicial carrega em < 3s
- [ ] Gráficos renderizam sem travamentos
- [ ] Busca filtra em tempo real sem delay perceptível
- [ ] CORS permite requisições do frontend para backend

---

## 7️⃣ BASE DE DADOS - Neon

### 🗄️ Verificar Dados
```sql
-- No Neon SQL Editor:

-- Ver quantas categorias existem
SELECT * FROM "Categoria";

-- Ver cursos com relações
SELECT c.id, c.titulo, cat.nome as categoria, u.nome as instrutor 
FROM "Curso" c
JOIN "Categoria" cat ON c."categoriaId" = cat.id
JOIN "Usuario" u ON c."instrutorId" = u.id;

-- Ver matrículas
SELECT m.id, u.nome as aluno, c.titulo as curso, m.data
FROM "Matricula" m
JOIN "Usuario" u ON m."alunoId" = u.id
JOIN "Curso" c ON m."cursoId" = c.id;

-- Ver avaliações
SELECT a.id, u.nome as aluno, c.titulo as curso, a.nota, a.comentario
FROM "Avaliacao" a
JOIN "Usuario" u ON a."alunoId" = u.id
JOIN "Curso" c ON a."cursoId" = c.id;

-- Ver admins
SELECT * FROM "Admin";
```

### 📊 Dados para Gráficos
```sql
-- Cursos por categoria (para o gráfico de pizza)
SELECT cat.nome, COUNT(c.id) as total
FROM "Categoria" cat
LEFT JOIN "Curso" c ON c."categoriaId" = cat.id
GROUP BY cat.nome;

-- Usuários por cidade (para o gráfico de barras)
SELECT cidade, COUNT(*) as total
FROM "Usuario"
GROUP BY cidade
ORDER BY total DESC;
```

---

## 🎯 RESUMO DE PRIORIDADES

### 🔴 CRÍTICO (Bloqueia tudo se não funcionar)
1. Backend Render está Live
2. DATABASE_URL e JWT_KEY configuradas
3. Frontend Vercel deployado com VITE_API_BASE correto
4. CORS permitindo comunicação

### 🟡 IMPORTANTE (Funcionalidades principais)
5. Login/Registro funcionando
6. Lista de cursos aparecendo
7. Busca filtrando corretamente
8. Admin consegue fazer login e ver dashboard

### 🟢 DESEJÁVEL (Funcionalidades extras)
9. Gráficos renderizando corretamente
10. CRUD completo funcionando
11. Avaliações e matrículas funcionando
12. Responsividade mobile

---

## 🚨 PROBLEMAS COMUNS E SOLUÇÕES

### Problema: "Backend não responde"
- ✅ Render pode demorar ~1min no primeiro acesso (cold start)
- ✅ Verificar se DATABASE_URL tem `?sslmode=require`
- ✅ Verificar logs no Render Dashboard

### Problema: "Login não funciona"
- ✅ Verificar se JWT_KEY está no Render
- ✅ Verificar no Network tab se POST /usuarios/login retorna token
- ✅ Verificar se CORS não está bloqueando

### Problema: "Gráficos não aparecem"
- ✅ Precisa ter dados no banco (cursos, usuários)
- ✅ Verificar no console do browser por erros
- ✅ Endpoints `/dashboard/cursosPorCategoria` e `/usuariosPorCidade` devem retornar dados

### Problema: "Página em branco"
- ✅ Abrir DevTools Console e verificar erros
- ✅ Verificar se VITE_API_BASE aponta para URL correta
- ✅ Verificar se build do Vite terminou sem erros

---

## 📝 CHECKLIST FINAL

Depois de testar tudo:
- [ ] Fazer um vídeo/screenshots demonstrando as funcionalidades
- [ ] Documentar URLs em um README.md
- [ ] Criar usuário de teste e admin de teste com credenciais conhecidas
- [ ] Popular banco com dados de exemplo (pelo menos 5 cursos, 3 categorias, 5 usuários)
- [ ] Testar em diferentes navegadores (Chrome, Firefox, Edge)
- [ ] Testar em dispositivo mobile real

---

## 🎓 PARA APRESENTAÇÃO/ENTREGA

1. **URLs que você precisa fornecer:**
   - Frontend: https://_____.vercel.app
   - Backend: https://_____.onrender.com
   - Credenciais de teste (usuário e admin)

2. **Funcionalidades a demonstrar:**
   - Busca de cursos
   - Login e registro
   - Avaliação de curso
   - Dashboard admin com gráficos
   - CRUD de cursos

3. **Prints/vídeos recomendados:**
   - Home com lista de cursos
   - Resultado da busca
   - Página de detalhes com avaliações
   - Dashboard admin com gráficos
   - Tabela de CRUD

---

**Boa sorte na verificação! 🚀**
