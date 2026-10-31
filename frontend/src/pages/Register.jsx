function Register({ onNavigate }) {
  return (
    <div className="auth-container">
      <h1>Create Your Account</h1>
      <p>Start your career journey with Diyora AI.</p>

      <form>
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input
          type="password"
          placeholder="Create Password"
          minLength={8}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{' '}
        <button type="button" onClick={() => onNavigate('login')}>
          Login
        </button>
      </p>
    </div>
  )
}

export default Register