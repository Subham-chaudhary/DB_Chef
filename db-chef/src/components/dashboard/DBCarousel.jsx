import { useState, useRef } from 'react'
import { dbProviders } from '../../data/dbProviders'

export default function DBCarousel({ selectedDB, onSelectDB }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const trackRef = useRef(null)

  const scroll = (direction) => {
    const scrollAmount = 300
    const newPosition = scrollPosition + (direction * scrollAmount)
    setScrollPosition(newPosition)
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${newPosition}px)`
    }
  }

  return (
    <div className="bg-dark-bg-light p-6 rounded-xl border border-gray-700 mb-6">
      <label className="block font-semibold mb-4 text-gray-200">Select Database Type</label>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll(1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-bg-lighter border border-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Carousel Track */}
        <div className="overflow-hidden mx-12">
          <div 
            ref={trackRef}
            className="flex gap-6 transition-transform duration-300"
          >
            {dbProviders.map((db) => (
              <button
                key={db.id}
                onClick={() => onSelectDB(db.id)}
                className={`flex-shrink-0 w-20 h-20 rounded-full border-2 flex items-center justify-center text-4xl transition-all hover:scale-110 hover:border-primary group relative ${
                  selectedDB === db.id 
                    ? 'border-primary bg-primary/10' 
                    : 'border-gray-600 bg-dark-bg'
                }`}
              >
                {db.icon}

                {/* Tooltip */}
                <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-dark-bg-lighter px-3 py-1.5 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {db.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll(-1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-dark-bg-lighter border border-gray-600 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
