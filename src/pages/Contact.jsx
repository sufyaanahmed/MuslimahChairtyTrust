import { useState } from 'react'

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

  const socialMediaLinks = {
    instagram: 'https://www.instagram.com/muslimahcharitytrust',
    facebook: 'https://www.facebook.com/muslimahcharitytrust',
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

          {/* Social Media Cards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {/* Instagram Card */}
              <a
                href={socialMediaLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center text-white"
              >
                <svg
                  className="w-8 h-8 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-sm font-medium">Instagram</span>
              </a>

              {/* Facebook Card */}
              <a
                href={socialMediaLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 flex flex-col items-center justify-center text-white"
              >
                <svg
                  className="w-8 h-8 mb-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-900 mb-2">Address</p>
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


