import React, { useEffect, useState } from 'react'
import { api } from '../api'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Stats {
  usuarios: number
  cursos: number
  matriculas: number
}

interface CursosPorCategoria {
  categoria: string
  total: number
}

interface UsuariosPorCidade {
  cidade: string
  total: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B']

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [cursosPorCategoria, setCursosPorCategoria] = useState<CursosPorCategoria[]>([])
  const [usuariosPorCidade, setUsuariosPorCidade] = useState<UsuariosPorCidade[]>([])
  const adminNome = localStorage.getItem('adminNome')

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      const adminToken = localStorage.getItem('adminToken')
      const headers = { Authorization: `Bearer ${adminToken}` }
      
      const [statsRes, cursosRes, usuariosRes] = await Promise.all([
        api.get('/dashboard/gerais', { headers }),
        api.get('/dashboard/cursosPorCategoria', { headers }),
        api.get('/dashboard/usuariosPorCidade', { headers })
      ])

      setStats(statsRes.data)
      setCursosPorCategoria(cursosRes.data)
      setUsuariosPorCidade(usuariosRes.data)
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      alert('Erro ao carregar dados: ' + (error.response?.data?.erro || error.message))
    }
  }

  if (!stats) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Bem-vindo, {adminNome}!</p>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Usuários</p>
              <p className="text-3xl font-bold text-primary">{stats.usuarios}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Cursos</p>
              <p className="text-3xl font-bold text-green-600">{stats.cursos}</p>
            </div>
            <div className="text-4xl">📚</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Matrículas</p>
              <p className="text-3xl font-bold text-brand">{stats.matriculas}</p>
            </div>
            <div className="text-4xl">📝</div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cursos por Categoria */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Cursos por Categoria</h2>
          {cursosPorCategoria.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cursosPorCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percent }) => `${categoria} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="total"
                >
                  {cursosPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>

        {/* Usuários por Cidade */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Usuários por Cidade</h2>
          {usuariosPorCidade.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorCidade}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cidade" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8b5cf6" name="Usuários" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
          )}
        </div>
      </div>
    </div>
  )
}
