import React from 'react'
import ThemeToggle from '../components/ThemeToggle.jsx'
import NavItem from '../components/NavItem.jsx'

export default function AppShellPro({ children }) {
  return (
    <div className="app">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand-pro">
            <div className="glyph">BN</div>
            <div>
              <div>Boar's Nest</div>
              <div className="kicker">NFL Survivor League</div>
            </div>
          </div>
          <nav className="navbar">
            <NavItem to="/" end>Picks</NavItem>
            <NavItem to="/recap">Recap</NavItem>
            <NavItem to="/league">League</NavItem>
            <NavItem to="/admin-schedule-auto">Schedule <span className="badge-admin">Admin</span></NavItem>
            <NavItem to="/admin-lines">Odds <span className="badge-admin">Admin</span></NavItem>
            <NavItem to="/account">Account</NavItem>
            <ThemeToggle />
          </nav>
        </div>
      </div>
      <div className="page">{children}</div>
      <div className="footer">© Boar's Nest • Built for the squad 🐗</div>
    </div>
  )
}
