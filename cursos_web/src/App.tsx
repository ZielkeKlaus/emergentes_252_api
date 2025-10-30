import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Courses from './pages/Courses'
import Login from './pages/Login'
import Register from './pages/Register'
import CourseDetails from './pages/CourseDetails'

export default function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="text-white font-bold text-xl">EstudeFácil</Link>
          <nav>
            <Link to="/login" className="text-white hover:underline">Login / Cadastrar</Link>
          </nav>
        </div>
      </header>

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
