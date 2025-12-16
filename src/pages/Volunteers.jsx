import { useEffect, useRef, useState } from 'react'
import { submitVolunteerApplication } from '../api/api'
import { Highlighter } from '../components/ui/Highlighter'

const Volunteers = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    age: '',
    gender: '',
    interested_areas: [],
    blood_group: '',
    address: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const confirmRef = useRef(null)
  const successRef = useRef(null)

  const INTEREST_OPTIONS = [
    'Photography',
    'Inventory management',
    'Procurement',
    'Packing',
    'Survey',
    'Distribution',
    'Driving',
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (value) => {
    setFormData((prev) => {
      const exists = prev.interested_areas.includes(value)
      const updated = exists
        ? prev.interested_areas.filter((item) => item !== value)
        : [...prev.interested_areas, value]
      return { ...prev, interested_areas: updated }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Phone validation: require a valid "+91 12345 67890" style number
    const phoneTrimmed = formData.phone_number.trim()
    const phonePattern = /^\+?\d{1,3}\s?\d{5}\s?\d{5}$/

    if (!phonePattern.test(phoneTrimmed)) {
      alert('Please enter a valid phone number, e.g. "+91 12345 67890".')
      return
    }

    setShowConfirm(true)
  }

  const handleConfirmSubmit = async () => {
    setShowConfirm(false)
    setSubmitting(true)
    
    try {
      // Ensure interested_areas is a string (handle empty array case)
      const interestedAreasString = Array.isArray(formData.interested_areas) && formData.interested_areas.length > 0
        ? formData.interested_areas.join(', ')
        : (formData.interested_areas || '')
      
      console.log('Submitting form with data:', {
        ...formData,
        interested_areas: interestedAreasString
      })
      
      await submitVolunteerApplication({
        ...formData,
        interested_areas: interestedAreasString,
      })
      setSubmitted(true)
      setFormData({
        full_name: '',
        phone_number: '',
        email: '',
        age: '',
        gender: '',
        interested_areas: [],
        blood_group: '',
        address: '',
      })
      // Scroll to success message
      setTimeout(() => {
        if (successRef.current) {
          successRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('=== VOLUNTEER FORM SUBMISSION ERROR ===')
      console.error('Error object:', error)
      console.error('Error message:', error.message)
      console.error('Error name:', error.name)
      console.error('Error stack:', error.stack)
      console.error('Form data:', formData)
      console.error('========================================')
      
      const errorMessage = error.message || 'Failed to submit application. Please try again.'
      alert(`Error: ${errorMessage}\n\nCheck the browser console (F12) for more details.`)
      
      // Re-throw to see full error in console
      throw error
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancelConfirm = () => {
    setShowConfirm(false)
  }

  useEffect(() => {
    if (showConfirm && confirmRef.current) {
      confirmRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showConfirm])

  return (
    <div className="py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Volunteer Registration
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Fill out the form below to register
        </p>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
            🌿 Become Part of Our Mission
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4 leading-relaxed">
            <p>
              At Muslimah Charity Trust, our strength lies in compassion, unity, and service. 
              As a{' '}
              <Highlighter action="highlight" color="#FFE4B5">
                women-led organisation
              </Highlighter>
              {' '}supported by dedicated{' '}
              <Highlighter action="underline" color="#22c55e">
                brothers and sisters in our community
              </Highlighter>
              , we work together to uplift families,{' '}
              <Highlighter action="highlight" color="#FFE4B5">
                empower women and children
              </Highlighter>
              , and bring hope to those in need.
            </p>
            <p>
              We welcome individuals who share our passion for meaningful change. Whether you wish 
              to contribute your time, skills, or simply offer a helping hand, your presence can 
              make a real difference.
            </p>
            <p>
              If you feel the call to serve, we'd love to hear from you.
            </p>
            <p className="font-semibold text-primary text-center">
              Together, we can spread kindness and build stronger communities.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          {submitted && (
            <div ref={successRef} className="mb-6 p-4 bg-accent/10 border border-primary rounded-md">
              <p className="text-primary font-semibold">
                Thank you! Your volunteer application has been submitted successfully. We'll get back to you soon.
              </p>
            </div>
          )}

          {/* Confirmation Dialog */}
          {showConfirm && (
            <div ref={confirmRef} className="mb-6 p-6 bg-accent/10 border-2 border-primary rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Please review your information:
              </h3>
              <div className="space-y-2 text-sm text-gray-700 mb-4">
                <p><strong>Full Name:</strong> {formData.full_name}</p>
                <p><strong>Phone Number:</strong> {formData.phone_number}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Age:</strong> {formData.age}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Interested Areas:</strong> {formData.interested_areas.join(', ')}</p>
                <p><strong>Blood Group:</strong> {formData.blood_group}</p>
                <p><strong>Address:</strong> {formData.address}</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmSubmit}
                  disabled={submitting}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-primary/80 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Confirm & Submit'}
                </button>
                <button
                  onClick={handleCancelConfirm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-300 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                placeholder="Enter your full name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="+91 12345 67890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Interested areas *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEREST_OPTIONS.map((option) => {
                  const checked = formData.interested_areas.includes(option)
                  return (
                    <label
                      key={option}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                        checked ? 'border-primary bg-accent/10' : 'border-gray-200 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary rounded"
                        checked={checked}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <span className="text-gray-800 text-sm">{option}</span>
                    </label>
                  )
                })}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                You can select multiple areas you are interested in.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blood Group
              </label>
              <select
                name="blood_group"
                value={formData.blood_group}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y placeholder-gray-400"
                placeholder="Enter your full address"
              />
            </div>

            <button
              type="submit"
              disabled={submitting || showConfirm}
              className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-primary/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Volunteers
