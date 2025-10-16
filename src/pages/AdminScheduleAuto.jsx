import React, { useState, useEffect } from 'react'
export default function AdminScheduleAuto() {
  const [season, setSeason] = useState(new Date().getFullYear())
  const [week, setWeek] = useState(7)
  const [result, setResult] = useState(null)
  const API = import.meta.env.VITE_API_BASE

  async function importSeasonWeek() {
    const resp = await fetch(`${API}/admin/import/schedule/espn_season_week`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ season: Number(season), week: Number(week) })
    })
    const data = await resp.json()
    setResult(data)
    await preview()
  }
  async function preview() {
    const r = await fetch(`${API}/api/games/${week}`)
    const rows = await r.json()
    setResult({ preview: rows })
  }
  useEffect(() => { preview() }, [week])

  return (
    <div className="container">
      <div className="card pad" style={{ marginBottom:12 }}>
        <h2 style={{ marginTop:0 }}>Admin • Auto Schedule (ESPN)</h2>
        <div className="row" style={{ gap:12, flexWrap:'wrap' }}>
          <label>Season <input className="input" style={{ width:120, marginLeft:8 }} type="number" value={season} onChange={e=>setSeason(e.target.value)} /></label>
          <label>Week <input className="input" style={{ width:80, marginLeft:8 }} type="number" min={1} max={18} value={week} onChange={e=>setWeek(e.target.value)} /></label>
          <button className="btn primary" onClick={importSeasonWeek}>Import season/week</button>
          <button className="btn" onClick={preview}>Preview DB Week</button>
        </div>
        <p className="kicker">Uses ESPN core API for the selected season + week.</p>
      </div>
      <div className="card pad">
        <h3 className="card-title">Week {week} — Games</h3>
        {!result && <p className="kicker">No data yet.</p>}
        {!!result?.preview && (
          <div style={{ overflowX:'auto' }}>
            <table className="table">
              <thead><tr><th>Kickoff (UTC)</th><th>Away</th><th>Home</th><th>Fav</th><th>ML</th></tr></thead>
              <tbody>
                {result.preview.map(g => (
                  <tr key={g.id}>
                    <td>{g.start_time}</td><td>{g.away_team}</td><td>{g.home_team}</td><td>{g.moneyline_fav ?? '—'}</td><td>{g.moneyline ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {!!result?.ok && (
          <div>
            <p>Imported {result.imported} games for season {result.season} week {result.week}.</p>
            <button className="btn" onClick={preview}>Refresh preview</button>
          </div>
        )}
      </div>
    </div>
  )
}
