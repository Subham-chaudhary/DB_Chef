import { useState, useRef, useEffect } from 'react'
import Message from './Message'
import { getResponseForMessage } from '../../data/mockData'

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center h-full text-center p-8">
    <div className="text-6xl mb-4 opacity-50">💬</div>
    <p className="text-gray-400 mb-2">No conversation yet</p>
    <p className="text-sm text-gray-500">
      Try asking "List all tables" or "Convert this MySQL query to PostgreSQL"
    </p>
  </div>
)

export default function ChatPanel({ showToast, onChefHatAnimate }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Welcome message
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m your database assistant. How can I help you today?',
      timestamp: new Date()
    }])
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    // Simulate AI response
    setTimeout(() => {
      const response = getResponseForMessage(input)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }])
      onChefHatAnimate()
    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const insertPrompt = (prompt) => {
    setInput(prompt)
    textareaRef.current?.focus()
  }

  const handleTextareaChange = (e) => {
    setInput(e.target.value)
    // Auto-resize
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  return (
    <div className="bg-dark-bg-light rounded-xl border border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-700">
        <h3 className="font-semibold">Chat Assistant</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {messages.map((msg, index) => (
              <Message key={index} {...msg} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => insertPrompt('List all tables')}
            className="px-3 py-1.5 text-sm bg-dark-bg border border-gray-700 hover:border-primary rounded-lg transition-colors"
          >
            📋 List Tables
          </button>
          <button
            onClick={() => insertPrompt('Explain this query')}
            className="px-3 py-1.5 text-sm bg-dark-bg border border-gray-700 hover:border-primary rounded-lg transition-colors"
          >
            💡 Explain Query
          </button>
          <button
            onClick={() => insertPrompt('Convert to PostgreSQL')}
            className="px-3 py-1.5 text-sm bg-dark-bg border border-gray-700 hover:border-primary rounded-lg transition-colors"
          >
            🔄 Convert SQL
          </button>
          <button
            onClick={() => insertPrompt('Generate migration')}
            className="px-3 py-1.5 text-sm bg-dark-bg border border-gray-700 hover:border-primary rounded-lg transition-colors"
          >
            ⚡ Generate Migration
          </button>
        </div>

        {/* Input */}
        <div className="flex gap-2 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows="1"
            className="flex-1 px-4 py-3 bg-dark-bg border border-gray-700 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-11 h-11 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 10L18 2L10 18L8 11L2 10Z" fill="white"/>
            </svg>
          </button>
        </div>

        {/* Hint */}
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send • Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
