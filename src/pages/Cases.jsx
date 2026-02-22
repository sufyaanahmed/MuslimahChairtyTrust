import { useState, useEffect, useRef } from 'react'
import { useData } from '../context/DataContext'
import { createRazorpayOrder, verifyPayment } from '../api/api'
import CaseCard from '../components/CaseCard'

const Cases = () => {
  const { cases, casesLoading, refreshCases } = useData()
  const [donatingCase, setDonatingCase] = useState(null)
  const [donorName, setDonorName] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const casesRef = useRef(null)

  // Auto-scroll removed as per user request
  
  

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
      setIsProcessing(true) // Start loading
      
      // Create order via backend
      const orderData = await createRazorpayOrder(donatingCase.case_id, amount)
      
      setIsProcessing(false) // Stop loading before opening Razorpay

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'YOUR_RAZORPAY_KEY_ID',
        amount: amount,
        currency: 'INR',
        name: 'Muslimah Charity Trust',
        description: `Donation for ${donatingCase.title}`,
        image: '/Logo.jpeg', // Your charity logo
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
            
            // Reload cases to show updated amounts
            await refreshCases()
            
            // Close modal and reset form after refresh
            setShowModal(false)
            setDonorName('')
            setDonationAmount('')
            setDonatingCase(null)
            setIsProcessing(false)
          } catch (error) {
            console.error('Payment verification failed:', error)
            alert('Payment verification failed. Please contact support.')
            setIsProcessing(false)
          }
        },
        prefill: {
          name: donorName,
          contact: '+919844507137', // Default contact number
        },
        // UPI and payment method configuration
        method: {
          netbanking: true,
          card: true,
          upi: true, // Enable UPI payments
          wallet: true,
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  {
                    method: 'upi'
                  },
                  {
                    method: 'card'
                  },
                  {
                    method: 'netbanking'
                  },
                  {
                    method: 'wallet'
                  }
                ],
              },
            },
            sequence: ['block.banks'],
            preferences: {
              show_default_blocks: true,
            },
          },
        },
        theme: {
          color: '#22c55e',
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false) // Reset loading if user closes Razorpay modal
            console.log('Payment modal closed by user')
          }
        },
        notes: {
          case_id: donatingCase.case_id,
          case_title: donatingCase.title,
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.on('payment.failed', function (response) {
        alert('Payment failed. Please try again.')
        console.error('Payment failed:', response)
        setIsProcessing(false)
      })
      razorpay.open()
    } catch (error) {
      console.error('Error initiating payment:', error)
      alert('Failed to initiate payment. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Donation Cases
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Choose a case to support and make a difference
          </p>
        </div>

        {/* Meaningful Text Section */}
        <div className="bg-accent/10 rounded-lg p-8 mb-12 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-primary">
            Every Donation Makes a Difference
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4 text-center">
            <p className="text-lg leading-relaxed">
              At <strong>Muslimah Charity Trust</strong>, we believe that every act of charity, 
              no matter how small, creates a ripple of positive change. Our donation cases 
              represent real families, individuals, and communities who need your support.
            </p>
            <p className="text-lg leading-relaxed">
              When you donate to a case, you're not just giving money—you're providing hope, 
              dignity, and the means for someone to overcome their challenges. Whether it's 
              medical expenses, food security, education, or emergency relief, your contribution 
              directly impacts lives.
            </p>
            <p className="text-lg leading-relaxed font-semibold text-primary">
              Together, we can build a stronger, more compassionate community where no one is left behind.
            </p>
          </div>
        </div>

        {casesLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading cases...</p>
          </div>
        ) : cases.length > 0 ? (
          <div ref={casesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    disabled={isProcessing}
                    className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Proceed to Pay'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false)
                      setDonorName('')
                      setDonationAmount('')
                      setDonatingCase(null)
                      setIsProcessing(false)
                    }}
                    disabled={isProcessing}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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


