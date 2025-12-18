import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { cases } = useData()

  const isActive = (path) => location.pathname === path

  const handleDonateNow = () => {
    if (location.pathname === '/') {
      // If on home page, scroll to featured cases section
      const featuredSection = document.getElementById('featured-cases')
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // Trigger highlighting by dispatching a custom event
        window.dispatchEvent(new CustomEvent('highlightCases'))
      }
    } else {
      // Navigate to home and then scroll
      navigate('/')
      setTimeout(() => {
        const featuredSection = document.getElementById('featured-cases')
        if (featuredSection) {
          featuredSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Trigger highlighting by dispatching a custom event
          window.dispatchEvent(new CustomEvent('highlightCases'))
        }
      }, 500)
    }
  }

  return (
    <>
      {/* Top Contact Bar - Desktop Only */}
      <div className="hidden md:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-sm">
          <div className="w-[180px]" />

            <div className="flex items-center gap-6">
              {/* Email */}
              <a
                href="mailto:info@muslimahcharitytrust.org"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <svg
                  className="w-4 h-4 text-primary"
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
                <span>info@muslimahcharitytrust.org</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+918105566551"
                className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
              >
                <svg
                  className="w-4 h-4 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+91 81055 66551</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/918105566551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center hover:bg-green-200 transition-colors"
                  aria-label="WhatsApp us"
                >
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/muslimahcharitytrust?igsh=MXJ3b2ZvYzR6azE5ZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <svg
                    className="w-4 h-4 text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/Logo.jpeg" 
              alt="Muslimah Charity Trust Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="text-2xl font-bold text-primary">
              Muslimah Charity Trust
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/cases"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/cases') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Cases
            </Link>
            <Link
              to="/volunteers"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/volunteers') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Volunteers
            </Link>
            <Link
              to="/gallery"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/gallery') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Gallery
            </Link>

            {/* About dropdown: Story + Blogs */}
            <div className="relative group">
              <button
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive('/story') || isActive('/blog')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                About
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 7L10 12L15 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-40 rounded-md bg-white shadow-lg py-2 opacity-0 group-hover:opacity-100 transform -translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                <Link
                  to="/story"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent/20 hover:text-primary"
                >
                  Our Story
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-accent/20 hover:text-primary"
                >
                  Blogs
                </Link>
              </div>
            </div>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/contact') ? 'text-primary border-b-2 border-primary' : 'text-gray-700 hover:text-primary'
              }`}
            >
              Contact
            </Link>

            {/* Donate Now Button */}
            <button
              onClick={handleDonateNow}
              className="ml-4 bg-primary text-white px-6 py-2 rounded-full font-semibold hover:bg-primary/80 transition-colors flex items-center gap-2 shadow-md"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              DONATE NOW
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 bg-white border-t border-gray-200">
            {/* Donate Now Button - Mobile */}
            <button
              onClick={() => {
                setIsOpen(false)
                handleDonateNow()
              }}
              className="w-full mx-3 mb-4 bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-md"
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              DONATE NOW
            </button>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/') ? 'text-primary bg-accent/10' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/cases"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/cases') ? 'text-primary bg-accent/10' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Cases
            </Link>
            <Link
              to="/volunteers"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/volunteers')
                  ? 'text-primary bg-accent/10'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Volunteers
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/gallery')
                  ? 'text-primary bg-accent/10'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Gallery
            </Link>

            {/* About group */}
            <div className="border-t border-gray-100 pt-2 mt-2">
              <p className="px-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                About
              </p>
              <Link
                to="/story"
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/story')
                    ? 'text-primary bg-accent/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                Our Story
              </Link>
              <Link
                to="/blog"
                onClick={() => setIsOpen(false)}
                className={`block px-5 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/blog')
                    ? 'text-primary bg-accent/10'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
              >
                Blogs
              </Link>
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                isActive('/contact')
                  ? 'text-primary bg-accent/10'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </div>
        )}
        </div>
      </nav>
    </>
  )
}


export default Navbar;


