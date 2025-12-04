import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Navigation() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-pink-600">
            Portfolio
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 transition-colors`}
            >
              About
            </Link>
            <Link
              to="/projects"
              className={`${
                isActive('/projects') ? 'text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 transition-colors`}
            >
              Projects
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive('/contact') ? 'text-gray-900' : 'text-gray-600'
              } hover:text-gray-900 transition-colors`}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                onClick={handleLinkClick}
                className={`${
                  isActive('/') ? 'text-gray-900 font-medium' : 'text-gray-600'
                } hover:text-gray-900 transition-colors`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className={`${
                  isActive('/about') ? 'text-gray-900 font-medium' : 'text-gray-600'
                } hover:text-gray-900 transition-colors`}
              >
                About
              </Link>
              <Link
                to="/projects"
                onClick={handleLinkClick}
                className={`${
                  isActive('/projects') ? 'text-gray-900 font-medium' : 'text-gray-600'
                } hover:text-gray-900 transition-colors`}
              >
                Projects
              </Link>
              <Link
                to="/contact"
                onClick={handleLinkClick}
                className={`${
                  isActive('/contact') ? 'text-gray-900 font-medium' : 'text-gray-600'
                } hover:text-gray-900 transition-colors`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation

