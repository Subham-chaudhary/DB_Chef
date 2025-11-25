import Navbar from '../components/layout/Navbar'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🔌',
    title: 'Universal Connections',
    description: 'Connect to PostgreSQL, MySQL, MongoDB, SQLite, Oracle, Redis, Kafka, and more—all from one place.'
  },
  {
    icon: '🤖',
    title: 'AI Chat Assistant',
    description: 'Ask questions in plain English. Convert SQL dialects, generate migrations, and get explanations instantly.'
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Execute queries, browse schemas, and manage connections with a snappy, developer-friendly UI.'
  },
  {
    icon: '🎨',
    title: 'Beautiful Interface',
    description: 'Work in a polished, accessible interface with dark mode and keyboard shortcuts built in.'
  },
  {
    icon: '🔒',
    title: 'Secure & Private',
    description: 'Your credentials stay encrypted. SSL support and secure connections to all your databases.'
  },
  {
    icon: '📊',
    title: 'Schema Explorer',
    description: 'Browse tables, collections, and fields with an intuitive tree view. Right-click for quick actions.'
  }
]

export default function Landing() {
  return (
    <div>
      <Navbar showAuth={true} />

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Database Assistant
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Connect to any database and let AI help you convert queries, generate migrations, 
          and explain complex SQL—all in one beautiful interface.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link 
            to="/register"
            className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-1"
          >
            Try Demo
          </Link>
          <Link 
            to="/login"
            className="px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-lg transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-dark-bg-light py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Everything You Need</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-dark-bg p-8 rounded-xl border border-gray-700 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 text-center text-gray-500">
        <p>Built with ❤️ for developers</p>
      </div>
    </div>
  )
}
