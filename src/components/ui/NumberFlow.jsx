import NumberFlow from '@number-flow/react'

const NumberFlowComponent = ({ value, trend = false, className = '' }) => {
  return (
    <div className={className}>
      <NumberFlow value={value} trend={trend} />
    </div>
  )
}

export default NumberFlowComponent

