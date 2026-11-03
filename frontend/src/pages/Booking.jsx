import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, CheckCircle2 } from 'lucide-react'
import { bookingConfig } from '../data/bookingConfig'
import api from '../services/api'


const STORAGE_KEY = 'safesphere_bookings'
function loadBookings() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') } catch { return [] } }
function saveBookings(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)) }
function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate() }
export default function Booking() {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [bookings, setBookings] = useState(loadBookings)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '' })
  const [errors, setErrors] = useState({})
  const [countsByDate, setCountsByDate] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [availability, setAvailability] = useState({ slots: [], bookings: [] })
  const [availLoading, setAvailLoading] = useState(false)




  useEffect(() => {
    if (!selectedDate) return
    setAvailLoading(true)
    api.get('/bookings/availability', { params: { date: selectedDate } })
      .then(r => setAvailability(r.data))
      .catch(() => setAvailability({ slots: [], bookings: [] }))
      .finally(() => setAvailLoading(false))
  }, [selectedDate])

  const [confirmation, setConfirmation] = useState(null)
  const year = viewDate.getFullYear(); const month = viewDate.getMonth()
  useEffect(() => {
    api.get('/bookings/counts').then(r => setCountsByDate(r.data || {})).catch(() => {})
  }, [])
  const isDateDisabled = (d) => {
    const iso = "" + year + "-" + String(month+1).padStart(2,"0") + "-" + String(d).padStart(2,"0")
    const todayIso = new Date().toLocaleDateString("en-CA")
    if (iso < todayIso) return true
    const date = new Date(year, month, d)
    const max = new Date(); max.setDate(max.getDate() + bookingConfig.maxAdvanceDays)
    if (date > max) return true
    if (!bookingConfig.availableWeekdays.includes(date.getDay())) return true
    if ((countsByDate[iso] || 0) >= bookingConfig.dailyLimit) return true
    return false
  }
  const bookedTimes = (availability.bookings || []).filter(b=>['Pending','Confirmed'].includes(b.status)).map(b=>b.startTime)
  const slotsForDate = (iso) => bookingConfig.availableSlots.map(slot => ({ slot, taken: bookedTimes.includes(slot) }))
  const activeCount = (availability.bookings || []).filter(b=>['Pending','Confirmed'].includes(b.status)).length

  const validate = () => { const e = {}; if (!selectedDate) e.date = 'Please select a date'; if (!selectedSlot) e.slot = 'Please select a time slot'; if (!form.name.trim()) e.name = 'Name is required'; if (!form.email || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = 'Valid email required'; if (!form.phone.trim()) e.phone = 'Phone is required'; if (!form.service) e.service = 'Please select a service'; return e }
  const submit = async (ev) => {
    ev.preventDefault(); if (submitting) return; const e = validate(); setErrors(e); if (Object.keys(e).length) return
    setSubmitting(true); const iso = selectedDate
    try {
      const res = await api.post('/bookings', {
        customerName: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service,
        bookingDate: iso,
        startTime: selectedSlot,
        endTime: selectedSlot,
      })
      const booking = res.data
      setConfirmation(booking)
      setBookings(prev => {
        const next = [...prev, booking]
        saveBookings(next)
        return next
      })
      api.get('/bookings/counts').then(r => setCountsByDate(r.data || {})).catch(() => {})
    } catch (err) {
      setErrors({ slot: err.response?.data?.message || 'Booking failed' })
    } finally {
      setSubmitting(false)
    }
  }
  if (confirmation) {
    return (<section className="section"><div className="container" style={{ maxWidth: 640, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <CheckCircle2 size={56} color="var(--sage)" style={{ margin: '0 auto 16px' }} />
        <h1>Booking confirmed</h1>
        <p style={{ marginTop: 12 }}>Thank you, {confirmation.customerName || confirmation.name}. Your appointment has been requested.</p>
      </motion.div></div></section>)
  }
  const firstDay = new Date(year, month, 1).getDay(); const totalDays = daysInMonth(year, month)
  const cells = []; for (let i = 0; i < firstDay; i++) cells.push(null); for (let d = 1; d <= totalDays; d++) cells.push(d)
  const isoFor = (d) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
  return (<section className="section"><div className="container" style={{ maxWidth: 960 }}>
    <p className="eyebrow">BOOK AN APPOINTMENT</p><h1>Schedule a consultation</h1>
    <p style={{ marginTop: 12 }}>Choose a date, pick an available time slot, and share your details. A maximum of {bookingConfig.dailyLimit} bookings are allowed per day.</p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 32 }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <button className="btn btn-outline" onClick={() => setViewDate(new Date(year, month - 1, 1))}>‹</button>
          <h3 style={{ fontFamily: 'DM Serif Display, serif' }}>{viewDate.toLocaleString('default', { month: 'long' })} {year}</h3>
          <button className="btn btn-outline" onClick={() => setViewDate(new Date(year, month + 1, 1))}>›</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6, textAlign: 'center', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 6 }}>
          {cells.map((d, i) => {
            if (d === null) return <div key={i} />
            const iso = isoFor(d); const disabled = isDateDisabled(d); const selected = selectedDate === iso; const count = countsByDate[iso] || 0
            return (<button key={i} disabled={disabled} onClick={() => { setSelectedDate(iso); setSelectedSlot('') }}
              style={{ padding: '10px 0', borderRadius: 10, border: selected ? '2px solid var(--sage)' : '1px solid rgba(53,72,59,0.12)', background: selected ? 'var(--sage-light)' : disabled ? 'rgba(0,0,0,0.04)' : 'var(--white)', color: disabled ? 'var(--muted)' : 'var(--charcoal)', cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 14 }}>
              {d}{count > 0 && !disabled && <div style={{ fontSize: 9, color: 'var(--sage)' }}>{count >= bookingConfig.dailyLimit ? "Full" : count + " booked"}</div>}
            </button>)
          })}
        </div>
        {errors.date && <span className="form-error">{errors.date}</span>}
      </div>
      <div>
        <h3 style={{ marginBottom: 12 }}>Available times {selectedDate && `for ${selectedDate}`}</h3>
        {selectedDate ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {slotsForDate(selectedDate).map(({ slot, taken }) => (
              <button key={slot} disabled={taken} onClick={() => setSelectedSlot(slot)}
                className={selectedSlot === slot ? 'btn btn-sage' : 'btn btn-outline'}
                style={{ justifyContent: 'center', opacity: taken ? 0.4 : 1, cursor: taken ? 'not-allowed' : 'pointer' }}>
                <Clock size={14} /> {slot} {taken && '(Booked)'}
              </button>
            ))}
          </div>
        ) : <p style={{ color: 'var(--muted)' }}>Select a date to view slots.</p>}
        {errors.slot && <span className="form-error">{errors.slot}</span>}
        <form onSubmit={submit} style={{ marginTop: 24, display: 'grid', gap: 12 }}>
          <div className="form-group"><input className={`form-field ${errors.name ? 'error' : ''}`} placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />{errors.name && <span className="form-error">{errors.name}</span>}</div>
          <div className="form-group"><input className={`form-field ${errors.email ? 'error' : ''}`} placeholder="Email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />{errors.email && <span className="form-error">{errors.email}</span>}</div>
          <div className="form-group"><input className={`form-field ${errors.phone ? 'error' : ''}`} placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />{errors.phone && <span className="form-error">{errors.phone}</span>}</div>
          <div className="form-group"><select className={`form-field ${errors.service ? 'error' : ''}`} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}><option value="">Interested service</option>{bookingConfig.services.map(s => <option key={s}>{s}</option>)}</select>{errors.service && <span className="form-error">{errors.service}</span>}</div>
          <button type="submit" className="btn btn-sage" disabled={submitting}>{submitting ? 'Submitting...' : 'Confirm Booking'}</button>
        </form>
      </div>
    </div>
  </div></section>)
}
