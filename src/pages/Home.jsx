import { useMemo, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'
import CaseCard from '../components/CaseCard'
import MediaGrid from '../components/MediaGrid'
import NumberFlowComponent from '../components/ui/NumberFlow'
import { fetchStats, createRazorpayOrder, verifyPayment } from '../api/api'
import { QuranHero } from '../components/ui/QuranHero'
import { BorderTrail } from '../components/ui/BorderTrail'

const Home = () => {
  const { cases, media, loading, refreshCases } = useData()
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [highlightedCase, setHighlightedCase] = useState(null)
  const [stats, setStats] = useState({
    total_donors: 0,
    total_cases: 0,
    our_volunteers: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)
  const highlightTimeoutRef = useRef(null)
  
  // Payment modal states
  const [donatingCase, setDonatingCase] = useState(null)
  const [donorName, setDonorName] = useState('')
  const [donationAmount, setDonationAmount] = useState('')
  const [showModal, setShowModal] = useState(false)

  // Get featured items (first 3)
  const featuredCases = useMemo(() => cases.slice(0, 3), [cases])
  const featuredMedia = useMemo(() => media.slice(0, 3), [media])

  useEffect(() => {
    // Trigger animation after component mounts
    setIsLoaded(true)

    // Hero image slideshow
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2)
    }, 6000)
    
    // Fetch stats from Google Sheets
    const loadStats = async () => {
      try {
        setStatsLoading(true)
        const statsData = await fetchStats(true)
        setStats(statsData)
      } catch (error) {
        console.error('Error loading stats:', error)
      } finally {
        setStatsLoading(false)
      }
    }
    
    loadStats()

    // Listen for highlight trigger from Donate Now button
    const handleHighlightCases = () => {
      if (featuredCases.length > 0) {
        let currentIndex = 0
        const highlightInterval = setInterval(() => {
          setHighlightedCase(featuredCases[currentIndex]?.case_id || null)
          currentIndex = (currentIndex + 1) % featuredCases.length
        }, 2000)
        
        highlightTimeoutRef.current = setTimeout(() => {
          clearInterval(highlightInterval)
          setHighlightedCase(null)
        }, featuredCases.length * 2000 + 1000)
      }
    }

    window.addEventListener('highlightCases', handleHighlightCases)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('highlightCases', handleHighlightCases)
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current)
      }
    }
  }, [featuredCases])

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
        image: '/Logo.jpeg',
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
          contact: '+919844507137',
        },
        // UPI and payment method configuration
        method: {
          netbanking: true,
          card: true,
          upi: true,
          wallet: true,
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  { method: 'upi' },
                  { method: 'card' },
                  { method: 'netbanking' },
                  { method: 'wallet' }
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
      })
      razorpay.open()
    } catch (error) {
      console.error('Error initiating payment:', error)
      alert('Failed to initiate payment. Please try again.')
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section 
        className={`relative text-white py-20 px-4 overflow-hidden transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Sliding background images */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            <div className="min-w-full h-full">
              <img
                src="/Hero_image_1.jpg"
                alt="Charity work and community support"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="min-w-full h-full">
              <img
                src="/Hero_image_2.jpg"
                alt="Volunteers helping the community"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            Muslimah Charity Trust
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md">
            Empowering communities through compassion and care
          </p>
          <Link
            to="/cases"
            className="inline-block bg-white text-primary px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Donate Now
          </Link>
        </div>

        {/* Inverted Triangle Divider - Transparent triangle showing image, white below */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
          <svg
            className="relative block w-full h-20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            {/* White fill only below the triangle - triangle area is transparent */}
            <path
              d="M0,120 L1200,120 L1200,0 L600,60 L0,0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Welcome to Muslimah Charity Trust — Where compassion becomes a responsibility
          </h2>

          <h3 className="text-xl md:text-2xl font-semibold text-center mb-8 text-primary">
            Empowering Communities Through Service, Support & Sisterhood
          </h3>

          <div className="prose prose-lg mx-auto text-gray-700 space-y-4">
            <p className="text-center text-lg leading-relaxed">
              Muslimah Charity Trust is a community-driven initiative dedicated to supporting
              underprivileged families, vulnerable individuals, and struggling communities across
              the city. What began as a simple effort to help those in immediate need has grown
              into a movement of compassion, unity, and meaningful action.
            </p>

            <p className="text-center text-lg leading-relaxed">
              Our mission is rooted in dignity, care, and continuous support. Whether it's providing
              food, offering warmth, assisting the sick, or supporting vulnerable families,
              we believe in uplifting lives with sincerity and consistency. Every effort we make is
              a step toward building a stronger, more caring community for all.
      </p>

      {/* Quran Verse Section */}
      <div className="mt-12">
        <QuranHero
          englishText="Indeed, the men who practice charity and the women who practice charity and [they who] have loaned Allāh a goodly loan – it will be multiplied for them, and they will have a noble reward."
          verseReference="Quran 57:18"
          gradient={true}
          blur={true}
        />
        
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/volunteers"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-200 shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Join Our Team
          </Link>
          <Link
            to="/story"
            className="inline-flex items-center gap-2 bg-white border-2 border-primary text-primary hover:bg-accent/20 px-8 py-3 rounded-md font-semibold text-lg transition-colors duration-200 shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Our Story
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
      <section className="py-16 px-4 bg-accent/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Total Donors */}
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.total_donors} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
              <div className="relative inline-block">
                <span className="text-gray-700 font-medium">Total Donors</span>
                <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out origin-left"></span>
              </div>
            </div>

            {/* Total Cases */}
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.total_cases} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
              <div className="relative inline-block">
                <span className="text-gray-700 font-medium">Total Cases</span>
                <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out origin-left"></span>
              </div>
            </div>

            {/* Our Volunteers */}
            <div className="text-center group cursor-pointer">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {statsLoading ? (
                  <span className="text-gray-400">...</span>
                ) : (
                  <NumberFlowComponent 
                    value={stats.our_volunteers} 
                    trend={false}
                    className="text-primary"
                  />
                )}
              </div>
              <div className="relative inline-block">
                <span className="text-gray-700 font-medium">Our Volunteers</span>
                <span className="absolute bottom-0 left-0 h-0.5 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out origin-left"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section id="featured-cases" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Cases
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading cases...</p>
            </div>
          ) : featuredCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCases.map((caseData) => (
                <div 
                  key={caseData.case_id} 
                  className={`relative transition-all duration-500 ${
                    highlightedCase === caseData.case_id ? 'scale-105 z-10' : ''
                  }`}
                  id={`featured-case-${caseData.case_id}`}
                >
                  {highlightedCase === caseData.case_id && (
                    <BorderTrail size={80} />
                  )}
                  <CaseCard
                    caseData={caseData}
                    onDonate={handleDonate}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No cases available at the moment.</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/cases"
              className="inline-block text-primary font-semibold hover:underline"
            >
              View All Cases →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Media */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Gallery
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : featuredMedia.length > 0 ? (
            <MediaGrid media={featuredMedia} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No media available at the moment.</p>
            </div>
          )}
          <div className="text-center mt-8">
            <Link
              to="/gallery"
              className="inline-block text-primary font-semibold hover:underline"
            >
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
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
                  Donation Amount (\u20b9) *
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter amount (minimum \u20b9100)"
                  min="100"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Minimum amount: \u20b9100</p>
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors"
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
  )
}

export default Home


