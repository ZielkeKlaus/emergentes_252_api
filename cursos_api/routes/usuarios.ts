import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const usuarioSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string(),
  tipo: z.string().optional(),
  cidade: z.string().optional()
})

function validaSenha(senha: string) {
  const mensa: string[] = []
  if (senha.length < 8) mensa.push("Senha mínima 8 caracteres")
  let pequenas = 0, grandes = 0, numeros = 0, simbolos = 0
  for (const letra of senha) {
    if ((/[a-z]/).test(letra)) pequenas++
    else if ((/[A-Z]/).test(letra)) grandes++
    else if ((/[0-9]/).test(letra)) numeros++
    else simbolos++
  }
  if (pequenas == 0) mensa.push("falta letra minúscula")
  if (grandes == 0) mensa.push("falta letra maiúscula")
  if (numeros == 0) mensa.push("falta número")
  if (simbolos == 0) mensa.push("falta símbolo")
  return mensa
}

router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", async (req, res) => {
  console.log('POST /usuarios - Body recebido:', req.body)
  
  const valida = usuarioSchema.safeParse(req.body)
  if (!valida.success) {
    console.log('Erro de validação:', valida.error)
    return res.status(400).json({ erro: valida.error.issues })
  }

  const erros = validaSenha(valida.data.senha)
  if (erros.length > 0) {
    console.log('Erro na senha:', erros)
    return res.status(400).json({ erro: erros.join('; ') })
  }

  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(valida.data.senha, salt)

  try {
    const usuario = await prisma.usuario.create({ data: { nome: valida.data.nome, email: valida.data.email, senha: hash, tipo: valida.data.tipo || 'aluno', cidade: valida.data.cidade || null } })
    console.log('Usuário criado com sucesso:', usuario.id)
    res.status(201).json(usuario)
  } catch (error) {
    console.error('Erro ao criar usuário no banco:', error)
    res.status(400).json({ erro: 'Erro ao criar usuário' })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id } })
    res.status(200).json(usuario)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
