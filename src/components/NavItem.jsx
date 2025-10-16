import React from 'react'
import { NavLink } from 'react-router-dom'
export default function NavItem({ to, children, end=false }) {
  return <NavLink to={to} end={end} className={({ isActive }) => 'navlink' + (isActive ? ' active' : '')}>{children}</NavLink>
}