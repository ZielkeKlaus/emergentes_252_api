import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const router = Router()

// Rota para criar o primeiro admin (SEM autenticação)
router.post("/criar-primeiro-admin", async (req, res) => {
  try {
    // Verificar se já existe algum admin
    const adminExistente = await prisma.admin.findFirst()
    if (adminExistente) {
      return res.status(400).json({ erro: "Já existe um admin no sistema. Use /admins para criar novos." })
    }

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync("Admin@123", salt)

    const admin = await prisma.admin.create({
      data: {
        nome: "Administrador",
        email: "admin@admin.com",
        senha: hash,
        nivel: 5
      }
    })

    res.status(201).json({
      mensagem: "Primeiro admin criado com sucesso!",
      email: "admin@admin.com",
      senha: "Admin@123",
      admin: { id: admin.id, nome: admin.nome, email: admin.email }
    })
  } catch (error) {
    res.status(400).json(error)
  }
})

// Rota para popular o banco com dados de exemplo
router.post("/popular-dados", async (req, res) => {
  try {
    // 1. Criar categorias
    const categorias = await Promise.all([
      prisma.categoria.upsert({
        where: { id: 1 },
        update: {},
        create: { nome: "Programação" }
      }),
      prisma.categoria.upsert({
        where: { id: 2 },
        update: {},
        create: { nome: "Design" }
      }),
      prisma.categoria.upsert({
        where: { id: 3 },
        update: {},
        create: { nome: "Marketing" }
      }),
      prisma.categoria.upsert({
        where: { id: 4 },
        update: {},
        create: { nome: "Negócios" }
      })
    ])

    // 2. Criar instrutores (usuários)
    const salt = bcrypt.genSaltSync(12)
    const senhaHash = bcrypt.hashSync("Senha@123", salt)

    const instrutores = await Promise.all([
      prisma.usuario.upsert({
        where: { email: "joao@instrutor.com" },
        update: {},
        create: {
          nome: "João Silva",
          email: "joao@instrutor.com",
          senha: senhaHash,
          tipo: "instrutor",
          cidade: "São Paulo"
        }
      }),
      prisma.usuario.upsert({
        where: { email: "maria@instrutor.com" },
        update: {},
        create: {
          nome: "Maria Santos",
          email: "maria@instrutor.com",
          senha: senhaHash,
          tipo: "instrutor",
          cidade: "Rio de Janeiro"
        }
      }),
      prisma.usuario.upsert({
        where: { email: "pedro@instrutor.com" },
        update: {},
        create: {
          nome: "Pedro Costa",
          email: "pedro@instrutor.com",
          senha: senhaHash,
          tipo: "instrutor",
          cidade: "Belo Horizonte"
        }
      })
    ])

    // 3. Criar cursos
    const cursos = await Promise.all([
      prisma.curso.upsert({
        where: { id: 1 },
        update: {},
        create: {
          titulo: "React do Zero ao Avançado",
          descricao: "Aprenda React desde o básico até conceitos avançados como Hooks, Context API e Redux.",
          cargaHoraria: 40,
          categoriaId: categorias[0].id,
          instrutorId: instrutores[0].id
        }
      }),
      prisma.curso.upsert({
        where: { id: 2 },
        update: {},
        create: {
          titulo: "Node.js e Express Completo",
          descricao: "Desenvolva APIs REST profissionais com Node.js, Express e banco de dados.",
          cargaHoraria: 35,
          categoriaId: categorias[0].id,
          instrutorId: instrutores[0].id
        }
      }),
      prisma.curso.upsert({
        where: { id: 3 },
        update: {},
        create: {
          titulo: "UI/UX Design Fundamentos",
          descricao: "Aprenda os princípios fundamentais de design de interfaces e experiência do usuário.",
          cargaHoraria: 30,
          categoriaId: categorias[1].id,
          instrutorId: instrutores[1].id
        }
      }),
      prisma.curso.upsert({
        where: { id: 4 },
        update: {},
        create: {
          titulo: "Figma para Iniciantes",
          descricao: "Domine a ferramenta de design mais popular do mercado e crie protótipos incríveis.",
          cargaHoraria: 25,
          categoriaId: categorias[1].id,
          instrutorId: instrutores[1].id
        }
      }),
      prisma.curso.upsert({
        where: { id: 5 },
        update: {},
        create: {
          titulo: "Marketing Digital na Prática",
          descricao: "Estratégias práticas de marketing digital, SEO, redes sociais e Google Ads.",
          cargaHoraria: 45,
          categoriaId: categorias[2].id,
          instrutorId: instrutores[2].id
        }
      }),
      prisma.curso.upsert({
        where: { id: 6 },
        update: {},
        create: {
          titulo: "Gestão de Negócios para Startups",
          descricao: "Aprenda a gerenciar e escalar seu negócio com metodologias ágeis e lean startup.",
          cargaHoraria: 50,
          categoriaId: categorias[3].id,
          instrutorId: instrutores[2].id
        }
      })
    ])

    // 4. Criar alguns usuários alunos de exemplo
    const alunos = await Promise.all([
      prisma.usuario.upsert({
        where: { email: "ana@aluno.com" },
        update: {},
        create: {
          nome: "Ana Oliveira",
          email: "ana@aluno.com",
          senha: senhaHash,
          tipo: "aluno",
          cidade: "Curitiba"
        }
      }),
      prisma.usuario.upsert({
        where: { email: "carlos@aluno.com" },
        update: {},
        create: {
          nome: "Carlos Lima",
          email: "carlos@aluno.com",
          senha: senhaHash,
          tipo: "aluno",
          cidade: "Porto Alegre"
        }
      }),
      prisma.usuario.upsert({
        where: { email: "fernanda@aluno.com" },
        update: {},
        create: {
          nome: "Fernanda Rocha",
          email: "fernanda@aluno.com",
          senha: senhaHash,
          tipo: "aluno",
          cidade: "São Paulo"
        }
      })
    ])

    res.status(200).json({
      mensagem: "Banco de dados populado com sucesso!",
      resumo: {
        categorias: categorias.length,
        instrutores: instrutores.length,
        cursos: cursos.length,
        alunos: alunos.length
      },
      credenciais: {
        instrutor: { email: "joao@instrutor.com", senha: "Senha@123" },
        aluno: { email: "ana@aluno.com", senha: "Senha@123" }
      }
    })
  } catch (error) {
    console.error("Erro ao popular dados:", error)
    res.status(400).json(error)
  }
})

