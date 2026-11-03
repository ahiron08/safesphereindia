import { useEffect, useState } from 'react'
import api from '../../services/api'
export default function Articles() {
  const [items, setItems] = useState([])
  useEffect(() => { api.get('/articles').then(r=>setItems(r.data)).catch(()=>{}) }, [])
  return (<div><h1 className="text-2xl font-bold mb-4">Articles</h1><ul>{items.map(a=>(<li key={a._id}>{a.title}</li>))}</ul></div>)
}

