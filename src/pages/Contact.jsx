import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
    const subject = encodeURIComponent(formData.subject || 'Contact from Muslimah Charity Trust Website')
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    window.location.href = `mailto:info@muslimahcharitytrust.org?subject=${subject}&body=${body}`
    
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Get in touch with us. We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-primary mb-2">Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:info@muslimahcharitytrust.org" className="hover:text-primary transition-colors">
                    info@muslimahcharitytrust.org
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Phone</h3>
                <p className="text-gray-700">
                  <a href="tel:+911234567890" className="hover:text-primary transition-colors">
                    +91 1234567890
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Address</h3>
                <p className="text-gray-700">
                  Your Trust Address<br />
                  City, State - PIN Code<br />
                  India
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">Office Hours</h3>
                <p className="text-gray-700">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Send us a Message
            </h2>
            {submitted && (
              <div className="mb-6 p-4 bg-green-50 border border-primary rounded-md">
                <p className="text-primary font-semibold">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your name"
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
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your message"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


