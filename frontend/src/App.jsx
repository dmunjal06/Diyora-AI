import { useState } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const [page, setPage] = useState(() => {
  const path = window.location.pathname
  const token = localStorage.getItem('access_token')

  if (path === '/dashboard' && !token) {
    window.history.replaceState({}, '', '/')
    return 'login'
  }

  if (path === '/dashboard' && token) return 'dashboard'
  if (path === '/register') return 'register'

  return 'login'
})

  function navigate(nextPage) {
  const paths = {
    login: '/',
    register: '/register',
    dashboard: '/dashboard',
  }

  window.history.pushState({}, '', paths[nextPage] || '/')
  setPage(nextPage)
}

  window.onpopstate = () => {
  const path = window.location.pathname
  const token = localStorage.getItem('access_token')

  if (path === '/dashboard' && !token) {
    window.history.replaceState({}, '', '/')
    setPage('login')
    return
  }

  setPage(
    path === '/register'
      ? 'register'
      : path === '/dashboard'
        ? 'dashboard'
        : 'login'
  )
}

  return page === 'register' ? (
    <Register onNavigate={navigate} />
  ) : page === 'dashboard' ? (
    <Dashboard
  onLogout={() => {
    localStorage.removeItem('access_token')
    navigate('login')
  }}
/>
  ) : (
    <Login onNavigate={navigate} onLoginSuccess={() => navigate('dashboard')} />
  )
}

export default App