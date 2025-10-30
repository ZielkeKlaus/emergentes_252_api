"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.get("/gerais", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.count();
        const cursos = await prisma.curso.count();
        const matriculas = await prisma.matricula.count();
        res.status(200).json({ usuarios, cursos, matriculas });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
