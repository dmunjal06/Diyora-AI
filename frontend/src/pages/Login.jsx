import { useState } from 'react'

function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(event) {
    event.preventDefault()
    setMessage('')
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMessage(data.detail || data.error || 'Login failed.')
        return
      }

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
      }

      setMessage('Login successful!')
      onLoginSuccess()

    } catch {
      setMessage('Cannot connect to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1>Welcome to Diyora AI</h1>
      <p>Know Your Path. Grow With Purpose.</p>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && <p role="status">{message}</p>}

      <p>
        Don't have an account?{' '}
        <button type="button" onClick={() => onNavigate('register')}>
          Register
        </button>
      </p>
    </div>
  )
}

export default Login