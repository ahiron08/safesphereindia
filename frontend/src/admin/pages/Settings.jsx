import { useEffect, useState } from 'react'
import api from '../../services/api'
export default function Settings() {
  const [s, setS] = useState(null)
  useEffect(() => { api.get('/settings').then(r=>setS(r.data)).catch(()=>{}) }, [])
  return (<div><h1 className="text-2xl font-bold mb-4">Settings</h1><pre>{JSON.stringify(s,null,2)}</pre></div>)
}
