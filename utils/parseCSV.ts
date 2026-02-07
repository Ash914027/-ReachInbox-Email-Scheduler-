import Papa from 'papaparse'

export function parseCSVFile(file: File): Promise<string[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results: any) => {
        const rows = results.data as any[]
        const emails: string[] = []
        for (const r of rows) {
          if (!r) continue
          // handle arrays or single-column
          if (Array.isArray(r)) {
            const candidate = r[0]
            if (candidate && typeof candidate === 'string') emails.push(candidate.trim())
          } else if (typeof r === 'string') {
            emails.push(r.trim())
          }
        }
        resolve(emails.filter(Boolean))
      },
      error: reject,
    })
  })
}
