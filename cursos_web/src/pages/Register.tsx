import React, { useState } from 'react'
import { registerUser, loginUser, setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  async function submit(e: any) {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    console.log('=== INICIANDO CADASTRO ===')
    console.log('Dados do formulário:', { nome, email, senha: '***' })
    
    try {
      // Validações básicas
      if (nome.length < 3) {
        throw new Error('Nome deve ter no mínimo 3 caracteres')
      }
      if (!email.includes('@')) {
        throw new Error('Email inválido')
      }
      if (senha.length < 8) {
        throw new Error('Senha deve ter no mínimo 8 caracteres')
      }
      
      console.log('Validações OK. Enviando para API...')
      console.log('API Base:', import.meta.env.VITE_API_BASE || 'http://localhost:3001')
      
      const resultado = await registerUser({ nome, email, senha })
      console.log('Cadastro realizado com sucesso:', resultado)
      
      // auto login
      console.log('Fazendo login automático...')
      const r = await loginUser({ email, senha })
      console.log('Login realizado:', r)
      
      setToken(r.token)
      nav('/')
    } catch (err: any) {
      console.error('=== ERRO NO CADASTRO ===')
      console.error('Erro completo:', err)
      console.error('Resposta do servidor:', err?.response?.data)
      console.error('Status HTTP:', err?.response?.status)
      
      setError(
        err.message || // Nossas validações
        err?.response?.data?.erro || // Erro do backend
        JSON.stringify(err?.response?.data) || // Mostra o erro completo se for um objeto
        'Erro ao criar conta. Verifique os dados e tente novamente.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md mt-12 p-8">
        <h2 className="text-center text-2xl mb-6">Crie sua Conta</h2>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Nome Completo</label>
            <input className="w-full border rounded px-3 py-2" value={nome} onChange={e => setNome(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Senha</label>
            <input className="w-full border rounded px-3 py-2" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
            <div className="text-xs text-gray-600 mt-1">
              A senha deve conter:
              <ul className="list-disc pl-4">
                <li>Mínimo de 8 caracteres</li>
                <li>Pelo menos uma letra minúscula</li>
                <li>Pelo menos uma letra maiúscula</li>
                <li>Pelo menos um número</li>
                <li>Pelo menos um símbolo</li>
              </ul>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-2 rounded ${loading ? 'bg-gray-400' : 'bg-success'} text-white`}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
