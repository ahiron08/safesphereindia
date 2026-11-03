import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { images } from '../images'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
const nav = [
  {name:'Home', path:'/'},
  {name:'Workplace Wellbeing', path:'/workplace-wellbeing'},
  {name:'Children & Adolescent Wellbeing', path:'/children-wellbeing'},
  {name:'Tranquillium™', path:'/tranquillium'},
  {name:'About Us', path:'/about'},
  {name:'Resources', path:'/resources'},
  ]
  return (
    <>
      <Navbar />


      <section id="home" className="container hero">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>WORKPLACE & CHILDREN'S WELLBEING</motion.p>
          <motion.h1 variants={fadeUp}>A safer space to <span className="accent">work, learn</span> and grow.</motion.h1>
          <motion.p variants={fadeUp}>Creating respectful workplaces and supportive learning environments through wellbeing, professional development, and meaningful human connection.</motion.p>
          <motion.div className="hero-ctas" variants={fadeUp}>
            <a href="#services" className="btn btn-sage">Explore Our Services <ArrowRight size={16}/></a>
            <a href="#tranquillium" className="btn btn-outline">Discover Tranquillium™</a>
          </motion.div>
          <motion.p className="brand-line" variants={fadeUp}>Wellbeing matters the most.</motion.p>
        </motion.div>
        <motion.div className="hero-image-wrap" initial={{opacity:0, scale:0.96}} animate={{opacity:1, scale:1}} transition={{duration:0.9, ease:[0.22,1,0.36,1]}}>
          <motion.div className="hero-shape" animate={{ y:[0,-12,0] }} transition={{duration:6, repeat:Infinity, ease:'easeInOut'}} />
          <div className="hero-img-large"><img src={images.heroLarge} alt="Team collaborating in a warm workplace" loading="eager"/></div>
          <div className="hero-img-small"><img src={images.heroSmall} alt="Colleagues in discussion" loading="eager"/></div>
          <div className="hero-label">Wellbeing in practice</div>
        </motion.div>
      </section>

      <section id="philosophy" className="section philosophy">
        <div className="container phil-grid">
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={stagger}>
            <p className="eyebrow">OUR BELIEF</p>
            <h2>Wellbeing isn't an extra. It's the foundation.</h2>
            <div className="phil-underline"/>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            <p>Emotional safety, respect, communication, and practical life skills matter in both workplaces and educational environments. When people feel safe, they learn, collaborate, and grow with confidence.</p>
            <div className="phil-img" style={{marginTop:24}}><img src={images.phil} alt="Calm nature-inspired setting" loading="lazy"/></div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <p className="eyebrow">WHAT WE DO</p>
          <h2>Different spaces. One shared purpose.</h2>
          <div className="services-grid">
            <motion.div className="service-panel ivory" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
              <div className="service-img"><img src={images.work} alt="Workplace training session" loading="lazy"/></div>
              <p className="eyebrow">WORKPLACE WELLBEING</p>
              <h3>Better workplaces begin with people.</h3>
              <p>Helping organisations build respectful, inclusive, and emotionally supportive workplaces through structured training, awareness, and professional development.</p>
              <ul className="service-list">
                {['POSH Training & Compliance Awareness','Internal Committee Training','Soft Skills & Professional Development','Emotional Intelligence','Workplace Communication & Conflict Management','Gender Sensitisation, Diversity & Inclusion','Employee Wellbeing','Leadership & Team Development'].map(s=><li key={s}>{s}</li>)}
              </ul>
              <Link to="/workplace-wellbeing" className="btn btn-sage">Explore Workplace Wellbeing</Link>
            </motion.div>
            <motion.div className="service-panel mint" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
              <div className="service-img"><img src={images.child} alt="Children in classroom" loading="lazy"/></div>
              <p className="eyebrow">CHILDREN & ADOLESCENT WELLBEING</p>
              <h3>Helping young minds grow with confidence.</h3>
              <p>Supporting children's emotional awareness, resilience, confidence, communication, and practical life skills through age-appropriate learning experiences.</p>
              <ul className="service-list">
                {['Life Skills Education','Social-Emotional Learning','Emotional Regulation & Resilience','Confidence Building','Bullying Prevention','Personal Boundaries & Child Safety','Digital Safety','Parent and Teacher Workshops'].map(s=><li key={s}>{s}</li>)}
              </ul>
              <Link to="/children-wellbeing" className="btn btn-sage">Explore Children's Wellbeing</Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="tranquillium" className="section tranq">
        <div className="container">
          <p className="eyebrow">OUR SIGNATURE PROGRAMME</p>
          <h2>Tranquillium™</h2>
          <p style={{fontSize:20, color:'var(--aqua)', marginTop:8}}>Pause. Reflect. Connect. Grow.</p>
          <div className="tranq-grid">
            <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
              <p>An age-appropriate school wellbeing and life-skills framework for children aged 7–14, designed to support emotional awareness, self-regulation, resilience, positive relationships, and practical life skills.</p>
              <div className="themes">
                {['Emotional Awareness','Resilience & Self-Regulation','Healthy Relationships'].map(t=><span key={t} className="theme-chip">{t}</span>)}
              </div>
              <Link to="/tranquillium" className="btn btn-outline" style={{borderColor:'var(--aqua)', color:'var(--aqua)'}}>Discover Tranquillium™</Link>
            </motion.div>
            <motion.div className="tranq-img" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
              <img src={images.tranq} alt="Students engaged in learning" loading="lazy"/>
              <div className="tranq-shape"/>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="approach" className="section">
        <div className="container">
          <p className="eyebrow">HOW WE WORK</p>
          <h2>Thoughtful learning. Meaningful change.</h2>
          <div className="approach-grid">
            {[
              ['01','Understand','Understand the needs of each organisation, school, or audience.'],
              ['02','Design','Develop relevant, structured learning experiences.'],
              ['03','Engage','Deliver interactive workshops and practical learning activities.'],
              ['04','Grow','Encourage reflection and continued learning.'],
            ].map(([n,t,d])=>(
              <motion.div key={n} className="step" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
                <div className="step-num">{n}</div>
                <h4>{t}</h4>
                <p style={{fontSize:14}}>{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="aboutus" className="section" style={{background:'var(--cream)'}}>
        <div className="container founder-grid">
          <motion.div className="founder-img" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            <img src={images.founder} alt="Founder portrait placeholder" loading="lazy"/>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
            <p className="eyebrow">THE PERSON BEHIND THE PURPOSE</p>
            <h2>Bringing empathy and experience into every learning space.</h2>
            <p style={{marginTop:16}}>Pallavi Shivam Borah is the founder of Safe Sphere India, a Certified NLP Practitioner and certified POSH Trainer with over 17 years of teaching experience. Her professional background brings together education, training and professional development, emotional intelligence, and mindfulness.</p>
            <Link to="/about" className="btn btn-sage" style={{marginTop:20}}>Meet Our Founder</Link>
          </motion.div>
        </div>
      </section>

      <section id="resources" className="section">
        <div className="container">
          <p className="eyebrow">IDEAS THAT MATTER</p>
          <h2>Small shifts. Healthier spaces.</h2>
          <div className="insights-grid">
            {[
              {img:images.art1, cat:'Workplace', title:'Building a Respectful and Emotionally Safe Workplace', desc:'Practical ways to nurture respect and psychological safety at work.'},
              {img:images.art2, cat:'Children', title:'Helping Children Develop Emotional Awareness', desc:'Simple practices that support emotional growth in young learners.'},
              {img:images.art3, cat:'Education', title:'Why Social-Emotional Learning Matters in Schools', desc:'The role of SEL in building resilient, confident students.'},
            ].map(a=>(
              <motion.article key={a.title} className="article" initial="hidden" whileInView="show" viewport={{once:true}} variants={fadeUp}>
                <img src={a.img} alt={a.title} loading="lazy"/>
                <div className="article-body">
                  <span className="article-cat">{a.cat}</span>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                  <a href="#" style={{color:'var(--sage)', fontSize:14, marginTop:8, display:'inline-block'}}>Read Article →</a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section cta">
        <div className="container">
          <h2>Let's make wellbeing part of everyday life.</h2>
          <p>Let's explore a programme that supports your organisation, school, or community.</p>
          <div className="cta-btns">
            <Link to="/contact" className="btn btn-sage">Enquire About Workplace Training</Link>
            <Link to="/contact" className="btn btn-outline">Enquire About Children's Programmes</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}


