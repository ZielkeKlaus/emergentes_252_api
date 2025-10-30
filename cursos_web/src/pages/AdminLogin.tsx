import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const nav = useNavigate()

  async function submit(e: any) {
    e.preventDefault()
    try {
      const res = await api.post('/admins/login', { email, senha })
      localStorage.setItem('adminToken', res.data.token)
      localStorage.setItem('adminNome', res.data.nome)
      localStorage.setItem('adminId', res.data.id)
      nav('/admin/dashboard')
    } catch (err: any) {
      setErro(err?.response?.data?.erro || 'Erro no login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-brand mb-6">Admin - EstudeFácil</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-sm mb-1 font-semibold">Email</label>
            <input 
              type="email"
              className="w-full border rounded px-3 py-2" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1 font-semibold">Senha</label>
            <input 
              type="password"
              className="w-full border rounded px-3 py-2" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className="w-full bg-brand text-white py-3 rounded font-semibold hover:opacity-90">
            Entrar
          </button>
          {erro && <div className="text-red-600 mt-3 text-center">{erro}</div>}
        </form>
      </div>
    </div>
  )
}
