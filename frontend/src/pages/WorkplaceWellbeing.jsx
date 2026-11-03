import { Link } from 'react-router-dom'
import { workplaceServices } from '../data/content'
import { images } from '../images'

export default function WorkplaceWellbeing() {
  return (
    <>
      <section className="section" style={{background:'var(--ivory)'}}>
        <div className="container">
          <p className="eyebrow">WORKPLACE WELLBEING</p>
          <h1>Building Safe, Aware and Respectful Workplaces</h1>
          <p style={{maxWidth:640,marginTop:16}}>Safe Sphere India supports organisations in fostering safe, inclusive and respectful working environments through POSH awareness, training and workplace wellbeing initiatives.</p>
          <Link to="/contact?service=workplace" className="btn btn-sage" style={{marginTop:24}}>Enquire About Workplace Training</Link>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">POSH TRAINING & COMPLIANCE AWARENESS</p>
          <h2>Understanding POSH, Building Accountability</h2>
          <p style={{maxWidth:720,marginTop:16}}>Our programmes help employees understand the Prevention of Sexual Harassment at the Workplace Act, 2013, recognise inappropriate workplace behaviour, understand professional boundaries and contribute to a culture of dignity and accountability.</p>
          <p style={{marginTop:12}}>Includes employee awareness sessions and specialised training for Internal Committee members.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">INTERNAL COMMITTEE TRAINING</p>
          <h2>Roles, Confidentiality and Fair Process</h2>
          <p style={{maxWidth:720,marginTop:16}}>Training covers roles and responsibilities, confidentiality, impartiality, and principles of fair complaint-handling procedures.</p>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">PROFESSIONAL DEVELOPMENT & WORKPLACE WELLBEING</p>
          <h2>Modules for Healthier Workplaces</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:24}}>
            {workplaceServices.map(s=>(
              <div key={s.title} style={{background:'var(--white)',padding:20,borderRadius:16,border:'1px solid rgba(53,72,59,0.08)'}}>
                <h3 style={{fontFamily:'DM Serif Display',fontSize:20,color:'var(--forest)'}}>{s.title}</h3>
                <p style={{fontSize:14,marginTop:8}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">DELIVERY & APPROACH</p>
          <h2>Flexible, Tailored Programmes</h2>
          <p style={{maxWidth:720,marginTop:16}}>Programmes may be delivered online or in person, with content and duration adapted to the organisation and audience. We aim to move beyond basic awareness towards a culture where safety, respect, and accountability are consistently practised.</p>
        </div>
      </section>
      <section className="section" style={{background:'var(--sage-light)',textAlign:'center'}}>
        <div className="container">
          <h2>Let's build a more respectful workplace.</h2>
          <Link to="/contact?service=workplace" className="btn btn-sage" style={{marginTop:20}}>Enquire About Workplace Training</Link>
        </div>
      </section>
    </>
  )
}
