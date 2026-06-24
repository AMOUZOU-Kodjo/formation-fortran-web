import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  return (<>
    <Helmet><title>Admin | Formation Fortran 95</title></Helmet>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">⚙️ Administration</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/students" className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all">
          <div className="card-body items-center text-center p-6">
            <div className="text-3xl mb-2">👥</div>
            <h2 className="font-bold">Étudiants</h2>
            <p className="text-sm text-base-content/50">Gérer les étudiants</p>
          </div>
        </Link>
        <Link to="/admin/courses" className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all">
          <div className="card-body items-center text-center p-6">
            <div className="text-3xl mb-2">📚</div>
            <h2 className="font-bold">Cours</h2>
            <p className="text-sm text-base-content/50">Gérer les modules</p>
          </div>
        </Link>
        <Link to="/" className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all">
          <div className="card-body items-center text-center p-6">
            <div className="text-3xl mb-2">🏠</div>
            <h2 className="font-bold">Accueil</h2>
            <p className="text-sm text-base-content/50">Retour au site</p>
          </div>
        </Link>
      </div>
    </div>
  </>)
}
