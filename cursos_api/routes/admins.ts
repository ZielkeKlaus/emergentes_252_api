import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import { z } from 'zod'
import { verificaToken } from '../middewares/verificaToken'

const prisma = new PrismaClient()
const router = Router()

const adminSchema = z.object({ nome: z.string().min(5), email: z.string().email(), senha: z.string(), nivel: z.number().min(1).max(5) })

router.get("/", async (req, res) => {
  try {
    const admins = await prisma.admin.findMany()
    res.status(200).json(admins)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/", verificaToken, async (req, res) => {
  const valida = adminSchema.safeParse(req.body)
  if (!valida.success) return res.status(400).json({ erro: valida.error })

  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(valida.data.senha, salt)

  try {
    const admin = await prisma.admin.create({ data: { nome: valida.data.nome, email: valida.data.email, senha: hash, nivel: valida.data.nivel } })
    res.status(201).json(admin)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get(":id", async (req, res) => {
  const { id } = req.params
  try {
    const admin = await prisma.admin.findUnique({ where: { id } })
    res.status(200).json(admin)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
