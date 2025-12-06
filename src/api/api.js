// Replace this with your Google Apps Script Web App URL
const API_BASE_URL = import.meta.env.VITE_APP_SCRIPT_URL || 'YOUR_APPS_SCRIPT_URL_HERE'

// Cache for API responses (5 minutes)
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

const getCachedData = (key) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

export const fetchCases = async (useCache = true) => {
  const cacheKey = 'cases'
  
  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey)
    if (cached) {
      return cached
    }
  }

  try {
    // Use mode: 'no-cors' won't work for JSON, so we need proper CORS setup
    // Make sure your Apps Script is deployed with "Anyone" access
    const response = await fetch(`${API_BASE_URL}?type=cases`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Don't use mode: 'no-cors' as it prevents reading the response
    })
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response:', text)
      throw new Error('Server returned non-JSON response. Check Apps Script deployment.')
    }
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cases: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    const cases = data.cases || []
    
    // Cache the result
    setCachedData(cacheKey, cases)
    
    return cases
  } catch (error) {
    console.error('Error fetching cases:', error)
    // Return cached data if available, even if stale
    const cached = cache.get(cacheKey)
    if (cached) {
      return cached.data
    }
    return []
  }
}

export const fetchMedia = async (useCache = true) => {
  const cacheKey = 'media'
  
  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey)
    if (cached) {
      return cached
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}?type=media`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    const media = data.media || []
    
    // Cache the result
    setCachedData(cacheKey, media)
    
    return media
  } catch (error) {
    console.error('Error fetching media:', error)
    // Return cached data if available
    const cached = cache.get(cacheKey)
    if (cached) {
      return cached.data
    }
    return []
  }
}

export const createRazorpayOrder = async (caseId, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}?type=createOrder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        case_id: caseId,
        amount: amount,
      }),
    })
    if (!response.ok) throw new Error('Failed to create order')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating order:', error)
    throw error
  }
}

export const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature, caseId, amount, donorName) => {
  try {
    const response = await fetch(`${API_BASE_URL}?type=verifyPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: razorpayOrderId,
        razorpay_payment_id: razorpayPaymentId,
        razorpay_signature: razorpaySignature,
        case_id: caseId,
        amount: amount,
        donor_name: donorName,
      }),
    })
    if (!response.ok) throw new Error('Payment verification failed')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error verifying payment:', error)
    throw error
  }
}

