"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    const { email, senha } = req.body;
    const mensaPadrao = "Login ou senha incorretos";
    if (!email || !senha)
        return res.status(400).json({ erro: mensaPadrao });
    try {
        const admin = await prisma.admin.findFirst({ where: { email } });
        if (admin == null)
            return res.status(400).json({ erro: mensaPadrao });
        if (bcrypt_1.default.compareSync(senha, admin.senha)) {
            const token = jsonwebtoken_1.default.sign({ adminLogadoId: admin.id, adminLogadoNome: admin.nome, adminLogadoNivel: admin.nivel }, process.env.JWT_KEY, { expiresIn: '1h' });
            res.status(200).json({ id: admin.id, nome: admin.nome, email: admin.email, nivel: admin.nivel, token });
        }
        else {
            res.status(400).json({ erro: mensaPadrao });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
