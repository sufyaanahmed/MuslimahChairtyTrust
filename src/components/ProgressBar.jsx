const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
      <div
        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${Math.min(progress, 100)}%`,
          transition: 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)'
        }}
      />
    </div>
  )
}

export default ProgressBar


