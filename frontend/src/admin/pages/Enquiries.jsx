import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Enquiries() {
  const [items, setItems] = useState([])
  useEffect(() => { api.get('/enquiries').then(r=>setItems(r.data)).catch(()=>{}) }, [])
  return (<div><h1 className="text-2xl font-bold mb-4">Enquiries</h1>
  <ul className="space-y-2">{items.map(e=>(<li key={e._id} className="bg-white p-3 rounded shadow">{e.name} - {e.subject}</li>))}</ul></div>)
}
