import { Helmet } from 'react-helmet-async'
import { MODULES, PARTS, TOTAL_MODULES } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'

export default function Progress() {
  const { user } = useAuth()
  const { progress, toggleModule, getModuleProgress } = useProgress(user)
  const done = progress.completed?.filter(Boolean).length || 0
  const pct = TOTAL_MODULES ? Math.round(done / TOTAL_MODULES * 100) : 0

  return (<>
    <Helmet>
      <title>Ma progression | Formation Fortran 95</title>
      <meta name="description" content="Suivez votre progression dans la formation Fortran 95 complète." />
    </Helmet>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📊 Ma progression</h1>
      <div className="card bg-base-200 border border-base-300 mb-8">
        <div className="card-body p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-base-content/60">Progression globale</span>
            <span className="text-sm font-bold">{done}/{TOTAL_MODULES} modules ({pct}%)</span>
          </div>
          <progress className="progress progress-primary w-full" value={done} max={TOTAL_MODULES} />
        </div>
      </div>
      {PARTS.map(part => {
        const mods = MODULES.filter(m => m.part === part.id)
        return (
          <div key={part.id} className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-6 rounded-full" style={{ background: part.color }} />
              <h2 className="font-bold">Partie {part.id} : {part.title}</h2>
            </div>
            <div className="space-y-2">
              {mods.map(m => {
                const idx = MODULES.indexOf(m)
                const p = getModuleProgress(m.id)
                return (
                  <div key={m.id} className="card bg-base-200 border border-base-300">
                    <div className="card-body p-3 md:p-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => toggleModule(idx)} className={`btn btn-xs ${p.completed ? 'btn-success' : 'btn-ghost'}`}>{p.completed ? '✅' : '⬜'}</button>
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-medium">{m.title}</span>
                          <div className="flex gap-2 mt-1">
                            {p.quizScore > 0 && <span className="badge badge-xs badge-info">Quiz: {p.quizScore}%</span>}
                            {p.exerciseCompleted && <span className="badge badge-xs badge-success">Exercice ✓</span>}
                            {!p.completed && !p.exerciseCompleted && p.quizScore === 0 && <span className="badge badge-xs badge-ghost">Pas commencé</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  </>)
}
