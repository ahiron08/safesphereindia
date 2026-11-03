import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const navigate = useNavigate()
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErr('')
    try {
      await api.post('/auth/login', { email, password })
      navigate('/admin')
    } catch (ex) { setErr(ex.response?.data?.message || 'Login failed') }
    finally { setLoading(false) }
  }
  const inputStyle = { width: '100%', border: '1px solid #d1d5db', borderRadius: 8, padding: 8 }
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf9f6', padding: 16 }}>
      <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,.08)', padding: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>Admin Login</h1>
        <p style={{ color: '#6b7280', marginBottom: 20 }}>Safe Sphere India</p>
        {err && <div style={{ marginBottom: 12, padding: 10, borderRadius: 8, background: '#fef2f2', color: '#b91c1c' }}>{err}</div>}
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>Email</label>
            <input style={inputStyle} type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 14, marginBottom: 4 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input style={inputStyle} type={show?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="button" onClick={()=>setShow(!show)} style={{ position: 'absolute', right: 8, top: 8, background: 'none', border: 'none', color: '#6b7280' }}>{show?'Hide':'Show'}</button>
            </div>
          </div>
          <button disabled={loading} style={{ background: '#35483B', color: '#fff', padding: 10, borderRadius: 8, fontWeight: 600, opacity: loading?0.6:1 }}>
            {loading?'Signing in...':'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
