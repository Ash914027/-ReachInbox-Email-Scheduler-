import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        <button
          className="google-login"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          <img src="/google.svg" />
          Login with Google
        </button>

        <div className="divider">or sign in through email</div>

        <input placeholder="Email ID" />
        <input type="password" placeholder="Password" />

        <button className="login-btn">Login</button>
      </div>
    </main>
  )
}
