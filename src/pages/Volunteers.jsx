import { useState } from 'react'

const Volunteers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  // Replace with your Google Form URL or email
  const GOOGLE_FORM_URL = 'YOUR_GOOGLE_FORM_URL_HERE'

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Option 1: Submit to Google Form (requires form setup)
    // window.open(`${GOOGLE_FORM_URL}?entry.NAME=${formData.name}&entry.EMAIL=${formData.email}&entry.PHONE=${formData.phone}&entry.MESSAGE=${formData.message}`, '_blank')
    
    // Option 2: Use mailto (simple but requires email client)
    const subject = encodeURIComponent('Volunteer Application - Muslimah Charity Trust')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    )
    window.location.href = `mailto:volunteers@muslimahcharitytrust.org?subject=${subject}&body=${body}`
    
    setSubmitted(true)
    setFormData({ name: '', email: '', phone: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Join Us as a Volunteer
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Make a difference in your community by volunteering with us
        </p>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Why Volunteer?
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Volunteering with Muslimah Charity Trust is a rewarding experience that allows
              you to make a tangible impact in the lives of those in need. Our volunteers
              are the backbone of our organization, helping us reach more people and create
              lasting change in our communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Community Impact</h3>
                <p className="text-sm">
                  Directly contribute to improving lives in your community
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Skill Development</h3>
                <p className="text-sm">
                  Gain valuable experience and develop new skills
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Networking</h3>
                <p className="text-sm">
                  Connect with like-minded individuals and organizations
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-primary mb-2">Personal Growth</h3>
                <p className="text-sm">
                  Experience personal fulfillment and growth through service
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Volunteer Application Form
          </h2>
          {submitted && (
            <div className="mb-6 p-4 bg-green-50 border border-primary rounded-md">
              <p className="text-primary font-semibold">
                Thank you! Your application has been submitted. We'll get back to you soon.
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to volunteer? *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tell us about yourself and why you'd like to volunteer"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition-colors duration-200"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Volunteers


