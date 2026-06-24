import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <div className="text-center p-10"><h2 className="text-xl font-bold">Accès refusé</h2><p className="text-base-content/60">Admin uniquement</p></div>
  return children
}
