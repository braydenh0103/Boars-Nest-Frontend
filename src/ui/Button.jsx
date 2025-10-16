import React from 'react'
export function Button({ kind='default', children, ...rest }) {
  const cls = ['btn']; if (kind==='primary') cls.push('primary'); if (kind==='danger') cls.push('danger'); if (kind==='ghost') cls.push('ghost')
  return <button className={cls.join(' ')} {...rest}>{children}</button>
}
