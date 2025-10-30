import React, { useState, useEffect } from 'react'
import { api } from '../api'

interface Avaliacao {
  id: number
  nota: number
  comentario: string | null
  aluno: {
    id: number
    nome: string
    email: string
  }
  curso: {
    id: number
    titulo: string
  }
  createdAt: string
}

export default function AdminAvaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    carregarAvaliacoes()
  }, [])

  async function carregarAvaliacoes() {
    try {
      setLoading(true)
      const adminToken = localStorage.getItem('adminToken')
      const response = await api.get('/avaliacoes', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      setAvaliacoes(response.data)
    } catch (error: any) {
      alert('Erro ao carregar avaliações: ' + (error.response?.data?.erro || error.message))
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return

    const adminToken = localStorage.getItem('adminToken')
    try {
      await api.delete(`/avaliacoes/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      alert('Avaliação excluída com sucesso!')
      carregarAvaliacoes()
    } catch (error: any) {
      alert('Erro ao excluir avaliação: ' + (error.response?.data?.erro || error.message))
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Avaliações de Cursos</h1>
        <div className="text-sm text-gray-600">Total: {avaliacoes.length} avaliações</div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aluno</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Curso</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comentário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {avaliacoes.map((avaliacao) => (
              <tr key={avaliacao.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{avaliacao.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{avaliacao.aluno.nome}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={avaliacao.curso.titulo}>
                  {avaliacao.curso.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    avaliacao.nota >= 8 ? 'bg-green-100 text-green-800' :
                    avaliacao.nota >= 6 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {avaliacao.nota.toFixed(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <div className="truncate" title={avaliacao.comentario || ''}>
                    {avaliacao.comentario || <span className="text-gray-400 italic">Sem comentário</span>}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(avaliacao.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {avaliacoes.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhuma avaliação encontrada</div>
        )}
      </div>
    </div>
  )
}
