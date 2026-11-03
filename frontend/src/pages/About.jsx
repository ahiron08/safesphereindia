import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">OUR STORY</p>
          <h1>Wellbeing matters the most.</h1>
          <p style={{maxWidth:720,marginTop:16}}>Safe Sphere India was founded on the belief that emotional safety is essential in workplaces and schools, yet often overlooked. We aim to provide practical tools, relevant training, and supportive environments responding to workplace stress, communication gaps, conflict, bullying, and children's emotional and social challenges. Safe Sphere India seeks to contribute to greater access to workplace wellbeing and structured professional development in Assam and Northeast India.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">OUR APPROACH</p>
          <h2>One purpose, multiple domains</h2>
          <p style={{maxWidth:720,marginTop:16}}>Safe Sphere India brings together workplace wellbeing, professional development and children’s wellbeing under one purpose: creating environments where people feel safer, function better and have the tools to navigate life’s challenges. We draw on evidence-informed approaches, researched learning modules, structured training methodologies, emotional intelligence, communication, interpersonal skills, respectful behaviour, and practical coping strategies.</p>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">MISSION</p>
          <h2>To foster emotionally safe, respectful and supportive workplaces and learning environments through evidence-informed training, practical tools and collaborative wellbeing frameworks.</h2>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <p className="eyebrow">VISION</p>
          <h2>A society in which emotional wellbeing is recognised as fundamental to human development, workplace effectiveness and children’s ability to learn, thrive and reach their potential.</h2>
        </div>
      </section>
      <section className="section" style={{background:'var(--cream)'}}>
        <div className="container">
          <p className="eyebrow">FOUNDER</p>
          <h2>Pallavi Shivam Borah</h2>
          <p style={{maxWidth:720,marginTop:16}}>Pallavi Shivam Borah is the founder of Safe Sphere India, a Certified NLP Practitioner and certified POSH Trainer with over 17 years of teaching experience. Her professional background brings together education, training and professional development, emotional intelligence and mindfulness.</p>
          <p style={{maxWidth:720,marginTop:12,fontSize:13,color:'var(--muted)'}}>Additional qualification titles (CTPD, REBT, Labour Laws) are pending verification before publication.</p>
        </div>
      </section>
    </>
  )
}
