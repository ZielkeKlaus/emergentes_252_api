import React, { useState, useEffect } from 'react'
import { api } from '../api'

interface Categoria {
  id: number
  nome: string
  _count?: {
    cursos: number
  }
}

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [nome, setNome] = useState('')

  useEffect(() => {
    carregarCategorias()
  }, [])

  async function carregarCategorias() {
    try {
      setLoading(true)
      const adminToken = localStorage.getItem('adminToken')
      const response = await api.get('/categorias', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      setCategorias(response.data)
    } catch (error: any) {
      alert('Erro ao carregar categorias: ' + (error.response?.data?.erro || error.message))
    } finally {
      setLoading(false)
    }
  }

  function abrirModal(categoria?: Categoria) {
    if (categoria) {
      setEditingId(categoria.id)
      setNome(categoria.nome)
    } else {
      setEditingId(null)
      setNome('')
    }
    setShowModal(true)
  }

  function fecharModal() {
    setShowModal(false)
    setEditingId(null)
    setNome('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const adminToken = localStorage.getItem('adminToken')
    const payload = { nome }

    try {
      if (editingId) {
        await api.put(`/categorias/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
        alert('Categoria atualizada com sucesso!')
      } else {
        await api.post('/categorias', payload, {
          headers: { Authorization: `Bearer ${adminToken}` }
        })
        alert('Categoria criada com sucesso!')
      }
      
      fecharModal()
      carregarCategorias()
    } catch (error: any) {
      alert('Erro ao salvar categoria: ' + (error.response?.data?.erro || error.message))
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return

    const adminToken = localStorage.getItem('adminToken')
    try {
      await api.delete(`/categorias/${id}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      alert('Categoria excluída com sucesso!')
      carregarCategorias()
    } catch (error: any) {
      alert('Erro ao excluir categoria: ' + (error.response?.data?.erro || error.message))
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Categorias</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark transition"
        >
          + Nova Categoria
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº Cursos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{categoria.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{categoria.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {categoria._count?.cursos || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => abrirModal(categoria)}
                    className="text-primary hover:text-primary-dark mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {categorias.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhuma categoria cadastrada</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Editar Categoria' : 'Nova Categoria'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                  placeholder="Ex: Programação, Design, Marketing..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-brand text-white py-2 rounded hover:bg-brand-dark transition"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={fecharModal}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
