"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const verificaToken_1 = require("../middewares/verificaToken");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const adminSchema = zod_1.z.object({ nome: zod_1.z.string().min(5), email: zod_1.z.string().email(), senha: zod_1.z.string(), nivel: zod_1.z.number().min(1).max(5) });
router.get("/", async (req, res) => {
    try {
        const admins = await prisma.admin.findMany();
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.post("/", verificaToken_1.verificaToken, async (req, res) => {
    const valida = adminSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    const salt = bcrypt_1.default.genSaltSync(12);
    const hash = bcrypt_1.default.hashSync(valida.data.senha, salt);
    try {
        const admin = await prisma.admin.create({ data: { nome: valida.data.nome, email: valida.data.email, senha: hash, nivel: valida.data.nivel } });
        res.status(201).json(admin);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get(":id", async (req, res) => {
    const { id } = req.params;
    try {
        const admin = await prisma.admin.findUnique({ where: { id } });
        res.status(200).json(admin);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
