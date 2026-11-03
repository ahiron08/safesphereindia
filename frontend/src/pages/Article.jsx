import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/content'

export default function Article() {
  const { slug } = useParams()
  const a = articles.find(x => x.slug === slug)
  if (!a) return (
    <section className="section"><div className="container"><h1>Article not found</h1><Link to="/resources">Back to resources</Link></div></section>
  )
  return (
    <>
      <section className="section">
        <div className="container" style={{maxWidth:760}}>
          <p className="eyebrow">{a.category}</p>
          <h1>{a.title}</h1>
          <p style={{fontSize:13,color:'var(--muted)',marginTop:8}}>{a.date} · {a.readTime} read</p>
          <img src={a.image} alt={a.title} style={{borderRadius:16,marginTop:24}} />
          <p style={{marginTop:24}}>{a.body}</p>
          <Link to="/resources" style={{color:'var(--sage)',marginTop:24,display:'inline-block'}}>← Back to resources</Link>
        </div>
      </section>
    </>
  )
}
