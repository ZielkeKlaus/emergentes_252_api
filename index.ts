import express from 'express'
import cors from 'cors'

import routesMarcas from './routes/marcas'
import routesCarros from './routes/carros'
import routesLogin from './routes/login'
import routesClientes from './routes/clientes'
import routesPropostas from './routes/propostas'
import routesDashboard from './routes/dashboard'
import routesAdminLogin from './routes/adminLogin'
import routesAdmins from './routes/admins'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/marcas", routesMarcas)
app.use("/carros", routesCarros)
app.use("/clientes/login", routesLogin)
app.use("/clientes", routesClientes)
app.use("/propostas", routesPropostas)
app.use("/dashboard", routesDashboard)
app.use("/admins/login", routesAdminLogin)
app.use("/admins", routesAdmins)


app.get('/', (req, res) => {
  res.send('API: Revenda de Veículos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})