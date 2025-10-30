import React, { useEffect, useState } from 'react'
import { listCourses, api } from '../api'
import { Link } from 'react-router-dom'

interface Categoria {
  id: number
  nome: string
}

export default function Courses() {
  const [cursos, setCursos] = useState<any[]>([])
  const [cursosFiltrados, setCursosFiltrados] = useState<any[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<number | null>(null)

  useEffect(() => {
    // Carregar cursos
    listCourses().then(data => {
      setCursos(data)
      setCursosFiltrados(data)
    }).catch(console.error)

    // Carregar categorias
    api.get('/categorias').then(res => {
      setCategorias(res.data)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    let resultados = cursos

    // Filtrar por busca
    if (busca.trim() !== '') {
      const termo = busca.toLowerCase()
      resultados = resultados.filter(c => 
        c.titulo?.toLowerCase().includes(termo) ||
        c.descricao?.toLowerCase().includes(termo) ||
        c.categoria?.nome?.toLowerCase().includes(termo) ||
        c.instrutor?.nome?.toLowerCase().includes(termo)
      )
    }

    // Filtrar por categoria
    if (categoriaFiltro !== null) {
      resultados = resultados.filter(c => c.categoria?.id === categoriaFiltro)
    }

    setCursosFiltrados(resultados)
  }, [busca, categoriaFiltro, cursos])

  function limparFiltros() {
    setBusca('')
    setCategoriaFiltro(null)
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Cursos Disponíveis</h1>
        <div className="w-36 h-1 bg-primary mx-auto mt-3 rounded"></div>
      </div>

      {/* Barra de filtros */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Campo de busca */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Buscar por curso, categoria ou instrutor..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Filtro por categoria */}
          <div className="md:w-64">
            <select
              value={categoriaFiltro === null ? '' : categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value === '' ? null : Number(e.target.value))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
            >
              <option value="">📚 Todas as Categorias</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          {/* Botão limpar filtros */}
          {(busca || categoriaFiltro !== null) && (
            <button
              onClick={limparFiltros}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition whitespace-nowrap"
            >
              ✕ Limpar Filtros
            </button>
          )}
        </div>

        {/* Info de resultados */}
        <div className="mt-4 text-sm text-gray-600">
          {cursosFiltrados.length === cursos.length ? (
            <span>Mostrando todos os <strong>{cursos.length}</strong> cursos</span>
          ) : (
            <span>Encontrados <strong>{cursosFiltrados.length}</strong> de <strong>{cursos.length}</strong> cursos</span>
          )}
          {categoriaFiltro !== null && (
            <span className="ml-2">
              • Categoria: <strong>{categorias.find(c => c.id === categoriaFiltro)?.nome}</strong>
            </span>
          )}
        </div>
      </div>

      {cursosFiltrados.length === 0 && (busca || categoriaFiltro !== null) && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum curso encontrado</h3>
          <p className="text-gray-500 mb-4">
            Tente ajustar os filtros ou limpar a busca
          </p>
          <button
            onClick={limparFiltros}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90"
          >
            Ver todos os cursos
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cursosFiltrados.map(c => (
          <div key={c.id} className="card hover:shadow-xl transition-shadow">
            <div className="card-header relative">
              <img src={c.imagem || `/assets/course-${(c.titulo||'react').toString().toLowerCase().includes('node')? 'node': c.titulo?.toString().toLowerCase().includes('html')? 'html':'react'}.svg`} alt={c.titulo} className="w-full h-40 object-cover" />
              {/* Badge da categoria */}
              {c.categoria && (
                <span className="absolute top-3 right-3 bg-brand text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {c.categoria.nome}
                </span>
              )}
            </div>
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">{c.titulo}</h3>
              <p className="text-sm text-gray-600 mb-3">{c.descricao?.slice(0,120)}{c.descricao && c.descricao.length>120? '...':''}</p>
              
              {/* Informações do curso */}
              <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  ⏱️ {c.cargaHoraria}h
                </span>
                {c.instrutor && (
                  <span className="flex items-center gap-1">
                    👨‍🏫 {c.instrutor.nome}
                  </span>
                )}
              </div>

              <Link to={`/cursos/${c.id}`} className="block w-full text-center bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
