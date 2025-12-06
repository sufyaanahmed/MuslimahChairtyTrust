import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">
              Muslimah Charity Trust
            </h3>
            <p className="text-gray-400">
              Empowering communities through compassion and care.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/cases" className="text-gray-400 hover:text-primary transition-colors">
                  Donate Now
                </Link>
              </li>
              <li>
                <Link to="/volunteers" className="text-gray-400 hover:text-primary transition-colors">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/story" className="text-gray-400 hover:text-primary transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@muslimahcharitytrust.org</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Your Trust Address</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Muslimah Charity Trust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


