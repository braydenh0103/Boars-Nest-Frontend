import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
const ThemeContext = createContext({ theme: 'light', setTheme: () => {}, toggle: () => {} })
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); localStorage.setItem('theme', theme) }, [theme])
  const value = useMemo(() => ({ theme, setTheme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') }), [theme])
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
export function useTheme() { return useContext(ThemeContext) }