// Rota para adicionar coluna preco (já existe no schema, só valida)
router.post("/add-preco-column", async (req, res) => {
  try {
    // Executar SQL para adicionar coluna se não existir
    await prisma.$executeRaw`ALTER TABLE cursos ADD COLUMN IF NOT EXISTS preco DOUBLE PRECISION`
    
    res.status(200).json({
      mensagem: "Coluna preco adicionada com sucesso (se ainda não existia)!"
    })
  } catch (error) {
    console.error("Erro ao adicionar coluna preco:", error)
    res.status(400).json({ erro: "Erro ao adicionar coluna", detalhes: error })
  }
})

// Rota para atualizar preços dos cursos existentes
router.post("/update-precos", async (req, res) => {
  try {
    // Atualizar cursos com preços padrão
    const cursosAtualizados = await prisma.$transaction([
      prisma.curso.updateMany({
        where: { categoriaId: 1 }, // Programação
        data: { preco: 199.90 }
      }),
      prisma.curso.updateMany({
        where: { categoriaId: 2 }, // Design
        data: { preco: 149.90 }
      }),
      prisma.curso.updateMany({
        where: { categoriaId: 3 }, // Marketing
        data: { preco: 129.90 }
      }),
      prisma.curso.updateMany({
        where: { categoriaId: 4 }, // Negócios
        data: { preco: 179.90 }
      })
    ])
    
    res.status(200).json({
      mensagem: "Preços atualizados com sucesso!",
      cursosAtualizados: cursosAtualizados.reduce((acc, curr) => acc + curr.count, 0)
    })
  } catch (error) {
    console.error("Erro ao atualizar preços:", error)
    res.status(400).json({ erro: "Erro ao atualizar preços", detalhes: error })
  }
})

// Rota para adicionar coluna preco (se não existir)
router.post("/add-preco-column", async (req, res) => {
  try {
    // Executar SQL raw para adicionar a coluna
    await prisma.$executeRaw`ALTER TABLE cursos ADD COLUMN IF NOT EXISTS preco DOUBLE PRECISION`
    
    res.status(200).json({
      mensagem: "Coluna 'preco' adicionada com sucesso (ou já existia)!"
    })
  } catch (error: any) {
    console.error("Erro ao adicionar coluna preco:", error)
    res.status(400).json({ erro: error.message })
  }
})

// Rota para atualizar preços dos cursos existentes
router.post("/update-precos", async (req, res) => {
  try {
    // Definir preços padrão para cursos que não têm preço
    const cursosAtualizados = await prisma.$executeRaw`
      UPDATE cursos 
      SET preco = CASE 
        WHEN id = 1 THEN 299.90
        WHEN id = 2 THEN 349.90
        WHEN id = 3 THEN 199.90
        WHEN id = 4 THEN 149.90
        WHEN id = 5 THEN 399.90
        WHEN id = 6 THEN 449.90
        ELSE 199.90
      END
      WHERE preco IS NULL
    `
    
    res.status(200).json({
      mensagem: "Preços atualizados com sucesso!",
      cursosAtualizados
    })
  } catch (error: any) {
    console.error("Erro ao atualizar preços:", error)
    res.status(400).json({ erro: error.message })
  }
})

export default router
