import React from 'react'

export default function Button({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button className={`btn ${className}`} onClick={onClick}>{children}</button>
  )
}
