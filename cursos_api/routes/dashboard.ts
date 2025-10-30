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

router.get("/cursosPorCategoria", async (req, res) => {
  try {
    const dados = await prisma.categoria.findMany({
      select: {
        nome: true,
        _count: {
          select: { cursos: true }
        }
      }
    })
    
    const resultado = dados.map(cat => ({
      categoria: cat.nome,
      total: cat._count.cursos
    }))
    
    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.get("/usuariosPorCidade", async (req, res) => {
  try {
    const dados = await prisma.usuario.groupBy({
      by: ['cidade'],
      _count: {
        cidade: true
      },
      orderBy: {
        _count: {
          cidade: 'desc'
        }
      }
    })
    
    const resultado = dados.map(item => ({
      cidade: item.cidade,
      total: item._count.cidade
    }))
    
    res.status(200).json(resultado)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router
