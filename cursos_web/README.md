# Cursos Academy - Frontend (minimal)

This is a minimal React + Vite frontend that consumes the `cursos_api` backend.

Setup

1. Install deps:

```powershell
cd cursos_web
npm install
```

2. Set API base (optional): create `.env` with

VITE_API_BASE=http://localhost:3001

3. Run dev server:

```powershell
npm run dev
```

Notes about auth and enrollment
- The frontend stores the JWT token and user id in localStorage after login. When logged in, you can visit a course detail and click "Matricular" to enroll (the backend will register the matricula).


Pages included (minimal):
- Courses list (homepage) — calls GET /cursos

This is a starting point. I can extend it with login, cadastro, detalhes de curso, páginas protegidas e estilos se quiseres.
