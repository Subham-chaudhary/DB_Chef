export default function Toast({ message, type = 'success' }) {
  const bgColor = type === 'success' ? 'bg-primary' : 'bg-red-500'
  const icon = type === 'success' ? '✓' : '⚠'

  return (
    <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg animate-slide-in flex items-center gap-3 min-w-[300px]`}>
      <span className="text-xl font-bold">{icon}</span>
      <span className="font-medium">{message}</span>
    </div>
  )
}
