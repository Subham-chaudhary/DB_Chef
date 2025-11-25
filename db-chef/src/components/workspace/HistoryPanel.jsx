import { useState } from 'react'

export default function HistoryPanel({ onRerun, showToast }) {
  const [history, setHistory] = useState([
    { id: 1, text: 'List all tables', timestamp: new Date() },
    { id: 2, text: 'Convert MySQL to PostgreSQL', timestamp: new Date() },
  ])

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    showToast('Copied to clipboard', 'success')
  }

  const handleClear = () => {
    setHistory([])
    showToast('History cleared', 'success')
  }

  return (
    <div className="bg-dark-bg-light rounded-xl border border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h3 className="font-semibold">History</h3>
        <button 
          onClick={handleClear}
          className="px-3 py-1 text-sm hover:bg-dark-bg-lighter rounded transition-colors"
        >
          Clear
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {history.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-8">
            No history yet
          </div>
        ) : (
          history.map(item => (
            <div
              key={item.id}
              className="bg-dark-bg p-3 rounded-lg border border-transparent hover:border-primary transition-colors cursor-pointer"
            >
              <p className="text-sm mb-2 truncate">{item.text}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => onRerun(item.text)}
                  className="text-xs text-gray-400 hover:text-primary transition-colors"
                >
                  ↻ Rerun
                </button>
                <button
                  onClick={() => handleCopy(item.text)}
                  className="text-xs text-gray-400 hover:text-primary transition-colors"
                >
                  📋 Copy
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
