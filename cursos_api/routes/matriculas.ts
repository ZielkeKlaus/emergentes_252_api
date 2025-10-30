import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const matriculaSchema = z.object({ alunoId: z.string(), cursoId: z.number() })

router.post("/", async (req, res) => {
  const valida = matriculaSchema.safeParse(req.body)
  if (!valida.success) return res.status(400).json({ erro: valida.error })

  try {
    const m = await prisma.matricula.create({ data: { alunoId: valida.data.alunoId, cursoId: valida.data.cursoId } })
    res.status(201).json(m)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/aluno/:alunoId", async (req, res) => {
  const { alunoId } = req.params
  try {
    const placas = await prisma.matricula.findMany({ where: { alunoId }, include: { curso: true } })
    res.status(200).json(placas)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/", async (req, res) => {
  try {
    const itens = await prisma.matricula.findMany({ include: { aluno: true, curso: true } })
    res.status(200).json(itens)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
