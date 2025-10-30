import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const avalSchema = z.object({ alunoId: z.string(), cursoId: z.number(), nota: z.number().min(0).max(10), comentario: z.string().optional() })

router.post("/", async (req, res) => {
  const valida = avalSchema.safeParse(req.body)
  if (!valida.success) return res.status(400).json({ erro: valida.error })

  try {
    const a = await prisma.avaliacao.create({ data: { alunoId: valida.data.alunoId, cursoId: valida.data.cursoId, nota: valida.data.nota, comentario: valida.data.comentario || null } })
    res.status(201).json(a)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/curso/:cursoId", async (req, res) => {
  const { cursoId } = req.params
  try {
    const itens = await prisma.avaliacao.findMany({ where: { cursoId: Number(cursoId) }, include: { aluno: true } })
    res.status(200).json(itens)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/", async (req, res) => {
  try {
    const itens = await prisma.avaliacao.findMany({ include: { aluno: true, curso: true } })
    res.status(200).json(itens)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
