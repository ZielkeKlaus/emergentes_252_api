import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import routesCategorias from './routes/categorias'
import routesCursos from './routes/cursos'
import routesUsuarios from './routes/usuarios'
import routesUsuariosLogin from './routes/usuariosLogin'
import routesMatriculas from './routes/matriculas'
import routesAvaliacoes from './routes/avaliacoes'
import routesAdmins from './routes/admins'
import routesAdminLogin from './routes/adminLogin'
import routesDashboard from './routes/dashboard'

const app = express()
const port = process.env.PORT || 3001

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

app.get('/', (req, res) => res.send('API: Cursos Academy'))

app.listen(port, () => console.log(`Servidor Cursos API rodando na porta ${port}`))
