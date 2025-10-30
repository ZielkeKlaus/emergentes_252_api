import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, setToken } from '../api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const nav = useNavigate()

  async function submit(e: any) {
    e.preventDefault()
    console.log('Tentando fazer login...')
    console.log('API Base:', import.meta.env.VITE_API_BASE || 'http://localhost:3001')
    try {
      const res = await loginUser({ email, senha })
      console.log('Login bem-sucedido:', res)
      // res should include token
      setToken(res.token)
      localStorage.setItem('userNome', res.nome)
      nav('/')
    } catch (err: any) {
      console.error('Erro no login:', err)
      setErro(err?.response?.data?.erro || 'Erro no login')
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md mt-12 p-8">
        <h2 className="text-center text-2xl mb-6">Login</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Senha</label>
            <input className="w-full border rounded px-3 py-2" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded">Entrar</button>
          {erro && <div className="text-red-600 mt-3">{erro}</div>}
        </form>
      </div>
    </div>
  )
}
