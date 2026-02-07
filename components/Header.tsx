import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data } = useSession()

  return (
    <header>
      <h2 style={{margin:0}}>Dashboard</h2>

      <div style={{display:'flex', alignItems:'center', gap:12}}>
        <img src={data?.user?.image || '/avatar.png'} className="avatar" />
        <div>
          <div>{data?.user?.name || 'Guest'}</div>
          <div className="muted">{data?.user?.email || ''}</div>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/login' })} style={{color:'#ef4444', fontSize:13, background:'none', border:'none', cursor:'pointer'}}>
          Logout
        </button>
      </div>
    </header>
  )
}
