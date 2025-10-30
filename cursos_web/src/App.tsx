import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseDetails from './pages/CourseDetails'
import { setToken } from './api'

function Header() {
  const [userNome, setUserNome] = useState<string | null>(null)
  const nav = useNavigate()

  useEffect(() => {
    const nome = localStorage.getItem('userNome')
    setUserNome(nome)
  }, [])

  function handleLogout() {
    setToken()
    localStorage.removeItem('userNome')
    localStorage.removeItem('userId')
    setUserNome(null)
    nav('/')
  }

  return (
    <header className="site-header">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="text-white font-bold text-xl">EstudeFácil</Link>
        <nav className="flex items-center gap-4">
          {userNome ? (
            <>
              <span className="text-white">Olá, {userNome}</span>
              <button onClick={handleLogout} className="text-white hover:underline">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:underline">Login</Link>
              <Link to="/register" className="text-white hover:underline">Cadastrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="container py-12">
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cursos/:id" element={<CourseDetails />} />
        </Routes>
      </main>

      <footer className="bg-gray-100 mt-12 py-6">
        <div className="container text-center text-sm text-gray-600">© 2025 EstudeFácil - Todos os direitos reservados.</div>
      </footer>
    </BrowserRouter>
  )
}
