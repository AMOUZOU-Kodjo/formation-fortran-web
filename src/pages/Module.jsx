import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getModule } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'

export default function ModulePage() {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const { toggleModule, getModuleProgress } = useProgress(user)
  const mod = getModule(moduleId)
  const [content, setContent] = useState('')
  const prog = getModuleProgress(moduleId)
  const idx = moduleId ? parseInt(moduleId.split('-')[0]) - 1 : -1

  useEffect(() => {
    if (!moduleId) return
    fetch(`/cours/${moduleId}.md`).then(r => r.ok ? r.text() : '# Contenu non disponible').then(setContent)
  }, [moduleId])

  if (!mod) return <div className="text-center py-20"><h2 className="text-xl font-bold">Module introuvable</h2></div>

  const markdownComponents = {
    code({ className, children, ...props }) {
      const isCode = /language-/.test(className || '')
      if (isCode) return <pre className="bg-base-300 border border-base-200 rounded-xl p-4 overflow-x-auto text-sm font-mono"><code className={className} {...props}>{children}</code></pre>
      return <code className="bg-base-300 px-1.5 py-0.5 rounded text-sm font-mono text-purple-500" {...props}>{children}</code>
    },
    pre({ children }) { return <>{children}</> },
  }

  return (<>
    <Helmet>
      <title>{mod.title} | Formation Fortran 95</title>
      <meta name="description" content={mod.desc} />
    </Helmet>
    <div className="max-w-4xl mx-auto">
      <Link to="/curriculum" className="link link-primary text-sm no-underline">← Retour au programme</Link>
      <div className="flex items-center justify-between mt-2 mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{mod.icon}</span>
          <div>
            <div className="text-xs text-base-content/40 font-mono">Module {mod.id.slice(0, 2)} · Partie {mod.part} · {mod.duration}</div>
            <h1 className="text-2xl md:text-3xl font-bold">{mod.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user && <button onClick={() => toggleModule(idx)} className={`btn btn-sm ${prog.completed ? 'btn-success' : 'btn-outline'}`}>{prog.completed ? '✓ Complété' : 'Marquer fait'}</button>}
        </div>
      </div>

      <div className="prose prose-sm max-w-none prose-headings:text-base-content prose-a:text-primary prose-code:text-purple-500 prose-pre:bg-base-300 prose-pre:border prose-pre:border-base-200 mb-8">
        {content ? <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{content}</ReactMarkdown> : <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>}
      </div>

      <div className="join w-full">
        <Link to={`/exercise/${moduleId}`} className="join-item btn btn-outline btn-sm gap-1">💻 Exercice</Link>
        <Link to={`/quiz/${moduleId}`} className="join-item btn btn-outline btn-sm gap-1">📝 Quiz</Link>
      </div>
    </div>
  </>)
}
