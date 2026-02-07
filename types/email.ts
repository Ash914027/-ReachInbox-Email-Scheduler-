export type Email = {
  id: string
  to: string
  subject: string
  body?: string
  scheduledAt: string
  status: 'scheduled' | 'processing' | 'sent' | 'failed'
}
