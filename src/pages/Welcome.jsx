import React from 'react'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className="container">
      <div className="grid cols-2">
        <Card title="Welcome to Boar's Nest">
          <p className="lead">Create your league, invite friends, auto-import the NFL schedule, and make weekly survivor picks.</p>
          <div className="row">
            <Link to="/"><Button kind="primary">Make Picks</Button></Link>
            <Link to="/admin-schedule-auto"><Button>Import schedule</Button></Link>
          </div>
        </Card>
        <Card title="Quick Links">
          <ul style={{ margin:0, paddingLeft:18 }}>
            <li><Link to="/">Picks</Link></li>
            <li><Link to="/recap">Weekly Recap</Link></li>
            <li><Link to="/admin-lines">Add Odds (Admin)</Link></li>
            <li><Link to="/account">Account / Password</Link></li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
