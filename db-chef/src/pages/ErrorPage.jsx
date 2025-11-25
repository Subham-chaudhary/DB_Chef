import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

export default function ErrorPage() {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar showAuth={false} />

      <div className="container mx-auto px-6 min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-4xl font-bold mb-4">Connection Failed</h1>
          <p className="text-gray-400 mb-8">
            We couldn't connect to your database. Please check your connection details and try again.
          </p>

          <div className="bg-dark-bg-light p-8 rounded-xl border border-gray-700 text-left mb-8">
            <h3 className="text-xl font-semibold mb-4">Common Issues:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Verify your host and port are correct</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Check that your username and password are valid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Ensure the database name exists</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Confirm SSL settings match your database configuration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Check if your firewall allows connections to this database</span>
              </li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
