import React, { useEffect, useState } from 'react'
import { api } from '../api'

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    api.get('/dashboard/gerais')
      .then(r => setStats(r.data))
      .catch(console.error)
  }, [])

  if (!stats) return <div>Carregando...</div>

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-primary mb-2">{stats.usuarios}</div>
          <div className="text-gray-600">Total de Usuários</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-success mb-2">{stats.cursos}</div>
          <div className="text-gray-600">Total de Cursos</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-4xl font-bold text-brand mb-2">{stats.matriculas}</div>
          <div className="text-gray-600">Total de Matrículas</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Bem-vindo ao Painel Administrativo</h2>
        <p className="text-gray-600">
          Use o menu lateral para navegar entre as diferentes seções do sistema.
        </p>
      </div>
    </div>
  )
}
