"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const categoriaSchema = zod_1.z.object({ nome: zod_1.z.string().min(3) });
router.get("/", async (req, res) => {
    try {
        const categorias = await prisma.categoria.findMany();
        res.status(200).json(categorias);
    }
    catch (error) {
        res.status(500).json({ erro: error });
    }
});
router.post("/", async (req, res) => {
    const valida = categoriaSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    try {
        const cat = await prisma.categoria.create({ data: { nome: valida.data.nome } });
        res.status(201).json(cat);
    }
    catch (error) {
        res.status(400).json({ erro: error });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const valida = categoriaSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    try {
        const cat = await prisma.categoria.update({ where: { id: Number(id) }, data: { nome: valida.data.nome } });
        res.status(200).json(cat);
    }
    catch (error) {
        res.status(400).json({ erro: error });
    }
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const cat = await prisma.categoria.delete({ where: { id: Number(id) } });
        res.status(200).json(cat);
    }
    catch (error) {
        res.status(400).json({ erro: error });
    }
});
exports.default = router;
