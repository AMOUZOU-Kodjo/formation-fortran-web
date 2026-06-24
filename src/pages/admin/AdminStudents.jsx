import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'
import { Link } from 'react-router-dom'

export default function AdminStudents() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (!isSupabaseConfigured()) return
    supabase.from('profiles').select('*').then(({ data }) => setStudents(data || []))
  }, [])

  return (<>
    <Helmet><title>Étudiants | Admin Fortran</title></Helmet>
    <div className="max-w-4xl mx-auto">
      <Link to="/admin" className="link link-primary text-sm no-underline">← Administration</Link>
      <h1 className="text-2xl font-bold mt-2 mb-6">👥 Étudiants</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Avatar</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id}>
                <td>{s.display_name || '-'}</td>
                <td>{s.email}</td>
                <td>{s.avatar_url ? <img src={s.avatar_url} className="w-8 h-8 rounded-full" /> : '-'}</td>
              </tr>
            ))}
            {students.length === 0 && <tr><td colSpan={3} className="text-center text-base-content/40">Aucun étudiant</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </>)
}
