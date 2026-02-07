import { Email } from '../types/email'

export default function EmailTable({ items }: { items: Email[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Email</th>
          <th>Subject</th>
          <th>Scheduled</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items.map(i => (
          <tr key={i.id}>
            <td>{i.to}</td>
            <td>{i.subject}</td>
            <td>{new Date(i.scheduledAt).toLocaleString()}</td>
            <td>{i.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
