import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section" style={{textAlign:'center'}}><div className="container">
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-sage" style={{marginTop:20}}>Go Home</Link>
    </div></section>
  )
}
