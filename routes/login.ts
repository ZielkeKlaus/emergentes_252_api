import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  const { email, senha } = req.body

  // em termos de segurança, o recomendado é exibir uma mensagem padrão
  // a fim de evitar de dar "dicas" sobre o processo de login para hackers
  const mensaPadrao = "Login ou senha incorretos"

  if (!email || !senha) {
    // res.status(400).json({ erro: "Informe e-mail e senha do usuário" })
    res.status(400).json({ erro: mensaPadrao })
    return
  }

  try {
    // Primeiro tenta logar como admin
    const admin = await prisma.admin.findFirst({
      where: { email }
    })

    if (admin) {
      // Verifica a senha do admin
      if (bcrypt.compareSync(senha, admin.senha)) {
        const token = jwt.sign({
          adminLogadoId: admin.id,
          adminLogadoNome: admin.nome,
          tipo: 'admin'
        },
          process.env.JWT_KEY as string,
          { expiresIn: "1h" }
        )

        res.status(200).json({
          id: admin.id,
          nome: admin.nome,
          email: admin.email,
          token,
          tipo: 'admin'
        })
        return
      } else {
        res.status(400).json({ erro: mensaPadrao })
        return
      }
    }

    // Se não for admin, tenta logar como cliente
    const cliente = await prisma.cliente.findFirst({
      where: { email }
    })

    if (cliente == null) {
      // res.status(400).json({ erro: "E-mail inválido" })
      res.status(400).json({ erro: mensaPadrao })
      return
    }

    // se o e-mail existe, faz-se a comparação dos hashs
    if (bcrypt.compareSync(senha, cliente.senha)) {
      // se confere, gera e retorna o token
      const token = jwt.sign({
        clienteLogadoId: cliente.id,
        clienteLogadoNome: cliente.nome,
        tipo: 'cliente'
      },
        process.env.JWT_KEY as string,
        { expiresIn: "1h" }
      )

      res.status(200).json({
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email,
        token,
        tipo: 'cliente'
      })
    } else {
      res.status(400).json({ erro: mensaPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router