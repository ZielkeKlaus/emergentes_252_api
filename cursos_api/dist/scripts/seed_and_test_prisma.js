"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
async function main() {
    const prisma = new client_1.PrismaClient();
    console.log('Criando usuário instrutor...');
    const instrutor = await prisma.usuario.create({ data: { nome: 'Instrutor Prisma', email: `instrutor@prisma.${Date.now()}`, senha: 'hashmock', tipo: 'instrutor' } });
    console.log('Instrutor id:', instrutor.id);
    console.log('Criando usuário aluno...');
    const aluno = await prisma.usuario.create({ data: { nome: 'Aluno Prisma', email: `aluno@prisma.${Date.now()}`, senha: 'hashmock', tipo: 'aluno' } });
    console.log('Aluno id:', aluno.id);
    console.log('Criando categoria...');
    const categoria = await prisma.categoria.create({ data: { nome: 'Testes Prisma' } });
    console.log('Categoria id:', categoria.id);
    console.log('Criando curso...');
    const curso = await prisma.curso.create({ data: { titulo: 'Curso Prisma', descricao: 'Descricao', cargaHoraria: 10, categoriaId: categoria.id, instrutorId: instrutor.id, imagem: '/assets/course-react.svg' } });
    console.log('Curso id:', curso.id);
    console.log('Criando matricula...');
    const matricula = await prisma.matricula.create({ data: { alunoId: aluno.id, cursoId: curso.id } });
    console.log('Matricula id:', matricula.id);
    await prisma.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
