import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3001'

export const api = axios.create({ baseURL: API_BASE })

// Token helpers
export function setToken(token?: string) {
  if (token) {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }
}

// Initialize from storage
const saved = localStorage.getItem('token')
if (saved) setToken(saved)

export async function listCourses() {
  const r = await api.get('/cursos')
  return r.data
}

export async function registerUser(payload: { nome: string, email: string, senha: string, tipo?: string }) {
  const r = await api.post('/usuarios', payload)
  return r.data
}

export async function loginUser(payload: { email: string, senha: string }) {
  const r = await api.post('/usuarios/login', payload)
  // store user id if returned
  if (r.data?.id) localStorage.setItem('userId', r.data.id)
  return r.data
}

export async function enroll(payload: { alunoId: string, cursoId: number }) {
  const r = await api.post('/matriculas', payload)
  return r.data
}
