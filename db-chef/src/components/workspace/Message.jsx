import { useState } from 'react'

const CodeBlock = ({ code, language = 'sql' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-3">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs uppercase text-gray-400 font-semibold">{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-3 py-1 bg-gray-700 hover:bg-primary rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-gray-200 font-mono">
          {code}
        </code>
      </pre>
    </div>
  )
}

const parseMessage = (content) => {
  const parts = []
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
  let lastIndex = 0
  let match

  while ((match = codeBlockRegex.exec(content)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex, match.index)
      })
    }

    // Add code block
    parts.push({
      type: 'code',
      language: match[1] || 'text',
      content: match[2].trim()
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.slice(lastIndex)
    })
  }

  return parts.length > 0 ? parts : [{ type: 'text', content }]
}

export default function Message({ role, content, timestamp }) {
  const isUser = role === 'user'
  const parts = parseMessage(content)

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
        isUser ? 'bg-secondary' : 'bg-primary'
      }`}>
        {isUser ? '👤' : '👨‍🍳'}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold">{isUser ? 'You' : 'DB Chef'}</span>
          <span className="text-xs text-gray-500">{formatTime(timestamp)}</span>
        </div>

        <div className="bg-dark-bg rounded-lg px-4 py-3">
          {parts.map((part, index) => (
            part.type === 'code' ? (
              <CodeBlock key={index} code={part.content} language={part.language} />
            ) : (
              <div key={index} className="text-gray-200 whitespace-pre-wrap">
                {part.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {line.split('**').map((segment, j) => 
                      j % 2 === 1 ? <strong key={j}>{segment}</strong> : segment
                    )}
                  </p>
                ))}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}
