# 🎓 EstudeFácil - Informações do Projeto

## 🌐 URLs do Projeto

### Frontend (Vercel):
```
https://emergentes-252-rndsfr12m-klaus-zielkes-projects.vercel.app
```

### Backend (Render):
```
https://emergentes-252-api.onrender.com
```

### Database (Neon):
```
Acessar via Neon Dashboard
```

---

## 🔐 Credenciais de Teste

### 👨‍💼 ADMIN (Área Administrativa)
```
URL: https://emergentes-252-rndsfr12m-klaus-zielkes-projects.vercel.app/admin/login

Email: admin@admin.com
Senha: Admin@123
```

**O que testar:**
- ✅ Dashboard com gráficos (Cursos por Categoria + Usuários por Cidade)
- ✅ CRUD de Cursos (criar, editar, excluir)
- ✅ CRUD de Categorias (criar, editar, excluir)
- ✅ Visualizar Usuários (com contadores de matrículas e avaliações)
- ✅ Visualizar Matrículas
- ✅ Gerenciar Avaliações (excluir se inapropriadas)

---

### 👨‍🏫 INSTRUTOR (Usuário Normal)
```
URL: https://emergentes-252-rndsfr12m-klaus-zielkes-projects.vercel.app/login

Email: joao@instrutor.com
Senha: Senha@123
```

**Perfil:**
- Nome: João Silva
- Cidade: São Paulo
- Tipo: Instrutor
- Cursos criados: React do Zero ao Avançado, Node.js e Express Completo

---

### 👩‍🎓 ALUNO (Usuário Normal)
```
URL: https://emergentes-252-rndsfr12m-klaus-zielkes-projects.vercel.app/login

Email: ana@aluno.com
Senha: Senha@123
```

**Perfil:**
- Nome: Ana Oliveira
- Cidade: Curitiba
- Tipo: Aluno

**O que testar:**
- ✅ Buscar cursos (filtro em tempo real)
- ✅ Ver detalhes do curso
- ✅ Matricular-se em curso
- ✅ Avaliar curso (nota 0-10 + comentário)
- ✅ Logout

---

### 👤 Outros Usuários Disponíveis

**Instrutora Maria:**
```
Email: maria@instrutor.com
Senha: Senha@123
Cidade: Rio de Janeiro
Cursos: UI/UX Design Fundamentos, Figma para Iniciantes
```

**Instrutor Pedro:**
```
Email: pedro@instrutor.com
Senha: Senha@123
Cidade: Belo Horizonte
Cursos: Marketing Digital na Prática, Gestão de Negócios para Startups
```

**Aluno Carlos:**
```
Email: carlos@aluno.com
Senha: Senha@123
Cidade: Porto Alegre
```

**Aluna Fernanda:**
```
Email: fernanda@aluno.com
Senha: Senha@123
Cidade: São Paulo
```

---

## 📚 Cursos Disponíveis no Sistema

| # | Curso | Categoria | Instrutor | Carga Horária |
|---|-------|-----------|-----------|---------------|
| 1 | React do Zero ao Avançado | Programação | João Silva | 40h |
| 2 | Node.js e Express Completo | Programação | João Silva | 35h |
| 3 | UI/UX Design Fundamentos | Design | Maria Santos | 30h |
| 4 | Figma para Iniciantes | Design | Maria Santos | 25h |
| 5 | Marketing Digital na Prática | Marketing | Pedro Costa | 45h |
| 6 | Gestão de Negócios para Startups | Negócios | Pedro Costa | 50h |

---

## 🏷️ Categorias Disponíveis

1. **Programação** (2 cursos)
2. **Design** (2 cursos)
3. **Marketing** (1 curso)
4. **Negócios** (1 curso)

---

## ✅ Funcionalidades Implementadas

### 🌍 ÁREA PÚBLICA

#### 1. **Listagem de Cursos** (/)
- Exibe todos os cursos em cards
- Cada card mostra: título, descrição, categoria, instrutor, carga horária
- Busca em tempo real (filtra por título, descrição, categoria, instrutor)
- Botão "Limpar busca"
- Mensagem quando não encontra resultados

