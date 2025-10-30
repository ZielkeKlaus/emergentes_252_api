import React, { useState, useEffect } from 'react'
import { api } from '../api'

interface Matricula {
  id: number
  aluno: {
    id: number
    nome: string
    email: string
  }
  curso: {
    id: number
    titulo: string
  }
  data: string
}

export default function AdminMatriculas() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarMatriculas()
  }, [])

  async function carregarMatriculas() {
    try {
      setLoading(true)
      const adminToken = localStorage.getItem('adminToken')
      const response = await api.get('/matriculas', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      setMatriculas(response.data)
    } catch (error: any) {
      alert('Erro ao carregar matrículas: ' + (error.response?.data?.erro || error.message))
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Matrículas Realizadas</h1>
        <div className="text-sm text-gray-600">Total: {matriculas.length} matrículas</div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matriculas.map((matricula) => (
              <tr key={matricula.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{matricula.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{matricula.aluno.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{matricula.aluno.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{matricula.curso.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(matricula.data).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {matriculas.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhuma matrícula encontrada</div>
        )}
      </div>
    </div>
  )
}
