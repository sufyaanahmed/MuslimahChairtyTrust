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

export const fetchBlogs = async (useCache = true) => {
  const cacheKey = 'blogs'

  if (useCache) {
    const cached = getCachedData(cacheKey)
    if (cached) {
      return cached
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}?type=blogs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const blogs = data.blogs || []

    setCachedData(cacheKey, blogs)

    return blogs
  } catch (error) {
    console.error('Error fetching blogs:', error)
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

export const submitVolunteerApplication = async (formData) => {
  console.log('Submitting volunteer application with data:', formData)
  console.log('API URL:', `${API_BASE_URL}?type=submitVolunteer`)
  
  try {
    // Use URLSearchParams to avoid CORS preflight for POST requests
    // Google Apps Script handles form data better than JSON for CORS
    const formDataToSend = new URLSearchParams()
    formDataToSend.append('type', 'submitVolunteer')
    formDataToSend.append('data', JSON.stringify(formData))
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataToSend.toString(),
    })
    
    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    // Check if response is actually JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response from volunteer submission:')
      console.error('Status:', response.status)
      console.error('Content-Type:', contentType)
      console.error('Response text:', text)
      throw new Error(`Server returned non-JSON response (${response.status}). Check Apps Script deployment. Response: ${text.substring(0, 200)}`)
    }
    
    const data = await response.json()
    console.log('Response data:', data)
    
    if (!response.ok) {
      throw new Error(data.error || `Failed to submit volunteer application: ${response.status}`)
    }
    
    return data
  } catch (error) {
    console.error('=== ERROR SUBMITTING VOLUNTEER APPLICATION ===')
    console.error('Error type:', error.constructor.name)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    console.error('Form data sent:', formData)
    console.error('API URL used:', `${API_BASE_URL}?type=submitVolunteer`)
    console.error('==============================================')
    throw error
  }
}

export const submitContactForm = async (formData) => {
  try {
    // Use form-encoded to avoid CORS preflight
    const formDataToSend = new URLSearchParams()
    formDataToSend.append('type', 'submitContact')
    formDataToSend.append('data', JSON.stringify(formData))
    
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formDataToSend.toString(),
    })
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      console.error('Non-JSON response from contact form:', text)
      throw new Error('Server returned non-JSON response')
    }
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new Error(errorData.error || `Failed to submit contact form: ${response.status}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error submitting contact form:', error)
    throw error
  }
}

export const fetchStats = async (useCache = true) => {
  const cacheKey = 'stats'
  
  // Check cache first
  if (useCache) {
    const cached = getCachedData(cacheKey)
    if (cached) {
      return cached
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}?type=stats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`)
    }
    
    const data = await response.json()
    const stats = data.stats || {
      total_donars: 0,
      total_cases: 0,
      our_volunteers: 0
    }
    
    // Cache the result
    setCachedData(cacheKey, stats)
    
    return stats
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Return cached data if available
    const cached = cache.get(cacheKey)
    if (cached) {
      return cached.data
    }
    // Return default values
    return {
      total_donors: 0,
      total_cases: 0,
      our_volunteers: 0
    }
  }
}

