import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api, enroll } from '../api'

export default function CourseDetails(){
  const { id } = useParams()
  const [curso, setCurso] = useState<any>(null)
  const [avaliacoes, setAvaliacoes] = useState<any[]>([])
  const [nota, setNota] = useState(5)
  const [comentario, setComentario] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [jaMatriculado, setJaMatriculado] = useState(false)
  const [verificandoMatricula, setVerificandoMatricula] = useState(true)

  useEffect(() => {
    if (!id) return
    api.get(`/cursos/${id}`).then(r => setCurso(r.data)).catch(console.error)
    carregarAvaliacoes()
    verificarMatricula()
  }, [id])

  async function verificarMatricula() {
    const token = localStorage.getItem('token')
    const usuarioId = localStorage.getItem('userId')
    
    if (!token || !usuarioId || !id) {
      setVerificandoMatricula(false)
      return
    }

    try {
      // Buscar todas as matrículas do usuário
      const response = await api.get('/matriculas', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      // Verificar se já está matriculado neste curso
      const matriculaExiste = response.data.some((m: any) => 
        m.alunoId === usuarioId && m.cursoId === Number(id)
      )
      
      setJaMatriculado(matriculaExiste)
    } catch (error) {
      console.error('Erro ao verificar matrícula:', error)
    } finally {
      setVerificandoMatricula(false)
    }
  }

  function carregarAvaliacoes() {
    if (!id) return
    api.get(`/avaliacoes/curso/${id}`).then(r => setAvaliacoes(r.data)).catch(console.error)
  }

  async function handleEnroll(){
    const token = localStorage.getItem('token')
    if (!token) { alert('Faça login antes de matricular') ; return }
    const usuarioId = localStorage.getItem('userId')
    if (!usuarioId) { alert('Usuário não encontrado. Faça login novamente.'); return }
    
    if (jaMatriculado) {
      alert('Você já está matriculado neste curso!')
      return
    }
    
    try{
      await enroll({ alunoId: usuarioId, cursoId: Number(id) })
      alert('Matriculado com sucesso!')
      setJaMatriculado(true)
    }catch(e:any){
      alert(e?.response?.data?.erro || 'Erro ao matricular')
    }
  }

  async function handleAvaliar(e: any) {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) { alert('Faça login antes de avaliar'); return }
    const usuarioId = localStorage.getItem('userId')
    if (!usuarioId) { alert('Usuário não encontrado. Faça login novamente.'); return }
    
    try {
      await api.post('/avaliacoes', {
        alunoId: usuarioId,
        cursoId: Number(id),
        nota: Number(nota),
        comentario: comentario.trim() || null
      })
      setMensagem('Avaliação enviada com sucesso!')
      setComentario('')
      setNota(5)
      carregarAvaliacoes()
      setTimeout(() => setMensagem(''), 3000)
    } catch (e: any) {
      alert(e?.response?.data?.erro || 'Erro ao avaliar')
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
            {verificandoMatricula ? (
              <div className="text-gray-500">Verificando matrícula...</div>
            ) : jaMatriculado ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                ✅ Você já está matriculado neste curso!
              </div>
            ) : (
              <button onClick={handleEnroll} className="bg-primary text-white px-4 py-2 rounded hover:opacity-90">
                Matricular-se
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Avaliações */}
      <div className="card mt-8">
        <div className="card-header">
          <h3 className="text-xl font-semibold">Avaliações</h3>
        </div>
        <div className="card-body">
          {/* Formulário de avaliação */}
          <form onSubmit={handleAvaliar} className="mb-6 pb-6 border-b">
            <h4 className="font-semibold mb-3">Deixe sua avaliação</h4>
            <div className="mb-3">
              <label className="block text-sm mb-1">Nota (0-10)</label>
              <input 
                type="number" 
                min="0" 
                max="10" 
                value={nota} 
                onChange={e => setNota(Number(e.target.value))}
                className="w-32 border rounded px-3 py-2"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm mb-1">Comentário (opcional)</label>
              <textarea 
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                className="w-full border rounded px-3 py-2"
                rows={3}
                placeholder="Conte sua experiência com este curso..."
              />
            </div>
            <button type="submit" className="bg-success text-white px-4 py-2 rounded hover:opacity-90">
              Enviar Avaliação
            </button>
            {mensagem && <div className="mt-3 text-green-600">{mensagem}</div>}
          </form>

          {/* Lista de avaliações */}
          {avaliacoes.length === 0 ? (
            <div className="text-gray-500">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</div>
          ) : (
            <div className="space-y-4">
              {avaliacoes.map(av => (
                <div key={av.id} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold">{av.aluno?.nome || 'Aluno'}</div>
                    <div className="text-primary font-bold">Nota: {av.nota}/10</div>
                  </div>
                  {av.comentario && (
                    <p className="text-gray-700">{av.comentario}</p>
                  )}
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(av.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
