import { useEffect, useState, useRef } from 'react'
import NumberFlow from '@number-flow/react'

const NumberFlowComponent = ({ value, trend = false, className = '' }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [key, setKey] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const componentRef = useRef(null)

  useEffect(() => {
    // Only animate when scrolled into view
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            // Start animation
            setDisplayValue(0)
            setKey(prev => prev + 1)
            
            const timer = setTimeout(() => {
              const numValue = Number(value) || 0
              setDisplayValue(numValue)
            }, 100)

            return () => clearTimeout(timer)
          }
        })
      },
      { threshold: 0.3 } // Trigger when 30% visible
    )

    if (componentRef.current) {
      observer.observe(componentRef.current)
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current)
      }
    }
  }, [value, hasAnimated])

  // If already animated, just show the value
  if (hasAnimated) {
    return (
      <div ref={componentRef} className={className} key={key}>
        <NumberFlow value={displayValue} trend={trend} />
      </div>
    )
  }

  return (
    <div ref={componentRef} className={className}>
      <span className="text-gray-400">0</span>
    </div>
  )
}

export default NumberFlowComponent

