import { useEffect, useState } from 'react'
import NumberFlow from '@number-flow/react'

const NumberFlowComponent = ({ value, trend = false, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // Always start from 0, then animate to target value
    setDisplayValue(0)
    setKey(prev => prev + 1) // Force re-render
    
    // Small delay to ensure animation triggers
    const timer = setTimeout(() => {
      const numValue = Number(value) || 0
      setDisplayValue(numValue)
    }, 100)

    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className={className} key={key}>
      <NumberFlow value={displayValue} trend={trend} />
    </div>
  )
}

export default NumberFlowComponent

