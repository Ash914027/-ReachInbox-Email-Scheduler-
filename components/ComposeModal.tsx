import { useState } from 'react'
import { parseCSVFile } from '../utils/parseCSV'

export default function ComposeModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: any) => void }) {
  const [fileCount, setFileCount] = useState(0)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [scheduledAt, setScheduledAt] = useState('')
  const [delayMin, setDelayMin] = useState(0)
  const [hourlyLimit, setHourlyLimit] = useState(200)

  const handleFile = async (e: any) => {
    const f = e.target.files?.[0]
    if (!f) return
    const emails = await parseCSVFile(f)
    setFileCount(emails.length)
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="text-xl font-semibold">Compose Email</h2>

        <input placeholder="Subject" className="mt-4" value={subject} onChange={e=>setSubject(e.target.value)} />
        <textarea placeholder="Body" className="mt-2" value={body} onChange={e=>setBody(e.target.value)} />

        <input type="file" onChange={handleFile} className="mt-2" />
        <div className="muted mt-1">{fileCount} detected</div>

        <input type="datetime-local" className="mt-3" value={scheduledAt} onChange={e=>setScheduledAt(e.target.value)} />
        <input type="number" placeholder="Delay (min)" className="mt-2" value={delayMin} onChange={e=>setDelayMin(Number(e.target.value))} />
        <input type="number" placeholder="Hourly limit" className="mt-2" value={hourlyLimit} onChange={e=>setHourlyLimit(Number(e.target.value))} />

        <div style={{display:'flex', gap:8, marginTop:12}}>
          <button className="btn" onClick={() => onSubmit({ subject, body, scheduledAt, delayMin, hourlyLimit })}>Schedule</button>
          <button className="btn" style={{background:'#6b7280'}} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
