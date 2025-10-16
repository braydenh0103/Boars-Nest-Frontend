import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button.jsx'
export default function NotFound() {
  return (
    <div style={{ textAlign:'center', marginTop: 60 }}>
      <h1 className="h1">404</h1>
      <p className="lead">That page doesn't exist. Want to head back home?</p>
      <Link to="/"><Button kind="primary">Go to Picks</Button></Link>
    </div>
  )
}
