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
    console.log('POST /usuarios - Body recebido:', req.body);
    const valida = usuarioSchema.safeParse(req.body);
    if (!valida.success) {
        console.log('Erro de validação:', valida.error);
        return res.status(400).json({ erro: valida.error.issues });
    }
    const erros = validaSenha(valida.data.senha);
    if (erros.length > 0) {
        console.log('Erro na senha:', erros);
        return res.status(400).json({ erro: erros.join('; ') });
    }
    const salt = bcrypt_1.default.genSaltSync(12);
    const hash = bcrypt_1.default.hashSync(valida.data.senha, salt);
    try {
        const usuario = await prisma.usuario.create({ data: { nome: valida.data.nome, email: valida.data.email, senha: hash, tipo: valida.data.tipo || 'aluno', cidade: valida.data.cidade || null } });
        console.log('Usuário criado com sucesso:', usuario.id);
        res.status(201).json(usuario);
    }
    catch (error) {
        console.error('Erro ao criar usuário no banco:', error);
        // Verifica se é erro de email duplicado
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(400).json({ erro: 'Este e-mail já está em uso' });
        }
        res.status(400).json({ erro: 'Erro ao criar usuário' });
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
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    console.log('DELETE /usuarios/:id - Deletando usuário:', id);
    try {
        const usuario = await prisma.usuario.delete({ where: { id } });
        console.log('Usuário deletado com sucesso:', usuario.email);
        res.status(200).json({ mensagem: 'Usuário deletado com sucesso', usuario });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(400).json({ erro: 'Erro ao deletar usuário' });
    }
});
exports.default = router;
