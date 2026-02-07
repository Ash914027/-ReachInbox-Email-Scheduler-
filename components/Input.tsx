import React from 'react'

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{padding:8, borderRadius:6, border:'1px solid #e5e7eb'}} />
}
