import { useState, useEffect } from 'react'
import { getProviderById } from '../../data/dbProviders'

export default function ConnectionModal({ isOpen, onClose, selectedProvider, onSave, showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
    ssl: false
  })
  const [testing, setTesting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const provider = getProviderById(selectedProvider)

  useEffect(() => {
    if (provider) {
      setFormData(prev => ({
        ...prev,
        port: provider.port || ''
      }))
    }
  }, [provider])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTesting(true)

    // Simulate connection test
    setTimeout(() => {
      const success = Math.random() > 0.2
      setTesting(false)

      if (success) {
        showToast('Connection successful!', 'success')
        onSave({
          ...formData,
          provider: selectedProvider,
          status: 'active',
          createdAt: new Date().toISOString()
        })
        onClose()
        // Reset form
        setFormData({
          name: '',
          host: '',
          port: provider?.port || '',
          username: '',
          password: '',
          database: '',
          ssl: false
        })
      } else {
        showToast('Connection failed. Check your credentials.', 'error')
      }
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-dark-bg-light rounded-xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold">New Connection</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Provider (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-2">Database Provider</label>
            <div className="flex items-center gap-3 px-4 py-3 bg-dark-bg rounded-lg border border-gray-700">
              <span className="text-2xl">{provider?.icon}</span>
              <span className="font-semibold">{provider?.name}</span>
            </div>
          </div>

          {/* Connection Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Connection Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="My Production DB"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Host */}
          <div>
            <label htmlFor="host" className="block text-sm font-medium mb-2">Host</label>
            <input
              type="text"
              id="host"
              name="host"
              value={formData.host}
              onChange={handleChange}
              placeholder="localhost or db.example.com"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Port */}
          <div>
            <label htmlFor="port" className="block text-sm font-medium mb-2">Port</label>
            <input
              type="number"
              id="port"
              name="port"
              value={formData.port}
              onChange={handleChange}
              placeholder="5432"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="postgres"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Database */}
          <div>
            <label htmlFor="database" className="block text-sm font-medium mb-2">Database Name</label>
            <input
              type="text"
              id="database"
              name="database"
              value={formData.database}
              onChange={handleChange}
              placeholder="mydb"
              required
              className="w-full px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          {/* SSL */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="ssl"
              name="ssl"
              checked={formData.ssl}
              onChange={handleChange}
              className="w-5 h-5 rounded border-gray-700 text-primary focus:ring-primary focus:ring-offset-dark-bg"
            />
            <label htmlFor="ssl" className="text-sm font-medium cursor-pointer">Enable SSL</label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={testing}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {testing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Testing Connection...
              </>
            ) : (
              'Test Connection'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
