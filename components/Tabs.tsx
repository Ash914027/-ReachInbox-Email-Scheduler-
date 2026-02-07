import React from 'react'

export default function Tabs({ tabs, activeIdx, onChange }: { tabs: string[]; activeIdx: number; onChange: (i: number) => void }) {
  return (
    <div className="tabs">
      {tabs.map((t, i) => (
        <div key={i} className={`tab ${i === activeIdx ? 'active' : ''}`} onClick={() => onChange(i)}>
          {t}
        </div>
      ))}
    </div>
  )
}
