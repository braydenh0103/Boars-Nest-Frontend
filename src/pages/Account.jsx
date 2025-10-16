import React, { useState } from 'react'
import { supabase } from '../lib/supabase.js'

export default function Account() {
  const [pw1, setPw1] = useState('')
  const [pw2, setPw2] = useState('')
  const [msg, setMsg] = useState('')

  async function handleChange(e) {
    e.preventDefault()
    if (pw1 !== pw2) { setMsg('New passwords do not match'); return }
    if (pw1.length < 6) { setMsg('Password must be at least 6 characters'); return }
    try {
      const { error } = await supabase.auth.updateUser({ password: pw1 })
      if (error) throw error
      setMsg('Password updated. You may need to re-login on other devices.'); setPw1(''); setPw2('')
    } catch (err) { setMsg(err.message || 'Unable to update password') }
  }

  async function sendReset() {
    const user = (await supabase.auth.getUser()).data.user
    if (!user?.email) { setMsg('No email on session.'); return }
    const { error } = await supabase.auth.resetPasswordForEmail(user.email)
    if (error) setMsg(error.message); else setMsg('Password reset email sent.')
  }

  return (
    <div className="container">
      <div className="card pad" style={{ maxWidth:480, margin:'24px auto' }}>
        <h2 style={{ marginTop:0 }}>Account</h2>
        <h3 style={{ marginBottom:8 }}>Change password</h3>
        <form onSubmit={handleChange} className="grid">
          <input className="input" type="password" placeholder="New password" value={pw1} onChange={e=>setPw1(e.target.value)} />
          <input className="input" type="password" placeholder="Confirm new password" value={pw2} onChange={e=>setPw2(e.target.value)} />
          <div className="row" style={{ justifyContent:'space-between' }}>
            <button className="btn primary" type="submit">Update password</button>
            <button className="btn" type="button" onClick={sendReset}>Email me a reset link</button>
          </div>
        </form>
        {msg && <p className="kicker" style={{ marginTop:12 }}>{msg}</p>}
      </div>
    </div>
  )
}
