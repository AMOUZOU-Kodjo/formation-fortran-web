import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { MODULES, PARTS } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'

export default function Home() {
  const { user, isConfigured } = useAuth()
  const { getOverallProgress } = useProgress(user)
  const stats = getOverallProgress(MODULES.length)

  return (<>
    <Helmet>
      <title>Formation Fortran 95 Complète — 27 modules | Du débutant à l'expert</title>
      <meta name="description" content="Formation Fortran 95 complète et progressive : 27 modules, 4 parties, de zéro jusqu'à la maîtrise du calcul scientifique." />
    </Helmet>
    <div className="max-w-6xl mx-auto">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-base-200 to-base-300 border border-base-300 mb-10">
        <div className="relative px-6 md:px-12 py-14 md:py-20 text-center">
          <div className="text-6xl mb-5">💻</div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-blue-400">
              Formation Fortran 95
            </span>
          </h1>
          <p className="text-lg md:text-xl text-base-content/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            Un parcours complet et progressif de 27 modules pour maîtriser Fortran 95,<br className="hidden md:block" />
            du premier programme jusqu'au calcul scientifique haute performance.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/curriculum" className="btn btn-primary btn-lg gap-2 shadow-lg shadow-primary/25">
              📚 Voir le programme
            </Link>
            {!user && isConfigured && (
              <Link to="/signup" className="btn btn-outline btn-lg gap-2">🚀 Commencer gratuitement</Link>
            )}
            {user && (
              <Link to="/progress" className="btn btn-outline btn-lg gap-2">📊 Ma progression</Link>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { value: 27, label: 'Modules', icon: '📚', color: 'from-violet-500 to-purple-600' },
          { value: 4, label: 'Parties', icon: '📂', color: 'from-sky-500 to-blue-600' },
          { value: 70, suffix: '+', label: "Heures d'apprentissage", icon: '⏱️', color: 'from-amber-500 to-orange-600' },
          { value: 100, suffix: '%', label: 'Calcul scientifique', icon: '💻', color: 'from-emerald-500 to-green-600' },
        ].map(s => (
          <div key={s.label} className="stat bg-base-200 border border-base-300 rounded-xl py-4 px-3 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.color}`}>{s.value}{s.suffix || ''}</div>
            <div className="text-xs text-base-content/50 mt-0.5">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Comment ça marche ?</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '📖', title: 'Apprends', desc: 'Chaque module est un cours détaillé avec exemples progressifs en Fortran 95.' },
            { icon: '⌨️', title: 'Pratique', desc: 'Code en direct avec notre éditeur intégré ou compile en local avec gfortran.' },
            { icon: '✅', title: 'Valide', desc: "Teste tes connaissances avec des quiz et des exercices corrigés." },
          ].map((step, i) => (
            <div key={i} className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-300 group">
              <div className="card-body items-center text-center p-6">
                <div className="text-3xl mb-3">{step.icon}</div>
                <div className="w-10 h-1 rounded-full mb-3 bg-gradient-to-r from-purple-500 to-blue-500" />
                <h3 className="card-title text-lg">{step.title}</h3>
                <p className="text-sm text-base-content/60 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">📚 Les 4 parties</h2>
          <Link to="/curriculum" className="btn btn-ghost btn-sm gap-1 text-primary">Voir tout →</Link>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {PARTS.map(part => {
            const mods = MODULES.filter(m => m.part === part.id)
            return (
              <Link key={part.id} to="/curriculum" className="no-underline group">
                <div className="card bg-base-200 border border-base-300 hover:border-primary/40 transition-all duration-300 h-full">
                  <div className="card-body p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-1.5 h-8 rounded-full shrink-0" style={{ background: part.color }} />
                      <div>
                        <div className="text-xs text-base-content/40 font-medium tracking-wide uppercase">Partie {part.id}</div>
                        <h3 className="font-bold text-lg">{part.title}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-base-content/60 mb-3">{part.desc}</p>
                    <div className="flex items-center justify-between text-xs text-base-content/50 mt-auto">
                      <span>{mods.length} modules</span>
                      <span className="group-hover:text-primary transition-colors">Explorer →</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {!user && isConfigured && (
        <section className="card bg-gradient-to-r from-purple-600 to-violet-700 text-white border-none mb-6">
          <div className="card-body items-center text-center p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Prêt à commencer ?</h2>
            <p className="text-white/70 mb-6 max-w-lg">Crée ton compte gratuitement et accède à l'intégralité de la formation.</p>
            <Link to="/signup" className="btn btn-white text-purple-700 hover:bg-white/90 gap-2 shadow-lg">🚀 Créer mon compte</Link>
          </div>
        </section>
      )}
    </div>
  </>)
}
