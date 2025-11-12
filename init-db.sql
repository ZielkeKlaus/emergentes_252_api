-- ==================================
-- SCRIPT DE INICIALIZAÇÃO DO BANCO DE DADOS
-- ==================================
-- Este arquivo é executado automaticamente quando o container
-- do PostgreSQL é criado pela primeira vez.
-- ==================================

-- Configurar encoding
SET client_encoding = 'UTF8';

-- Mensagem de log
DO $$
BEGIN
    RAISE NOTICE 'Banco de dados inicializado com sucesso!';
    RAISE NOTICE 'Schema será criado via Prisma Migrate.';
END $$;

-- Nota: As tabelas serão criadas automaticamente pelo Prisma
-- através do comando "npx prisma migrate deploy" executado
-- no container do backend.
