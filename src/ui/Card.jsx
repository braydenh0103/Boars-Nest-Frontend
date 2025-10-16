import React from 'react'
export function Card({ title, right, children, pad=true }) {
  return (
    <div className={`card ${pad ? 'pad' : ''}`}>
      {(title || right) && <div className="spread" style={{ marginBottom: 10 }}>{title ? <h3 className="card-title">{title}</h3> : <div/>}{right||null}</div>}
      {children}
    </div>
  )
}
