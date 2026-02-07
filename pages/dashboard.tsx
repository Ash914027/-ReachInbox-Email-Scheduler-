import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

type Email = {
  id: string
  to: string
  subject: string
  scheduledAt: string
  status: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [scheduled, setScheduled] = useState<Email[]>([])
  const [fileCount, setFileCount] = useState(0)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    fetch('/api/email')
      .then(r => r.json())
      .then(setScheduled)
  }, [])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    Papa.parse(f, {
      complete: res => setFileCount(res.data.length)
    })
  }

  if (status === 'loading') return <p className="muted">Loading...</p>

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="user">
          <img src={session?.user?.image || ''} alt="User avatar" />
          <div>
            <strong>{session?.user?.name}</strong>
            <span>{session?.user?.email}</span>
          </div>
        </div>
        <button
          className="logout-btn"
          onClick={() => signOut({ callbackUrl: '/login' })}
        >
          Logout
        </button>
        <button
          className="compose-btn"
          onClick={() => router.push('/compose')}
        >
          Compose
        </button>

        <nav>
          <a className="active">Scheduled</a>
          <a>Sent</a>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="content">
        <input className="search" placeholder="Search" />

        <div className="email-list">
          {scheduled.length === 0 ? (
            <div className="muted">No scheduled emails</div>
          ) : (
            scheduled.map(s => (
              <div key={s.id} className="email-item">
                <strong>To: {s.to}</strong>
                <span className="badge scheduled">Scheduled</span>
                <p>{s.subject}</p>
                <small>{new Date(s.scheduledAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>

        {/* COMPOSE CARD */}
        <div className="card compose-card">
          <h3>Upload Email List</h3>
          <input
            type="file"
            accept=".csv,.txt"
            className="file-upload"
            onChange={onFile}
          />
          <p className="muted">{fileCount} emails detected</p>
        </div>
      </main>
    </div>
  )
}
