import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles, articleCategories } from '../data/content'

export default function Resources() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? articles : articles.filter(a => a.category === cat)
  return (
    <>
      <section className="section">
        <div className="container">
          <p className="eyebrow">RESOURCES</p>
          <h1>Ideas that matter</h1>
          <div style={{display:'flex',gap:8,flexWrap:'wrap',marginTop:20}}>
            {articleCategories.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className="btn" style={{background: cat===c?'var(--sage)':'var(--cream)', color: cat===c?'var(--white)':'var(--charcoal)', padding:'8px 14px', fontSize:13}}>{c}</button>
            ))}
          </div>
          <div className="insights-grid" style={{marginTop:32}}>
            {filtered.map(a=>(
              <article key={a.slug} className="article">
                <img src={a.image} alt={a.title} loading="lazy"/>
                <div className="article-body">
                  <span className="article-cat">{a.category}</span>
                  <h4>{a.title}</h4>
                  <p>{a.summary}</p>
                  <Link to={`/resources/${a.slug}`} style={{color:'var(--sage)',fontSize:14,marginTop:8,display:'inline-block'}}>Read Article →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
