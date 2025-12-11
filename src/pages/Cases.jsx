import { useState } from 'react'
import { useData } from '../context/DataContext'
import { createRazorpayOrder, verifyPayment } from '../api/api'
import CaseCard from '../components/CaseCard'

const Cases = () => {
  const { cases, casesLoading, refreshCases } = useData()
  const [donatingCase, setDonatingCase] = useState(null)
  const [donorName, setDonorName] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleDonate = (caseData, preSelectedAmount = 0) => {
    setDonatingCase(caseData)
    setDonationAmount(preSelectedAmount > 0 ? preSelectedAmount.toString() : '')
    setShowModal(true)
  }

  const handlePayment = async () => {
    if (!donorName || !donatingCase) {
      alert('Please enter your name')
      return
    }

    // Ensure minimum amount is 100
    const amountValue = parseFloat(donationAmount) || 0
    if (amountValue < 100) {
      alert('Minimum donation amount is ₹100')
      return
    }

    const amount = amountValue * 100 // Convert to paise

    try {
      // Create order via backend
      const orderData = await createRazorpayOrder(donatingCase.case_id, amount)

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
        amount: amount,
        currency: 'INR',
        name: 'Muslimah Charity Trust',
        description: `Donation for ${donatingCase.title}`,
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // Verify payment via backend
            await verifyPayment(
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature,
              donatingCase.case_id,
              amount / 100,
              donorName
            )
            alert('Payment successful! Thank you for your donation.')
            setShowModal(false)
            setDonorName('')
            setDonationAmount('')
            setDonatingCase(null)
            // Reload cases to show updated amounts
            refreshCases()
          } catch (error) {
            console.error('Payment verification failed:', error)
            alert('Payment verification failed. Please contact support.')
          }
        },
        prefill: {
          name: donorName,
        },
        theme: {
          color: '#22c55e',
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.')
        console.error('Payment failed:', response)
      })
      razorpay.open()
    } catch (error) {
      console.error('Error initiating payment:', error)
      alert('Failed to initiate payment. Please try again.')
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Donation Cases
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Choose a case to support and make a difference
        </p>

        {casesLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading cases...</p>
          </div>
        ) : cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((caseData) => (
              <div key={caseData.case_id} id={`case-${caseData.case_id}`}>
                <CaseCard caseData={caseData} onDonate={handleDonate} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No cases available at the moment.</p>
          </div>
        )}

        {/* Donation Modal */}
        {showModal && donatingCase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Donate to {donatingCase.title}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Donation Amount (₹) *
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter amount (minimum ₹100)"
                    min="100"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹100</p>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handlePayment}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-green-600 transition-colors"
                  >
                    Proceed to Pay
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setDonorName('')
                      setDonationAmount('')
                      setDonatingCase(null)
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cases


