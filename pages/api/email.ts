import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

type Email = {
  id: string
  to: string
  subject: string
  scheduledAt: string
  status: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Email[] | { error: string }>
) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    try {
      // TODO: Fetch emails from backend API or database
      const emails: Email[] = []
      res.status(200).json(emails)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch emails' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
