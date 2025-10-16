import React, { useEffect, useState } from 'react'
import { Card } from '../ui/Card.jsx'
import { Button } from '../ui/Button.jsx'

export default function PicksPretty() {
  const [week, setWeek] = useState(7)
  const [games, setGames] = useState([])
  const API = import.meta.env.VITE_API_BASE

  useEffect(() => { (async () => {
    const r = await fetch(`${API}/api/games/${week}`)
    const data = await r.json()
    setGames(data)
  })() }, [week])

  return (
    <div className="container">
      <div className="grid cols-3">
        <Card title="Week" right={<span className="badge">Change week</span>}>
          <div className="row">
            <input className="input" type="number" min={1} max={18} value={week} onChange={e=>setWeek(e.target.value)} style={{ width:120 }}/>
            <Button onClick={()=>window.location.reload()}>Refresh</Button>
          </div>
        </Card>

        <Card title="Suggested Picks">
          <p className="kicker">Based on moneyline favorites in your games list.</p>
          <ul style={{ margin:0, paddingLeft:18 }}>
            {games.filter(g => g.moneyline_fav).sort((a,b)=>(a.moneyline??0)-(b.moneyline??0)).slice(0,5).map(g => (
              <li key={g.id} style={{ marginBottom:6 }}>
                <strong>{g.moneyline_fav}</strong> ({g.moneyline}) vs {g.home_team===g.moneyline_fav?g.away_team:g.home_team}
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Notes">
          <p className="kicker">Odds update on save or via the Odds importer.</p>
          <div className="row"><Button kind="ghost" onClick={()=>alert('Coming soon: export to CSV')}>Export</Button></div>
        </Card>

        <Card title={`All Games (Week ${week})`} right={<span className="kicker">UTC times</span>}>
          <div style={{ overflowX:'auto' }}>
            <table className="table">
              <thead><tr><th>Kickoff</th><th>Away</th><th>Home</th><th>Fav</th><th>ML</th></tr></thead>
              <tbody>
                {games.map(g => (
                  <tr key={g.id}>
                    <td>{g.start_time}</td><td>{g.away_team}</td><td>{g.home_team}</td><td>{g.moneyline_fav ?? '—'}</td><td>{g.moneyline ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
