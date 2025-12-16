import { useState } from 'react'
import ProgressBar from './ProgressBar'

const CaseCard = ({ caseData, onDonate }) => {
  const [donationAmount, setDonationAmount] = useState('')
  const progress = caseData.required_amount > 0 
    ? (caseData.amount_raised / caseData.required_amount) * 100 
    : 0

  const quickAmounts = [50, 100, 200, 500]

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


