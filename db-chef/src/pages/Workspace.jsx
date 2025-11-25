import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChefHat } from '../components/layout/Navbar'
import SchemaPanel from '../components/workspace/SchemaPanel'
import ChatPanel from '../components/workspace/ChatPanel'
import HistoryPanel from '../components/workspace/HistoryPanel'
import { mockConnections } from '../data/mockData'
import { getProviderById } from '../data/dbProviders'

export default function Workspace({ showToast }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const chefHatRef = useRef(null)

  const connection = mockConnections.find(c => c.id === parseInt(id))
  const provider = getProviderById(connection?.provider)

  const animateChefHat = () => {
    if (chefHatRef.current) {
      chefHatRef.current.classList.add('animate-bounce-once')
      setTimeout(() => {
        chefHatRef.current?.classList.remove('animate-bounce-once')
      }, 500)
    }
  }

  const handleRerunPrompt = (prompt) => {
    // This would trigger the chat to rerun the prompt
    showToast('Rerunning prompt', 'success')
  }

  if (!connection) {
    return <div className="p-8 text-center">Connection not found</div>
  }

  return (
    <div className="h-screen flex flex-col bg-dark-bg">
      {/* Header */}
      <div className="bg-dark-bg-light border-b border-gray-700 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
            >
              <ChefHat className="w-6 h-6" ref={chefHatRef} />
              <span className="text-xl font-bold">DB Chef</span>
            </button>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{provider?.icon}</span>
              <span className="font-semibold">{connection.name}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 hover:bg-dark-bg-lighter rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[250px_1fr_300px] gap-4 p-4 overflow-hidden">
        {/* Schema Panel */}
        <div className="hidden lg:block">
          <SchemaPanel />
        </div>

        {/* Chat Panel */}
        <ChatPanel 
          showToast={showToast}
          onChefHatAnimate={animateChefHat}
        />

        {/* History Panel */}
        <div className="hidden lg:block">
          <HistoryPanel 
            onRerun={handleRerunPrompt}
            showToast={showToast}
          />
        </div>
      </div>
    </div>
  )
}
