"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
const usuarioSchema = zod_1.z.object({
    nome: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    senha: zod_1.z.string(),
    tipo: zod_1.z.string().optional(),
    cidade: zod_1.z.string().optional()
});
function validaSenha(senha) {
    const mensa = [];
    if (senha.length < 8)
        mensa.push("Senha mínima 8 caracteres");
    let pequenas = 0, grandes = 0, numeros = 0, simbolos = 0;
    for (const letra of senha) {
        if ((/[a-z]/).test(letra))
            pequenas++;
        else if ((/[A-Z]/).test(letra))
            grandes++;
        else if ((/[0-9]/).test(letra))
            numeros++;
        else
            simbolos++;
    }
    if (pequenas == 0)
        mensa.push("falta letra minúscula");
    if (grandes == 0)
        mensa.push("falta letra maiúscula");
    if (numeros == 0)
        mensa.push("falta número");
    if (simbolos == 0)
        mensa.push("falta símbolo");
    return mensa;
}
router.get("/", async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.post("/", async (req, res) => {
    const valida = usuarioSchema.safeParse(req.body);
    if (!valida.success)
        return res.status(400).json({ erro: valida.error });
    const erros = validaSenha(valida.data.senha);
    if (erros.length > 0)
        return res.status(400).json({ erro: erros.join('; ') });
    const salt = bcrypt_1.default.genSaltSync(12);
    const hash = bcrypt_1.default.hashSync(valida.data.senha, salt);
    try {
        const usuario = await prisma.usuario.create({ data: { nome: valida.data.nome, email: valida.data.email, senha: hash, tipo: valida.data.tipo || 'aluno', cidade: valida.data.cidade || null } });
        res.status(201).json(usuario);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const usuario = await prisma.usuario.findUnique({ where: { id } });
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.default = router;
