import React from 'react'
import { useTheme } from './ThemeProvider.jsx'
export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return <button className="btn" onClick={toggle} title="Toggle color mode">{theme==='light'?'🌙 Dark':'☀️ Light'}</button>
}