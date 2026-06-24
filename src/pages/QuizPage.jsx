import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getModule, QUIZZES } from '../data/modules'
import { useAuth } from '../contexts/AuthContext'
import { useProgress } from '../hooks/useProgress'

export default function QuizPage() {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const { markQuizScore } = useProgress(user)
  const mod = getModule(moduleId)
  const questions = QUIZZES[moduleId] || []
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  if (!mod || !questions.length) {
    return (
      <div className="hero min-h-60">
        <div className="hero-content text-center">
          <div>
            <h2 className="text-xl font-bold">Aucun quiz pour ce module</h2>
            <Link to={`/module/${moduleId}`} className="link link-primary">Retour au cours</Link>
          </div>
        </div>
      </div>
    )
  }

  const score = submitted ? Object.entries(answers).filter(([i, a]) => questions[parseInt(i)]?.correct === a).length : 0

  const handleSubmit = () => {
    setSubmitted(true)
    if (user) markQuizScore(moduleId, Math.round(score / questions.length * 100))
  }

  return (<>
    <Helmet>
      <title>Quiz : {mod.title} | Formation Fortran 95</title>
    </Helmet>
    <div className="max-w-2xl mx-auto">
      <Link to={`/module/${moduleId}`} className="link link-primary text-sm no-underline">← Retour au cours</Link>
      <h1 className="text-2xl font-bold mt-3 mb-6">📝 Quiz : {mod.title}</h1>

      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={i} className="card bg-base-200 border border-base-300">
            <div className="card-body p-5">
              <p className="font-semibold mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.choices.map((c, j) => {
                  const selected = answers[i] === j
                  const isCorrect = submitted && q.correct === j
                  const isWrong = submitted && selected && q.correct !== j
                  return (
                    <label key={j} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isCorrect ? 'border-success bg-success/10' : isWrong ? 'border-error bg-error/10' : selected ? 'border-primary bg-primary/10' : 'border-base-300 hover:border-base-content/30'}`}>
                      <input type="radio" name={`q${i}`} checked={selected} onChange={() => !submitted && setAnswers(a => ({ ...a, [i]: j }))} disabled={submitted} className="radio radio-sm" />
                      <span className="text-sm">{c}</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button onClick={handleSubmit} className="btn btn-primary mt-6 w-full" disabled={Object.keys(answers).length !== questions.length}>
          Valider les réponses
        </button>
      ) : (
        <div className="card bg-base-200 border border-base-300 mt-6">
          <div className="card-body items-center text-center p-6">
            <div className="text-4xl mb-2">{score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '💪'}</div>
            <h2 className="text-xl font-bold">Score : {score}/{questions.length}</h2>
            <progress className="progress progress-primary w-full max-w-xs mt-2" value={score} max={questions.length} />
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setSubmitted(false); setAnswers({}) }} className="btn btn-outline btn-sm">Reessayer</button>
              <Link to={`/exercise/${moduleId}`} className="btn btn-primary btn-sm">💻 Exercice suivant</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  </>)
}
