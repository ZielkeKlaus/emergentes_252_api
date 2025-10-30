"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const cursoSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(3),
    descricao: zod_1.z.string().min(10),
    cargaHoraria: zod_1.z.number().int(),
    categoriaId: zod_1.z.number().int(),
    instrutorId: zod_1.z.string().uuid(),
    imagem: zod_1.z.string().url().optional()
});
router.get("/", async (req, res) => {
    try {
        const cursos = await prisma.curso.findMany({ include: { categoria: true, instrutor: true }, orderBy: { id: 'desc' } });
        res.status(200).json(cursos);
    }
    catch (error) {
        console.error('GET /cursos erro:', error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await prisma.curso.findUnique({ where: { id: Number(id) }, include: { categoria: true, instrutor: true } });
        res.status(200).json(curso);
    }
    catch (error) {
        console.error(`GET /cursos/${id} erro:`, error);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
});
router.post("/", async (req, res) => {
    const valida = cursoSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    try {
        const curso = await prisma.curso.create({ data: valida.data });
        res.status(201).json(curso);
    }
    catch (error) {
        console.error('POST /cursos erro:', error);
        res.status(400).json({ erro: 'Erro ao criar curso' });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const valida = cursoSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    try {
        const curso = await prisma.curso.update({ where: { id: Number(id) }, data: valida.data });
        res.status(200).json(curso);
    }
    catch (error) {
        console.error(`PUT /cursos/${id} erro:`, error);
        res.status(400).json({ erro: 'Erro ao atualizar curso' });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const curso = await prisma.curso.delete({ where: { id: Number(id) } });
        res.status(200).json(curso);
    }
    catch (error) {
        console.error(`DELETE /cursos/${id} erro:`, error);
        res.status(400).json({ erro: 'Erro ao deletar curso' });
    }
});
exports.default = router;
