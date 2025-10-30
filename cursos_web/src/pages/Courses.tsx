import React, { useEffect, useState } from 'react'
import { listCourses } from '../api'
import { Link } from 'react-router-dom'

export default function Courses() {
  const [cursos, setCursos] = useState<any[]>([])

  useEffect(() => {
    listCourses().then(setCursos).catch(console.error)
  }, [])

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Cursos Disponíveis</h1>
        <div className="w-36 h-1 bg-primary mx-auto mt-3 rounded"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cursos.map(c => (
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
