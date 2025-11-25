import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Workspace from './pages/Workspace'
import ErrorPage from './pages/ErrorPage'
import Toast from './components/layout/Toast'
import { useState } from 'react'

function App() {
  const [toasts, setToasts] = useState([])

  const showToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }

  return (
    <Router>
      <div className="min-h-screen bg-dark-bg text-gray-100">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login showToast={showToast} />} />
          <Route path="/register" element={<Register showToast={showToast} />} />
          <Route path="/dashboard" element={<Dashboard showToast={showToast} />} />
          <Route path="/workspace/:id" element={<Workspace showToast={showToast} />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>

        {/* Toast Container */}
        <div className="fixed bottom-8 right-8 z-50 space-y-2">
          {toasts.map(toast => (
            <Toast key={toast.id} message={toast.message} type={toast.type} />
          ))}
        </div>
      </div>
    </Router>
  )
}

export default App
