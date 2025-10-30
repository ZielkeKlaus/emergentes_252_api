import React, { useState } from 'react'
import { registerUser, loginUser, setToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const nav = useNavigate()

  async function submit(e: any) {
    e.preventDefault()
    try {
      await registerUser({ nome, email, senha })
      // auto login
      const r = await loginUser({ email, senha })
      setToken(r.token)
      nav('/')
    } catch (err: any) {
      alert(err?.response?.data?.erro || 'Erro')
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
          <button type="submit" className="w-full bg-success text-white py-2 rounded">Cadastrar</button>
        </form>
      </div>
    </div>
  )
}
