import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
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
          <div className="md:hidden py-4 space-y-2">
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
  )
}

export default Navbar


