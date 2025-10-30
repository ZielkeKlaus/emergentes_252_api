import { PrismaClient } from "@prisma/client"
import { Router } from "express"

const prisma = new PrismaClient()
const router = Router()

// Endpoint para resetar todos os dados (use com cuidado!)
router.post("/all", async (req, res) => {
  try {
    console.log('Resetando banco de dados...')
    
    // Deletar na ordem correta (respeitando foreign keys)
    await prisma.avaliacao.deleteMany()
    console.log('Avaliações deletadas')
    
    await prisma.matricula.deleteMany()
    console.log('Matrículas deletadas')
    
    await prisma.curso.deleteMany()
    console.log('Cursos deletados')
    
    await prisma.usuario.deleteMany()
    console.log('Usuários deletados')
    
    await prisma.categoria.deleteMany()
    console.log('Categorias deletadas')
    
    await prisma.log.deleteMany()
    console.log('Logs deletados')
    
    await prisma.admin.deleteMany()
    console.log('Admins deletados')
    
    res.status(200).json({ 
      mensagem: 'Banco de dados resetado com sucesso',
      detalhes: 'Todas as tabelas foram limpas'
    })
  } catch (error) {
    console.error('Erro ao resetar banco:', error)
    res.status(400).json({ erro: 'Erro ao resetar banco de dados' })
  }
})

export default router
