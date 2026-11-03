import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Contact() {
  const [params] = useSearchParams()
  const [service, setService] = useState(params.get('service') || '')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({name:'',email:'',phone:'',org:'',audience:'',delivery:'Not Sure',dates:'',message:'',consent:false})
  const validate = () => {
    const e = {}
    if (!form.name) e.name='Required'
    if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email='Valid email required'
    if (!form.message) e.message='Required'
    if (!form.consent) e.consent='Required'
    return e
  }
  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length===0) setSubmitted(true)
  }
  if (submitted) return (
    <section className="section"><div className="container" style={{maxWidth:640}}><h1>Thank you</h1><p>This is a frontend demonstration. No message has actually been sent or stored.</p></div></section>
  )
  return (
    <section className="section">
      <div className="container" style={{maxWidth:640}}>
        <p className="eyebrow">CONTACT</p>
        <h1>Let's connect</h1>
        <p style={{marginTop:12}}>Enquire about workplace training, children's wellbeing programmes, and Tranquillium™.</p>
<form onSubmit={submit} style={{marginTop:24,display:'grid',gap:12}}>
          <div className="form-group">
            <input className={`form-field ${errors.name?'error':''}`} placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <input className={`form-field ${errors.email?'error':''}`} placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <input className="form-field" placeholder="Phone number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <input className="form-field" placeholder="Organisation or institution" value={form.org} onChange={e=>setForm({...form,org:e.target.value})} />
          <select className="form-field" value={service} onChange={e=>setService(e.target.value)}>
            <option value="">Interested service</option>
            {['POSH Training & Workplace Wellbeing','Children & Adolescent Wellbeing','Tranquillium™','Professional Development','Customised Institutional Training','Other Enquiry'].map(o=><option key={o}>{o}</option>)}
          </select>
          <input className="form-field" placeholder="Audience type" value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})} />
          <select className="form-field" value={form.delivery} onChange={e=>setForm({...form,delivery:e.target.value})}>
            <option>Online</option><option>In Person</option><option>Not Sure</option>
          </select>
          <input className="form-field" placeholder="Preferred dates or timeframe" value={form.dates} onChange={e=>setForm({...form,dates:e.target.value})} />
          <div className="form-group">
            <textarea className={`form-field ${errors.message?'error':''}`} placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} />
            {errors.message && <span className="form-error">{errors.message}</span>}
          </div>
          <label className="form-checkbox">
            <input type="checkbox" checked={form.consent} onChange={e=>setForm({...form,consent:e.target.checked})} />
            I consent to being contacted.
          </label>
          {errors.consent && <span className="form-error">{errors.consent}</span>}
          <button type="submit" className="btn btn-sage">Submit Enquiry</button>
        </form>
      </div>
    </section>
  )
}