#### 2. **Cadastro de Usuário** (/register)
- Campos: nome, email, senha, cidade
- Validação de senha forte (8+ chars, maiúscula, minúscula, número, símbolo)
- Login automático após cadastro
- Tratamento de email duplicado

#### 3. **Login de Usuário** (/login)
- Autenticação via JWT (token válido por 1 hora)
- Salva nome do usuário no localStorage
- Redireciona para home após login

#### 4. **Header Dinâmico**
- Se não logado: mostra "Login | Cadastrar"
- Se logado: mostra "Olá, {nome} | Sair"
- Logout limpa token e volta para home

#### 5. **Detalhes do Curso** (/cursos/:id)
- Informações completas do curso
- Botão "Matricular-se" (apenas se logado)
- **Sistema de Avaliação**:
  - Formulário: nota (0-10) + comentário opcional
  - Lista de todas as avaliações do curso
  - Mostra: nome do aluno, nota, comentário, data
  - Atualização em tempo real após avaliar

---

### 🔒 ÁREA ADMINISTRATIVA

#### 6. **Login Admin** (/admin/login)
- Autenticação separada para administradores
- Credenciais: admin@admin.com / Admin@123

#### 7. **Dashboard** (/admin/dashboard)
- **3 Cards de Estatísticas**:
  - Total de Usuários
  - Total de Cursos
  - Total de Matrículas
  
- **Gráfico 1: Cursos por Categoria** (Pizza)
  - Visualização percentual
  - Cores diferentes para cada categoria
  - Labels com nome e porcentagem
  
- **Gráfico 2: Usuários por Cidade** (Barras)
  - Quantidade de usuários por cidade
  - Ordenado do maior para o menor
  - Grid e tooltip interativo

#### 8. **CRUD de Cursos** (/admin/cursos)
- **Listar**: Tabela com ID, Título, Carga Horária, Preço, Categoria, Instrutor
- **Criar**: Modal com todos os campos, dropdowns para categoria e instrutor
- **Editar**: Modal pré-preenchido com dados atuais
- **Excluir**: Confirmação antes de deletar

#### 9. **CRUD de Categorias** (/admin/categorias)
- **Listar**: Tabela com ID, Nome, Nº de Cursos
- **Criar**: Modal simples com campo nome
- **Editar**: Modal pré-preenchido
- **Excluir**: Confirmação (erro se categoria tem cursos)

#### 10. **Visualização de Usuários** (/admin/usuarios)
- Tabela com todos os usuários
- Colunas: ID, Nome, Email, Cidade, Matrículas, Avaliações, Data de Cadastro
- Contadores dinâmicos (_count)

#### 11. **Visualização de Matrículas** (/admin/matriculas)
- Tabela com todas as matrículas
- Colunas: ID, Aluno, Email, Curso, Data
- Total no header

#### 12. **Gerenciamento de Avaliações** (/admin/avaliacoes)
- Tabela com todas as avaliações
- Colunas: ID, Aluno, Curso, Nota, Comentário, Data
- **Badge colorida nas notas**:
  - 🟢 Verde: nota ≥ 8
  - 🟡 Amarela: nota entre 6-7.9
  - 🔴 Vermelha: nota < 6
- Botão para excluir avaliações inapropriadas

#### 13. **Layout Admin**
- Sidebar fixa com navegação
- Ícones para cada seção
- Nome do admin exibido
- Botão de logout
- Proteção de rotas (verifica token)

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + TypeScript
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- bcrypt (hash de senhas)
- jsonwebtoken (autenticação JWT)
- Zod (validação)
- CORS

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router DOM v6
- Recharts (gráficos)

### Deploy
- Backend: Render
- Frontend: Vercel
- Database: Neon (PostgreSQL)

---

## 📊 Endpoints da API

### Públicos
```
GET  /categorias              - Lista todas as categorias
GET  /cursos                  - Lista todos os cursos
GET  /cursos/:id              - Detalhes de um curso
POST /usuarios                - Cadastrar novo usuário
POST /usuarios/login          - Login de usuário
POST /matriculas              - Matricular em curso (requer auth)
POST /avaliacoes              - Avaliar curso (requer auth)
GET  /avaliacoes/curso/:id    - Avaliações de um curso
```

