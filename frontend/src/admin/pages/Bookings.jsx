import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Bookings() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const load = () => api.get('/bookings').then(r=>setItems(r.data)).catch(()=>{})
  useEffect(() => { load() }, [])

  const updateStatus = async (id, status) => {
    setLoading(true)
    try {
      await api.patch(`/bookings/${id}/status`, { status, adminNotes: notes })
      await load()
      setSelected(null)
    } finally { setLoading(false) }
  }

  const card = { background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,.06)' }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Bookings</h1>
      <div style={{ overflowX: 'auto', ...card }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
          <thead style={{ background: '#f3f4f6' }}>
            <tr>
              {['Name','Email','Phone','Service','Date','Time','Status','Actions'].map(h=>(
                <th key={h} style={{ textAlign:'left', padding:10, fontSize:13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.length===0 && <tr><td colSpan={8} style={{ padding:16, textAlign:'center', color:'#6b7280' }}>No bookings</td></tr>}
            {items.map(b=>(
              <tr key={b._id} style={{ borderTop:'1px solid #e5e7eb' }}>
                <td style={{ padding:10 }}>{b.customerName}</td>
                <td style={{ padding:10 }}>{b.email}</td>
                <td style={{ padding:10 }}>{b.phone||'-'}</td>
                <td style={{ padding:10 }}>{b.service||b.programme||'-'}</td>
                <td style={{ padding:10 }}>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td style={{ padding:10 }}>{b.startTime}</td>
                <td style={{ padding:10 }}>{b.status}</td>
                <td style={{ padding:10 }}>
                  <button onClick={()=>{setSelected(b);setNotes(b.adminNotes||'')}} style={{ background:'#35483B', color:'#fff', border:'none', padding:'6px 10px', borderRadius:6 }}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.4)', display:'flex', justifyContent:'flex-end' }}>
          <div style={{ width: 420, background:'#fff', height:'100%', overflowY:'auto', padding: 24 }}>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:12 }}>Booking Details</h2>
            <section style={{ marginBottom:16 }}>
              <h3 style={{ fontWeight:600, marginBottom:6 }}>Client Information</h3>
              <p><strong>Name:</strong> {selected.customerName}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Phone:</strong> {selected.phone||'-'}</p>
              {selected.organization && <p><strong>Organization:</strong> {selected.organization}</p>}
              {selected.audience && <p><strong>Audience:</strong> {selected.audience}</p>}
            </section>
            <section style={{ marginBottom:16 }}>
              <h3 style={{ fontWeight:600, marginBottom:6 }}>Booking Information</h3>
              <p><strong>Service:</strong> {selected.service||selected.programme||'-'}</p>
              <p><strong>Date:</strong> {new Date(selected.bookingDate).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selected.startTime} - {selected.endTime}</p>
              {selected.duration && <p><strong>Duration:</strong> {selected.duration}</p>}
              <p><strong>Delivery:</strong> {selected.deliveryMode}</p>
              <p><strong>Status:</strong> {selected.status}</p>
            </section>
            {selected.message && (
              <section style={{ marginBottom:16 }}>
                <h3 style={{ fontWeight:600, marginBottom:6 }}>Additional Information</h3>
                <p>{selected.message}</p>
              </section>
            )}
            <section style={{ marginBottom:16 }}>
              <h3 style={{ fontWeight:600, marginBottom:6 }}>Submission Information</h3>
              <p><strong>ID:</strong> {selected._id}</p>
              <p><strong>Created:</strong> {new Date(selected.createdAt).toLocaleString()}</p>
              <p><strong>Updated:</strong> {new Date(selected.updatedAt).toLocaleString()}</p>
            </section>
            <section style={{ marginBottom:16 }}>
              <h3 style={{ fontWeight:600, marginBottom:6 }}>Admin Notes</h3>
              <textarea value={notes} onChange={e=>setNotes(e.target.value)} style={{ width:'100%', minHeight:80, border:'1px solid #d1d5db', borderRadius:8, padding:8 }} />
            </section>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {selected.status==='Pending' && <>
                <button disabled={loading} onClick={()=>updateStatus(selected._id,'Confirmed')} style={{ background:'#16a34a', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6 }}>Confirm</button>
                <button disabled={loading} onClick={()=>updateStatus(selected._id,'Rejected')} style={{ background:'#dc2626', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6 }}>Reject</button>
              </>}
              {selected.status==='Confirmed' && <button disabled={loading} onClick={()=>updateStatus(selected._id,'Cancelled')} style={{ background:'#ea580c', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6 }}>Cancel</button>}
              <button onClick={()=>setSelected(null)} style={{ background:'#6b7280', color:'#fff', border:'none', padding:'8px 12px', borderRadius:6 }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
