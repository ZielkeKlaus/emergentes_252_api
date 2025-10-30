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
    // Primeiro tenta logar como admin
    console.log('Verificando se é admin:', email)
    const admin = await prisma.admin.findFirst({ where: { email } })
    
    if (admin) {
      console.log('Admin encontrado, comparando senhas...')
      if (bcrypt.compareSync(senha, admin.senha)) {
        console.log('Senha correta! Gerando token para admin...')
        const token = jwt.sign({
          adminLogadoId: admin.id,
          adminLogadoNome: admin.nome,
          tipo: 'admin'
        }, process.env.JWT_KEY as string, { expiresIn: "1h" })
        
        console.log('Login de admin bem-sucedido:', email)
        return res.status(200).json({
          id: admin.id,
          nome: admin.nome,
          email: admin.email,
          token,
          tipo: 'admin'
        })
      } else {
        console.log('Erro: Senha incorreta para admin')
        return res.status(400).json({ erro: mensaPadrao })
      }
    }

    // Se não for admin, tenta logar como usuário
    console.log('Buscando usuário:', email)
    const usuario = await prisma.usuario.findFirst({ where: { email } })
    
    if (usuario == null) {
      console.log('Erro: Usuário não encontrado')
      return res.status(400).json({ erro: mensaPadrao })
    }

    console.log('Usuário encontrado, comparando senhas...')
    if (bcrypt.compareSync(senha, usuario.senha)) {
      console.log('Senha correta! Gerando token...')
      const token = jwt.sign({
        userLogadoId: usuario.id,
        userLogadoNome: usuario.nome,
        tipo: 'usuario'
      }, process.env.JWT_KEY as string, { expiresIn: "1h" })
      
      console.log('Login bem-sucedido para:', email)
      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        token,
        tipo: 'usuario'
      })
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