### Admin (requer adminToken)
```
POST /admins/login            - Login admin
GET  /dashboard/gerais        - Estatísticas gerais
GET  /dashboard/cursosPorCategoria  - Dados para gráfico pizza
GET  /dashboard/usuariosPorCidade   - Dados para gráfico barras
GET  /usuarios                - Lista usuários
GET  /matriculas              - Lista matrículas
GET  /avaliacoes              - Lista todas avaliações
POST /cursos                  - Criar curso
PUT  /cursos/:id              - Editar curso
DELETE /cursos/:id            - Excluir curso
POST /categorias              - Criar categoria
PUT  /categorias/:id          - Editar categoria
DELETE /categorias/:id        - Excluir categoria
DELETE /avaliacoes/:id        - Excluir avaliação
```

### Setup (uso único)
```
POST /setup/criar-primeiro-admin  - Criar admin inicial
POST /setup/popular-dados         - Popular banco com dados de exemplo
```

---

## 🎯 Fluxo de Teste Recomendado

### 1️⃣ Testar Área Pública
1. Abrir home: ver 6 cursos
2. Testar busca: digitar "React" → deve filtrar
3. Clicar em "Cadastrar" → criar novo usuário
4. Ver nome no header ("Olá, seu_nome")
5. Clicar em um curso → ver detalhes
6. Clicar em "Matricular-se"
7. Avaliar o curso (nota + comentário)
8. Ver avaliação aparecer na lista
9. Clicar em "Sair" → voltar ao estado não logado

### 2️⃣ Testar Área Admin
1. Ir para `/admin/login`
2. Login: admin@admin.com / Admin@123
3. Ver dashboard com gráficos
4. Ir para "Cursos" → criar novo curso
5. Editar curso existente
6. Ir para "Categorias" → criar nova
7. Ir para "Usuários" → ver lista
8. Ir para "Matrículas" → ver registros
9. Ir para "Avaliações" → ver e excluir se necessário
10. Clicar em "Sair"

---

## 🚨 Problemas Conhecidos e Soluções

### Backend demora no primeiro acesso
**Causa**: Cold start do Render (plano gratuito)  
**Solução**: Aguardar ~1 minuto na primeira requisição

### CORS Error
**Causa**: VITE_API_BASE não configurado no Vercel  
**Solução**: Verificar variável de ambiente no Vercel

### Login não funciona
**Causa**: JWT_KEY não configurado no Render  
**Solução**: Adicionar JWT_KEY nas variáveis de ambiente

### Gráficos não aparecem
**Causa**: Precisa ter dados no banco  
**Solução**: Executar `/setup/popular-dados`

---

## 📈 Estatísticas do Projeto

- **Linhas de Código**: ~3.000+
- **Rotas Backend**: 20+
- **Componentes React**: 15+
- **Modelos Prisma**: 7
- **Endpoints de API**: 25+
- **Páginas Frontend**: 12+
- **Commits no Git**: 30+

---

## 🎓 Requisitos do Trabalho Atendidos

✅ 1. Sistema com backend (Node.js + TypeScript + Prisma)  
✅ 2. Frontend (React + TypeScript + Tailwind)  
✅ 3. Busca/filtro de itens (cursos)  
✅ 4. Cadastro e login de usuários  
✅ 5. Detalhes do item  
✅ 6. Interação do usuário (matrículas + avaliações)  
✅ 7. Área administrativa restrita  
✅ 8. Dashboard com gráficos visuais  
✅ 9. CRUD completo (cursos e categorias)  
✅ 10. Gerenciamento de interações (avaliações)  
✅ 11. Deploy em produção (Vercel + Render + Neon)  

---

## 🏆 Projeto Completo e Funcional!

**Data de Conclusão**: 30 de Outubro de 2025

Desenvolvido por: Klaus Zielke  
Repositório: https://github.com/ZielkeKlaus/emergentes_252_api
