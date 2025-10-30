import React, { useEffect, useState } from 'react'
import { listCourses } from '../api'
import { Link } from 'react-router-dom'

export default function Courses() {
  const [cursos, setCursos] = useState<any[]>([])
  const [cursosFiltrados, setCursosFiltrados] = useState<any[]>([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    listCourses().then(data => {
      setCursos(data)
      setCursosFiltrados(data)
    }).catch(console.error)
  }, [])

  useEffect(() => {
    if (busca.trim() === '') {
      setCursosFiltrados(cursos)
    } else {
      const termo = busca.toLowerCase()
      const filtrados = cursos.filter(c => 
        c.titulo?.toLowerCase().includes(termo) ||
        c.descricao?.toLowerCase().includes(termo) ||
        c.categoria?.nome?.toLowerCase().includes(termo) ||
        c.instrutor?.nome?.toLowerCase().includes(termo)
      )
      setCursosFiltrados(filtrados)
    }
  }, [busca, cursos])

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Cursos Disponíveis</h1>
        <div className="w-36 h-1 bg-primary mx-auto mt-3 rounded"></div>
      </div>

      {/* Campo de busca */}
      <div className="mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Buscar por curso, categoria ou instrutor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {busca && (
          <button
            onClick={() => setBusca('')}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Limpar
          </button>
        )}
      </div>

      {cursosFiltrados.length === 0 && busca && (
        <div className="text-center py-8 text-gray-500">
          Nenhum curso encontrado para "{busca}"
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cursosFiltrados.map(c => (
          <div key={c.id} className="card">
            <div className="card-header">
              <img src={c.imagem || `/assets/course-${(c.titulo||'react').toString().toLowerCase().includes('node')? 'node': c.titulo?.toString().toLowerCase().includes('html')? 'html':'react'}.svg`} alt={c.titulo} className="w-full h-40 object-cover" />
            </div>
            <div className="card-body">
              <h3 className="text-lg font-semibold mb-2">{c.titulo}</h3>
              <p className="text-sm text-gray-600 mb-4">{c.descricao?.slice(0,120)}{c.descricao && c.descricao.length>120? '...':''}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">{c.cargaHoraria}h</div>
                <Link to={`/cursos/${c.id}`} className="bg-primary text-white px-4 py-2 rounded hover:opacity-90">Ver Detalhes</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
