import { useState, useEffect, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const LOCAL_KEY = 'fortran-progress'

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}') } catch { return {} }
}

function saveLocal(data) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

function getEmpty(modsLength) {
  return { completed: Array(modsLength || 0).fill(false), quizScores: {}, exerciseCompleted: {} }
}

export function useProgress(user) {
  const [progress, setProgress] = useState(() => loadLocal())

  useEffect(() => { saveLocal(progress) }, [progress])

  useEffect(() => {
    if (!user || !isSupabaseConfigured()) return
    supabase.from('progress').select('data').eq('user_id', user.id).single()
      .then(({ data }) => {
        if (data?.data) setProgress(prev => ({ ...prev, ...data.data }))
      })
    const sub = supabase.channel('progress-' + user.id)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'progress', filter: `user_id=eq.${user.id}` },
        payload => { if (payload.new?.data) setProgress(prev => ({ ...prev, ...payload.new.data })) })
      .subscribe()
    return () => sub.unsubscribe()
  }, [user])

  const sync = useCallback(async (p) => {
    if (!user || !isSupabaseConfigured()) return
    await supabase.from('progress').upsert({ user_id: user.id, data: p }, { onConflict: 'user_id' })
  }, [user])

  const getOverallProgress = useCallback((total) => {
    const done = progress.completed?.filter(Boolean).length || 0
    return { completed: done, total, percent: total ? Math.round(done / total * 100) : 0, moduleDetails: progress }
  }, [progress])

  const getModuleProgress = useCallback((moduleId) => {
    const idx = parseInt(moduleId?.split('-')[0]) - 1
    return {
      completed: progress.completed?.[idx] || false,
      quizScore: progress.quizScores?.[moduleId] || 0,
      exerciseCompleted: progress.exerciseCompleted?.[moduleId] || false,
    }
  }, [progress])

  const toggleModule = useCallback(async (index) => {
    const next = { ...progress, completed: [...(progress.completed || [])] }
    next.completed[index] = !next.completed[index]
    setProgress(next)
    await sync(next)
  }, [progress, sync])

  const markQuizScore = useCallback(async (moduleId, score) => {
    const next = { ...progress, quizScores: { ...progress.quizScores, [moduleId]: score } }
    setProgress(next)
    await sync(next)
  }, [progress, sync])

  const markExerciseCompleted = useCallback(async (moduleId) => {
    const next = { ...progress, exerciseCompleted: { ...progress.exerciseCompleted, [moduleId]: true } }
    setProgress(next)
    await sync(next)
  }, [progress, sync])

  return { progress, getOverallProgress, getModuleProgress, toggleModule, markQuizScore, markExerciseCompleted, sync }
}
