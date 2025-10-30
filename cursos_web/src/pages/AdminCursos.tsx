import React, { useState, useEffect } from 'react'
import { api } from '../api'

interface Categoria {
  id: number
  nome: string
}

interface Instrutor {
  id: number
  nome: string
  email: string
}

interface Curso {
  id: number
  titulo: string
  descricao: string
  cargaHoraria: number
  preco: number
  categoria: Categoria
  instrutor: Instrutor
}

interface CursoForm {
  titulo: string
  descricao: string
  cargaHoraria: string
  preco: string
  categoriaId: string
  instrutorId: string
}

export default function AdminCursos() {
  const [cursos, setCursos] = useState<Curso[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [instrutores, setInstrutores] = useState<Instrutor[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<CursoForm>({
    titulo: '',
    descricao: '',
    cargaHoraria: '',
    preco: '',
    categoriaId: '',
    instrutorId: ''
  })

  useEffect(() => {
    carregarDados()
  }, [])

  async function carregarDados() {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      console.log('Carregando dados...')
      
      // Carregar cursos e categorias (públicos)
      const [cursosRes, categoriasRes] = await Promise.all([
        api.get('/cursos'),
        api.get('/categorias')
      ])
      
      console.log('Cursos:', cursosRes.data)
      console.log('Categorias:', categoriasRes.data)
      
      setCursos(cursosRes.data)
      setCategorias(categoriasRes.data)
      
      // Carregar usuários (precisa autenticação)
      try {
        const usuariosRes = await api.get('/usuarios', { 
          headers: { Authorization: `Bearer ${token}` } 
        })
        console.log('Usuários:', usuariosRes.data)
        
        // Filtrar apenas instrutores
        const instrutoresFiltrados = usuariosRes.data.filter((u: any) => u.tipo === 'instrutor')
        console.log('Instrutores filtrados:', instrutoresFiltrados)
        setInstrutores(instrutoresFiltrados)
      } catch (userError: any) {
        console.error('Erro ao carregar usuários:', userError)
        // Se falhar, deixa lista vazia mas não quebra a página
        setInstrutores([])
      }
      
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      alert('Erro ao carregar dados: ' + (error.response?.data?.erro || error.message))
    } finally {
      setLoading(false)
    }
  }

  function abrirModal(curso?: Curso) {
    if (curso) {
      setEditingId(curso.id)
      setFormData({
        titulo: curso.titulo,
        descricao: curso.descricao,
        cargaHoraria: curso.cargaHoraria.toString(),
        preco: curso.preco.toString(),
        categoriaId: curso.categoria.id.toString(),
        instrutorId: curso.instrutor.id.toString()
      })
    } else {
      setEditingId(null)
      setFormData({
        titulo: '',
        descricao: '',
        cargaHoraria: '',
        preco: '',
        categoriaId: '',
        instrutorId: ''
      })
    }
    setShowModal(true)
  }

  function fecharModal() {
    setShowModal(false)
    setEditingId(null)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const token = localStorage.getItem('token')
    const payload = {
      titulo: formData.titulo,
      descricao: formData.descricao,
      cargaHoraria: parseInt(formData.cargaHoraria),
      preco: parseFloat(formData.preco),
      categoriaId: parseInt(formData.categoriaId),
      instrutorId: parseInt(formData.instrutorId)
    }

    try {
      if (editingId) {
        await api.put(`/cursos/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Curso atualizado com sucesso!')
      } else {
        await api.post('/cursos', payload, {
          headers: { Authorization: `Bearer ${token}` }
        })
        alert('Curso criado com sucesso!')
      }
      
      fecharModal()
      carregarDados()
    } catch (error: any) {
      alert('Erro ao salvar curso: ' + (error.response?.data?.erro || error.message))
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Tem certeza que deseja excluir este curso?')) return

    const token = localStorage.getItem('token')
    try {
      await api.delete(`/cursos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Curso excluído com sucesso!')
      carregarDados()
    } catch (error: any) {
      alert('Erro ao excluir curso: ' + (error.response?.data?.erro || error.message))
    }
  }

  if (loading) {
    return <div className="text-center py-8">Carregando...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gerenciar Cursos</h1>
        <button
          onClick={() => abrirModal()}
          className="bg-brand text-white px-4 py-2 rounded hover:bg-brand-dark transition"
        >
          + Novo Curso
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carga Horária</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instrutor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{curso.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{curso.titulo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{curso.cargaHoraria}h</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  R$ {curso.preco ? curso.preco.toFixed(2) : '0.00'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{curso.categoria.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{curso.instrutor.nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => abrirModal(curso)}
                    className="text-primary hover:text-primary-dark mr-3"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(curso.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {cursos.length === 0 && (
          <div className="text-center py-8 text-gray-500">Nenhum curso cadastrado</div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Editar Curso' : 'Novo Curso'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  rows={3}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Carga Horária (horas)</label>
                <input
                  type="number"
                  value={formData.cargaHoraria}
                  onChange={(e) => setFormData({ ...formData, cargaHoraria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                  min="1"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.preco}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                  min="0"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={formData.categoriaId}
                  onChange={(e) => setFormData({ ...formData, categoriaId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Instrutor</label>
                <select
                  value={formData.instrutorId}
                  onChange={(e) => setFormData({ ...formData, instrutorId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-brand"
                  required
                >
                  <option value="">Selecione um instrutor</option>
                  {instrutores.map((inst) => (
                    <option key={inst.id} value={inst.id}>{inst.nome}</option>
                  ))}
                </select>
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
