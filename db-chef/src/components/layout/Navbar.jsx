import { Link, useNavigate } from 'react-router-dom'

const ChefHat = ({ className = "w-8 h-8" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8C24 8 20 14 20 20C20 20 16 20 14 24C12 28 14 32 14 32C14 32 12 36 16 40C20 44 24 44 24 44V52C24 56 28 60 32 60C36 60 40 56 40 52V44C40 44 44 44 48 40C52 36 50 32 50 32C50 32 52 28 50 24C48 20 44 20 44 20C44 14 40 8 32 8Z" 
      fill="currentColor"
    />
  </svg>
)

export default function Navbar({ showAuth = true, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (onLogout) onLogout()
    navigate('/')
  }

  return (
    <nav className="bg-dark-bg-light border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors">
            <ChefHat />
            <span className="text-2xl font-bold">DB Chef</span>
          </Link>

          {/* Nav Links */}
          {showAuth ? (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-gray-300 hover:text-primary transition-colors font-medium">
                Sign In
              </Link>
              <Link 
                to="/register"
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="text-gray-300 hover:text-primary transition-colors font-medium">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-300 hover:bg-dark-bg-lighter rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export { ChefHat }
