import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Dashboard() {
  const [data, setData] = useState(null)
  useEffect(() => { api.get('/admin/dashboard').then(r=>setData(r.data)).catch(()=>setData({})) }, [])
  if (!data) return <p>Loading...</p>
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {Object.entries(data).map(([k,v])=>(
          <div key={k} style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }}><p style={{ fontSize: 12, color: '#6b7280' }}>{k}</p><p style={{ fontSize: 24, fontWeight: 700 }}>{v}</p></div>
        ))}
      </div>
    </div>
  )
}
