import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading, isConfigured } = useAuth()
  const loc = useLocation()
  if (!isConfigured) return <div className="text-center p-10 text-base-content/60">Supabase non configuré</div>
  if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>
  if (!user) return <Navigate to="/login" state={{ from: loc }} replace />
  return children
}
