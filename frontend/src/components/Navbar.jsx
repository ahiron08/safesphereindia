import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const nav = [
  {name:'Home', path:'/'},
  {name:'Workplace Wellbeing', path:'/workplace-wellbeing'},
  {name:'Children & Adolescent Wellbeing', path:'/children-wellbeing'},
  {name:'Tranquillium™', path:'/tranquillium'},
  {name:'About Us', path:'/about'},
  {name:'Book Appointment', path:'/book-appointment'},
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`navbar ${scrolled?'scrolled':''}`}>
      <div className="container nav-inner">
        <Link to="/" className="brand">Safe Sphere India</Link>
        <div className="nav-links">
          {nav.map(n => <NavLink key={n.name} to={n.path} className={({isActive})=> isActive?'active':''}>{n.name}</NavLink>)}
          <Link to="/contact" className="btn btn-sage">Enquire Now</Link>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <div className={`mobile-menu ${menuOpen?'open':''}`}>
        {nav.map(n => <NavLink key={n.name} to={n.path} onClick={()=>setMenuOpen(false)}>{n.name}</NavLink>)}
        <Link to="/contact" className="btn btn-sage" onClick={()=>setMenuOpen(false)}>Enquire Now</Link>
      </div>
    </nav>
  )
}
