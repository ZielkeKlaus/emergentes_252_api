# 🚀 GUIA RÁPIDO - Como Popular o Banco

## 📝 Passo a Passo

### 1️⃣ Aguardar Deploy (1-2 minutos)
O Render está fazendo deploy das novas rotas. Aguarde até ver **"Live"** no dashboard.

### 2️⃣ Criar o Primeiro Admin

**Opção A - Usando o Navegador:**
```
https://emergentes-252-api.onrender.com/setup/criar-primeiro-admin
```
Abra essa URL no navegador (método POST, mas pode testar GET também).

**Opção B - Usando PowerShell:**
```powershell
$body = @{} | ConvertTo-Json
Invoke-RestMethod -Uri "https://emergentes-252-api.onrender.com/setup/criar-primeiro-admin" -Method Post -Body $body -ContentType "application/json"
```

**Opção C - Usando curl (se tiver instalado):**
```bash
curl -X POST https://emergentes-252-api.onrender.com/setup/criar-primeiro-admin
```

**Resultado esperado:**
```json
{
  "mensagem": "Primeiro admin criado com sucesso!",
  "email": "admin@admin.com",
  "senha": "Admin@123",
  "admin": {
    "id": "...",
    "nome": "Administrador",
    "email": "admin@admin.com"
  }
}
```

### 3️⃣ Popular o Banco com Dados de Exemplo

**Opção A - Usando o Navegador:**
```
https://emergentes-252-api.onrender.com/setup/popular-dados
```

**Opção B - Usando PowerShell:**
```powershell
$body = @{} | ConvertTo-Json
Invoke-RestMethod -Uri "https://emergentes-252-api.onrender.com/setup/popular-dados" -Method Post -Body $body -ContentType "application/json"
```

**Resultado esperado:**
```json
{
  "mensagem": "Banco de dados populado com sucesso!",
  "resumo": {
    "categorias": 4,
    "instrutores": 3,
    "cursos": 6,
    "alunos": 3
  },
  "credenciais": {
    "instrutor": {
      "email": "joao@instrutor.com",
      "senha": "Senha@123"
    },
    "aluno": {
      "email": "ana@aluno.com",
      "senha": "Senha@123"
    }
  }
}
```

---

## 📊 Dados que Serão Criados

### ✅ **4 Categorias:**
- Programação
- Design
- Marketing
- Negócios

### ✅ **3 Instrutores:**
- João Silva (São Paulo) - joao@instrutor.com
- Maria Santos (Rio de Janeiro) - maria@instrutor.com
- Pedro Costa (Belo Horizonte) - pedro@instrutor.com

### ✅ **6 Cursos:**
1. React do Zero ao Avançado (Programação - 40h)
2. Node.js e Express Completo (Programação - 35h)
3. UI/UX Design Fundamentos (Design - 30h)
4. Figma para Iniciantes (Design - 25h)
5. Marketing Digital na Prática (Marketing - 45h)
6. Gestão de Negócios para Startups (Negócios - 50h)

### ✅ **3 Alunos:**
- Ana Oliveira (Curitiba) - ana@aluno.com
- Carlos Lima (Porto Alegre) - carlos@aluno.com
- Fernanda Rocha (São Paulo) - fernanda@aluno.com

---

## 🔐 Credenciais para Testes

### Admin:
```
Email: admin@admin.com
Senha: Admin@123
```

### Instrutor (para testar área de usuário):
```
Email: joao@instrutor.com
Senha: Senha@123
```

### Aluno (para testar matrículas e avaliações):
```
Email: ana@aluno.com
Senha: Senha@123
```

---

## ✅ Verificar se Funcionou

### 1. Ver os cursos no navegador:
```
https://emergentes-252-api.onrender.com/cursos
```
Deve retornar array com 6 cursos.

### 2. Ver categorias:
```
https://emergentes-252-api.onrender.com/categorias
```
Deve retornar array com 4 categorias.

### 3. Fazer login como admin:
1. Ir para: `https://seu-site.vercel.app/admin/login`
2. Email: `admin@admin.com`
3. Senha: `Admin@123`
4. Deve entrar no dashboard!

### 4. Ver cursos na tela inicial:
1. Ir para: `https://seu-site.vercel.app`
2. Deve aparecer 6 cards de cursos!

---

## 🚨 Problemas?

### "Já existe um admin no sistema"
✅ Isso é bom! Significa que o admin já foi criado. Use as credenciais acima.

### "Backend demora muito"
✅ Normal! Render tem "cold start" de ~1 minuto. Aguarde e tente novamente.

### "Erro 500"
✅ Verifique os logs no Render Dashboard. Pode ser problema de conexão com o banco.

### "CORS Error"
✅ Verifique se VITE_API_BASE está correto no Vercel.

---

## 📱 Próximos Passos

Depois de popular o banco:

1. ✅ Testar login como admin
2. ✅ Ver dashboard com gráficos (agora tem dados!)
3. ✅ Ver lista de cursos na home
4. ✅ Fazer login como aluno
5. ✅ Matricular em um curso
6. ✅ Avaliar o curso
7. ✅ Voltar como admin e ver as avaliações

**Tudo pronto! Agora seu sistema está com dados de exemplo! 🎉**
