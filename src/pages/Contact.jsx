import { useState } from 'react'
import WorldMap from '../components/ui/WorldMap'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Use mailto for simple contact form
    const subject = encodeURIComponent('Contact from Muslimah Charity Trust Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:info@muslimahcharitytrust.org?subject=${subject}&body=${body}`
    
    setSubmitted(true)
    setFormData({ name: '', email: '', company: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  // Bangalore RT Nagar coordinates
  const bangaloreLocation = {
    lat: 13.0246,
    lng: 77.5946,
    label: 'We are here'
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Contact Info & Map */}
        <div className="bg-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Icon */}
          <div className="mb-8">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Contact us
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-md">
              We are always looking for ways to improve our services and help more people. 
              Contact us and let us know how we can help you or how you can help us.
            </p>
          </div>

          {/* Contact Details */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 text-sm text-gray-700">
              <a
                href="mailto:info@muslimahcharitytrust.org"
                className="hover:text-primary transition-colors"
              >
                info@muslimahcharitytrust.org
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="tel:+911234567890"
                className="hover:text-primary transition-colors"
              >
                +91 1234567890
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="mailto:support@muslimahcharitytrust.org"
                className="hover:text-primary transition-colors"
              >
                support@muslimahcharitytrust.org
              </a>
            </div>
          </div>

          {/* World Map */}
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
            <WorldMap location={bangaloreLocation} />
          </div>

          {/* Address */}
          <div className="mt-4 text-sm text-gray-600">
            <p>RT Nagar, Bangalore</p>
            <p>Karnataka, India</p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white p-8 lg:p-12 flex items-center relative">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
          
          <div className="w-full max-w-lg mx-auto relative z-10">
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-primary rounded-md">
                <p className="text-primary font-semibold">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors placeholder-gray-400"
                  placeholder="Enter your company (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-y placeholder-gray-400"
                  placeholder="Type your message here"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


