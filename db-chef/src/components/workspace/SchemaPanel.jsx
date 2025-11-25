import { useState } from 'react'
import { mockSchema } from '../../data/mockData'

const SchemaNode = ({ name, icon, children, level = 0 }) => {
  const [isOpen, setIsOpen] = useState(level === 0)

  return (
    <div className="select-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 hover:bg-dark-bg rounded-lg cursor-pointer transition-colors"
      >
        {children && (
          <span className="text-xs">
            {isOpen ? '▼' : '▶'}
          </span>
        )}
        {!children && <span className="text-xs opacity-0">▶</span>}
        <span>{icon}</span>
        <span className="text-sm">{name}</span>
      </div>

      {children && isOpen && (
        <div className="ml-6 mt-1 space-y-1">
          {children}
        </div>
      )}
    </div>
  )
}

export default function SchemaPanel() {
  return (
    <div className="bg-dark-bg-light rounded-xl border border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <h3 className="font-semibold">Schema</h3>
        <button className="px-3 py-1 text-sm hover:bg-dark-bg-lighter rounded transition-colors">
          Refresh
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {mockSchema.schemas.map(schema => (
          <SchemaNode key={schema.name} name={schema.name} icon="📁" level={0}>
            {schema.tables.map(table => (
              <SchemaNode key={table.name} name={table.name} icon="📊" level={1}>
                {table.columns.map(col => (
                  <SchemaNode 
                    key={col.name} 
                    name={`${col.name}${col.type ? ` (${col.type})` : ''}`}
                    icon="📌" 
                    level={2}
                  />
                ))}
              </SchemaNode>
            ))}
          </SchemaNode>
        ))}
      </div>
    </div>
  )
}
