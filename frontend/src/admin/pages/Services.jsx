import { useEffect, useState } from 'react'
import api from '../../services/api'
export default function Services() {
  const [items, setItems] = useState([])
  useEffect(() => { api.get('/services').then(r=>setItems(r.data)).catch(()=>{}) }, [])
  return (<div><h1 className="text-2xl font-bold mb-4">Services</h1><ul>{items.map(s=>(<li key={s._id}>{s.title}</li>))}</ul></div>)
}
