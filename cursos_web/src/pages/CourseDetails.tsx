import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, enroll } from '../api'

export default function CourseDetails(){
  const { id } = useParams()
  const [curso, setCurso] = useState<any>(null)

  useEffect(() => {
    if (!id) return
    api.get(`/cursos/${id}`).then(r => setCurso(r.data)).catch(console.error)
  }, [id])

  async function handleEnroll(){
    const token = localStorage.getItem('token')
    if (!token) { alert('Faça login antes de matricular') ; return }
    const usuarioId = localStorage.getItem('userId')
    if (!usuarioId) { alert('Usuário não encontrado. Faça login novamente.'); return }
    try{
      await enroll({ alunoId: usuarioId, cursoId: Number(id) })
      alert('Matriculado com sucesso')
    }catch(e:any){
      alert(e?.response?.data?.erro || 'Erro ao matricular')
    }
  }

  if (!curso) return <div className="text-center py-20">Carregando...</div>

  return (
    <div className="max-w-2xl mx-auto">
      <div className="card">
        <div className="card-header">
          <img src={curso.imagem || '/assets/course-react.svg'} alt={curso.titulo} className="w-full h-48 object-cover mb-4 rounded" />
          <h2 className="text-2xl font-semibold">{curso.titulo}</h2>
        </div>
        <div className="card-body">
          <div className="text-sm text-gray-500 mb-4">⏱ {curso.cargaHoraria} horas • Categoria: {curso.categoria?.nome || '—'} • Instrutor: {curso.instrutor?.nome}</div>
          <p className="text-gray-700 mb-6">{curso.descricao}</p>

          <div className="border-t pt-4">
            <button onClick={handleEnroll} className="bg-primary text-white px-4 py-2 rounded">Matricular</button>
          </div>
        </div>
      </div>
    </div>
  )
}
