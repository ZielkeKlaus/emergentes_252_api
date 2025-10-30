import React, { useEffect, useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  const [adminNome, setAdminNome] = useState('')
  const nav = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const nome = localStorage.getItem('adminNome')
    if (!token) {
      nav('/admin/login')
    } else {
      setAdminNome(nome || 'Admin')
    }
  }, [nav])

  function handleLogout() {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminNome')
    localStorage.removeItem('adminId')
    nav('/admin/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">EstudeFácil</h1>
          <p className="text-sm text-gray-300">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4">
          <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            📊 Dashboard
          </Link>
          <Link to="/admin/cursos" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            📚 Cursos
          </Link>
          <Link to="/admin/categorias" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            🏷️ Categorias
          </Link>
          <Link to="/admin/usuarios" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            👥 Usuários
          </Link>
          <Link to="/admin/matriculas" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            📝 Matrículas
          </Link>
          <Link to="/admin/avaliacoes" className="block py-2 px-4 hover:bg-gray-700 rounded mb-2">
            ⭐ Avaliações
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="mb-2 text-sm">👤 {adminNome}</div>
          <button 
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 rounded"
          >
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-50">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
