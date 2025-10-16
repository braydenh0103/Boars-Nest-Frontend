import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

export function ProtectedRoute({ children }) {
  const [ready, setReady] = useState(false)
  const [session, setSession] = useState(null)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true) })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])
  if (!ready) return null
  if (!session) return <Navigate to="/login" replace />
  return children
}

export function AdminOnly({ children }) {
  const [ok, setOk] = useState(false)
  const [ready, setReady] = useState(false)
  useEffect(() => { (async () => {
    const { data: userRes } = await supabase.auth.getUser()
    const uid = userRes?.user?.id
    if (!uid) { setReady(true); setOk(false); return }
    const { data, error } = await supabase.from('leagues').select('id').eq('owner_id', uid).limit(1)
    setOk(!error && data && data.length > 0); setReady(true)
  })() }, [])
  if (!ready) return null
  if (!ok) return <Navigate to="/" replace />
  return children
}
