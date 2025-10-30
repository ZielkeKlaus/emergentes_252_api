import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  console.log('POST /usuarios/login - Requisição recebida')
  console.log('Body:', req.body)
  
  const { email, senha } = req.body
  const mensaPadrao = "Login ou senha incorretos"
  
  if (!email || !senha) {
    console.log('Erro: Email ou senha não fornecidos')
    return res.status(400).json({ erro: mensaPadrao })
  }

  try {
    console.log('Buscando usuário:', email)
    const usuario = await prisma.usuario.findFirst({ where: { email } })
    
    if (usuario == null) {
      console.log('Erro: Usuário não encontrado')
      return res.status(400).json({ erro: mensaPadrao })
    }

    console.log('Usuário encontrado, comparando senhas...')
    if (bcrypt.compareSync(senha, usuario.senha)) {
      console.log('Senha correta! Gerando token...')
      const token = jwt.sign({ userLogadoId: usuario.id, userLogadoNome: usuario.nome }, process.env.JWT_KEY as string, { expiresIn: "1h" })
      console.log('Login bem-sucedido para:', email)
      res.status(200).json({ id: usuario.id, nome: usuario.nome, email: usuario.email, token })
    } else {
      console.log('Erro: Senha incorreta')
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    console.error('Erro no login:', error)
    res.status(400).json(error)
  }
})

export default router
