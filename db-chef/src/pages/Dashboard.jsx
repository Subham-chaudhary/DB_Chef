import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import DBCarousel from '../components/dashboard/DBCarousel'
import ConnectionCard from '../components/dashboard/ConnectionCard'
import ConnectionModal from '../components/dashboard/ConnectionModal'
import { mockConnections } from '../data/mockData'

export default function Dashboard({ showToast }) {
  const [connections, setConnections] = useState(mockConnections)
  const [selectedDB, setSelectedDB] = useState('postgresql')
  const [modalOpen, setModalOpen] = useState(false)

  const handleSaveConnection = (newConnection) => {
    const connection = {
      ...newConnection,
      id: connections.length + 1
    }
    setConnections(prev => [...prev, connection])
  }

  const handleDeleteConnection = (id) => {
    setConnections(prev => prev.filter(c => c.id !== id))
    showToast('Connection deleted', 'success')
  }

  return (
    <div>
      <Navbar showAuth={false} />

      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Database Connections</h1>
          <p className="text-gray-400">
            Manage your database connections and start chatting with your data
          </p>
        </div>

        {/* DB Carousel */}
        <DBCarousel 
          selectedDB={selectedDB} 
          onSelectDB={setSelectedDB} 
        />

        {/* Connections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map(conn => (
            <ConnectionCard 
              key={conn.id} 
              connection={conn}
              onDelete={handleDeleteConnection}
            />
          ))}

          {/* New Connection Card */}
          <div
            onClick={() => setModalOpen(true)}
            className="bg-transparent border-2 border-dashed border-gray-700 hover:border-primary rounded-xl p-6 flex flex-col items-center justify-center gap-4 min-h-[200px] cursor-pointer transition-all hover:bg-primary/5"
          >
            <span className="text-5xl">+</span>
            <span className="font-semibold">New Connection</span>
          </div>
        </div>
      </div>

      {/* Connection Modal */}
      <ConnectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedProvider={selectedDB}
        onSave={handleSaveConnection}
        showToast={showToast}
      />
    </div>
  )
}
