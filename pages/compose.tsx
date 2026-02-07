import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Papa from 'papaparse'

export default function ComposeEmail() {
  const { status } = useSession()
  const router = useRouter()

  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [recipients, setRecipients] = useState<string[]>([])
  const [startTime, setStartTime] = useState('')
  const [delay, setDelay] = useState(2)
  const [hourlyLimit, setHourlyLimit] = useState(100)
  const [loading, setLoading] = useState(false)

  // Protect page
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      complete: result => {
        const emails = result.data
          .flat()
          .map(v => String(v).trim())
          .filter(v => v.includes('@'))

        setRecipients(emails)
      }
    })
  }

  const handleSchedule = async () => {
    if (!subject || !body || recipients.length === 0 || !startTime) {
      alert('Please fill all required fields')
      return
    }

    setLoading(true)

    const res = await fetch('/api/email/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject,
        body,
        recipients,
        startTime,
        delayBetweenEmails: delay,
        hourlyLimit
      })
    })

    setLoading(false)

    if (res.ok) {
      router.push('/dashboard')
    } else {
      alert('Failed to schedule emails')
    }
  }

  if (status === 'loading') return <p className="muted">Loading...</p>

  return (
    <main className="compose-page">
      <h2>Compose New Email</h2>

      <div className="card">
        <label>Subject</label>
        <input
          value={subject}
          onChange={e => setSubject(e.target.value)}
          placeholder="Email subject"
        />

        <label>Body</label>
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your email..."
          rows={6}
        />

        <label>Upload Email List (CSV / TXT)</label>
        <input type="file" accept=".csv,.txt" onChange={onFile} />
        <p className="muted">{recipients.length} emails detected</p>

        <label>Start Time</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />

        <label>Delay Between Emails (seconds)</label>
        <input
          type="number"
          value={delay}
          min={1}
          onChange={e => setDelay(Number(e.target.value))}
        />

        <label>Hourly Limit</label>
        <input
          type="number"
          value={hourlyLimit}
          min={1}
          onChange={e => setHourlyLimit(Number(e.target.value))}
        />

        <button onClick={handleSchedule} disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Emails'}
        </button>
      </div>
    </main>
  )
}
