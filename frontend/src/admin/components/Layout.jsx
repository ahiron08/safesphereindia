import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function AdminLayout() {
  const navigate = useNavigate()
  const logout = async () => { navigate('/admin/login') }
  const nav = [
    { to: '/admin', label: 'Overview' },
    { to: '/admin/bookings', label: 'Bookings' },
    { to: '/admin/enquiries', label: 'Enquiries' },
    { to: '/admin/articles', label: 'Articles' },
    { to: '/admin/services', label: 'Services' },
    { to: '/admin/availability', label: 'Availability' },
    { to: '/admin/settings', label: 'Settings' },
  ]
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)', color: 'var(--charcoal)', fontFamily: 'DM Sans, sans-serif' }}>
      <aside style={{ width: 240, background: '#fff', borderRight: '1px solid #e5e7eb', padding: 20 }}>
        <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Safe Sphere Admin</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {nav.map(n => <Link key={n.to} to={n.to} style={{ padding: '8px 10px', borderRadius: 8, textDecoration: 'none', color: 'inherit' }}>{n.label}</Link>)}
          <button onClick={logout} style={{ marginTop: 12, color: '#b91c1c', background: 'none', border: 'none', textAlign: 'left' }}>Logout</button>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 24 }}><Outlet /></main>
    </div>
  )
}
