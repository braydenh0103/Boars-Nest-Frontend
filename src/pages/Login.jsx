import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin')
  const [status, setStatus] = useState('')
  const nav = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(mode==='signup'?'Creating account…':'Signing in…')
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setStatus('Account created. Check your email to confirm, then sign in.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        setStatus('Signed in!'); nav('/')
      }
    } catch (err) { setStatus(err.message || 'Auth error') }
  }

  async function resetPw(e) {
    e.preventDefault()
    if (!email) { alert('Enter your email first'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) alert(error.message); else alert('Password reset email sent, if the email exists.')
  }

  return (
    <div style={{ display:'grid', placeItems:'center', minHeight:'70vh' }}>
      <div className="card pad" style={{ width: 380 }}>
        <h2 style={{ marginTop:0, marginBottom:8 }}>Boar's Nest • {mode==='signup'?'Create Account':'Sign In'}</h2>
        <form onSubmit={handleSubmit} className="grid">
          <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={6} />
          <button className="btn primary" type="submit">{mode==='signup'?'Create account':'Sign in'}</button>
        </form>
        <div className="row" style={{ justifyContent:'space-between', marginTop:12 }}>
          <button className="btn" onClick={()=>setMode(mode==='signup'?'signin':'signup')}>{mode==='signup'?'Have an account? Sign in':'New here? Create account'}</button>
          <a href="#" onClick={resetPw} style={{ color:'var(--muted)', fontSize:13 }}>Forgot password?</a>
        </div>
        {status && <p className="kicker" style={{ marginTop:10 }}>{status}</p>}
      </div>
    </div>
  )
}
