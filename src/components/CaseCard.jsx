import ProgressBar from './ProgressBar'

const CaseCard = ({ caseData, onDonate }) => {
  const progress = caseData.required_amount > 0 
    ? (caseData.amount_raised / caseData.required_amount) * 100 
    : 0

  // Debug: Log case data to see if URL is present
  // console.log('Case data:', caseData)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Optional Image */}
      {caseData.url && caseData.url.trim() !== '' && caseData.url !== 'null' && (
        <div className="w-full h-48 overflow-hidden bg-gray-100">
          <img
            src={caseData.url}
            alt={caseData.title || 'Case image'}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              console.error('Failed to load case image:', caseData.url)
              e.target.style.display = 'none'
              e.target.parentElement.style.display = 'none'
            }}
            onLoad={(e) => {
              e.target.style.opacity = '1'
            }}
            style={{ opacity: 0, transition: 'opacity 0.3s' }}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {caseData.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {caseData.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>₹{caseData.amount_raised?.toLocaleString('en-IN') || 0} raised</span>
            <span>of ₹{caseData.required_amount?.toLocaleString('en-IN') || 0}</span>
          </div>
        </div>

        <button
          onClick={() => onDonate(caseData)}
          className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition-colors duration-200"
        >
          Donate Now
        </button>
      </div>
    </div>
  )
}

export default CaseCard


