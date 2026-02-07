import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Sign in to your Reachbox account</p>
        <input placeholder="Email ID" /> <input type="password" placeholder="Password" /> <button className="login-btn">Login</button>
        <button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="login-btn google"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.4 9.3 3.2l6.9-6.9C36.6 2.7 30.6 0 24 0 14.7 0 6.9 4.9 3 12.1l7.9 6.1C12.8 13.1 18 9.5 24 9.5z"/>
              <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8h12.7c-.6 3.2-2.5 5.9-5.3 7.7l8.1 6.3C43.9 38.3 46.5 32.6 46.5 24.5z"/>
              <path fill="#4A90E2" d="M10.9 28.6A14.8 14.8 0 0 1 9.5 24.5c0-1.9.3-3.7.9-5.4L3 12.9C1.1 15.9 0 19.6 0 24.5c0 4.8 1.1 8.7 3 11.6l7.9-7.5z"/>
              <path fill="#FBBC05" d="M24 48c6.6 0 12.6-2.2 17-5.9l-8.1-6.3c-2.3 1.5-5.2 2.4-8.9 2.4-6 0-11.2-3.6-13-8.7L3 35.6C6.9 43.7 14.7 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            <span>Sign in with Google</span>
          </span>
        </button>

      
      </div>
    </div>
  )
}
