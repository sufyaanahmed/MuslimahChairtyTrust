import { useState } from 'react'
import ProgressBar from './ProgressBar'
import AnimatedCounter from './ui/AnimatedCounter'

const CaseCard = ({ caseData, onDonate }) => {
  const [donationAmount, setDonationAmount] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const progress = caseData.required_amount > 0 
    ? (caseData.amount_raised / caseData.required_amount) * 100 
    : 0

  const quickAmounts = [50, 100, 200, 500]
  
  // Check if description is long enough to need Read More (more than ~150 characters)
  const needsReadMore = caseData.description && caseData.description.length > 150

  const handleQuickAmountClick = (amount) => {
    const currentAmount = parseFloat(donationAmount) || 0
    const newAmount = currentAmount + amount
    setDonationAmount(newAmount.toString())
  }

  const handleAmountChange = (e) => {
    const value = e.target.value
    // Allow empty string or valid numbers
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setDonationAmount(value)
    }
  }

  const handleDonateClick = () => {
    const amount = parseFloat(donationAmount) || 0
    // Ensure minimum amount is 100
    const finalAmount = Math.max(amount, 100)
    if (amount < 100) {
      alert('Minimum donation amount is ₹100')
      return
    }
    onDonate(caseData, finalAmount)
  }

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
        <div className="mb-4">
          <p className={`text-gray-600 ${!isExpanded && needsReadMore ? 'line-clamp-3' : ''}`}>
            {caseData.description}
          </p>
          {needsReadMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2 flex items-center gap-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  Read Less
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span className="font-semibold">
              <AnimatedCounter value={progress} isPercentage={true} duration={1500} />
            </span>
          </div>
          <ProgressBar progress={progress} />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>
              <AnimatedCounter 
                value={caseData.amount_raised || 0} 
                isCurrency={true} 
                duration={1500} 
              /> raised
            </span>
            <span>of ₹{caseData.required_amount?.toLocaleString('en-IN') || 0}</span>
          </div>
        </div>

        {/* Donation Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Donation Amount (₹) *
          </label>
          <input
            type="number"
            value={donationAmount}
            onChange={handleAmountChange}
            placeholder="Enter amount (minimum ₹100)"
            min="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent transition-colors mb-2"
          />
          <p className="text-xs text-gray-500 mb-2">Minimum amount: ₹100</p>
          
          {/* Quick Amount Buttons */}
          <div className="mt-2">
            <p className="text-xs text-gray-600 mb-1">Quick select:</p>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleQuickAmountClick(amount)}
                  className="px-3 py-2 text-sm border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200 font-medium"
                >
                  +₹{amount}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleDonateClick}
          className="w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors duration-200"
        >
          {donationAmount ? `Donate ₹${parseFloat(donationAmount) || 0}` : 'Donate Now'}
        </button>
      </div>
    </div>
  )
}

export default CaseCard


