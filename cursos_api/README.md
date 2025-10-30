# Cursos Academy API

Scaffold criado a partir do projeto base (revenda-avenida-api). Conteúdo mínimo para rodar localmente.

Como usar
1. Copie `.env.example` para `.env` e ajuste `DATABASE_URL` e `JWT_KEY`.
2. Instale dependências:

```powershell
cd cursos_api
npm install
```

3. Gere o client Prisma e rode migrations (ou apenas gerar client se ainda não quiser migrar):

```powershell
npx prisma generate
npx prisma migrate dev --name init
```

4. Rode em modo de desenvolvimento:

```powershell
npm run dev
```

Rotas principais
- GET /categorias
- POST /categorias
- GET /cursos
- POST /cursos
- POST /usuarios (registro)
- POST /usuarios/login (login)
- POST /matriculas
- POST /avaliacoes
- GET /dashboard/gerais

Obs: este scaffold é um ponto de partida. Ajustes de validação, testes e seeds podem ser adicionados conforme necessário.
