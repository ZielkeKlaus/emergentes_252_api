# 🐳 Trabalho Docker - Computação em Nuvem

## ⚡ INÍCIO RÁPIDO

```bash
# 1. Clonar projeto
git clone https://github.com/ZielkeKlaus/emergentes_252_api.git
cd emergentes_252_api

# 2. Iniciar containers (aguarde 2-3 minutos)
docker-compose up --build -d

# 3. Verificar containers
docker ps

# 4. Popular banco
# Abrir no navegador: http://localhost:3001/setup/popular-dados

# 5. Acessar aplicação
# Abrir no navegador: http://localhost
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

### 🎯 COMECE AQUI:

1. **[RESUMO_FINAL.md](RESUMO_FINAL.md)** ⭐ **LEIA PRIMEIRO!**
   - Visão geral de tudo que foi criado
   - Checklist de apresentação

2. **[INDICE_DOCUMENTACAO.md](INDICE_DOCUMENTACAO.md)** ⭐
   - Índice completo de todos os arquivos
   - Ordem de leitura recomendada

### 📖 Para Executar o Projeto:

3. **[DOCKER_README.md](DOCKER_README.md)** ⭐
   - Guia completo de execução
   - Troubleshooting
   - Comandos úteis

### 🎤 Para a Apresentação:

4. **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** ⭐
   - 5 minutos antes da apresentação
   - Checklist essencial

5. **[ROTEIRO_APRESENTACAO.md](ROTEIRO_APRESENTACAO.md)** ⭐
   - Passo a passo completo
   - O que falar em cada momento
   - Perguntas esperadas

6. **[DIAGRAMAS_VISUAIS.md](DIAGRAMAS_VISUAIS.md)**
   - Diagramas para explicar
   - Arquitetura visual

### 📄 Para Entregar:

7. **[TRABALHO_COMPLETO.md](TRABALHO_COMPLETO.md)** ⭐
   - Documento formal
   - Requisitos atendidos
   - Tecnologias utilizadas

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────┐
│     3 CONTAINERS ORQUESTRADOS           │
│                                         │
│  PostgreSQL → Backend API → Frontend    │
│   (porta 5432)  (porta 3001)  (porta 80)│
│                                         │
│  Volume: postgres_data (persistente)    │
│  Rede: cursos_network                   │
└─────────────────────────────────────────┘
```

---

## ✅ Requisitos Atendidos

- ✅ 3 containers (PostgreSQL + Backend + Frontend)
- ✅ Dockerfile customizado
- ✅ Docker Compose orquestrando
- ✅ Aplicação Node.js + TypeScript
- ✅ Banco PostgreSQL
- ✅ Variáveis de ambiente
- ✅ Rede Docker (cursos_network)
- ✅ Persistência com volume
- ✅ CRUD completo funcionando

---

## 🎓 Desenvolvido Por

- **Klaus Zielke**
- **[Seu parceiro(a) de dupla]**

**Disciplina:** Computação em Nuvem  
**Professor:** Augusto  
**Ano:** 2025

---

## 📞 Links Úteis

- **Repositório:** https://github.com/ZielkeKlaus/emergentes_252_api
- **Frontend Local:** http://localhost
- **Backend Local:** http://localhost:3001

---

## 🚀 Comandos Principais

```bash
# Iniciar
docker-compose up --build -d

# Ver containers
docker ps

# Ver logs
docker-compose logs -f

# Parar
docker-compose down

# Reconstruir
docker-compose up --build -d
```

---

**Leia [RESUMO_FINAL.md](RESUMO_FINAL.md) para detalhes completos!** 🎯
