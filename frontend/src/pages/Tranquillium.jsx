import { Link } from 'react-router-dom'

export default function Tranquillium() {
  return (
    <>
      <section className="section tranq">
        <div className="container">
          <p className="eyebrow">OUR SIGNATURE PROGRAMME</p>
          <h1>Tranquillium™</h1>
          <p style={{fontSize:20,color:'var(--aqua)',marginTop:8}}>Pause. Reflect. Connect. Grow. (proposed tagline, subject to approval)</p>
          <p style={{maxWidth:720,marginTop:16,color:'rgba(255,255,255,0.8)'}}>Designed for children aged 7–14.</p>
          <p style={{maxWidth:720,marginTop:12,color:'rgba(255,255,255,0.8)'}}>Tranquillium™ is Safe Sphere India’s school wellbeing and life-skills framework. It aims to support emotional awareness, self-regulation, resilience, positive relationships and practical life skills through age-appropriate and collaborative learning experiences.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">LEARNING THEMES</p>
          <h2>Programme Aims</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginTop:24}}>
            {['Emotional Awareness','Self-Regulation','Resilience','Positive Relationships','Practical Life Skills'].map(t=>(
              <div key={t} style={{background:'var(--mint)',padding:20,borderRadius:16,textAlign:'center'}}>
                <h3 style={{fontFamily:'DM Serif Display',fontSize:20,color:'var(--forest)'}}>{t}</h3>
              </div>
            ))}
          </div>
          <p style={{marginTop:16,fontSize:14}}>Described as programme aims, not guaranteed outcomes.</p>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">WORKING WITH SCHOOLS AND FAMILIES</p>
          <h2>Complementing School and Family Efforts</h2>
          <p style={{maxWidth:720,marginTop:16}}>The framework is intended to complement school and family efforts rather than place responsibility for children's wellbeing solely on educators or parents. School collaboration may involve teachers and parents.</p>
        </div>
      </section>
      <section className="section" style={{textAlign:'center'}}>
        <div className="container">
          <Link to="/contact?service=tranquillium" className="btn btn-sage">Discuss Tranquillium™ With Us</Link>
        </div>
      </section>
    </>
  )
}
