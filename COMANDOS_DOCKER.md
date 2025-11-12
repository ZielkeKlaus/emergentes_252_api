# ==================================
# SCRIPTS ÚTEIS PARA DOCKER
# ==================================
# Copie e cole os comandos conforme necessário

# ------------------------------------
# 1. INICIAR AMBIENTE COMPLETO
# ------------------------------------
docker-compose up --build -d

# ------------------------------------
# 2. VER CONTAINERS RODANDO
# ------------------------------------
docker ps

# ------------------------------------
# 3. VER LOGS EM TEMPO REAL
# ------------------------------------
# Todos os containers
docker-compose logs -f

# Apenas backend
docker logs -f cursos_backend

# Apenas database
docker logs -f cursos_database

# Apenas frontend
docker logs -f cursos_frontend

# ------------------------------------
# 4. PARAR CONTAINERS
# ------------------------------------
docker-compose down

# Parar e remover volumes (CUIDADO!)
docker-compose down -v

# ------------------------------------
# 5. REINICIAR CONTAINERS
# ------------------------------------
# Todos
docker-compose restart

# Apenas um serviço
docker-compose restart backend

# ------------------------------------
# 6. RECONSTRUIR APENAS UM SERVIÇO
# ------------------------------------
docker-compose up -d --build backend
docker-compose up -d --build frontend

# ------------------------------------
# 7. ENTRAR EM UM CONTAINER
# ------------------------------------
# Backend
docker exec -it cursos_backend sh

# Database (PostgreSQL)
docker exec -it cursos_database psql -U cursosuser -d cursosdb

# Frontend (Nginx)
docker exec -it cursos_frontend sh

# ------------------------------------
# 8. POPULAR BANCO DE DADOS
# ------------------------------------
# Via PowerShell
$body = @{} | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3001/setup/criar-primeiro-admin" -Method Post -Body $body -ContentType "application/json"
Invoke-RestMethod -Uri "http://localhost:3001/setup/popular-dados" -Method Post -Body $body -ContentType "application/json"

# ------------------------------------
# 9. VERIFICAR SAÚDE DOS CONTAINERS
# ------------------------------------
docker inspect cursos_backend --format='{{.State.Health.Status}}'
docker inspect cursos_database --format='{{.State.Health.Status}}'
docker inspect cursos_frontend --format='{{.State.Health.Status}}'

# ------------------------------------
# 10. LIMPAR TUDO (RESET COMPLETO)
# ------------------------------------
docker-compose down -v
docker system prune -a -f
docker volume prune -f

# ------------------------------------
# 11. BACKUP DO VOLUME DE DADOS
# ------------------------------------
docker run --rm -v cursos_postgres_data:/data -v ${PWD}:/backup alpine tar czf /backup/backup-$(date +%Y%m%d).tar.gz /data

# ------------------------------------
# 12. VER INFORMAÇÕES DOS VOLUMES
# ------------------------------------
docker volume ls
docker volume inspect cursos_postgres_data

# ------------------------------------
# 13. VER REDES DOCKER
# ------------------------------------
docker network ls
docker network inspect cursos_network

# ------------------------------------
# 14. VERIFICAR USO DE RECURSOS
# ------------------------------------
docker stats

# ------------------------------------
# 15. EXECUTAR COMANDO NO BACKEND
# ------------------------------------
# Exemplo: rodar migrations manualmente
docker exec -it cursos_backend npx prisma migrate deploy

# Exemplo: ver estrutura do banco
docker exec -it cursos_backend npx prisma studio

# ------------------------------------
# ATALHOS ÚTEIS
# ------------------------------------

# Iniciar rápido
alias docker-start='docker-compose up -d'

# Ver logs
alias docker-logs='docker-compose logs -f'

# Parar
alias docker-stop='docker-compose down'

# Status
alias docker-status='docker ps'
