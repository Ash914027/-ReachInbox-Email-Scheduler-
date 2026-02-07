import React from 'react'

export default function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{padding:8, borderRadius:6, border:'1px solid #e5e7eb', minHeight:120, width:'100%'}} />
}
