import React from 'react'
import { cn } from '../../lib/utils'

const Highlighter = ({ 
  children, 
  action = 'highlight', 
  color = '#87CEFA',
  className = '' 
}) => {
  const styles = {
    highlight: {
      backgroundColor: color,
      padding: '0 0.2em',
      borderRadius: '0.25em',
    },
    underline: {
      borderBottom: `3px solid ${color}`,
      paddingBottom: '0.1em',
    },
  }

  return (
    <span
      className={cn('inline-block', className)}
      style={styles[action]}
    >
      {children}
    </span>
  )
}

export { Highlighter }





