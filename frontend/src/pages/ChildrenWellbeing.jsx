import { Link } from 'react-router-dom'
import { childServices } from '../data/content'

export default function ChildrenWellbeing() {
  return (
    <>
      <section className="section" style={{background:'var(--mint)'}}>
        <div className="container">
          <p className="eyebrow">CHILDREN & ADOLESCENT WELLBEING</p>
          <h1>Helping Children Build Emotional Awareness, Confidence and Life Skills</h1>
          <p style={{maxWidth:720,marginTop:16}}>Safe Sphere India works with educational institutions to support children's emotional, social and personal development through structured wellbeing and life-skills programmes. Our approach creates opportunities for children to understand their emotions, communicate respectfully, develop self-awareness and build healthier relationships with peers and adults.</p>
          <Link to="/contact?service=children" className="btn btn-sage" style={{marginTop:24}}>Enquire About Children's Wellbeing Programmes</Link>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">PROGRAMME THEMES</p>
          <h2>Modules for Young Minds</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:16,marginTop:24}}>
            {childServices.map(s=>(
              <div key={s.title} style={{background:'var(--cream)',padding:20,borderRadius:16}}>
                <h3 style={{fontFamily:'DM Serif Display',fontSize:20,color:'var(--forest)'}}>{s.title}</h3>
                <p style={{fontSize:14,marginTop:8}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">LEARNING EXPERIENCES</p>
          <h2>Age-Appropriate, Engaging Activities</h2>
          <p style={{maxWidth:720,marginTop:16}}>Activities may include storytelling, games, role-play, reflection, and mindfulness practices. Programmes can address emotional regulation, confidence, resilience, social awareness, anxiety-management skills, responsible decision-making, personal boundaries, bullying prevention, child safety, help-seeking, and positive communication.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">A COLLABORATIVE APPROACH</p>
          <h2>Schools, Families, Stakeholders</h2>
          <p style={{maxWidth:720,marginTop:16}}>Programmes can be tailored for students, teachers, and parents, and delivery can be online or in person depending on programme and institutional requirements. Children's wellbeing is a shared effort between schools, families, and relevant stakeholders.</p>
        </div>
      </section>
      <section className="section" style={{background:'var(--sage-light)',textAlign:'center'}}>
        <div className="container">
          <p className="eyebrow">SIGNATURE PROGRAMME</p>
          <h2>Tranquillium™</h2>
          <p style={{maxWidth:640,margin:'12px auto 0'}}>An age-appropriate school wellbeing and life-skills framework for children aged 7–14.</p>
          <Link to="/tranquillium" className="btn btn-sage" style={{marginTop:20}}>Discover Tranquillium™</Link>
        </div>
      </section>
      <section className="section" style={{textAlign:'center'}}>
        <div className="container">
          <Link to="/contact?service=children" className="btn btn-sage">Enquire About Children's Wellbeing Programmes</Link>
        </div>
      </section>
    </>
  )
}
