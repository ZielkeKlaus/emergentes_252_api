import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseDetails from './pages/CourseDetails'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'
import AdminCursos from './pages/AdminCursos'
import AdminCategorias from './pages/AdminCategorias'
import AdminUsuarios from './pages/AdminUsuarios'
import AdminMatriculas from './pages/AdminMatriculas'
import AdminAvaliacoes from './pages/AdminAvaliacoes'
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
      <Routes>
        {/* Rotas do Admin - DEVEM VIR PRIMEIRO */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="cursos" element={<AdminCursos />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="matriculas" element={<AdminMatriculas />} />
          <Route path="avaliacoes" element={<AdminAvaliacoes />} />
        </Route>
        
        {/* Rotas Públicas */}
        <Route path="/" element={
          <>
            <Header />
            <main className="container py-12">
              <Courses />
            </main>
            <footer className="bg-gray-100 mt-12 py-6">
              <div className="container text-center text-sm text-gray-600">© 2025 EstudeFácil - Todos os direitos reservados.</div>
            </footer>
          </>
        } />
        
        <Route path="/login" element={
          <>
            <Header />
            <main className="container py-12">
              <Login />
            </main>
            <footer className="bg-gray-100 mt-12 py-6">
              <div className="container text-center text-sm text-gray-600">© 2025 EstudeFácil - Todos os direitos reservados.</div>
            </footer>
          </>
        } />
        
        <Route path="/register" element={
          <>
            <Header />
            <main className="container py-12">
              <Register />
            </main>
            <footer className="bg-gray-100 mt-12 py-6">
              <div className="container text-center text-sm text-gray-600">© 2025 EstudeFácil - Todos os direitos reservados.</div>
            </footer>
          </>
        } />
        
        <Route path="/cursos/:id" element={
          <>
            <Header />
            <main className="container py-12">
              <CourseDetails />
            </main>
            <footer className="bg-gray-100 mt-12 py-6">
              <div className="container text-center text-sm text-gray-600">© 2025 EstudeFácil - Todos os direitos reservados.</div>
            </footer>
          </>
        } />
      </Routes>
    </BrowserRouter>
  )
}
