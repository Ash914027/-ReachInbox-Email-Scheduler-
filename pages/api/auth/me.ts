import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Return a lightweight mock user. Replace with real NextAuth or backend session later.
  res.json({ user: { name: 'Demo User', email: 'demo@reachbox.local', image: '/avatar.png' } })
}
