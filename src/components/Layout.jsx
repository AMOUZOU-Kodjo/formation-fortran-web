import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const NAVS = [
  { path: '/', label: 'Accueil', icon: '🏠' },
  { path: '/curriculum', label: 'Programme', icon: '📚' },
  { path: '/progress', label: 'Progression', icon: '📊', auth: true },
  { path: '/profile', label: 'Profil', icon: '👤', auth: true },
  { path: '/certificate', label: 'Certificat', icon: '🎓', auth: true },
]

export default function Layout({ children }) {
  const loc = useLocation()
  const { user, signOut, isAdmin } = useAuth()

  const handleLogout = async () => { await signOut() }

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <nav className="navbar bg-base-200 border-b border-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="drawer" className="btn btn-square btn-ghost">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </label>
          </div>
          <div className="flex-1"><Link to="/" className="text-lg font-bold">Fortran 95</Link></div>
          {user && (
            <div className="flex-none">
              <Link to="/profile" className="btn btn-ghost btn-sm">{user.email?.charAt(0).toUpperCase()}</Link>
            </div>
          )}
        </nav>
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
      <div className="drawer-side">
        <label htmlFor="drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 border-r border-base-300 w-64 min-h-screen flex flex-col">
          <div className="p-5 border-b border-base-300">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm">F95</div>
              <div>
                <div className="font-bold text-sm">Formation Fortran 95</div>
                <div className="text-xs text-base-content/40">27 modules</div>
              </div>
            </Link>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            {NAVS.map(n => {
              if (n.auth && !user) return null
              const active = loc.pathname === n.path || (n.path !== '/' && loc.pathname.startsWith(n.path))
              return (
                <Link key={n.path} to={n.path} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors no-underline ${active ? 'bg-purple-600 text-white [&_*]:text-white' : 'text-base-content/60 hover:bg-base-300 hover:text-base-content'}`}>
                  <span>{n.icon}</span>
                  <span>{n.label}</span>
                </Link>
              )
            })}
            <div className="pt-3 mt-3 border-t border-base-300">
              <div className="px-3 pb-2 text-xs font-semibold text-base-content/30 uppercase tracking-wider">Ressources</div>
              <a href="https://www.savoirbox.vercel.app/cours-python" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-content/60 hover:bg-base-300 hover:text-base-content no-underline transition-colors">
                <span>📖</span><span>Cours PDF</span>
              </a>
              <a href="https://github.com/AMOUZOU-Kodjo/formation-python-web" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-base-content/60 hover:bg-base-300 hover:text-base-content no-underline transition-colors">
                <span>📂</span><span>Code source</span>
              </a>
            </div>
          </nav>
          <div className="p-3 border-t border-base-300">
            {user ? (
              <div className="space-y-2">
                {isAdmin && <Link to="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:bg-base-300 no-underline">⚙️ Admin</Link>}
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-base-content/60 hover:bg-base-300 w-full text-left cursor-pointer">🚪 Déconnexion</button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link to="/login" className="btn btn-primary btn-sm w-full">Connexion</Link>
                <Link to="/signup" className="btn btn-outline btn-sm w-full">Inscription</Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}
