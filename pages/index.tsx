import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">ReachInbox — Scheduler Demo</h1>
        <Link href="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded">Open Dashboard</Link>
      </div>
    </main>
  )
}
