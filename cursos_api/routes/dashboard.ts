import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

router.get("/gerais", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.count()
    const cursos = await prisma.curso.count()
    const matriculas = await prisma.matricula.count()
    res.status(200).json({ usuarios, cursos, matriculas })
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
