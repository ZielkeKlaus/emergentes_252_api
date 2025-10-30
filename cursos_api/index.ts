import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

import routesCategorias from './routes/categorias'
import routesCursos from './routes/cursos'
import routesUsuarios from './routes/usuarios'
import routesUsuariosLogin from './routes/usuariosLogin'
import routesMatriculas from './routes/matriculas'
import routesAvaliacoes from './routes/avaliacoes'
import routesAdmins from './routes/admins'
import routesAdminLogin from './routes/adminLogin'
import routesDashboard from './routes/dashboard'
import routesReset from './routes/reset'

const app = express()
const port = process.env.PORT || 3001
const prisma = new PrismaClient()

// Startup checks (do not print secrets)
if (!process.env.DATABASE_URL) {
	console.warn('Aviso: DATABASE_URL não definida no ambiente. O acesso ao banco provavelmente falhará.')
}

app.use(express.json())
app.use(cors())

app.use('/categorias', routesCategorias)
app.use('/cursos', routesCursos)
app.use('/usuarios/login', routesUsuariosLogin)
app.use('/usuarios', routesUsuarios)
app.use('/matriculas', routesMatriculas)
app.use('/avaliacoes', routesAvaliacoes)
app.use('/admins/login', routesAdminLogin)
app.use('/admins', routesAdmins)
app.use('/dashboard', routesDashboard)
app.use('/reset', routesReset)

app.get('/', (req, res) => res.send('API: Cursos Academy'))

// Health endpoint to check DB connectivity
app.get('/health/db', async (req, res) => {
	try {
		// simple query to verify DB connectivity
		// use raw query to avoid depending on model state
		await prisma.$queryRaw`SELECT 1`
		res.status(200).json({ ok: true })
	} catch (err) {
		console.error('Health DB check failed:', err)
		res.status(500).json({ ok: false, error: 'DB connection failed' })
	}
})

app.listen(port, () => console.log(`Servidor Cursos API rodando na porta ${port}`))
