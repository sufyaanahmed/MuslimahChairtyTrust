import { useEffect, useRef, useState } from 'react'

/**
 * AnimatedCounter - Smoothly animates a number from 0 to its target value
 * @param {number} value - Target value to animate to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {boolean} isPercentage - Whether to format as percentage (default: false)
 * @param {boolean} isCurrency - Whether to format as Indian currency (default: false)
 */
const AnimatedCounter = ({ value, duration = 2000, isPercentage = false, isCurrency = false, className = '' }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    // Reset animation when value changes
    setHasAnimated(false)
    setCount(0)
  }, [value])

  useEffect(() => {
    if (hasAnimated) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          animateValue()
        }
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasAnimated])

  const animateValue = () => {
    const startTime = Date.now()
    const endValue = parseFloat(value) || 0

    const easeOutQuad = (t) => t * (2 - t)

    const updateCount = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      const easedProgress = easeOutQuad(progress)
      const currentCount = easedProgress * endValue

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(endValue)
      }
    }

    requestAnimationFrame(updateCount)
  }

  const formatValue = (val) => {
    if (isPercentage) {
      return `${Math.round(val)}%`
    }
    if (isCurrency) {
      return `₹${Math.round(val).toLocaleString('en-IN')}`
    }
    return Math.round(val).toLocaleString('en-IN')
  }

  return (
    <span ref={elementRef} className={className}>
      {formatValue(count)}
    </span>
  )
}

export default AnimatedCounter
