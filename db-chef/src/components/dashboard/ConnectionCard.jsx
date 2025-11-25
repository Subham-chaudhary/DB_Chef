import { useNavigate } from 'react-router-dom'
import { getProviderById } from '../../data/dbProviders'

export default function ConnectionCard({ connection, onDelete }) {
  const navigate = useNavigate()
  const provider = getProviderById(connection.provider)

  const handleConnect = () => {
    navigate(`/workspace/${connection.id}`)
  }

  return (
    <div 
      onClick={handleConnect}
      className="bg-dark-bg-light p-6 rounded-xl border border-gray-700 hover:border-primary transition-all cursor-pointer hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{provider?.icon}</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-100">{connection.name}</h3>
            <p className="text-sm text-gray-400">{provider?.name} • {connection.host}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          connection.status === 'active' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-gray-700 text-gray-400'
        }`}>
          {connection.status}
        </span>
      </div>

      <div className="text-sm text-gray-400 space-y-1">
        <p>Database: {connection.database}</p>
        <p>Port: {connection.port}</p>
      </div>
    </div>
  )
}
