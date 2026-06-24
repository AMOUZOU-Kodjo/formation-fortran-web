import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MODULES, PARTS, TOTAL_MODULES, TOTAL_PARTS } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'

export default function Curriculum() {
  const { user } = useAuth()
  const { getOverallProgress } = useProgress(user)
  const stats = getOverallProgress(TOTAL_MODULES)

  return (<>
    <Helmet>
      <title>Programme | Formation Fortran 95</title>
      <meta name="description" content="Découvrez le programme complet de la formation Fortran 95 : 27 modules répartis en 4 parties, du débutant à l'expert." />
    </Helmet>
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">📚 Programme</h1>
        {user && (
          <div className="text-sm text-base-content/60">{stats.completed}/{TOTAL_MODULES} modules complétés ({stats.percent}%)</div>
        )}
      </div>
      {PARTS.map(part => {
        const mods = MODULES.filter(m => m.part === part.id)
        return (
          <div key={part.id} className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-8 rounded-full" style={{ background: part.color }} />
              <div>
                <div className="text-xs text-base-content/40 font-semibold uppercase tracking-wide">Partie {part.id}</div>
                <h2 className="text-xl font-bold">{part.title}</h2>
                <p className="text-sm text-base-content/50">{part.desc}</p>
              </div>
            </div>
            <div className="space-y-2">
              {mods.map((m, i) => {
                const idx = MODULES.indexOf(m)
                const completed = stats.moduleDetails?.completed?.[idx]
                return (
                  <Link key={m.id} to={user ? `/module/${m.id}` : '/login'} className={`card bg-base-200 border border-base-300 hover:border-primary/40 transition-all no-underline group ${completed ? 'border-l-4 border-l-success' : ''}`}>
                    <div className="card-body p-4 md:p-5">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl shrink-0 w-10 text-center">{completed ? '✅' : m.icon}</div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs text-base-content/40 font-mono">{m.id.slice(0, 2)}</div>
                          <h3 className="font-bold text-sm md:text-base truncate">{m.title}</h3>
                          <p className="text-xs text-base-content/50 line-clamp-1">{m.desc}</p>
                        </div>
                        <div className="text-xs text-base-content/30 shrink-0">{m.duration}</div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  </>)
}
