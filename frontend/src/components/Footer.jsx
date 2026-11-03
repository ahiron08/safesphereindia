import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand" style={{color:'var(--white)', marginBottom:12}}>Safe Sphere India</div>
          <p style={{color:'rgba(255,255,255,0.7)', fontSize:14}}>A wellbeing and training consultancy supporting respectful workplaces and supportive learning environments.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <Link to="/">Home</Link>
          <Link to="/workplace-wellbeing">Services</Link>
          <Link to="/tranquillium">Tranquillium™</Link>
          <Link to="/about">About Us</Link>
        </div>
        <div>
          <h4>Services</h4>
          <Link to="/workplace-wellbeing">Workplace Wellbeing</Link>
          <Link to="/children-wellbeing">Children's Wellbeing</Link>
          <Link to="/resources">Resources</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <Link to="/contact">Enquire Now</Link>
          <Link to="/book-appointment">Book Appointment</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Use</Link>
        </div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Safe Sphere India. All rights reserved.</div>
    </footer>
  )
}
