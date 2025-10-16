import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/ThemeProvider.jsx'
import AppShellPro from './layout/AppShellPro.jsx'
import './theme.css'
import './styles/pro.css'

import PicksPretty from './pages/PicksPretty.jsx'
import AdminScheduleAuto from './pages/AdminScheduleAuto.jsx'
import Account from './pages/Account.jsx'
import Welcome from './pages/Welcome.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'

import { ProtectedRoute, AdminOnly } from './components/RouteGuards.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
    <BrowserRouter>
      <AppShellPro>
        <Routes>
          <Route path="/" element={<PicksPretty />} />
          <Route path="/recap" element={<div className="container"><div className="card pad">Recap page (todo)</div></div>} />
          <Route path="/league" element={<div className="container"><div className="card pad">League page (todo)</div></div>} />

          <Route path="/admin-schedule-auto" element={
            <ProtectedRoute>
              <AdminOnly>
                <AdminScheduleAuto />
              </AdminOnly>
            </ProtectedRoute>
          } />

          <Route path="/admin-lines" element={
            <ProtectedRoute>
              <AdminOnly>
                <div className="container"><div className="card pad">Admin Odds Editor (todo)</div></div>
              </AdminOnly>
            </ProtectedRoute>
          } />

          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShellPro>
    </BrowserRouter>
  </ThemeProvider>
)
